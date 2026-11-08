import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Free open source courses, books and guides for ZAO members who want to build.",
};

// A short, hand-picked set of free learning repos. Every entry is a public
// GitHub repo with an open licence. Picked from the community list at
// github.com/pawelborkar/awesome-repos (MIT). These are outside resources,
// not ZAO Nexus data, so they live here instead of the Nexus API.
type Resource = { title: string; url: string; note: string };
type Group = { id: string; heading: string; intro: string; items: Resource[] };

const GROUPS: Group[] = [
  {
    id: "start",
    heading: "Start here",
    intro: "Never written code? Start with one of these. Learn by making things.",
    items: [
      {
        title: "Developer Roadmap",
        url: "https://github.com/nilbuild/developer-roadmap",
        note: "Step-by-step maps of what to learn, and in what order.",
      },
      {
        title: "Project Based Learning",
        url: "https://github.com/practical-tutorials/project-based-learning",
        note: "Tutorials where you build a real project in each one.",
      },
      {
        title: "Learn by Playing",
        url: "https://github.com/lmammino/awesome-learn-by-playing",
        note: "Games that teach you to code.",
      },
      {
        title: "Git and GitHub cheat sheet",
        url: "https://github.com/tiimgreen/github-cheat-sheet",
        note: "The ZAO builds in public on GitHub. This is how it works.",
      },
    ],
  },
  {
    id: "web",
    heading: "Build for the web",
    intro: "Most ZAO tools are websites. These get you there.",
    items: [
      {
        title: "Become a Full Stack Web Developer",
        url: "https://github.com/bmorelli25/Become-A-Full-Stack-Web-Developer",
        note: "Free resources from your first page to a full app.",
      },
      {
        title: "Front End Web Development",
        url: "https://github.com/RitikPatni/Front-End-Web-Development-Resources",
        note: "HTML, CSS and JavaScript, in one place.",
      },
      {
        title: "The Concise TypeScript Book",
        url: "https://github.com/gibbok/typescript-book",
        note: "The language this site is written in. Free book.",
      },
    ],
  },
  {
    id: "ai",
    heading: "Build with AI",
    intro: "Free courses for using AI to make music tools, bots and agents.",
    items: [
      {
        title: "Generative AI for Beginners",
        url: "https://github.com/microsoft/generative-ai-for-beginners",
        note: "Lessons for building your first AI app.",
      },
      {
        title: "AI Agents for Beginners",
        url: "https://github.com/microsoft/ai-agents-for-beginners",
        note: "How agents work and how to build one.",
      },
      {
        title: "Hugging Face Agents Course",
        url: "https://github.com/huggingface/agents-course",
        note: "Free course on building and running agents.",
      },
      {
        title: "Prompt Engineering Guide",
        url: "https://github.com/dair-ai/Prompt-Engineering-Guide",
        note: "How to ask AI for what you actually want.",
      },
      {
        title: "Claude Cookbooks",
        url: "https://github.com/anthropics/claude-cookbooks",
        note: "Recipes for building with Claude.",
      },
    ],
  },
  {
    id: "web3",
    heading: "Understand onchain",
    intro: "The ZAO uses onchain tools when it matters. Read up before you touch a wallet.",
    items: [
      {
        title: "EthList",
        url: "https://github.com/Scanate/EthList",
        note: "A reading list on Ethereum, from the basics up.",
      },
      {
        title: "Web Security",
        url: "https://github.com/qazbnm456/awesome-web-security",
        note: "Learn how sites get attacked, so yours does not.",
      },
    ],
  },
  {
    id: "books",
    heading: "Free books and courses",
    intro: "Big libraries. Bookmark them and come back.",
    items: [
      {
        title: "Free Programming Books",
        url: "https://github.com/EbookFoundation/free-programming-books",
        note: "Thousands of free books in many languages.",
      },
      {
        title: "Free Certifications",
        url: "https://github.com/ArslanYM/Free-Certifications",
        note: "Free courses that end in a certificate.",
      },
      {
        title: "Computer Science (OSSU)",
        url: "https://github.com/ossu/computer-science",
        note: "A full, free, self-taught computer science path.",
      },
    ],
  },
];

export default function LearnPage() {
  return (
    <article className="page">
      <h1>Learn</h1>
      <p>
        Free courses, books and guides for members who want to build. Every
        one is open source and costs nothing.
      </p>
      <p>
        You do not need any of this to join. The ZAO is music first. This page
        is for when you want to make your own tools.
      </p>

      {GROUPS.map((group) => (
        <section key={group.id} aria-labelledby={`learn-${group.id}`}>
          <h2 id={`learn-${group.id}`}>{group.heading}</h2>
          <p>{group.intro}</p>
          <ul>
            {group.items.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
                {" - "}
                {item.note}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Want more?</h2>
      <p>
        These picks come from{" "}
        <a
          href="https://github.com/pawelborkar/awesome-repos"
          target="_blank"
          rel="noreferrer"
        >
          Awesome Repos
        </a>
        , a free list with many more. Built something? Show it at{" "}
        <Link href="/zabal-games">ZABAL Games</Link> or start at{" "}
        <Link href="/join">How to Join</Link>.
      </p>

      <p>
        <Link href="/">Home</Link>
      </p>
    </article>
  );
}
