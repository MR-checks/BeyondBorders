import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="glass mt-20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12 border-b border-glass-border/10 pb-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-4 inline-block">
            Beyond<span className="text-accent">Borders</span>
          </Link>
          <p className="text-ink-dim max-w-sm italic font-serif">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><Link href="/#services" className="hover:text-accent">Services</Link></li>
            <li><Link href="/#destinations" className="hover:text-accent">Destinations</Link></li>
            <li><Link href="/#testimonials" className="hover:text-accent">Success Stories</Link></li>
            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm text-ink-dim">
            <li><a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram</a></li>
            <li><a href={siteConfig.contact.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-accent">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-sm text-ink-dim">
        © {new Date().getFullYear()} BeyondBorders. All rights reserved.
      </div>
    </footer>
  );
}
