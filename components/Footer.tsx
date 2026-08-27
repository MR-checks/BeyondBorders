import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const linkCls = "hover:text-accent transition-colors";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-transparent to-surface/90 px-6 pb-8 pt-16 text-ink dark:from-[#2C1506] dark:to-[#2C1506] dark:text-[#F5EDDA]">
      <div className="mx-auto mb-12 grid max-w-7xl gap-12 border-b border-ink/10 pb-12 dark:border-white/10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="mb-4 inline-block font-serif text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            Beyond<span className="text-logo-gold">Borders</span>
          </Link>
          <p className="max-w-sm font-serif italic text-ink/70 dark:text-[#F5EDDA]/70">
            {siteConfig.description}
          </p>

          <div className="mt-6 space-y-1.5 text-sm text-ink/70 dark:text-[#F5EDDA]/70">
            <p>
              <a href={`mailto:${siteConfig.contact.email}`} className={linkCls}>
                {siteConfig.contact.email}
              </a>
            </p>
            <p>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                WhatsApp {siteConfig.contact.whatsappDisplay}
              </a>
            </p>
            <p>{siteConfig.contact.location}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Explore</h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-[#F5EDDA]/70">
            <li>
              <Link href="/#services" className={linkCls}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/#destinations" className={linkCls}>
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/turkey" className={linkCls}>
                Turkey travel and tours
              </Link>
            </li>
            <li>
              <Link href="/#process" className={linkCls}>
                How it works
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className={linkCls}>
                Success stories
              </Link>
            </li>
            <li>
              <Link href="/#faq" className={linkCls}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/blog" className={linkCls}>
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Follow us</h4>
          <ul className="space-y-2 text-sm text-ink/70 dark:text-[#F5EDDA]/70">
            <li>
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                TikTok
              </a>
            </li>
          </ul>

          <h4 className="mb-3 mt-8 font-bold">Get started</h4>
          <Link
            href="/#contact"
            className="inline-block rounded-xl bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
          >
            Free consultation
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl text-center text-sm text-ink/50 dark:text-[#F5EDDA]/50">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
