export default function HeaderMenu() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 md:p-4 z-50">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="text-lg font-bold hover:underline">
          Home
        </a>
        <a href="/tips" className="text-lg font-bold hover:underline ml-4">
          Tips
        </a>
        <a href="/best-practice" className="text-lg font-bold hover:underline ml-4">
          Best Practices
        </a>
        <a href="/aws" className="text-lg font-bold hover:underline ml-4">
          AWS
        </a>
        <a href="/study-note" className="text-lg font-bold hover:underline ml-4">
          Study Note
        </a>
        <a href="/column" className="text-lg font-bold hover:underline ml-4">
          Column
        </a>
        <a href="/seo" className="text-lg font-bold hover:underline ml-4">
          SEO
        </a>
        <a href="/bookmark" className="text-lg font-bold hover:underline ml-4">
          Bookmark
        </a>
      </div>
    </header>
  );
}