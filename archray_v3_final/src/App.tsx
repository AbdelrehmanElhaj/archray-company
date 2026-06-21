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
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── PRECISE ARCHRAY LOGO SVG (matches original business card) ── */
/* 
  Original: 
  - Tall A-frame with no crossbar (legs only)
  - Single gold diagonal slash from top-right to bottom-left, cutting through the A
  - Clean geometric — no fill on the A body, stroke only on dark, filled on light
*/
function ArchrayIcon({ size = 72, onDark = true }: { size?: number; onDark?: boolean }) {
  const stroke = onDark ? C.white : C.navy;
  const sw = size * 0.055;
  return (
    <svg width={size} height={size * 1.02} viewBox="0 0 100 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* A-frame: left leg */}
      <line x1="50" y1="6" x2="10" y2="96" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* A-frame: right leg */}
      <line x1="50" y1="6" x2="90" y2="96" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* Gold diagonal ray — top-right to bottom-left, cutting through the A */}
      <line
        x1="82" y1="8"
        x2="28" y2="88"
        stroke={C.gold}
        strokeWidth={sw * 0.85}
        strokeLinecap="round"
        className="anim-ray-pulse"
      />
    </svg>
  );
}

function ArchrayLogo({
  size = 72,
  onDark = true,
}: {
  size?: number;
  onDark?: boolean;
}) {
  const nameColor = onDark ? C.white : C.navy;
  const subColor  = onDark ? "rgba(255,255,255,0.42)" : "rgba(15,39,68,0.45)";
  const fs = (n: number) => size * n;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: fs(0.16) }}>
      <ArchrayIcon size={size} onDark={onDark} />
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        {/* ARCH in primary, RAY in gold */}
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: fs(0.3), letterSpacing: fs(0.055), color: nameColor }}>
          ARCH<span style={{ color: C.gold }}>RAY</span>
        </div>
        {/* flanking lines + ARCHITECTS */}
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
    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,40px)", color: light ? C.white : C.navy, margin: "0 0 40px", lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{label}</span>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: C.white, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

/* ── COLOR SWATCH ─────────────────────────────────── */
function ColorSwatch({ hex, name, rgb, cmyk, role }: { hex: string; name: string; rgb: string; cmyk?: string; role: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ cursor: "pointer", borderRadius: 10, overflow: "hidden", flex: "1 1 140px", minWidth: 130, maxWidth: 185, boxShadow: "0 6px 24px rgba(0,0,0,0.22)", transition: "transform 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ background: hex, height: 80, display: "flex", alignItems: "center", justifyContent: "center", border: hex === "#FFFFFF" ? "1px solid #E0E0E0" : "none" }}>
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, color: ["#FFFFFF","#F4F4F4"].includes(hex) ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.28)", letterSpacing: 1 }}>{copied ? "✓ COPIED" : "TAP"}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 12, color: C.white }}>{name}</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: C.gold, marginTop: 1 }}>{hex}</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>RGB {rgb}</div>
        {cmyk && <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{cmyk}</div>}
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 5, letterSpacing: 1, textTransform: "uppercase" }}>{role}</div>
      </div>
    </div>
  );
}

