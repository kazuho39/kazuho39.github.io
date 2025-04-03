import { Heading } from "@/lib/extractHeadings";

interface SidebarProps {
  headings: Heading[];
}

export default function Sidebar({ headings }: SidebarProps) {
  return (
    <aside className="w-1/4 pr-8">
      <nav className="sticky top-0">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${(heading.level - 1) * 0.8}rem` }} // 階層に応じて左にずらす
            >
              <a href={`#${heading.id}`} className="text-blue-300 hover:underline">
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
