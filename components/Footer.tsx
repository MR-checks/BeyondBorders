import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="mt-20 pt-16 pb-8 px-6 bg-gradient-to-b from-transparent to-surface/90 dark:from-[#2C1506] dark:to-[#2C1506] text-ink dark:text-[#F5EDDA]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12 border-b border-ink/10 dark:border-white/10 pb-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-4 inline-block">
            Beyond<span className="text-accent">Borders</span>
          </Link>
          <p className="text-ink/70 dark:text-[#F5EDDA]/70 max-w-sm italic font-serif">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-[#F5EDDA]/70">
            <li><Link href="/#services" className="hover:text-accent transition-colors">Services</Link></li>
            <li><Link href="/#destinations" className="hover:text-accent">Destinations</Link></li>
            <li><Link href="/#testimonials" className="hover:text-accent">Success Stories</Link></li>
            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-[#F5EDDA]/70">
            <li><a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
            <li><a href={siteConfig.contact.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-accent">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-sm text-ink/50 dark:text-[#F5EDDA]/50">
        © {new Date().getFullYear()} BeyondBorders. All rights reserved.
      </div>
    </footer>
  );
}