/* ── BUSINESS CARD ────────────────────────────────── */
function BusinessCardFront() {
  return (
    <div style={{ width: 318, height: 180, background: C.navy, borderRadius: 11, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 50px rgba(0,0,0,0.42)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {/* grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "24px 24px" }} />
      <ArchrayIcon size={40} onDark />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: 5, color: C.white }}>ARCH<span style={{ color: C.gold }}>RAY</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginTop: 4 }}>
          <div style={{ width: 18, height: 0.8, background: "rgba(255,255,255,0.25)" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, letterSpacing: 3, color: "rgba(255,255,255,0.38)" }}>ARCHITECTS</span>
          <div style={{ width: 18, height: 0.8, background: "rgba(255,255,255,0.25)" }} />
        </div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 300, fontSize: 6, letterSpacing: 2.2, color: "rgba(255,255,255,0.22)", marginTop: 6, textTransform: "uppercase" }}>WHERE VISION MEETS PRECISION</div>
      </div>
    </div>
  );
}

function BusinessCardBack({ lang = "en" }: { lang?: "en" | "ar" }) {
  const isAr = lang === "ar";
  return (
    <div style={{ width: 318, height: 180, background: C.navy, borderRadius: 11, position: "relative", overflow: "hidden", boxShadow: "0 18px 50px rgba(0,0,0,0.42)", flexShrink: 0 }}>
      {/* Gold bottom bar */}
      <div style={{ position: "absolute", bottom: 0, [isAr ? "right" : "left"]: 0, width: 160, height: 11, background: C.gold }} />
      {/* Diagonal slash SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 318 180">
        <line x1={isAr ? 158 : 160} y1="180" x2={isAr ? 130 : 188} y2="0" stroke={C.gold} strokeWidth="0.9" opacity="0.85" />
      </svg>
      {/* Wireframe building */}
      <svg style={{ position: "absolute", [isAr ? "left" : "right"]: 0, top: 0, width: "52%", height: "100%", opacity: 0.09, ...(isAr ? { transform: "scaleX(-1)" } : {}) }} viewBox="0 0 170 180">
        <rect x="25" y="48" width="120" height="118" fill="none" stroke="white" strokeWidth="0.8" />
        <rect x="38" y="62" width="20" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <rect x="68" y="62" width="20" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <rect x="98" y="62" width="20" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <rect x="38" y="98" width="20" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <rect x="68" y="98" width="20" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <rect x="58" y="22" width="46" height="26" fill="none" stroke="white" strokeWidth="0.6" />
        <line x1="25" y1="165" x2="145" y2="165" stroke="white" strokeWidth="0.6" />
        <line x1="58" y1="22" x2="25" y2="48" stroke="white" strokeWidth="0.4" />
        <line x1="104" y1="22" x2="145" y2="48" stroke="white" strokeWidth="0.4" />
      </svg>
      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 22px", direction: isAr ? "rtl" : "ltr", maxWidth: "58%" }}>
        <div style={{ fontFamily: isAr ? "'Tajawal',sans-serif" : "'Montserrat',sans-serif", fontWeight: 700, fontSize: isAr ? 12 : 11, color: C.gold, letterSpacing: isAr ? 0 : 1.2, textTransform: isAr ? "none" : "uppercase", marginBottom: 2 }}>
          {isAr ? "البشير الأمين" : "ALBASHIR ELAMIN"}
        </div>
        <div style={{ fontFamily: isAr ? "'Tajawal',sans-serif" : "'Montserrat',sans-serif", fontSize: isAr ? 8.5 : 7.5, color: "rgba(255,255,255,0.42)", letterSpacing: isAr ? 0 : 0.8, textTransform: isAr ? "none" : "uppercase", marginBottom: 12 }}>
          {isAr ? "مهندس معماري" : "ARCHITECTURAL ENGINEER"}
        </div>
        <div style={{ width: 28, height: 1, background: C.gold, marginBottom: 10, ...(isAr ? { marginRight: 0, marginLeft: "auto" } : {}) }} />
        {(isAr
          ? [["✆","‎+971 50 123 4567"],["✉","albashir@archray.ae"],["⊕","www.archray.ae"],["⌖","أبوظبي، الإمارات"]]
          : [["✆","+971 50 123 4567"],["✉","albashir@archray.ae"],["⊕","www.archray.ae"],["⌖","Abu Dhabi, UAE"]]
        ).map(([icon, text]) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, ...(isAr ? { justifyContent: "flex-end", flexDirection: "row-reverse" } : {}) }}>
            <span style={{ fontSize: 7, color: C.gold }}>{icon}</span>
            <span style={{ fontFamily: isAr ? "'Tajawal',sans-serif" : "'Montserrat',sans-serif", fontSize: isAr ? 8 : 7.5, color: "rgba(255,255,255,0.55)" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── LETTERHEAD PREVIEW ───────────────────────────── */
function LetterheadPreview() {
  return (
    <div style={{ background: C.white, borderRadius: 10, overflow: "hidden", maxWidth: 480, margin: "0 auto", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
      {/* Header zone: 0–45mm */}
      <div style={{ background: C.white, padding: "18px 22px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `2px solid ${C.gold}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ArchrayIcon size={28} onDark={false} />
          <div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 2.5, color: C.navy }}>ARCH<span style={{ color: C.gold }}>RAY</span></div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6, letterSpacing: 2.5, color: "rgba(15,39,68,0.42)" }}>— ARCHITECTS —</div>
          </div>
        </div>
        <div style={{ textAlign: "right", direction: "rtl" }}>
          <div style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 700, fontSize: 10, color: C.navy }}>أرشراي للعمارة</div>
          <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 7, color: "rgba(15,39,68,0.42)" }}>والاستشارات الهندسية</div>
        </div>
      </div>
      {/* Content zone: 55–250mm */}
      <div style={{ padding: "20px 22px", minHeight: 200 }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 2, color: "rgba(58,58,58,0.45)", marginBottom: 14 }}>21 JUNE 2026</div>
        {[95,78,60,90,72,82,45,90,68,80,52].map((w, i) => (
          <div key={i} style={{ height: 6, width: `${w}%`, background: "#E8E8E8", borderRadius: 2, marginBottom: i === 6 ? 18 : 7 }} />
        ))}
      </div>
      {/* Footer zone: 265–297mm */}
      <div style={{ background: C.lightGray, borderTop: `1.5px solid ${C.gold}`, padding: "9px 22px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {[["ADDRESS","Abu Dhabi, UAE"],["WEBSITE","www.archray.ae"],["EMAIL","info@archray.ae"],["REG. NO.","─ / UAE"]].map(([lbl,val]) => (
          <div key={lbl}>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, letterSpacing: 2, color: "rgba(58,58,58,0.4)" }}>{lbl}</div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7, color: C.darkGray, marginTop: 1 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ENVELOPE PREVIEW ─────────────────────────────── */
function EnvelopePreview() {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      {/* Front face */}
      <div style={{ background: C.white, borderRadius: 10, padding: "18px 22px", boxShadow: "0 16px 48px rgba(0,0,0,0.44)", position: "relative", minHeight: 120 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <ArchrayIcon size={22} onDark={false} />
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, color: C.navy, letterSpacing: 1.5 }}>ARCH<span style={{ color: C.gold }}>RAY</span> <span style={{ fontWeight: 400, fontSize: 8, color: C.darkGray }}>ARCHITECTS</span></div>
          </div>
          <div style={{ textAlign: "right", fontFamily: "'Montserrat',sans-serif", fontSize: 7, color: C.darkGray, lineHeight: 1.7 }}>
            Where Vision Meets Precision<br />Abu Dhabi, UAE · www.archray.ae
          </div>
        </div>
        {/* Address window */}
        <div style={{ border: "1.5px dashed rgba(15,39,68,0.22)", borderRadius: 3, width: 180, height: 44, position: "absolute", bottom: 16, left: 22, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,0.04)" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7, letterSpacing: 2, color: "rgba(15,39,68,0.25)" }}>ADDRESS WINDOW · 90×35mm</span>
        </div>
        <div style={{ height: 48 }} />
      </div>
      {/* Rear flap */}
      <div style={{ background: C.navy, borderRadius: 8, padding: "12px 22px", textAlign: "center", marginTop: 6, boxShadow: "0 8px 28px rgba(0,0,0,0.38)" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>REAR FLAP EXTERIOR · FULL-BLEED NAVY</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 8, letterSpacing: 4, color: C.gold }}>WHERE VISION MEETS PRECISION</div>
      </div>
    </div>
  );
}

/* ── FOLDER PREVIEW ───────────────────────────────── */
function FolderPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 10px 1fr", maxWidth: 600, margin: "0 auto", boxShadow: "0 22px 60px rgba(0,0,0,0.5)", borderRadius: 10, overflow: "hidden" }}>
      {/* Front cover */}
      <div style={{ background: C.navy, padding: "48px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, minHeight: 340, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", top: 14, right: 14, fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, letterSpacing: 2, color: "rgba(212,175,55,0.38)" }}>SPOT UV</div>
        <ArchrayLogo size={54} onDark />
      </div>
      {/* Spine */}
      <div style={{ background: "#0a1e36", borderLeft: "1px solid rgba(212,175,55,0.1)", borderRight: "1px solid rgba(212,175,55,0.1)" }} />
      {/* Inside back */}
      <div style={{ background: "#0c2240", padding: "24px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, letterSpacing: 2.5, color: "rgba(255,255,255,0.2)", marginBottom: 10 }}>INSIDE BACK POCKET</div>
        <div style={{ border: "1px dashed rgba(212,175,55,0.28)", borderRadius: 4, padding: "10px 12px", minHeight: 90, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ height: 4, background: "rgba(212,175,55,0.3)", borderRadius: 2, width: 88 }} />
            <div style={{ height: 4, background: "rgba(212,175,55,0.3)", borderRadius: 2, width: 88 }} />
          </div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>CARD SLOT · 92mm</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE MASTERS ────────────────────────────────── */
function Slide({ type }: { type: "cover"|"divider"|"content"|"team"|"project"|"closing" }) {
  const base: React.CSSProperties = { borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.42)", aspectRatio: "16/9", position: "relative" };
  if (type === "cover") return (
    <div style={{ ...base, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "32%", background: "rgba(212,175,55,0.04)", clipPath: "polygon(22% 0,100% 0,100% 100%,0% 100%)" }} />
      <div style={{ position: "relative", textAlign: "center" }}>
        <ArchrayIcon size={24} onDark />
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5, letterSpacing: 2.5, color: C.gold, marginTop: 5, marginBottom: 3 }}>PROJECT PROPOSAL</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, color: C.white, lineHeight: 1.3 }}>URBAN DESIGN<br />MASTERPLAN</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5, color: "rgba(255,255,255,0.35)", marginTop: 5 }}>Client Name · Abu Dhabi · June 2026</div>
      </div>
    </div>
  );
  if (type === "divider") return (
    <div style={{ ...base, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 42, color: "rgba(212,175,55,0.07)", position: "absolute", left: 10, top: 4, lineHeight: 1 }}>01</div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, letterSpacing: 3.5, color: C.gold, marginBottom: 5 }}>SECTION</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 2, color: C.white }}>ABOUT ARCHRAY</div>
        <div style={{ width: 36, height: 1.5, background: C.gold, margin: "7px auto 0" }} />
      </div>
    </div>
  );
  if (type === "content") return (
    <div style={{ ...base, background: C.white, display: "flex" }}>
      <div style={{ width: "26%", background: C.navy, padding: "10px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 5, letterSpacing: 1.5, color: C.white }}>ARCH<span style={{ color: C.gold }}>RAY</span></div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 26, color: "rgba(212,175,55,0.1)", lineHeight: 1 }}>03</div>
      </div>
      <div style={{ flex: 1, padding: "10px 12px" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8.5, letterSpacing: 1, color: C.navy, borderBottom: `1px solid ${C.gold}`, paddingBottom: 4, marginBottom: 8 }}>PROJECT UNDERSTANDING</div>
        {[90,75,88,62,80].map((w,i) => <div key={i} style={{ height: 5, width: `${w}%`, background: C.lightGray, borderRadius: 2, marginBottom: 5 }} />)}
        <div style={{ height: 38, background: C.lightGray, borderRadius: 3, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5, color: "rgba(15,39,68,0.3)", letterSpacing: 2 }}>IMAGE PLACEHOLDER</span>
        </div>
      </div>
    </div>
  );
  if (type === "team") return (
    <div style={{ ...base, background: C.white, padding: "10px 12px" }}>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 7, letterSpacing: 1.5, color: C.navy, borderBottom: `1px solid ${C.gold}`, paddingBottom: 4, marginBottom: 8 }}>OUR TEAM</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[["AE","ALBASHIR ELAMIN","Architectural Engineer"],["PM","PROJECT MANAGER","Project Management"],["ID","INTERIOR DESIGNER","Interior Design"],["SE","STRUCTURAL ENG.","Engineering"]].map(([init,name,role]) => (
          <div key={name} style={{ background: C.lightGray, borderRadius: 3, padding: "5px 7px", display: "flex", gap: 6, alignItems: "flex-start" }}>
            <div style={{ width: 20, height: 20, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, fontWeight: 700, color: C.gold }}>{init}</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 5.5, color: C.navy }}>{name}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 4.5, color: C.mid }}>{role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if (type === "project") return (
    <div style={{ ...base, background: C.navy, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6, letterSpacing: 3, color: "rgba(255,255,255,0.18)" }}>3D RENDER / PHOTOGRAPHY</span>
      </div>
      <div style={{ background: "rgba(0,0,0,0.35)", padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 7, letterSpacing: 1, color: C.white }}>VILLA COMPOUND · DUBAI</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, letterSpacing: 2, color: C.gold }}>RESIDENTIAL · 2025</div>
      </div>
    </div>
  );
  if (type === "closing") return (
    <div style={{ ...base, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 8 }}>WHERE VISION MEETS PRECISION</div>
        <div style={{ width: 30, height: 1.5, background: "rgba(212,175,55,0.4)", margin: "0 auto 8px" }} />
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, letterSpacing: 2, color: "rgba(255,255,255,0.35)" }}>www.archray.ae</div>
        <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5, letterSpacing: 1, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>info@archray.ae · Abu Dhabi, UAE</div>
      </div>
    </div>
  );
  return null;
}

