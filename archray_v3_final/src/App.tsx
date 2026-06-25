import { useEffect, useRef, useState } from "react";

/* ── BRAND TOKENS ─────────────────────────────────────── */
const C = {
  navy:      "#0F2744",
  navyDark:  "#091B30",
  navyLight: "#162E50",
  gold:      "#D4AF37",
  goldDim:   "rgba(212,175,55,0.14)",
  white:     "#FFFFFF",
  lightGray: "#F4F4F4",
  darkGray:  "#3A3A3A",
  mid:       "#8A8A8A",
};

/* ── HOOK: intersection observer for scroll-reveal ────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── ARCHRAY LOGO SVG ─────────────────────────────────── */
function ArchrayIcon({ size = 72, onDark = true }: { size?: number; onDark?: boolean }) {
  const stroke = onDark ? C.white : C.navy;
  const sw = size * 0.055;
  return (
    <svg width={size} height={size * 1.02} viewBox="0 0 100 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="6" x2="10" y2="96" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1="50" y1="6" x2="90" y2="96" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1="82" y1="8" x2="28" y2="88" stroke={C.gold} strokeWidth={sw * 0.85} strokeLinecap="round" className="anim-ray-pulse" />
    </svg>
  );
}

function ArchrayLogo({ size = 72, onDark = true }: { size?: number; onDark?: boolean }) {
  const nameColor = onDark ? C.white : C.navy;
  const subColor  = onDark ? "rgba(255,255,255,0.42)" : "rgba(15,39,68,0.45)";
  const fs = (n: number) => size * n;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: fs(0.16) }}>
      <ArchrayIcon size={size} onDark={onDark} />
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: fs(0.3), letterSpacing: fs(0.055), color: nameColor }}>
          ARCH<span style={{ color: C.gold }}>RAY</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: fs(0.07), justifyContent: "center", marginTop: fs(0.04) }}>
          <div style={{ width: fs(0.22), height: 1, background: subColor }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: fs(0.115), letterSpacing: fs(0.028), color: subColor, textTransform: "uppercase" }}>ARCHITECTS</span>
          <div style={{ width: fs(0.22), height: 1, background: subColor }} />
        </div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 300, fontSize: fs(0.088), letterSpacing: fs(0.01), color: subColor, textTransform: "uppercase", marginTop: fs(0.06), opacity: 0.75 }}>
          WHERE VISION MEETS PRECISION
        </div>
      </div>
    </div>
  );
}

/* ── SHARED UI ──────────────────────────────────────── */
function GoldLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 28, height: 2, background: C.gold, borderRadius: 1 }} />
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 4, color: C.gold, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

function SectionTitle({ children, light = true }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,44px)", color: light ? C.white : C.navy, margin: "0 0 16px", lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.75s ease, transform 0.75s ease", ...style }}>
      {children}
    </div>
  );
}

/* ── NAV ─────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home",     id: "home" },
  { label: "About",    id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Team",     id: "team" },
  { label: "Contact",  id: "contact" },
];

function NavBar({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(9,27,48,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,55,0.1)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
      {/* Logo */}
      <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, padding: 0 }}>
        <ArchrayIcon size={22} onDark />
        <div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 3.5, color: C.white, lineHeight: 1 }}>
            ARCH<span style={{ color: C.gold }}>RAY</span>
          </div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7, letterSpacing: 2.5, color: "rgba(255,255,255,0.28)" }}>ARCHITECTS</div>
        </div>
      </button>

      {/* Desktop Links */}
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              background: active === item.id ? "rgba(212,175,55,0.1)" : "transparent",
              border: active === item.id ? "1px solid rgba(212,175,55,0.28)" : "1px solid transparent",
              borderRadius: 5, padding: "6px 14px",
              fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
              color: active === item.id ? C.gold : "rgba(255,255,255,0.45)",
              cursor: "pointer", transition: "all 0.15s", textTransform: "uppercase",
            }}
            onMouseEnter={e => { if (active !== item.id) { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)"; } }}
            onMouseLeave={e => { if (active !== item.id) { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; } }}
          >
            {item.label}
          </button>
        ))}
        <button onClick={() => scrollTo("contact")} style={{ marginLeft: 10, background: C.gold, border: "none", borderRadius: 5, padding: "6px 18px", fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.navy, cursor: "pointer", transition: "opacity 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        >
          GET IN TOUCH
        </button>
      </div>

      {/* Mobile hamburger (hidden visually on wide screens via inline style) */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
        aria-label="Menu"
      >
        <div style={{ width: 22, height: 2, background: C.gold, marginBottom: 5 }} />
        <div style={{ width: 16, height: 2, background: C.gold, marginBottom: 5 }} />
        <div style={{ width: 22, height: 2, background: C.gold }} />
      </button>
    </nav>
  );
}

/* ── STAT CARD ───────────────────────────────────────── */
function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "28px 16px" }}>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: C.gold, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2.5, color: C.white, marginTop: 8, textTransform: "uppercase" }}>{label}</div>
      {sub && <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ── SERVICE CARD ────────────────────────────────────── */
function ServiceCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.32)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12, padding: "32px 26px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 18 }}>{icon}</div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, color: C.white, marginBottom: 10, letterSpacing: 0.5 }}>{title}</div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.75 }}>{desc}</div>
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: C.gold, opacity: hovered ? 1 : 0.5, transition: "opacity 0.2s" }}>
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>LEARN MORE</span>
        <span style={{ fontSize: 11 }}>→</span>
      </div>
    </div>
  );
}

