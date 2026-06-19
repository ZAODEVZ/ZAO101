"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GroupedResponse } from "@/lib/nexus";
import { NEXUS_PUBLIC_URL } from "@/lib/nexus";

// Client-side search + category/tag filter over the grouped Nexus data. The data
// is still fetched server-side (ISR) and passed in as a prop - this only filters
// what is already on the page, so there are no extra requests and no new
// dependencies. The read-only render matches GroupedLinks (used on /201), which
// is intentionally left unchanged.

const ALL = "All";
// Cap the tag chips so a long tag list does not dominate the page; the search
// box still reaches any tag by text.
const MAX_TAGS = 24;

export default function EcosystemBrowser({
  data,
}: {
  data: GroupedResponse | null;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const categories = data?.categories ?? [];

  // Deep-linkable filters: read the current filter state from the URL on mount
  // (so a shared link opens pre-filtered), then mirror later changes back into
  // the URL via replaceState. We use history directly rather than the Next
  // router hooks so no Suspense boundary is needed and there is no navigation.
  const syncedOnce = useRef(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Press "/" anywhere on the page to jump to the search box, unless the focus
  // is already in a text field. A standard directory shortcut.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      searchRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("q") ?? "";
    const cat = sp.get("cat");
    const tags = sp.get("tags");
    if (q) setQuery(q);
    if (cat && categories.some((c) => c.mainCategory === cat)) {
      setActiveCategory(cat);
    }
    if (tags) setActiveTags(tags.split(",").filter(Boolean));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip the first run so the mount-time read above is not overwritten.
    if (!syncedOnce.current) {
      syncedOnce.current = true;
      return;
    }
    const sp = new URLSearchParams();
    if (query.trim()) sp.set("q", query.trim());
    if (activeCategory !== ALL) sp.set("cat", activeCategory);
    if (activeTags.length > 0) sp.set("tags", activeTags.join(","));
    const qs = sp.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }, [query, activeCategory, activeTags]);

  // Most common tags across all links, highest frequency first, capped.
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const category of categories) {
      for (const sub of category.subcategories) {
        for (const link of sub.links) {
          for (const tag of link.tags ?? []) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
          }
        }
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, MAX_TAGS)
      .map(([tag]) => tag);
  }, [categories]);

  // Total links per category (and overall), shown on the chips so the spread of
  // the directory is visible at a glance. These are full totals, independent of
  // the active search/tag filters, so the numbers stay stable as you type.
  const { totalCount, countByCategory } = useMemo(() => {
    const byCategory = new Map<string, number>();
    let total = 0;
    for (const category of categories) {
      let n = 0;
      for (const sub of category.subcategories) n += sub.links.length;
      byCategory.set(category.mainCategory, n);
      total += n;
    }
    return { totalCount: total, countByCategory: byCategory };
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeCategory === ALL || c.mainCategory === activeCategory)
      .map((category) => ({
        ...category,
        subcategories: category.subcategories
          .map((sub) => ({
            ...sub,
            links: sub.links.filter((link) => {
              const tags = link.tags ?? [];
              // Tag facet: keep links carrying ANY selected tag.
              if (
                activeTags.length > 0 &&
                !activeTags.some((t) => tags.includes(t))
              ) {
                return false;
              }
              if (!q) return true;
              const haystack = [link.title, link.description, ...tags]
                .join(" ")
                .toLowerCase();
              return haystack.includes(q);
            }),
          }))
          .filter((sub) => sub.links.length > 0),
      }))
      .filter((category) => category.subcategories.length > 0);
  }, [categories, query, activeCategory, activeTags]);

  if (!data || data.categories.length === 0) {
    return (
      <div className="placeholder">
        The live list could not be loaded right now. The canonical source is
        the ZAO Nexus - visit{" "}
        <a href={NEXUS_PUBLIC_URL}>nexus.thezao.com</a> for the full,
        up-to-date list.
      </div>
    );
  }

  const resultCount = filtered.reduce(
    (n, c) => n + c.subcategories.reduce((m, s) => m + s.links.length, 0),
    0,
  );
  const isFiltering =
    query.trim() !== "" || activeCategory !== ALL || activeTags.length > 0;

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearFilters() {
    setQuery("");
    setActiveCategory(ALL);
    setActiveTags([]);
  }

  // Copy the current URL (which already carries the active filters) so a
  // filtered view can be shared. Clipboard API with a textarea fallback, the
  // same approach as OrgCopyButton; no dependency.
  async function copyLink() {
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grouped-links">
      <div className="eco-controls">
        <input
          ref={searchRef}
          type="search"
          className="eco-search"
          placeholder="Search the ecosystem (press /)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the ecosystem"
        />
        <div className="eco-filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={
              activeCategory === ALL ? "eco-filter is-active" : "eco-filter"
            }
            aria-pressed={activeCategory === ALL}
            onClick={() => setActiveCategory(ALL)}
          >
            All <span className="eco-count">{totalCount}</span>
          </button>
          {data.categories.map((c) => (
            <button
              key={c.mainCategory}
              type="button"
              className={
                activeCategory === c.mainCategory
                  ? "eco-filter is-active"
                  : "eco-filter"
              }
              aria-pressed={activeCategory === c.mainCategory}
              onClick={() => setActiveCategory(c.mainCategory)}
            >
              {c.mainCategory}{" "}
              <span className="eco-count">
                {countByCategory.get(c.mainCategory) ?? 0}
              </span>
            </button>
          ))}
        </div>
        {topTags.length > 0 ? (
          <div
            className="eco-filters eco-tags"
            role="group"
            aria-label="Filter by tag"
          >
            {topTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={
                  activeTags.includes(tag)
                    ? "eco-filter is-active"
                    : "eco-filter"
                }
                aria-pressed={activeTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="eco-bucket-note" role="status" aria-live="polite">
        {isFiltering
          ? `${resultCount} of ${data.count} links match.`
          : `${data.count} links, served live from the ZAO Nexus.`}
        {isFiltering ? (
          <>
            {" "}
            <button type="button" className="gate-link" onClick={clearFilters}>
              Clear filters
            </button>{" "}
            <button type="button" className="gate-link" onClick={copyLink}>
              {copied ? "Link copied" : "Copy link"}
            </button>
          </>
        ) : null}
      </p>

      {filtered.length === 0 ? (
        <p className="placeholder">
          No links match your search. Try a different term, category, or tag.
        </p>
      ) : (
        filtered.map((category) => (
          <section key={category.mainCategory} className="link-category">
            <h2>{category.mainCategory}</h2>
            {category.subcategories.map((sub) => (
              <div key={sub.subTitle} className="link-subcategory">
                <h3>{sub.subTitle}</h3>
                <ul className="link-list">
                  {sub.links.map((link) => (
                    <li key={link.url} className="link-item">
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                      {link.description ? (
                        <span className="link-desc">{link.description}</span>
                      ) : null}
                      {link.tags && link.tags.length > 0 ? (
                        <span className="link-tags">
                          {link.tags.map((tag) => (
                            <span key={tag} className="link-tag">
                              {tag}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}
