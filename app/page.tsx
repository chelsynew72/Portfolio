"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  emoji: string;
  live?: string;
  github?: string;
  origin?: boolean;
}

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface AnimatedBarProps {
  level: number;
  color: string;
  inView: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = ["About", "Projects", "Skills", "Contact"];

const PROJECTS: Project[] = [
  {
    title: "E-Commerce App",
    desc: "A full-stack shopping platform with cart, auth & payments.",
    tags: ["Next.js", "NestJS", "Stripe"],
    gradient: "rgba(244,63,94,0.8), rgba(168,85,247,0.8)",
    emoji: "🛒",
  },
  {
    title: "Weather Dashboard",
    desc: "Real-time weather with beautiful animated charts and Vue components.",
    tags: ["Vue.js", "Chart.js", "API"],
    gradient: "rgba(34,211,238,0.8), rgba(59,130,246,0.8)",
    emoji: "🌤️",
  },
  {
    title: "Task Manager",
    desc: "Drag & drop task board with team collaboration.",
    tags: ["React", "NestJS", "Firebase"],
    gradient: "rgba(139,92,246,0.8), rgba(168,85,247,0.8)",
    emoji: "✅",
  },
  {
    title: "Mobile Fitness App",
    desc: "Cross-platform fitness tracker with workout logging & progress charts.",
    tags: ["React Native", "Expo", "TypeScript"],
    gradient: "rgba(251,146,60,0.8), rgba(244,63,94,0.8)",
    emoji: "💪",
  },
  {
    title: "Social Feed App",
    desc: "Mobile-first social platform with real-time updates and notifications.",
    tags: ["React Native", "NestJS", "Socket.io"],
    gradient: "rgba(52,211,153,0.8), rgba(16,185,129,0.8)",
    emoji: "📱",
  },
  {
    title: "Admin Dashboard",
    desc: "Responsive admin panel with analytics, charts & role-based access.",
    tags: ["Vue.js", "Tailwind", "NestJS"],
    gradient: "rgba(99,102,241,0.8), rgba(168,85,247,0.8)",
    emoji: "📊",
  },
  {
    title: "SkyWatch Weather App",
    desc: "Where the journey started 🌱 Advanced weather app with live API, rain & snow animations, AQI, 5-day forecast & GPS location.",
    tags: ["HTML", "CSS", "JavaScript", "OpenWeatherMap"],
    gradient: "rgba(14,165,233,0.8), rgba(6,182,212,0.8)",
    emoji: "🌦️",
    live: "https://serene-piroshki-3e359e.netlify.app/",
    github: "https://github.com/chelsynew72/SkyWatch",
    origin: true,
  },
];

const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 80, color: "#38bdf8" },
  { name: "Vue.js", level: 72, color: "#4ade80" },
  { name: "React Native", level: 70, color: "#fb7185" },
  { name: "NestJS", level: 68, color: "#f97316" },
  { name: "TypeScript", level: 75, color: "#a78bfa" },
  { name: "JavaScript", level: 85, color: "#facc15" },
  { name: "Tailwind CSS", level: 90, color: "#c084fc" },
  { name: "Node.js", level: 70, color: "#34d399" },
  { name: "Git & GitHub", level: 75, color: "#60a5fa" },
];

const FAMILIAR: string[] = [
  "REST APIs", "GraphQL", "MongoDB", "PostgreSQL",
  "Expo", "Pinia", "Vuex", "Redux",
  "Docker basics", "Figma", "Vercel", "Testing"
];

const SOCIALS: [string, string][] = [
  ["GitHub", "🐙"],
  ["LinkedIn", "💼"],
  ["Twitter", "🐦"],
];

// ─── Components ───────────────────────────────────────────────────────────────

