import LinkCard from "@/components/LinkCard";

export default function Home() {
  return (
    <>
      <title>Kazuho&apos;s Portfolio</title>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm grid gap-8 md:grid-cols-3">
          <LinkCard
            href="/tips"
            title="Tips"
            description="Browse useful tips and guides."
          />
          <LinkCard
            href="/best-practice"
            title="Best Practice"
            description="My Best Practice."
          />
          <LinkCard
            href="/column"
            title="Column"
            description="My Column."
          />
          <LinkCard
            href="/seo"
            title="SEO"
            description="About SEO."
          />
        </div>
      </main>
    </>
  );
}
