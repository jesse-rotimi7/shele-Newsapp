import { Newspaper, Github, Linkedin, Twitter, Heart, ExternalLink } from "lucide-react";

const categories = ["Technology", "Business", "Sports", "Entertainment", "Science"];

export function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
      
      <div className="bg-[var(--color-surface-alt)]">
        <div className="container-main py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="/" className="inline-flex items-center gap-3 mb-5 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative grid place-items-center w-11 h-11 bg-gradient-to-br from-rose-500 to-rose-400 rounded-xl">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold">
                    Shele<span className="text-gradient">News</span>
                  </span>
                  <p className="text-xs text-[var(--color-ink-muted)]">Stay informed</p>
                </div>
              </a>
              
              <p className="text-[var(--color-ink-muted)] text-sm max-w-md leading-relaxed">
                Your modern news aggregator. Stay informed with real-time updates 
                from trusted sources worldwide. Built with Next.js, React, and love.
              </p>
              
              {/* Social Media Links - Commented out */}
              {/* <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-icon border border-[var(--color-line)] hover:border-rose-500/30 rounded-xl"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div> */}
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--color-ink-muted)]">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`/?category=${cat.toLowerCase()}`}
                      className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1 group"
                    >
                      {cat}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources - Commented out */}
            {/* <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--color-ink-muted)]">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/bookmarks" className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors">
                    Saved Articles
                  </a>
                </li>
                <li>
                  <a
                    href="https://newsdata.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1"
                  >
                    NewsData.io API
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1"
                  >
                    Source Code
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Bottom */}
          <div className="mt-14 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-ink-muted)]">
              © {new Date().getFullYear()} SheleNews. All rights reserved.
            </p>
            <p className="text-sm text-[var(--color-ink-muted)] flex items-center gap-1.5">
              Crafted with
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" style={{ animation: "pulse 2s infinite" }} />
              by
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors"
              >
                Jesse Rotimi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