function AnimatedBar({ level, color, inView }: AnimatedBarProps) {
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div
        style={{
          width: inView ? `${level}%` : "0%",
          backgroundColor: color,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          height: "100%",
          borderRadius: "9999px",
          boxShadow: `0 0 12px ${color}99`,
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState<string>("About");
  const [skillsInView, setSkillsInView] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  const skillsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsInView(true); },
      { threshold: 0.3 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (): void => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ): void => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#0d0d14", minHeight: "100vh", color: "#f0f0f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d14; }
        ::-webkit-scrollbar-thumb { background: #a855f7; border-radius: 4px; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gradient-shift {
          0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
        }
        .hero-gradient {
          background: linear-gradient(135deg, #f43f5e, #a855f7, #3b82f6, #10b981);
          background-size: 300% 300%;
          animation: gradient-shift 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .blob { animation: float 6s ease-in-out infinite; }
        .blob2 { animation: float 8s ease-in-out infinite 2s; }
        .ring-spin { animation: spin-slow 20s linear infinite; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px) rotate(-1deg); box-shadow: 0 20px 60px rgba(168,85,247,0.3); }
        .nav-pill { transition: all 0.25s ease; }
        .nav-pill:hover { background: rgba(168,85,247,0.15); }
        .skill-row { transition: transform 0.2s; }
        .skill-row:hover { transform: translateX(6px); }
        .btn-main {
          background: linear-gradient(135deg,#a855f7,#3b82f6);
          border: none; cursor: pointer; color: white; font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-main:hover { transform: scale(1.04); box-shadow: 0 8px 30px rgba(168,85,247,0.5); }
        .tag { display:inline-block; padding:3px 10px; border-radius:999px; font-size:11px; font-weight:600; }
        input, textarea { outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        input:focus, textarea:focus { border-color: #a855f7 !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.2); }
        @media(max-width:640px){ .hero-name{font-size:2.6rem!important} .two-col{grid-template-columns:1fr!important} }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 40 ? "rgba(13,13,20,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        transition: "background 0.4s",
        borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        padding: "14px 5%", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-1px" }}>
          <span className="hero-gradient">dev</span>
          <span style={{ color: "#f0f0f0" }}>folio</span>
          <span style={{ color: "#a855f7" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setActive(link)}
              className="nav-pill"
              style={{
                padding: "8px 20px", borderRadius: 999, fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", textDecoration: "none",
                background: active === link ? "linear-gradient(135deg,#a855f7,#3b82f6)" : "transparent",
                color: active === link ? "white" : "#aaa",
              }}>
              {link}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-main"
          style={{ padding: "10px 24px", borderRadius: 999, fontSize: "0.85rem", textDecoration: "none" }}>
          Hire Me ✨
        </a>
      </nav>

      {/* ── Hero / About ── */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 5% 60px", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ position: "absolute", top: "10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.25),transparent 70%)", pointerEvents: "none" }} />
        <div className="blob2" style={{ position: "absolute", bottom: "5%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.2),transparent 70%)", pointerEvents: "none" }} />
        <div className="ring-spin" style={{ position: "absolute", top: "20%", right: "10%", width: 180, height: 180, borderRadius: "50%", border: "2px dashed rgba(168,85,247,0.3)" }} />

        <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg,#f43f5e,#a855f7,#3b82f6)", padding: 3, margin: "0 auto" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                👨‍💻
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: "#22c55e", border: "3px solid #0d0d14" }} />
          </div>

          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 999, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.4)", fontSize: "0.82rem", fontWeight: 600, color: "#c084fc", marginBottom: 24, letterSpacing: 1 }}>
            🚀 AVAILABLE FOR WORK
          </div>

          <h1 className="hero-name" style={{ fontSize: "4.5rem", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 16 }}>
            Hi, I&apos;m <span className="hero-gradient">Ameah Tem Chelsy</span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "#9ca3af", fontFamily: "'DM Sans',sans-serif", maxWidth: 560, margin: "0 auto 24px", lineHeight: 1.7 }}>
            Junior developer building beautiful web & mobile experiences with{" "}
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>React</span>,{" "}
            <span style={{ color: "#4ade80", fontWeight: 600 }}>Vue</span>,{" "}
            <span style={{ color: "#fb7185", fontWeight: 600 }}>React Native</span> &{" "}
            <span style={{ color: "#f97316", fontWeight: 600 }}>NestJS</span>.
          </p>

          {/* Tech stack badges */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            {[
              { label: "⚛️ React / Next.js", color: "#38bdf8" },
              { label: "💚 Vue.js", color: "#4ade80" },
              { label: "📱 React Native", color: "#fb7185" },
              { label: "🔧 NestJS", color: "#f97316" },
              { label: "🔷 TypeScript", color: "#a78bfa" },
            ].map(({ label, color }) => (
              <span key={label} style={{
                padding: "6px 16px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 700,
                background: `${color}18`, border: `1px solid ${color}55`, color
              }}>{label}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
            {([["6+", "Projects"], ["1+", "Years Coding"], ["4", "Frameworks"], ["∞", "Curiosity"]] as [string, string][]).map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }} className="hero-gradient">{val}</div>
                <div style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: 500, letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#projects" className="btn-main" style={{ padding: "14px 32px", borderRadius: 999, fontSize: "0.95rem", textDecoration: "none" }}>
              View My Work 🎨
            </a>
            <a href="#contact" style={{ padding: "14px 32px", borderRadius: 999, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", color: "#d1d5db", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              Contact Me 📬
            </a>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#a855f7", letterSpacing: 3, marginBottom: 12 }}>MY WORK</div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1.5px" }}>
            Featured <span className="hero-gradient">Projects</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="card-hover" style={{
              background: p.origin ? "rgba(14,165,233,0.07)" : "rgba(255,255,255,0.04)",
              border: p.origin ? "1px solid rgba(14,165,233,0.35)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, overflow: "hidden", position: "relative"
            }}>
              {/* Origin badge */}
              {p.origin && (
                <div style={{
                  position: "absolute", top: 12, right: 12, zIndex: 2,
                  padding: "4px 12px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 800,
                  background: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
                  color: "white", letterSpacing: 0.5, boxShadow: "0 4px 16px rgba(14,165,233,0.4)"
                }}>
                  🌱 Where it started
                </div>
              )}
              <div style={{ height: 120, background: `linear-gradient(135deg,${p.gradient})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                {p.emoji}
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif", marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.tags.map(t => (
                    <span key={t} className="tag" style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-main"
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: "0.8rem", textDecoration: "none", textAlign: "center" }}>
                      Live →
                    </a>
                  ) : (
                    <button className="btn-main" style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: "0.8rem" }}>Live →</button>
                  )}
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db", textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      🐙 GitHub
                    </a>
                  ) : (
                    <button style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db" }}>GitHub</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" ref={skillsRef} style={{ padding: "100px 5%", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", letterSpacing: 3, marginBottom: 12 }}>WHAT I KNOW</div>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1.5px" }}>
              My <span className="hero-gradient">Skills</span>
            </h2>
          </div>

          {/* Category badges */}
          <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
            {[
              { label: "🌐 Frontend", color: "#38bdf8" },
              { label: "📱 Mobile", color: "#fb7185" },
              { label: "🔧 Backend", color: "#f97316" },
              { label: "🎨 Styling", color: "#c084fc" },
            ].map(({ label, color }) => (
              <span key={label} style={{ padding: "6px 16px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700, background: `${color}15`, border: `1px solid ${color}40`, color }}>{label}</span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {SKILLS.map((s, i) => (
              <div key={i} className="skill-row">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontWeight: 700 }}>{s.name}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.level}%</span>
                </div>
                <AnimatedBar level={s.level} color={s.color} inView={skillsInView} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: "0.82rem", fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>ALSO FAMILIAR WITH</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {FAMILIAR.map(t => (
                <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: "#d1d5db", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 14px" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: "100px 5%", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4ade80", letterSpacing: 3, marginBottom: 12 }}>GET IN TOUCH</div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1.5px" }}>
            Let&apos;s <span className="hero-gradient">Connect</span>
          </h2>
          <p style={{ color: "#9ca3af", marginTop: 16, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 }}>
            Open to new opportunities, freelance projects, or a friendly chat about tech. 🙌
          </p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 36px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "#9ca3af" }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {(["name", "email"] as const).map(field => (
                  <div key={field}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#9ca3af", letterSpacing: 1, display: "block", marginBottom: 8 }}>
                      {field.toUpperCase()}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={e => handleInputChange(e, field)}
                      placeholder={field === "name" ? "John Doe" : "john@email.com"}
                      style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#f0f0f0", fontSize: "0.9rem" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#9ca3af", letterSpacing: 1, display: "block", marginBottom: 8 }}>MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={e => handleInputChange(e, "message")}
                  placeholder="Hey, I'd love to work with you on..."
                  rows={5}
                  style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#f0f0f0", fontSize: "0.9rem", resize: "vertical", fontFamily: "'DM Sans',sans-serif" }}
                />
              </div>
              <button onClick={handleSubmit} className="btn-main" style={{ padding: "16px", borderRadius: 14, fontSize: "1rem" }}>
                Send Message 🚀
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 40 }}>
          {SOCIALS.map(([name, icon]) => (
            <a key={name} href="#" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
              {icon} {name}
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ textAlign: "center", padding: "32px 5%", borderTop: "1px solid rgba(255,255,255,0.06)", color: "#4b5563", fontSize: "0.85rem" }}>
        Built with ❤️ using <span style={{ color: "#38bdf8" }}>Next.js</span>,{" "}
        <span style={{ color: "#4ade80" }}>Vue</span>,{" "}
        <span style={{ color: "#f97316" }}>NestJS</span> &{" "}
        <span style={{ color: "#a78bfa" }}>TypeScript</span> · © 2026 Ameah Tem Chelsy
      </footer>
    </div>
  );
}