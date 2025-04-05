import React from "react";
import Sidebar from "@/components/Sidebar";
import { Heading } from "@/lib/extractHeadings";

interface LayoutMarkdownWithSidebarProps {
  headings: Heading[];
  contentHtml: string;
}

const LayoutMarkdownWithSidebar: React.FC<LayoutMarkdownWithSidebarProps> = ({ headings, contentHtml }) => {
  return (
    <div className="flex w-full flex-row p-4 md:p-8">
      {/* Sidebar for headings */}
      <Sidebar headings={headings} />

      {/* Main content */}
      <div className="markdown w-full md:w-3/4">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
};

export default LayoutMarkdownWithSidebar;
