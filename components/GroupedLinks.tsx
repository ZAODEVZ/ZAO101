import type { GroupedResponse } from "@/lib/nexus";
import { NEXUS_PUBLIC_URL } from "@/lib/nexus";

// Read-only renderer for a grouped Nexus response. Iterates
// categories[].mainCategory -> subcategories[].subTitle -> links[].
// No link data is stored locally; everything here comes from the API prop.

export default function GroupedLinks({
  data,
}: {
  data: GroupedResponse | null;
}) {
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

  return (
    <div className="grouped-links">
      <p className="eco-bucket-note">
        {data.count} links, served live from the ZAO Nexus.
      </p>
      {data.categories.map((category) => (
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
      ))}
    </div>
  );
}