/* ── PROJECT CARD ────────────────────────────────────── */
function ProjectCard({ title, type, location, year, accent }: { title: string; type: string; location: string; year: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", boxShadow: hovered ? "0 24px 56px rgba(0,0,0,0.55)" : "0 8px 24px rgba(0,0,0,0.32)", transition: "all 0.3s ease", transform: hovered ? "translateY(-8px)" : "translateY(0)" }}
    >
      {/* Image placeholder */}
      <div style={{ height: 220, background: `linear-gradient(135deg, ${accent} 0%, ${C.navyDark} 100%)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Wireframe building */}
        <svg style={{ opacity: hovered ? 0.22 : 0.14, transition: "opacity 0.3s", width: "70%", maxWidth: 200 }} viewBox="0 0 200 180" fill="none">
          <rect x="30" y="50" width="140" height="120" stroke="white" strokeWidth="1.2" />
          <rect x="45" y="65" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="80" y="65" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="115" y="65" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="45" y="108" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="80" y="108" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="115" y="108" width="25" height="32" stroke="white" strokeWidth="0.8" />
          <rect x="70" y="20" width="60" height="30" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="165" x2="170" y2="165" stroke="white" strokeWidth="0.8" />
          <line x1="70" y1="20" x2="30" y2="50" stroke="white" strokeWidth="0.5" />
          <line x1="130" y1="20" x2="170" y2="50" stroke="white" strokeWidth="0.5" />
          {/* Gold ray */}
          <line x1="185" y1="5" x2="60" y2="170" stroke={C.gold} strokeWidth="0.9" opacity="0.7" />
        </svg>
        {/* Overlay on hover */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(9,27,48,0.45)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 3, color: C.gold, border: "1px solid rgba(212,175,55,0.5)", borderRadius: 4, padding: "8px 18px" }}>VIEW PROJECT</div>
        </div>
        {/* Type tag */}
        <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(9,27,48,0.78)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 4, padding: "4px 10px" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 2, color: C.gold }}>{type}</span>
        </div>
      </div>
      {/* Info */}
      <div style={{ background: C.navyLight, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, color: C.white, marginBottom: 6 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{location}</span>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: C.gold }}>{year}</span>
        </div>
      </div>
    </div>
  );
}

/* ── TEAM CARD ──────────────────────────────────────── */
function TeamCard({ name, nameAr, role, roleAr, initials }: { name: string; nameAr: string; role: string; roleAr: string; initials: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${C.navyLight} 0%, ${C.navyDark} 100%)`, border: `2px solid rgba(212,175,55,0.35)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 24, color: C.gold }}>{initials}</span>
      </div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, color: C.white, marginBottom: 3 }}>{name}</div>
      <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)", direction: "rtl", marginBottom: 6 }}>{nameAr}</div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: 2, color: C.gold, textTransform: "uppercase" }}>{role}</div>
      <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", direction: "rtl", marginTop: 3 }}>{roleAr}</div>
    </div>
  );
}

/* ── CONTACT FORM (visual) ───────────────────────────── */
function ContactForm() {
  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
    padding: "13px 16px", fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: C.white,
    outline: "none", boxSizing: "border-box",
  };
  return (
    <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>FULL NAME</label>
          <input type="text" placeholder="Your name" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
          <input type="email" placeholder="your@email.com" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>SERVICE INTEREST</label>
        <select style={{ ...inputStyle, appearance: "none" }}>
          <option value="" style={{ background: C.navy }}>Select a service</option>
          <option style={{ background: C.navy }}>Architecture & Design</option>
          <option style={{ background: C.navy }}>Interior Design</option>
          <option style={{ background: C.navy }}>Engineering Consultancy</option>
          <option style={{ background: C.navy }}>Urban Planning</option>
          <option style={{ background: C.navy }}>Project Management</option>
          <option style={{ background: C.navy }}>Sustainable Design</option>
        </select>
      </div>
      <div>
        <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>YOUR MESSAGE</label>
        <textarea placeholder="Describe your project..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
      </div>
      <button type="submit" style={{ background: C.gold, border: "none", borderRadius: 8, padding: "14px 28px", fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: C.navy, cursor: "pointer", transition: "opacity 0.15s", textTransform: "uppercase" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      >
        SEND MESSAGE →
      </button>
    </form>
  );
}

/* ── MAIN APP ─────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const sec: React.CSSProperties = { padding: "100px 40px" };
  const inner: React.CSSProperties = { maxWidth: 1100, margin: "0 auto" };

  return (
    <div style={{ background: C.navyDark, minHeight: "100vh", fontFamily: "'Montserrat','Tajawal',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Tajawal:wght@300;400;700&display=swap');
        ::placeholder { color: rgba(255,255,255,0.22); }
        input:focus, textarea:focus, select:focus { border-color: rgba(212,175,55,0.45) !important; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>

      <NavBar active={active} />

      {/* ══════════════════ HERO ══════════════════════ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 28% 45%, #162E50 0%, #091B30 68%)`, padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
        {/* Animated background grid */}
        <div className="anim-grid" style={{ position: "absolute", inset: 0, opacity: 0.022, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        {/* Ghost A mark */}
        <svg className="anim-float-a" style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", opacity: 0.032, pointerEvents: "none" }} width={560} height={572} viewBox="0 0 100 102" fill="none">
          <line x1="50" y1="6" x2="10" y2="96" stroke={C.gold} strokeWidth="2" />
          <line x1="50" y1="6" x2="90" y2="96" stroke={C.gold} strokeWidth="2" />
          <line x1="82" y1="8" x2="28" y2="88" stroke={C.gold} strokeWidth="1.6" />
        </svg>

        <div className="anim-fade-up" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 780 }}>
          {/* Pill badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 50, padding: "5px 18px", marginBottom: 48 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 3, color: C.gold, textTransform: "uppercase" }}>Architecture & Engineering Consultancy · Abu Dhabi, UAE</span>
          </div>

          {/* Logo */}
          <div className="anim-float-a">
            <ArchrayLogo size={90} onDark />
          </div>

          {/* Hero headline */}
          <h1 className="anim-fade-up delay-200" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(28px,5vw,64px)", color: C.white, lineHeight: 1.12, margin: "48px auto 0", maxWidth: 680, letterSpacing: -0.5 }}>
            Designing Spaces That <span style={{ color: C.gold }}>Inspire</span> & Endure
          </h1>

          {/* Subheading */}
          <p className="anim-fade-up delay-300" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.46)", lineHeight: 1.85, margin: "24px auto 0", maxWidth: 520 }}>
            A multidisciplinary architecture and engineering consultancy creating innovative, functional, and sustainable spaces — where vision meets precision.
          </p>

          {/* Arabic tagline */}
          <div className="anim-fade-up delay-400" style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.22)", direction: "rtl", marginTop: 10 }}>
            أرشراي للعمارة والاستشارات الهندسية — حيث تلتقي الرؤية بالدقة
          </div>

          {/* CTAs */}
          <div className="anim-fade-up delay-500" style={{ marginTop: 52, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: C.gold, border: "none", borderRadius: 8, padding: "14px 32px", fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: C.navy, cursor: "pointer", transition: "opacity 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              VIEW OUR WORK
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "14px 32px", fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: C.white, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = C.white; }}
            >
              START A PROJECT
            </button>
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, letterSpacing: 3, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Scroll to explore</span>
            <div style={{ width: 1, height: 40, background: `linear-gradient(${C.gold},transparent)` }} />
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS BAND ══════════════ */}
      <div style={{ background: C.navyLight, borderTop: `1px solid rgba(212,175,55,0.12)`, borderBottom: `1px solid rgba(212,175,55,0.12)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          <StatCard value="10+" label="Years Experience" sub="Since 2015" />
          <StatCard value="85+" label="Projects Completed" sub="Residential & Commercial" />
          <StatCard value="60+" label="Satisfied Clients" sub="UAE & GCC" />
          <StatCard value="5" label="Cities" sub="Abu Dhabi · Dubai · Riyadh · Doha · Cairo" />
        </div>
      </div>

      {/* ══════════════════ ABOUT ═════════════════════ */}
      <section id="about" style={{ ...sec, background: C.navyDark }}>
        <div style={inner}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            {/* Left: Text */}
            <RevealSection>
              <GoldLabel text="About ARCHRAY" />
              <SectionTitle>Where Vision Meets Precision</SectionTitle>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: 20 }}>
                ARCHRAY ARCHITECTS is a multidisciplinary architecture and engineering consultancy headquartered in Abu Dhabi. We deliver innovative, functional, and sustainable spaces across the UAE and the wider GCC region.
              </p>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: 32 }}>
                Our work spans residential villas, commercial towers, urban masterplans, and interior fit-outs — always guided by a commitment to technical excellence and design integrity. Every project is a collaboration between our team's deep expertise and our clients' vision.
              </p>
              {/* Arabic */}
              <p style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.85, direction: "rtl", marginBottom: 32 }}>
                أرشراي للعمارة والاستشارات الهندسية — شركة متعددة التخصصات تقدم حلولاً معمارية وهندسية مبتكرة ومستدامة في جميع أنحاء الإمارات ومنطقة الخليج العربي.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["Design Excellence","Sustainable Practice","Technical Precision","Client-Centered"].map(tag => (
                  <span key={tag} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.gold, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.22)", borderRadius: 4, padding: "5px 12px" }}>{tag}</span>
                ))}
              </div>
            </RevealSection>

            {/* Right: Values grid */}
            <RevealSection>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "◈", title: "Creative Vision", desc: "We push beyond convention — every design begins with a bold idea grounded in purpose." },
                  { icon: "◎", title: "Precision Craft", desc: "Our technical rigor ensures every drawing, detail, and specification is executed flawlessly." },
                  { icon: "◉", title: "Sustainability", desc: "Environmental responsibility is embedded at every stage of our design and construction process." },
                  { icon: "◇", title: "Partnership", desc: "We build long-term relationships, treating every client's project as our own life's work." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "22px 18px" }}>
                    <div style={{ fontSize: 22, color: C.gold, marginBottom: 10 }}>{icon}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 12, color: C.white, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ═════════════════ */}
      <section id="services" style={{ ...sec, background: "#0a1d34" }}>
        <div style={inner}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <GoldLabel text="Our Services" />
              <SectionTitle>What We Offer</SectionTitle>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.42)", maxWidth: 520, margin: "0 auto" }}>
                From concept to completion, we deliver end-to-end architectural and engineering services across every typology.
              </p>
            </div>
          </RevealSection>
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              <ServiceCard delay={0}   icon="▲" title="Architecture & Design" desc="From residential villas to commercial towers — we craft buildings that balance aesthetic ambition with constructability, local context, and long-term performance." />
              <ServiceCard delay={60}  icon="◈" title="Interior Design" desc="We design interiors that feel inevitable — spaces where materials, light, and proportion work in harmony to create environments that enrich everyday life." />
              <ServiceCard delay={120} icon="◎" title="Engineering Consultancy" desc="Structural, MEP, and civil engineering delivered with precision. Our integrated consultancy model reduces coordination risk and accelerates project timelines." />
              <ServiceCard delay={0}   icon="⊞" title="Urban Planning" desc="We contribute to the fabric of cities — masterplans, mixed-use developments, and public realm strategies that foster community and sustainable growth." />
              <ServiceCard delay={60}  icon="◉" title="Project Management" desc="We oversee the entire lifecycle from feasibility to handover, ensuring projects are delivered on time, within budget, and to the highest quality standards." />
              <ServiceCard delay={120} icon="◇" title="Sustainable Design" desc="LEED and BREEAM-informed practice. We integrate passive design strategies, renewable energy systems, and material efficiency into every project." />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════ PROJECTS ═════════════════ */}
      <section id="projects" style={{ ...sec, background: C.navyDark }}>
        <div style={inner}>
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <GoldLabel text="Our Work" />
                <SectionTitle>Selected Projects</SectionTitle>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 440 }}>
                  A curated selection of our architecture, interior, and planning projects across the UAE and GCC.
                </p>
              </div>
              <button style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 6, padding: "10px 22px", fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: C.gold, cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                VIEW ALL PROJECTS
              </button>
            </div>
          </RevealSection>
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              <ProjectCard title="Saadiyat Villa Compound"   type="RESIDENTIAL" location="Abu Dhabi, UAE" year="2025" accent="#1a3a5c" />
              <ProjectCard title="Al Reem Island Tower"      type="COMMERCIAL"  location="Abu Dhabi, UAE" year="2024" accent="#1e2e44" />
              <ProjectCard title="Desert Rose Residence"     type="RESIDENTIAL" location="Dubai, UAE"     year="2024" accent="#2a2010" />
              <ProjectCard title="Diplomatic Quarter Office" type="COMMERCIAL"  location="Riyadh, KSA"   year="2023" accent="#0a2a3a" />
              <ProjectCard title="Lusail Waterfront Plaza"   type="URBAN"       location="Doha, Qatar"   year="2023" accent="#10283a" />
              <ProjectCard title="Cairo Business District"   type="MASTERPLAN"  location="Cairo, Egypt"  year="2022" accent="#1a2818" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════ PROCESS BAND ═════════════ */}
      <div style={{ background: C.navyLight, borderTop: `1px solid rgba(212,175,55,0.1)`, borderBottom: `1px solid rgba(212,175,55,0.1)`, padding: "56px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <GoldLabel text="Our Process" />
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.5vw,30px)", color: C.white }}>How We Work</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
              {[
                { num: "01", title: "Discovery",     desc: "We listen deeply — understanding your vision, constraints, brief, and aspirations." },
                { num: "02", title: "Concept",       desc: "Bold conceptual ideas, tested against the site, program, and client values." },
                { num: "03", title: "Design",        desc: "Detailed design development — architecture, interiors, and engineering integrated." },
                { num: "04", title: "Documentation", desc: "Complete construction documentation and authority approvals managed end-to-end." },
                { num: "05", title: "Delivery",      desc: "Site supervision, quality control, and handover — we stay until it's perfect." },
              ].map(({ num, title, desc }) => (
                <div key={num} style={{ textAlign: "center", padding: "16px 12px" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 36, color: "rgba(212,175,55,0.18)", lineHeight: 1, marginBottom: 10 }}>{num}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 12, color: C.white, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{desc}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>

      {/* ══════════════════ TEAM ═════════════════════ */}
      <section id="team" style={{ ...sec, background: "#0a1d34" }}>
        <div style={inner}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <GoldLabel text="Our Team" />
              <SectionTitle>The Minds Behind ARCHRAY</SectionTitle>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto" }}>
                A team of passionate architects, engineers, and designers united by a shared commitment to excellence.
              </p>
            </div>
          </RevealSection>
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
              <TeamCard name="Albashir Elamin"     nameAr="البشير الأمين"       role="Architectural Engineer"  roleAr="مهندس معماري"           initials="AE" />
              <TeamCard name="Sara Al Mazrouei"    nameAr="سارة المزروعي"       role="Senior Designer"         roleAr="مصممة معمارية أولى"      initials="SM" />
              <TeamCard name="Khalid Al Rashidi"   nameAr="خالد الراشدي"        role="Structural Engineer"     roleAr="مهندس إنشائي"            initials="KR" />
              <TeamCard name="Noor Bint Hamdan"    nameAr="نور بنت حمدان"       role="Interior Designer"       roleAr="مصممة داخلية"            initials="NH" />
            </div>
          </RevealSection>

          {/* Careers CTA */}
          <RevealSection style={{ marginTop: 64 }}>
            <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 12, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 3, color: C.gold, marginBottom: 8 }}>JOIN THE TEAM</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 22, color: C.white, marginBottom: 8 }}>We're always looking for exceptional talent.</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Architects, engineers, and designers who share our passion for precision.</div>
              </div>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: C.gold, border: "none", borderRadius: 8, padding: "13px 28px", fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.navy, cursor: "pointer", flexShrink: 0 }}
              >
                GET IN TOUCH
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" style={{ ...sec, background: C.navyDark }}>
        <div style={inner}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <GoldLabel text="Contact Us" />
              <SectionTitle>Start Your Project</SectionTitle>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.42)", maxWidth: 460, margin: "0 auto" }}>
                Ready to transform your vision into reality? Let's talk about your project.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            {/* Contact info */}
            <RevealSection>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2.5, color: C.gold, marginBottom: 20 }}>GET IN TOUCH</div>
                {[
                  { icon: "✉", label: "EMAIL", value: "albashir@archray.ae" },
                  { icon: "✆", label: "PHONE", value: "+971 50 123 4567" },
                  { icon: "⊕", label: "WEBSITE", value: "www.archray.ae" },
                  { icon: "⌖", label: "ADDRESS", value: "Abu Dhabi, United Arab Emirates" },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: 36, height: 36, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 14, color: C.gold }}>{icon}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: C.white }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arabic contact */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px 22px", direction: "rtl", textAlign: "right" }}>
                <div style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 700, fontSize: 11, color: C.gold, marginBottom: 8, letterSpacing: 1 }}>تواصل معنا</div>
                <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                  نرحب بمشاريعك وأفكارك — فريقنا المعماري جاهز للاستماع إليك وتحويل رؤيتك إلى واقع.<br />
                  <span style={{ color: C.gold }}>albashir@archray.ae</span>
                </div>
              </div>
            </RevealSection>

            {/* Form */}
            <RevealSection>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "36px 32px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2.5, color: C.gold, marginBottom: 24 }}>SEND US A MESSAGE</div>
                <ContactForm />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background: "#060f1c", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "60px 40px 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom: 18 }}>
                <ArchrayLogo size={46} onDark />
              </div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.85, maxWidth: 260, marginTop: 16 }}>
                A multidisciplinary architecture and engineering consultancy. Creating spaces that inspire and endure.
              </p>
              <p style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.22)", lineHeight: 1.85, direction: "rtl", marginTop: 8 }}>
                أرشراي للعمارة والاستشارات الهندسية
              </p>
            </div>
            {/* Services */}
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 3, color: C.gold, marginBottom: 18 }}>SERVICES</div>
              {["Architecture","Interior Design","Engineering","Urban Planning","Project Management","Sustainability"].map(s => (
                <div key={s} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", padding: "4px 0", cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.38)"; }}
                >{s}</div>
              ))}
            </div>
            {/* Company */}
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 3, color: C.gold, marginBottom: 18 }}>COMPANY</div>
              {["About Us","Our Projects","Our Team","Careers","News","Contact"].map(s => (
                <div key={s} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", padding: "4px 0", cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.38)"; }}
                >{s}</div>
              ))}
            </div>
            {/* Contact */}
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 3, color: C.gold, marginBottom: 18 }}>CONTACT</div>
              {[
                { icon: "✆", text: "+971 50 123 4567" },
                { icon: "✉", text: "albashir@archray.ae" },
                { icon: "⊕", text: "www.archray.ae" },
                { icon: "⌖", text: "Abu Dhabi, UAE" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "4px 0" }}>
                  <span style={{ fontSize: 10, color: C.gold, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArchrayIcon size={16} onDark />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: 3, color: C.gold }}>ARCHRAY</span>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.15)", letterSpacing: 2 }}>ARCHITECTS</span>
            </div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
              © 2026 ARCHRAY ARCHITECTS · Abu Dhabi, UAE · All Rights Reserved
            </div>
            <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.15)", direction: "rtl" }}>
              حقوق الملكية محفوظة · أرشراي للعمارة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
