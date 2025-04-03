import Link from "next/link";

interface ListItem {
  title: string;
  href: string;
}

interface ListProps {
  items: ListItem[];
}

export default function List({ items }: ListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.href} className="border-b pb-2">
          <Link href={item.href} className="text-blue-300 hover:underline text-lg">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
