'use client'

import LinkCard from "@/components/LinkCard";

export default function TipsPage() {
  return (
    <>
      <title>AWS</title>
      <div className="flex w-full flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">AWS</h1>
        <LinkCard
          href="aws/operations-security"
          title="運用・監視／セキュリティ"
          description="Study about Operations and Security"
        />
      </div>
    </>
  );
}
