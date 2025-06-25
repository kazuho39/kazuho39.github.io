import fs from 'fs';
import path from 'path';
import { markdownToHtml } from "@/lib/markdownToHtml";
import SlideView from '@/components/SlideView';

export default async function Page() {
  const markdownFileName = "test-slide"; // スライドのMarkdownファイル名
  const markdownFilePath = path.join(process.cwd(), "content", "slide", markdownFileName + ".md");
  const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

  const contentHtml = await markdownToHtml(markdownContent);
  return markdownContent 
    ? <>
        <SlideView contentHtml={contentHtml} />
      </>
    : <>
        <div>スライドの読み込みに失敗しました</div>;
      </>
}
