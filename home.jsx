import { useState, useEffect, useRef } from "react";

// ── Styles ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0b;
    --paper: #f6f3ec;
    --surface: #ffffff;
    --cream: #edeae0;
    --teal: #0f6e56;
    --teal-mid: #1d9e75;
    --teal-bg: #e1f5ee;
    --muted: #6b6860;
    --border: rgba(15,14,11,0.1);
    --gold: #b8860b;
    --warn-bg: #faeeda;
    --warn-text: #633806;
    --danger-bg: #fcebeb;
    --danger-text: #791f1f;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.6;
  }

  /* ── Navbar ── */
  .le-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(246,243,236,0.94);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem;
  }
  .le-nav-brand {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Lora', serif; font-weight: 700; font-size: 1.15rem;
    color: var(--ink); text-decoration: none; cursor: pointer;
  }
  .le-nav-brand svg { width: 20px; height: 20px; }
  .le-nav-links { display: flex; align-items: center; gap: 2rem; }
  .le-nav-links a {
    font-size: 0.875rem; color: var(--muted);
    text-decoration: none; transition: color 0.15s; cursor: pointer;
  }
  .le-nav-links a:hover { color: var(--ink); }
  .le-nav-btn {
    background: var(--ink); color: #fff; border: none;
    padding: 9px 20px; border-radius: 8px;
    font-size: 0.875rem; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.15s;
  }
  .le-nav-btn:hover { background: var(--teal); }

  /* ── Hero ── */
  .le-hero {
    max-width: 1200px; margin: 0 auto;
    padding: 6rem 2.5rem 5rem;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: center;
  }
  .le-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--teal-bg); color: var(--teal);
    font-size: 0.74rem; font-weight: 500; letter-spacing: 0.03em;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 1.5rem;
  }
  .le-badge-dot { width: 6px; height: 6px; background: var(--teal-mid); border-radius: 50%; }
  .le-hero h1 {
    font-family: 'Lora', serif; font-weight: 700;
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    line-height: 1.12; letter-spacing: -0.025em; margin-bottom: 1.25rem;
  }
  .le-hero h1 em { font-style: italic; color: var(--teal); }
  .le-hero-sub {
    font-size: 1.05rem; color: var(--muted);
    line-height: 1.75; font-weight: 300;
    max-width: 480px; margin-bottom: 2rem;
  }
  .le-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .le-btn-primary {
    background: var(--ink); color: #fff; border: none;
    padding: 12px 24px; border-radius: 8px;
    font-size: 0.95rem; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.15s;
  }
  .le-btn-primary:hover { background: var(--teal); }
  .le-btn-secondary {
    background: transparent; color: var(--ink);
    border: 1px solid var(--border);
    padding: 12px 24px; border-radius: 8px;
    font-size: 0.95rem; font-weight: 400;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .le-btn-secondary:hover { background: var(--cream); }
  .le-trust { display: flex; align-items: center; gap: 1.25rem; margin-top: 1.75rem; flex-wrap: wrap; }
  .le-trust-item { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--muted); }
  .le-trust-check {
    width: 16px; height: 16px; background: var(--teal-bg);
    border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .le-trust-check svg { width: 8px; height: 8px; }

  /* ── Demo Card ── */
  .le-demo-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
    box-shadow: 0 4px 32px rgba(15,14,11,0.08);
  }
  .le-demo-bar {
    background: var(--cream); border-bottom: 1px solid var(--border);
    padding: 10px 14px; display: flex; align-items: center; gap: 6px;
  }
  .le-dot { width: 11px; height: 11px; border-radius: 50%; }
  .le-dot-r { background: #ff6059; }
  .le-dot-y { background: #ffbe2e; }
  .le-dot-g { background: #27c840; }
  .le-demo-file { font-size: 0.74rem; color: var(--muted); margin-left: auto; }
  .le-demo-cols { display: grid; grid-template-columns: 1fr 1fr; }
  .le-demo-col { padding: 1.4rem; }
  .le-demo-col:first-child { border-right: 1px solid var(--border); }
  .le-demo-label {
    font-size: 0.67rem; letter-spacing: 0.09em; font-weight: 500;
    color: var(--muted); text-transform: uppercase; margin-bottom: 0.65rem;
  }
  .le-legal-text { font-size: 0.75rem; color: #bbb; line-height: 1.75; }
  .le-legal-text mark { background: rgba(184,134,11,0.16); color: #aaa; padding: 1px 3px; border-radius: 2px; }
  .le-plain-text { font-size: 0.8rem; color: var(--ink); line-height: 1.7; }
  .le-risk-tag {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--warn-bg); color: var(--warn-text);
    font-size: 0.67rem; font-weight: 500;
    padding: 3px 9px; border-radius: 100px; margin-right: 4px; margin-bottom: 0.6rem;
  }
  .le-risk-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .le-risk-tag-danger {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--danger-bg); color: var(--danger-text);
    font-size: 0.67rem; font-weight: 500;
    padding: 3px 9px; border-radius: 100px; margin-bottom: 0.6rem;
  }

  /* ── Stats Bar ── */
  .le-stats { background: var(--ink); padding: 3rem 2.5rem; }
  .le-stats-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 1rem; text-align: center;
  }
  .le-stat-num {
    font-family: 'Lora', serif; font-size: 2.2rem;
    font-weight: 700; color: #fff; line-height: 1;
  }
  .le-stat-lbl { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-top: 5px; font-weight: 300; }

  /* ── Sections ── */
  .le-section { padding: 5.5rem 2.5rem; max-width: 1200px; margin: 0 auto; }
  .le-section-tag {
    font-size: 0.72rem; letter-spacing: 0.1em; font-weight: 500;
    color: var(--teal); text-transform: uppercase; margin-bottom: 0.6rem;
  }
  .le-section-h {
    font-family: 'Lora', serif;
    font-size: clamp(1.75rem, 2.8vw, 2.4rem);
    font-weight: 700; letter-spacing: -0.02em; line-height: 1.18;
    max-width: 560px;
  }
  .le-section-sub {
    font-size: 1rem; color: var(--muted); line-height: 1.7;
    max-width: 500px; margin-top: 0.75rem; font-weight: 300;
  }

  /* ── Features ── */
  .le-features-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1.25rem; margin-top: 2.75rem;
  }
  .le-feat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.6rem;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .le-feat-card:hover {
    border-color: rgba(15,14,11,0.22);
    box-shadow: 0 4px 20px rgba(15,14,11,0.06);
  }
  .le-feat-icon {
    width: 38px; height: 38px; background: var(--teal-bg);
    border-radius: 9px; display: flex; align-items: center;
    justify-content: center; margin-bottom: 1rem;
  }
  .le-feat-icon svg { width: 17px; height: 17px; fill: none; stroke: var(--teal); stroke-width: 2; }
  .le-feat-card h3 { font-size: 0.95rem; font-weight: 500; margin-bottom: 0.45rem; }
  .le-feat-card p { font-size: 0.83rem; color: var(--muted); line-height: 1.65; font-weight: 300; }

  /* ── How It Works ── */
  .le-how { background: var(--ink); padding: 5.5rem 2.5rem; }
  .le-how-inner { max-width: 1200px; margin: 0 auto; }
  .le-how .le-section-tag { color: #5dcaa5; }
  .le-how .le-section-h { color: #fff; max-width: 100%; }
  .le-steps {
    display: grid; grid-template-columns: repeat(3,1fr);
    margin-top: 2.75rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; overflow: hidden;
  }
  .le-step {
    padding: 2.25rem; border-right: 1px solid rgba(255,255,255,0.08);
  }
  .le-step:last-child { border-right: none; }
  .le-step-n {
    font-family: 'Lora', serif; font-size: 3.5rem; font-weight: 700;
    color: rgba(255,255,255,0.05); line-height: 1; margin-bottom: 0.5rem;
  }
  .le-step-pill {
    display: inline-flex; align-items: center;
    background: rgba(93,202,165,0.12); color: #5dcaa5;
    font-size: 0.72rem; font-weight: 500;
    padding: 3px 11px; border-radius: 100px; margin-bottom: 0.8rem;
  }
  .le-step h3 { font-size: 1rem; font-weight: 500; color: #fff; margin-bottom: 0.5rem; }
  .le-step p { font-size: 0.83rem; color: rgba(255,255,255,0.42); line-height: 1.65; font-weight: 300; }

  /* ── Doc Types ── */
  .le-types-section { background: var(--cream); padding: 5rem 2.5rem; }
  .le-types-inner { max-width: 1200px; margin: 0 auto; }
  .le-types-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr));
    gap: 0.75rem; margin-top: 2.25rem;
  }
  .le-type-chip {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 0.9rem 1rem;
    font-size: 0.83rem; color: var(--ink);
    text-align: center; transition: all 0.15s; cursor: default;
  }
  .le-type-chip:hover { border-color: var(--teal); color: var(--teal); }

  /* ── Testimonials ── */
  .le-testimonials { padding: 5.5rem 2.5rem; max-width: 1200px; margin: 0 auto; }
  .le-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; margin-top: 2.75rem; }
  .le-testi-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.6rem;
  }
  .le-testi-stars { display: flex; gap: 2px; margin-bottom: 0.75rem; }
  .le-star { width: 12px; height: 12px; background: var(--gold); border-radius: 2px; }
  .le-testi-card blockquote {
    font-size: 0.88rem; color: var(--ink); line-height: 1.7;
    font-style: italic; font-family: 'Lora', serif; margin-bottom: 1rem;
  }
  .le-testi-author { font-size: 0.78rem; color: var(--muted); font-weight: 500; }
  .le-testi-role { font-size: 0.73rem; color: var(--muted); font-weight: 300; margin-top: 2px; }

  /* ── Upload ── */
  .le-upload-section { padding: 5.5rem 2.5rem; max-width: 820px; margin: 0 auto; text-align: center; }
  .le-upload-area {
    border: 1.5px dashed var(--border); border-radius: 14px;
    padding: 3.5rem 2rem; margin-top: 2.5rem;
    cursor: pointer; transition: all 0.2s; background: var(--surface);
  }
  .le-upload-area:hover, .le-upload-area.drag-over {
    border-color: var(--teal-mid); background: var(--teal-bg);
  }
  .le-upload-icon {
    width: 52px; height: 52px; background: var(--cream);
    border-radius: 12px; display: flex; align-items: center;
    justify-content: center; margin: 0 auto 1.25rem;
  }
  .le-upload-icon svg { width: 22px; height: 22px; fill: none; stroke: var(--muted); stroke-width: 1.5; }
  .le-upload-p { font-size: 0.9rem; color: var(--muted); line-height: 1.65; }
  .le-upload-p strong { color: var(--teal); font-weight: 500; }
  .le-upload-meta { font-size: 0.76rem; color: var(--muted); margin-top: 0.45rem; }
  .le-fmt-row { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem; flex-wrap: wrap; }
  .le-fmt { background: var(--cream); color: var(--muted); font-size: 0.72rem; padding: 3px 10px; border-radius: 100px; border: 1px solid var(--border); }

  /* ── Upload Success ── */
  .le-upload-success .le-upload-icon { background: #c6eede; }
  .le-upload-success .le-upload-icon svg { stroke: var(--teal); }
  .le-upload-success .le-upload-p strong { color: var(--teal); }

  /* ── CTA ── */
  .le-cta { background: var(--teal); padding: 6rem 2.5rem; text-align: center; }
  .le-cta h2 {
    font-family: 'Lora', serif;
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    font-weight: 700; color: #fff; margin-bottom: 0.85rem;
  }
  .le-cta p { color: rgba(255,255,255,0.68); max-width: 460px; margin: 0 auto 2.25rem; font-weight: 300; font-size: 1rem; line-height: 1.7; }
  .le-btn-white {
    background: #fff; color: var(--teal); border: none;
    padding: 13px 28px; border-radius: 8px;
    font-size: 1rem; font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.15s;
  }
  .le-btn-white:hover { background: var(--paper); }

  /* ── Footer ── */
  .le-footer {
    background: var(--ink); padding: 2.25rem 2.5rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
  }
  .le-footer-brand { font-family: 'Lora', serif; color: #fff; font-weight: 700; font-size: 1.05rem; }
  .le-footer-links { display: flex; gap: 1.75rem; }
  .le-footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.32); text-decoration: none; transition: color 0.15s; }
  .le-footer-links a:hover { color: rgba(255,255,255,0.7); }
  .le-footer-copy { font-size: 0.75rem; color: rgba(255,255,255,0.2); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .le-hero { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 1.5rem 3rem; }
    .le-features-grid { grid-template-columns: repeat(2,1fr); }
    .le-stats-inner { grid-template-columns: repeat(2,1fr); }
    .le-steps { grid-template-columns: 1fr; }
    .le-step { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .le-step:last-child { border-bottom: none; }
    .le-testi-grid { grid-template-columns: 1fr; }
    .le-nav-links a { display: none; }
  }
  @media (max-width: 600px) {
    .le-features-grid { grid-template-columns: 1fr; }
    .le-demo-cols { grid-template-columns: 1fr; }
    .le-demo-col:first-child { border-right: none; border-bottom: 1px solid var(--border); }
    .le-stats-inner { grid-template-columns: repeat(2,1fr); }
  }
`;

// ── SVG Icons ────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L4 8v4c0 5 3.5 9.74 8 11 4.5-1.26 8-6 8-11V8z"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="#0f6e56" strokeWidth="2.5">
    <polyline points="2,5 4,7 8,3"/>
  </svg>
);
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const CheckBigIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0f6e56" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    ),
    title: "Plain English summaries",
    desc: "Every clause rewritten clearly. No jargon — just what each section actually means for you, in language anyone can understand.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
    title: "Risk flag detection",
    desc: "Unusual clauses, one-sided terms, and hidden obligations are automatically highlighted so you know what to question.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    title: "Ask anything",
    desc: "Chat with your document. \"Can they change my salary?\" or \"What's the notice period?\" — answered instantly by AI.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    title: "Key terms dashboard",
    desc: "Deadlines, obligations, parties, and payment terms are extracted and displayed in a clean, scannable view.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    title: "Bank-grade privacy",
    desc: "Your documents are encrypted end-to-end. We never store, share, or train on your files. What you upload stays yours.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    title: "Instant analysis",
    desc: "A 30-page NDA analyzed in under 30 seconds. Upload PDF, DOCX, or paste text — no special formatting required.",
  },
];

const steps = [
  { n: "01", pill: "Upload", title: "Drop in your document", desc: "Paste text or upload a PDF or Word file. We support contracts, NDAs, leases, privacy policies, terms of service, and more." },
  { n: "02", pill: "Analyze", title: "AI reads every clause", desc: "Our legal-trained AI parses each section, identifying obligations, risks, deadlines, and key terms with expert-level precision." },
  { n: "03", pill: "Understand", title: "Get your plain summary", desc: "Review a side-by-side breakdown. Ask follow-up questions, export your report, or share it with a colleague for review." },
];

const docTypes = [
  "Employment contracts","Non-disclosure agreements","Lease agreements",
  "Terms of service","Privacy policies","Freelance contracts",
  "Shareholder agreements","Partnership agreements","Software licenses",
  "Settlement agreements","Purchase agreements","Service agreements",
];

const testimonials = [
  {
    quote: "I signed an NDA for a new job without realizing it had a 5-year non-compete baked in. LegalEase would have caught that instantly.",
    author: "Priya S.",
    role: "Software Engineer, Bengaluru",
  },
  {
    quote: "As a freelancer, I deal with contracts constantly. This tool saves me from having to pay a lawyer every time a client sends me a new agreement.",
    author: "James O.",
    role: "Independent Consultant, Lagos",
  },
  {
    quote: "I uploaded my apartment lease and found three clauses that my landlord had no right to include. The plain-English breakdown was a game changer.",
    author: "Maria L.",
    role: "Graphic Designer, Barcelona",
  },
];

// ── Components ───────────────────────────────────────────────────────────────
function Navbar({ onUploadClick }) {
  return (
    <nav className="le-nav">
      <div className="le-nav-brand">
        <ShieldIcon />
        LegalEase AI
      </div>
      <div className="le-nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#docs">Documents</a>
        <a href="#upload">Try it</a>
        <button className="le-nav-btn" onClick={onUploadClick}>Get started free</button>
      </div>
    </nav>
  );
}

function DemoCard() {
  return (
    <div className="le-demo-card">
      <div className="le-demo-bar">
        <span className="le-dot le-dot-r" />
        <span className="le-dot le-dot-y" />
        <span className="le-dot le-dot-g" />
        <span className="le-demo-file">employment_contract.pdf</span>
      </div>
      <div className="le-demo-cols">
        <div className="le-demo-col">
          <div className="le-demo-label">Original legalese</div>
          <div className="le-legal-text">
            <mark>Notwithstanding</mark> any provisions contained herein to the contrary, the Employee shall be bound by a <mark>covenant of non-disparagement</mark>, whereby Employee agrees to refrain from making, directly or indirectly, any statement that <mark>impugns or disparages</mark> the Company, its officers, directors, or affiliates, in any medium whatsoever...
          </div>
        </div>
        <div className="le-demo-col">
          <div className="le-demo-label">Plain English</div>
          <div className="le-plain-text">
            <span className="le-risk-tag">
              <span className="le-risk-dot" style={{ background: "#b8860b" }} /> Restriction
            </span>
            <span className="le-risk-tag-danger">
              <span className="le-risk-dot" style={{ background: "#e24b4a" }} /> Ongoing
            </span>
            <p style={{ marginTop: "0.5rem" }}>
              You cannot say anything negative about the company or its leadership — in public or private — even after you leave. This includes social media and reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onUploadClick }) {
  return (
    <section className="le-hero">
      <div>
        <div className="le-badge">
          <span className="le-badge-dot" />
          AI-powered legal clarity
        </div>
        <h1>Understand any contract,<br /><em>instantly.</em></h1>
        <p className="le-hero-sub">
          LegalEase AI converts complex legal documents into plain English. Upload any contract, NDA, lease, or policy — and get a clear, clause-by-clause explanation in seconds.
        </p>
        <div className="le-hero-actions">
          <button className="le-btn-primary" onClick={onUploadClick}>Analyze a document</button>
          <button className="le-btn-secondary" onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>
            See how it works
          </button>
        </div>
        <div className="le-trust">
          {["No account needed", "End-to-end encrypted", "Free to start"].map((t) => (
            <div className="le-trust-item" key={t}>
              <div className="le-trust-check"><CheckIcon /></div>
              {t}
            </div>
          ))}
        </div>
      </div>
      <DemoCard />
    </section>
  );
}

function StatsBar() {
  const stats = [
    { num: "500K+", lbl: "Documents analyzed" },
    { num: "98%", lbl: "Accuracy rate" },
    { num: "28s", lbl: "Average analysis time" },
    { num: "$0", lbl: "Attorney fee required" },
  ];
  return (
    <div className="le-stats">
      <div className="le-stats-inner">
        {stats.map((s) => (
          <div key={s.lbl}>
            <div className="le-stat-num">{s.num}</div>
            <div className="le-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="le-section" id="features">
      <div className="le-section-tag">Features</div>
      <div className="le-section-h">Everything you need to read with confidence</div>
      <p className="le-section-sub">From risk detection to instant Q&A, LegalEase gives you the tools to truly understand what you're signing.</p>
      <div className="le-features-grid">
        {features.map((f) => (
          <div className="le-feat-card" key={f.title}>
            <div className="le-feat-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="le-how" id="how">
      <div className="le-how-inner">
        <div className="le-section-tag">How it works</div>
        <div className="le-section-h">Three steps from confusion to clarity</div>
        <div className="le-steps">
          {steps.map((s) => (
            <div className="le-step" key={s.n}>
              <div className="le-step-n">{s.n}</div>
              <div className="le-step-pill">{s.pill}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocTypes() {
  return (
    <div className="le-types-section" id="docs">
      <div className="le-types-inner">
        <div className="le-section-tag">Supported documents</div>
        <div className="le-section-h">Works on virtually any legal document</div>
        <div className="le-types-grid">
          {docTypes.map((t) => (
            <div className="le-type-chip" key={t}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="le-testimonials">
      <div className="le-section-tag">Testimonials</div>
      <div className="le-section-h">Trusted by people who read the fine print</div>
      <div className="le-testi-grid">
        {testimonials.map((t) => (
          <div className="le-testi-card" key={t.author}>
            <div className="le-testi-stars">
              {[...Array(5)].map((_, i) => <span className="le-star" key={i} />)}
            </div>
            <blockquote>"{t.quote}"</blockquote>
            <div className="le-testi-author">{t.author}</div>
            <div className="le-testi-role">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadZone() {
  const [state, setState] = useState("idle"); // idle | drag | success
  const ref = useRef(null);

  const handleClick = () => setState("success");
  const onDragOver = (e) => { e.preventDefault(); setState("drag"); };
  const onDragLeave = () => setState("idle");
  const onDrop = (e) => { e.preventDefault(); setState("success"); };

  return (
    <div className="le-upload-section" id="upload">
      <div className="le-section-tag" style={{ textAlign: "center" }}>Try it now</div>
      <div className="le-section-h" style={{ textAlign: "center", maxWidth: "100%", margin: "0 auto" }}>
        Upload your document
      </div>
      <div
        ref={ref}
        className={`le-upload-area${state === "drag" ? " drag-over" : ""}${state === "success" ? " le-upload-success" : ""}`}
        onClick={handleClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {state === "success" ? (
          <>
            <div className="le-upload-icon"><CheckBigIcon /></div>
            <p className="le-upload-p"><strong>Document ready</strong></p>
            <p className="le-upload-meta">Connect your /api/analyze endpoint to begin processing</p>
          </>
        ) : (
          <>
            <div className="le-upload-icon"><UploadIcon /></div>
            <p className="le-upload-p"><strong>Click to upload</strong> or drag and drop your file here</p>
            <p className="le-upload-meta">Max 25 MB · Files are encrypted and never stored</p>
            <div className="le-fmt-row">
              {["PDF", "DOCX", "TXT", "Paste text"].map((f) => (
                <span className="le-fmt" key={f}>{f}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CTA({ onUploadClick }) {
  return (
    <div className="le-cta">
      <h2>Stop signing what you don't understand.</h2>
      <p>Join thousands of people using LegalEase AI to read legal documents with confidence — no lawyer needed.</p>
      <button className="le-btn-white" onClick={onUploadClick}>Start analyzing for free</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="le-footer">
      <div className="le-footer-brand">LegalEase AI</div>
      <div className="le-footer-links">
        {["Privacy", "Terms", "Pricing", "Blog", "Contact"].map((l) => (
          <a key={l} href="#">{l}</a>
        ))}
      </div>
      <span className="le-footer-copy">© 2026 LegalEase AI · Not a law firm</span>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function LegalEaseHome() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{css}</style>
      <Navbar onUploadClick={scrollToUpload} />
      <Hero onUploadClick={scrollToUpload} />
      <StatsBar />
      <Features />
      <HowItWorks />
      <DocTypes />
      <Testimonials />
      <UploadZone />
      <CTA onUploadClick={scrollToUpload} />
      <Footer />
    </>
  );
}