/* ── NAV ──────────────────────────────────────────── */
const NAV = ["Identity","Colors","Typography","Logo","Stationery","Slides","Arabic","Grid"];

function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(9,27,48,0.94)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <ArchrayIcon size={20} onDark />
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 3, color: C.gold }}>ARCHRAY</span>
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: 2 }}>BRAND KIT</span>
      </div>
      <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {NAV.map(item => (
          <button key={item}
            onClick={() => { setActive(item); document.getElementById(item)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ background: active === item ? "rgba(212,175,55,0.1)" : "transparent", border: active === item ? "1px solid rgba(212,175,55,0.3)" : "1px solid transparent", borderRadius: 4, padding: "4px 10px", fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 1, color: active === item ? C.gold : "rgba(255,255,255,0.35)", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── MAIN APP ─────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("Identity");
  useEffect(() => {
    const ids = NAV;
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { threshold: 0.25 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const sec: React.CSSProperties = { padding: "96px 40px", background: C.navyDark };
  const inner: React.CSSProperties = { maxWidth: 1080, margin: "0 auto" };

  return (
    <div style={{ background: C.navyDark, minHeight: "100vh", fontFamily: "'Montserrat','Tajawal',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Tajawal:wght@300;400;700&display=swap');`}</style>
      <NavBar active={active} setActive={setActive} />

      {/* ══ HERO ══════════════════════════════════════ */}
      <section id="Identity" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 30% 44%, #162E50 0%, #091B30 70%)`, padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
        {/* animated grid */}
        <div className="anim-grid" style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        {/* giant ghost A */}
        <svg className="anim-float-a" style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", opacity: 0.035, pointerEvents: "none" }} width={520} height={530} viewBox="0 0 100 102" fill="none">
          <line x1="50" y1="6" x2="10" y2="96" stroke={C.gold} strokeWidth="2" />
          <line x1="50" y1="6" x2="90" y2="96" stroke={C.gold} strokeWidth="2" />
          <line x1="82" y1="8" x2="28" y2="88" stroke={C.gold} strokeWidth="1.6" />
        </svg>
        <div className="anim-fade-up" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 50, padding: "5px 16px", marginBottom: 48 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 3, color: C.gold, textTransform: "uppercase" }}>Brand Identity Guidelines — All Phases</span>
          </div>
          <div className="anim-float-a"><ArchrayLogo size={88} onDark /></div>
          <p className="anim-fade-up delay-300" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: "44px auto 0", maxWidth: 500 }}>
            A multidisciplinary architecture & engineering consultancy — creating innovative, functional, and sustainable spaces through a balance of creativity, precision, and technical excellence.
          </p>
          <div className="anim-fade-up delay-400" style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.22)", direction: "rtl", marginTop: 10 }}>
            أرشراي للعمارة والاستشارات الهندسية — حيث تلتقي الرؤية بالدقة
          </div>
          <div className="anim-fade-up delay-500" style={{ marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, letterSpacing: 3, color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>Explore Brand Kit</span>
            <div style={{ width: 1, height: 36, background: `linear-gradient(${C.gold},transparent)` }} />
          </div>
        </div>
      </section>

      {/* ══ COLORS ════════════════════════════════════ */}
      <section id="Colors" style={{ ...sec }}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 01 — Color System" />
            <SectionTitle>Brand Color Palette</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
              <ColorSwatch hex="#0F2744" name="Navy Blue" rgb="15, 39, 68" cmyk="C95 M78 Y38 K29" role="Primary · Dominant Background" />
              <ColorSwatch hex="#D4AF37" name="Prestige Gold" rgb="212, 175, 55" cmyk="C20 M30 Y95 K0 · Pantone 871C" role="Accent · Max 10% of comp" />
              <ColorSwatch hex="#FFFFFF" name="Pure White" rgb="255, 255, 255" cmyk="C0 M0 Y0 K0" role="Body copy on dark · Digital space" />
              <ColorSwatch hex="#F4F4F4" name="Light Gray" rgb="244, 244, 244" cmyk="C3 M2 Y2 K0" role="UI backgrounds · Tech tables" />
              <ColorSwatch hex="#3A3A3A" name="Dark Gray" rgb="58, 58, 58" cmyk="C0 M0 Y0 K85" role="Body text on light · Never on navy" />
            </div>
            {/* Ratio bar */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px 22px" }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 12 }}>65 : 25 : 10 Color Ratio</div>
              <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden" }}>
                <div style={{ flex: 6.5, background: C.navy }} />
                <div style={{ flex: 2.5, background: C.white }} />
                <div style={{ flex: 1, background: C.gold }} />
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                {[[C.navy,"Navy 65%"],[C.white,"White 25%"],[C.gold,"Gold 10%"]].map(([col,lbl]) => (
                  <div key={lbl as string} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: col as string, border: col === C.white ? "1px solid rgba(255,255,255,0.3)" : "none" }} />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{lbl as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ TYPOGRAPHY ════════════════════════════════ */}
      <section id="Typography" style={{ ...sec, background: "#0c1f38" }}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 01 — Typography" />
            <SectionTitle>Dual-Language Type Scale</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 32 }}>
              {/* Montserrat */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px 22px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 6 }}>ENGLISH — MONTSERRAT</div>
                {[
                  { label:"H1 · 36pt Bold +50", sample:"ARCHRAY", fs:32, fw:800 },
                  { label:"H2 · 24pt Bold +30", sample:"Vision & Precision", fs:22, fw:700 },
                  { label:"H3 · 16pt Bold +20", sample:"Architectural Design", fs:15, fw:700 },
                  { label:"Body · 10pt Regular", sample:"Creating innovative, functional, and sustainable spaces through a balance of creativity and precision.", fs:11, fw:400 },
                  { label:"Caption · 8pt +100", sample:"WHERE VISION MEETS PRECISION", fs:8, fw:600 },
                ].map(({ label, sample, fs, fw }) => (
                  <div key={label} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: Math.min(fs,28), fontWeight: fw, color: C.white, lineHeight: 1.3, letterSpacing: fs > 20 ? 3 : 0.5 }}>{sample}</div>
                  </div>
                ))}
              </div>
              {/* Tajawal */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px 22px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 6 }}>ARABIC — TAJAWAL</div>
                {[
                  { label:"H1 · 34pt Bold", sample:"أرشراي للعمارة", fs:28, fw:700 },
                  { label:"H2 · 22pt Bold", sample:"الرؤية والدقة", fs:20, fw:700 },
                  { label:"H3 · 15pt Bold", sample:"التصميم المعماري", fs:14, fw:700 },
                  { label:"Body · 10pt Regular", sample:"نقدم خدمات معمارية وهندسية عالية الجودة تجمع بين الإبداع والدقة والاحترافية مع التركيز على تحقيق تطلعات العملاء.", fs:11, fw:400 },
                  { label:"Caption · 8pt", sample:"حيث تلتقي الرؤية بالدقة", fs:9, fw:400 },
                ].map(({ label, sample, fs, fw }) => (
                  <div key={label} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", direction: "rtl", textAlign: "right" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5, marginBottom: 4, direction: "ltr", textAlign: "left" }}>{label}</div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: Math.min(fs,26), fontWeight: fw, color: C.white, lineHeight: 1.5 }}>{sample}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ LOGO ══════════════════════════════════════ */}
      <section id="Logo" style={sec}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 01 — Logo System" />
            <SectionTitle>Logo Variations & Rules</SectionTitle>
            {/* 4 variants */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 40 }}>
              {[
                { bg: C.navy, label: "Primary — On Navy", border: false, onDark: true },
                { bg: C.white, label: "On White", border: true, onDark: false },
                { bg: C.lightGray, label: "On Light Gray", border: true, onDark: false },
                { bg: C.gold, label: "On Gold", border: false, onDark: true },
              ].map(({ bg, label, border, onDark }) => (
                <div key={label}>
                  <div style={{ background: bg, borderRadius: 10, padding: "32px 16px", display: "flex", alignItems: "center", justifyContent: "center", border: border ? "1px solid #DDD" : "none", minHeight: 160 }}>
                    <ArchrayLogo size={52} onDark={onDark} />
                  </div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 8, letterSpacing: 0.5 }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Icon scale */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "22px 24px", marginBottom: 28 }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 3, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 18 }}>Icon Mark — Size Scale (min 32px)</div>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
                {[72,52,38,26,18].map(s => (
                  <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <ArchrayIcon size={s} onDark />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.28)" }}>{s}px</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Do/Don't */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 10 }}>
              {[
                { type:"do", label:"Maintain 2× clear space", desc:"Keep 2× 'ARCH' height clearance on all sides at all times." },
                { type:"do", label:"Use approved backgrounds only", desc:"Navy, white, light gray, or gold — nothing else." },
                { type:"do", label:"RAY always in gold", desc:"The word RAY and the diagonal slash must remain #D4AF37." },
                { type:"do", label:"Minimum 35mm / 160px", desc:"Print min 35mm wide. Digital min 160px. Favicon: 32px icon only." },
                { type:"dont", label:"Never distort the A geometry", desc:"Lock aspect ratio — no stretching, skewing, or rotating." },
                { type:"dont", label:"Never swap ARCH and RAY colors", desc:"ARCH must never be gold. RAY must never be navy." },
                { type:"dont", label:"No effects on logo", desc:"No shadows, glows, gradients, or outlines on the mark." },
                { type:"dont", label:"No busy photo backgrounds", desc:"Always use a solid color block or overlay before placing." },
              ].map(({ type, label, desc }, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", borderRadius: 8, background: type === "do" ? "rgba(212,175,55,0.05)" : "rgba(255,60,60,0.04)", border: `1px solid ${type === "do" ? "rgba(212,175,55,0.16)" : "rgba(255,80,80,0.16)"}` }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: type === "do" ? C.gold : "#EE4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: "#fff" }}>{type === "do" ? "✓" : "✕"}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, color: type === "do" ? C.gold : "#CC3333", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ STATIONERY ════════════════════════════════ */}
      <section id="Stationery" style={{ ...sec, background: "#0a1d34" }}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 02 — Print Collateral" />
            <SectionTitle>Stationery Suite</SectionTitle>

            {/* Business Cards */}
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>Business Card · 90×55mm · 400gsm Cotton · Ultra-Matte</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>SIDE A — UNIVERSAL FRONT</div>
                <BusinessCardFront />
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>SIDE B — ENGLISH</div>
                <BusinessCardBack lang="en" />
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>SIDE B — ARABIC RTL</div>
                <BusinessCardBack lang="ar" />
              </div>
            </div>
            {/* Card specs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 56 }}>
              {[
                { title: "DIMENSIONS", rows: [["Finished","90 × 55 mm"],["With bleed","96 × 61 mm"],["Safe area","82 × 47 mm"],["Margin","4.0 mm"]] },
                { title: "MATERIAL", rows: [["Stock","400gsm cotton"],["Surface","Ultra-matte"],["A icon","Blind deboss"],["RAY text","Gold foil stamp"]] },
                { title: "SLASH GEOMETRY", rows: [["Line weight","0.75pt"],["Start (bottom)","X: 45mm"],["End (top)","X: 52mm"],["Gold bar","3mm × 45mm"]] },
              ].map(({ title, rows }) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "18px 16px" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 12 }}>{title}</div>
                  {rows.map(([k,v]) => <SpecRow key={k} label={k} value={v} />)}
                </div>
              ))}
            </div>

            {/* Letterhead */}
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>A4 Letterhead · 210×297mm · 120gsm Bond</div>
            <LetterheadPreview />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20, marginBottom: 56 }}>
              {[
                { title:"HEADER ZONE", dim:"0–45mm", desc:"Logo X:15mm Y:15mm, width 42mm. Arabic lockup top-right at X:195mm. 2pt Gold bottom border." },
                { title:"CONTENT ZONE", dim:"55–250mm", desc:"Margins 18mm. Gutter (bind) 28mm. 10pt Montserrat/Tajawal Regular, #3A3A3A, 1.25 line spacing." },
                { title:"FOOTER ZONE", dim:"265–297mm", desc:"12mm Light Gray strip. 1.5pt Gold top border. 4-column contact grid, 7pt Dark Gray." },
              ].map(({ title, dim, desc }) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "18px 16px" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8.5, letterSpacing: 2.5, color: C.gold, marginBottom: 3 }}>{title}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily2: "monospace", marginBottom: 10 }}>{dim}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* Envelope */}
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>DL Envelope · 220×110mm · Executive Square Flap</div>
            <EnvelopePreview />
            <div style={{ height: 40 }} />

            {/* Folder */}
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>Presentation Folder · 440×310mm Flat · Spot UV</div>
            <FolderPreview />
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
              {[["3mm","1–25 sheets"],["5mm","26–60 sheets"],["10mm","60+ / manuals"]].map(([w,cap]) => (
                <div key={w} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "14px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 18, color: C.gold }}>{w}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>SPINE</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{cap}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ SLIDE MASTERS ═════════════════════════════ */}
      <section id="Slides" style={sec}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 04 — Presentation" />
            <SectionTitle>Slide Master System</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 16 }}>
              {(["cover","divider","content","team","project","closing"] as const).map((type, i) => (
                <div key={type}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, letterSpacing: 2.5, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
                    {["01 COVER","02 SECTION DIVIDER","03 CONTENT LAYOUT","04 TEAM PROFILE","05 PROJECT SHOWCASE","06 CLOSING"][i]}
                  </div>
                  <Slide type={type} />
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ ARABIC ════════════════════════════════════ */}
      <section id="Arabic" style={{ ...sec, background: "#0a1d34" }}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 05 — Arabic Adaptation" />
            <SectionTitle>RTL Brand System</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
              {/* Stacked bilingual */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>STACKED BILINGUAL LOCKUP</div>
                <div style={{ background: C.navy, borderRadius: 8, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <ArchrayIcon size={36} onDark />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 4, color: C.white }}>ARCH<span style={{ color: C.gold }}>RAY</span></div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.65)", direction: "rtl", marginTop: 5 }}>أرشراي للعمارة</div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)", direction: "rtl" }}>والاستشارات الهندسية</div>
                  </div>
                </div>
              </div>
              {/* Side-by-side */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>SIDE-BY-SIDE LOCKUP</div>
                <div style={{ background: C.navy, borderRadius: 8, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: 3, color: C.white }}>ARCH<span style={{ color: C.gold }}>RAY</span></div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6.5, letterSpacing: 3, color: "rgba(255,255,255,0.38)" }}>ARCHITECTS</div>
                  </div>
                  <div style={{ width: 1, height: 30, background: "rgba(212,175,55,0.4)" }} />
                  <div style={{ textAlign: "right", direction: "rtl" }}>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 700, fontSize: 12, color: C.white }}>أرشراي</div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 7.5, color: "rgba(255,255,255,0.38)" }}>للعمارة والاستشارات</div>
                  </div>
                </div>
              </div>
              {/* Tajawal/Montserrat pairing */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>TYPEFACE PAIRING</div>
                {[
                  { en: "ARCHRAY", ar: "أرشراي", label: "H1 BOLD" },
                  { en: "Architecture", ar: "العمارة", label: "H2 BOLD" },
                  { en: "Body text here in regular weight", ar: "نص الجسم بالوزن العادي", label: "BODY" },
                ].map(({ en, ar, label }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: label !== "BODY" ? 700 : 400, fontSize: label === "H1 BOLD" ? 15 : label === "H2 BOLD" ? 12 : 10, color: C.white }}>{en}</div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>{label}</div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: label !== "BODY" ? 700 : 400, fontSize: label === "H1 BOLD" ? 16 : label === "H2 BOLD" ? 13 : 10, color: C.white, direction: "rtl" }}>{ar}</div>
                  </div>
                ))}
              </div>
              {/* RTL rules */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>RTL DESIGN RULES</div>
                {[
                  "Mirror gold slash: cuts from bottom-right up to top-left on Arabic layouts",
                  "Gold bar shifts to bottom-right corner on Arabic business card side",
                  "Wireframe illustration mirrors to left half when direction is RTL",
                  "Tajawal sizes run 1–2pt larger than Montserrat for equal optical weight",
                  "Icons stay on the Arabic speaker's natural reading start (right side)",
                  "Never mix text direction within a single text block — use separate elements",
                ].map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{rule}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ GRID SYSTEM ═══════════════════════════════ */}
      <section id="Grid" style={sec}>
        <div style={inner}>
          <RevealSection>
            <GoldLabel text="Phase 01 — Grid & Spacing" />
            <SectionTitle>Modular Layout System</SectionTitle>
            {/* 12-col visual */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px", marginBottom: 28 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ height: 36, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.14)", borderRadius: 3 }} />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 28 }}>
              {[["8px","Digital base unit"],["4mm","Print base unit"],["12","Column grid"],["1280px","Max container"],["24px","Column gutter"],["80px","Section padding"]].map(([val,lbl]) => (
                <div key={lbl} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "18px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 20, color: C.gold }}>{val}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════ */}
      <footer style={{ background: C.navyDark, padding: "60px 40px 44px", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 44 }}>
            <div style={{ flex: "1 1 260px" }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>QUICK REFERENCE</div>
              {[["Primary","#0F2744 — Navy Blue"],["Accent","#D4AF37 — Prestige Gold"],["White","#FFFFFF"],["Light Gray","#F4F4F4"],["Dark Gray","#3A3A3A"],["English Font","Montserrat Bold/Regular"],["Arabic Font","Tajawal Bold/Regular"],["Tagline EN","Where Vision Meets Precision"],["Tagline AR","حيث تلتقي الرؤية بالدقة"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 10, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ width: 110, fontFamily: "'Montserrat',sans-serif", fontSize: 9.5, color: "rgba(255,255,255,0.28)", flexShrink: 0 }}>{k}</span>
                  <span style={{ fontFamily: k === "Tagline AR" ? "'Tajawal',sans-serif" : "'Montserrat',sans-serif", fontSize: 9.5, color: C.white, fontWeight: 600, direction: k === "Tagline AR" ? "rtl" : "ltr" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 8, letterSpacing: 3, color: C.gold, marginBottom: 16 }}>CONTACT</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, color: C.white, marginBottom: 3 }}>Albashir Elamin</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>Architectural Engineer</div>
              {["albashir@archray.ae","www.archray.ae","Abu Dhabi, UAE"].map(t => (
                <div key={t} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.42)", padding: "4px 0" }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArchrayIcon size={18} onDark />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 3, color: C.gold }}>ARCHRAY</span>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8.5, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>ARCHITECTS</span>
            </div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
              Brand Identity Kit v3.0 · Phases 01–05 Complete · June 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
