type PageTitleProps = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: PageTitleProps) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1 ${className ?? ''}`}>
      {title}
    </h2>
  );
}
