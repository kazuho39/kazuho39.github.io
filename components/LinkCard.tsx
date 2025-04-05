import Link from "next/link";

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
}

export default function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-transparent md:px-5 md:py-4 transition-colors md:hover:border-gray-300 md:hover:bg-gray-100 md:hover:dark:border-neutral-700 md:hover:dark:bg-neutral-800/30"
    >
      <div className="w-64">
        <h2 className="mb-3 text-2xl font-semibold">
          {title}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">{description}</p>
      </div>
    </Link>
  );
}
