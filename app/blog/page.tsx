import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif mb-12">Blog</h1>
      <div className="grid gap-8">
        <Link href="/blog/study-abroad-destination" className="glass p-8 rounded-3xl hover:-translate-y-1 transition-transform">
          <h2 className="text-2xl font-bold mb-2">How to Choose the Right Study-Abroad Destination</h2>
          <p className="text-ink-dim">A comprehensive guide to picking the perfect country for your educational journey...</p>
          <span className="text-accent text-sm font-bold mt-4 inline-block">Read more →</span>
        </Link>
      </div>
    </div>
  );
}
