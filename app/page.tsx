import LinkCard from "@/components/LinkCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex gap-8">
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
      </div>
    </main>
  );
}
