export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              THOREX
            </h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Building premium digital experiences across commerce, brand, and
              automation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="mt-4 flex flex-col gap-3">
              <a href="#works" className="text-sm text-zinc-400 transition-colors hover:text-gold">
                Works
              </a>
              <a href="#about" className="text-sm text-zinc-400 transition-colors hover:text-gold">
                About
              </a>
              <a href="#services" className="text-sm text-zinc-400 transition-colors hover:text-gold">
                Services
              </a>
              <a href="#contact" className="text-sm text-zinc-400 transition-colors hover:text-gold">
                Contact
              </a>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Socials</h4>
            <nav className="mt-4 flex flex-col gap-3">
              <a
                href="https://instagram.com/thorex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@thorex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 transition-colors hover:text-gold"
              >
                TikTok
              </a>
              <a
                href="mailto:hello@thorex.com"
                className="text-sm text-zinc-400 transition-colors hover:text-gold"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} THOREX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
