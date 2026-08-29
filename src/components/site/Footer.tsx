import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-3xl font-black">
            clb <span className="h-2.5 w-2.5 rounded-full bg-[var(--pink)]" />
          </div>
          <p className="mt-4 text-sm text-white/55 max-w-xs">
            Empowering the next generation of models and content creators worldwide.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Navigation</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#how" className="hover:text-white">How It Works</a></li>
            <li><a href="#models" className="hover:text-white">Models</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#apply" className="hover:text-white">Apply</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Legal</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
            <li><a href="#" className="hover:text-white">DMCA</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Social</div>
          <div className="flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} clb Agency. All rights reserved.</div>
          <div>You must be 18+ to apply and use this service.</div>
        </div>
      </div>
    </footer>
  );
}
