/* Tayseer Premium Prototype — interactions & animations */

const STORY_PRODUCTS = [
  {
    id: "ecosystem",
    title: "Digital Banking Ecosystem",
    tag: "Scene 01 · Platforms",
    desc: "A unified digital fabric where mobile, cards, payments, and intelligence move as one — engineered for institutions that lead the Gulf’s financial future.",
    glow: "rgba(0, 102, 255, 0.45)",
    features: [
      "Omnichannel customer journeys",
      "Real-time product orchestration",
      "Secure API mesh across services",
      "White-label ready for every brand"
    ],
    visual: "ecosystem",
    demo: "mobile"
  },
  {
    id: "ai-atm",
    title: "AI ATM",
    tag: "Scene 02 · Channels",
    desc: "Intelligent self-service terminals that recognize intent, prevent fraud in-frame, and keep cash & digital channels perfectly synchronized.",
    glow: "rgba(0, 242, 255, 0.4)",
    features: [
      "Vision-assisted fraud safeguards",
      "Cash recycling & smart monitoring",
      "Branchless service at every corner",
      "Fleet analytics for every device"
    ],
    visual: "ai-atm",
    demo: "atm"
  },
  {
    id: "wallet",
    title: "Digital Wallet",
    tag: "Scene 03 · Payments",
    desc: "A luminous wallet experience for instant P2P, QR, cards, and cross-border value — designed to feel effortless and unmistakably premium.",
    glow: "rgba(0, 212, 168, 0.4)",
    features: [
      "Instant P2P & QR settlements",
      "Multi-currency balances",
      "Card tokenization & controls",
      "Biometric unlock everywhere"
    ],
    visual: "wallet",
    demo: "mobile"
  },
  {
    id: "core",
    title: "Core Banking Platform",
    tag: "Scene 04 · Engine",
    desc: "The institutional heart of modern finance — modular ledgers, product factories, and compliance rails built for scale without compromise.",
    glow: "rgba(0, 102, 255, 0.5)",
    features: [
      "Real-time multi-currency ledger",
      "Deposits, lending & cards factory",
      "Regulatory audit trails by design",
      "Cloud or on-premise deployment"
    ],
    visual: "core",
    demo: "core"
  },
  {
    id: "assistant",
    title: "AI Banking Assistant",
    tag: "Scene 05 · Intelligence",
    desc: "Fahim AI — a conversational co-pilot that detects risk, answers customers, and recommends the next best action in milliseconds.",
    glow: "rgba(0, 242, 255, 0.5)",
    features: [
      "Fraud & anomaly detection",
      "Natural-language banking support",
      "Credit & risk intelligence",
      "Personalized next-best actions"
    ],
    visual: "assistant",
    demo: "ai"
  },
  {
    id: "network",
    title: "Connected Banking Network",
    tag: "Scene 06 · Presence",
    desc: "A living network linking institutions, partners, and customers across KSA, UAE, and beyond — always on, always trusted.",
    glow: "rgba(124, 255, 178, 0.35)",
    features: [
      "Cross-border corridor readiness",
      "Partner & correspondent mesh",
      "Live regional presence map",
      "Enterprise-grade trust & uptime"
    ],
    visual: "network",
    demo: "dashboard"
  }
];

/* Keep SOLUTIONS alias for any legacy demo helpers */
const SOLUTIONS = STORY_PRODUCTS;

const ECO_NODES = [
  { label: "Fraud Detection", x: 16, y: 18 },
  { label: "Customer Support", x: 84, y: 16 },
  { label: "Loan Processing", x: 92, y: 48 },
  { label: "Real-time Analytics", x: 80, y: 82 },
  { label: "Payment Systems", x: 20, y: 80 },
  { label: "Mobile Apps", x: 8, y: 48 },
  { label: "ATM Integration", x: 50, y: 10 }
];

const ARCH_NODES = [
  { title: "Customer", sub: "Channels" },
  { title: "Mobile Banking", sub: "MBuke" },
  { title: "API Gateway", sub: "Secure edge" },
  { title: "Core Engine", sub: "Ledger" },
  { title: "Payments", sub: "Rails" },
  { title: "Database", sub: "Systems of record" },
  { title: "Analytics", sub: "Fahim AI" }
];

let activeSolution = null;

/* ---------- Particles / neural canvas ---------- */
function initCanvas() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles, mouse = { x: null, y: null };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(70, Math.floor((w * h) / 18000)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4
    }));
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  resize();

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      if (mouse.x != null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.x += dx / dist * 0.35;
          p.y += dy / dist * 0.35;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,242,255,0.6)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(0,242,255,${(1 - d / 130) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
}

/* ---------- Cursor glow & magnetic buttons ---------- */
function initChrome() {
  const glow = document.getElementById("cursorGlow");
  const progress = document.getElementById("scrollProgress");
  const nav = document.getElementById("nav");

  window.addEventListener("pointermove", (e) => {
    if (glow) {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  });

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      btn.style.setProperty("--rx", `${((e.clientX - r.left) / r.width) * 100}%`);
      btn.style.setProperty("--ry", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = document.querySelector(el.dataset.scroll);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const toggle = document.getElementById("navToggle");
  toggle?.addEventListener("click", () => nav.classList.toggle("open"));

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Solutions grid / detail / demo ---------- */
/* ---------- Cinematic product visuals ---------- */
function renderStoryVisual(type) {
  const map = {
    ecosystem: `
      <div class="prod prod-ecosystem">
        <div class="prod-orbit"><i></i><i></i><i></i></div>
        <div class="prod-phone glass-3d">
          <div class="prod-notch"></div>
          <div class="prod-screen">
            <div class="prod-row"><span>MBuke</span><span class="mono">Live</span></div>
            <div class="prod-balance mono">AED 48,290</div>
            <div class="prod-chips"><b></b><b></b><b></b></div>
            <div class="prod-stream"></div>
          </div>
        </div>
        <div class="prod-float glass-3d f1"><small>Cards</small><strong>Visa · MC</strong></div>
        <div class="prod-float glass-3d f2"><small>Payments</small><strong class="mono">+12.4%</strong></div>
        <div class="prod-float glass-3d f3"><small>AI</small><strong>Fahim</strong></div>
        <div class="prod-reflect"></div>
      </div>`,
    "ai-atm": `
      <div class="prod prod-atm">
        <div class="atm-body glass-3d">
          <div class="atm-screen">
            <div class="atm-scan"></div>
            <span class="mono">AI READY</span>
          </div>
          <div class="atm-slot"></div>
          <div class="atm-pad"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div class="atm-halo"></div>
        <div class="prod-reflect"></div>
      </div>`,
    wallet: `
      <div class="prod prod-wallet">
        <div class="wallet-card glass-3d c1">
          <span>Tayseer Pay</span>
          <strong class="mono">•••• 8842</strong>
          <em>Contactless</em>
        </div>
        <div class="wallet-card glass-3d c2">
          <span>Digital Wallet</span>
          <strong class="mono">SAR 12,540</strong>
        </div>
        <div class="wallet-qr glass-3d"></div>
        <div class="prod-reflect"></div>
      </div>`,
    core: `
      <div class="prod prod-core">
        <div class="core-cube">
          <i class="f front"></i><i class="f back"></i>
          <i class="f left"></i><i class="f right"></i>
          <i class="f top"></i><i class="f bottom"></i>
        </div>
        <div class="core-rings"><span></span><span></span></div>
        <div class="prod-reflect"></div>
      </div>`,
    assistant: `
      <div class="prod prod-assistant">
        <div class="ai-orb-core"></div>
        <div class="ai-orb-ring r1"></div>
        <div class="ai-orb-ring r2"></div>
        <div class="ai-orb-ring r3"></div>
        <div class="ai-orb-label">AI</div>
        <div class="ai-chat glass-3d">
          <p>Fraud cleared in <strong>0.4s</strong></p>
        </div>
        <div class="prod-reflect"></div>
      </div>`,
    network: `
      <div class="prod prod-network">
        <svg viewBox="0 0 280 200" class="net-svg">
          <defs>
            <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00F2FF" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#00F2FF" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="140" cy="110" rx="110" ry="48" fill="none" stroke="rgba(0,242,255,0.25)" stroke-width="1"/>
          <path class="net-arc" d="M70 120 Q140 40 210 110" fill="none" stroke="#00F2FF" stroke-width="1.5"/>
          <circle cx="70" cy="120" r="18" fill="url(#netGlow)"/>
          <circle cx="210" cy="110" r="18" fill="url(#netGlow)"/>
          <circle cx="140" cy="70" r="8" fill="#7CFFB2"/>
          <circle class="net-pulse" cx="70" cy="120" r="5" fill="#00F2FF"/>
          <circle class="net-pulse" cx="210" cy="110" r="5" fill="#00F2FF"/>
          <text x="70" y="150" text-anchor="middle" fill="#8BA3C7" font-size="10">Riyadh</text>
          <text x="210" y="140" text-anchor="middle" fill="#8BA3C7" font-size="10">Dubai</text>
        </svg>
        <div class="prod-reflect"></div>
      </div>`
  };
  return map[type] || map.ecosystem;
}

function renderVisual(type) {
  /* Legacy demos still use simple visuals */
  const legacy = {
    phone: `<div class="viz-phone"><div class="notch"></div><div class="viz-screen">
      <div class="app-top"><span>9:41</span><span>MBuke</span></div>
      <div class="bal mono">$24,850.00</div>
      <div class="chips"><span>Send</span><span>Request</span><span>Scan</span></div>
      <div class="viz-row"><span>Salary</span><span class="up">+$4,200</span></div>
      <div class="viz-row"><span>Coffee</span><span>-$6.50</span></div>
      <div class="viz-row"><span>Transfer</span><span>-$120</span></div>
    </div></div>`,
    cube: `<div class="viz-cube"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
    orb: `<div class="viz-rings"></div><div class="viz-ai-orb"></div>`,
    rings: `<div class="viz-rings"></div><div class="viz-ai-orb" style="width:90px;height:90px"></div>`,
    cloud: `<div class="viz-cloud"><span></span><span></span><span></span></div>`,
    atm: `<div class="viz-atm"><div class="screen"></div><div class="slot"></div><div class="keys"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`
  };
  if (legacy[type]) return legacy[type];
  return renderStoryVisual(type);
}

function renderDemo(sol) {
  if (sol.demo === "mobile") {
    return `
      <div class="demo-phone-stage">
        <div class="demo-signal"><span></span><span></span><span></span></div>
        <div class="demo-phone">
          <div class="notch"></div>
          <div class="demo-screens" id="mbScreens">
            <div class="demo-screen active" data-i="0">
              <h4>Dashboard</h4>
              <div class="amount">AED 48,290</div>
              <div class="grid-acts"><span>Pay</span><span>Transfer</span><span>Cards</span><span>Invest</span></div>
              <div class="viz-row" style="margin-top:1rem"><span>Today</span><span class="up">+2.4%</span></div>
            </div>
            <div class="demo-screen" data-i="1">
              <h4>Payments</h4>
              <p style="color:var(--muted);font-size:0.8rem;margin:0.5rem 0 1rem">Instant · Secure · Cross-border ready</p>
              <div class="grid-acts"><span>Local</span><span>SWIFT</span><span>Bills</span><span>P2P</span></div>
            </div>
            <div class="demo-screen" data-i="2">
              <h4>QR Scanner</h4>
              <div class="qr-box"></div>
              <p style="text-align:center;color:var(--muted);font-size:0.75rem">Align code within frame</p>
            </div>
            <div class="demo-screen" data-i="3">
              <h4>Wallet</h4>
              <div class="amount">SAR 12,540</div>
              <div class="mini-bars" style="height:60px"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="demo-screen" data-i="4">
              <h4>Cards</h4>
              <div class="card-stack"><i></i><i></i><i></i></div>
            </div>
            <div class="demo-screen" data-i="5">
              <h4>Investments</h4>
              <div class="amount">+18.2%</div>
              <div class="mini-chart" style="height:100px;border-radius:12px"></div>
            </div>
          </div>
          <div class="demo-screen-dots" id="mbDots"></div>
        </div>
      </div>`;
  }

  if (sol.demo === "core" || sol.demo === "dashboard" || sol.demo === "ai") {
    const title = sol.demo === "ai" ? "Fahim AI Control Room" : sol.demo === "core" ? "Core Banking Console" : "Operations Dashboard";
    return `
      <div class="demo-dashboard">
        <div class="pane">
          <small class="eyebrow">${title}</small>
          <h4 style="margin:0.4rem 0 0.2rem">${sol.title} live preview</h4>
          <p style="color:var(--muted);font-size:0.85rem">Streaming transactions · AI risk · product health</p>
          <div class="chart-bars">
            ${Array.from({ length: 12 }, (_, i) => `<i style="height:${30 + Math.random() * 70}%;animation-delay:${i * 0.08}s"></i>`).join("")}
          </div>
        </div>
        <div class="pane" style="display:flex;flex-direction:column;gap:0.75rem">
          <div class="glass-card" style="padding:0.85rem">
            <strong>API latency</strong>
            <div class="mono" style="color:var(--emerald);font-size:1.4rem">42ms</div>
          </div>
          <div class="glass-card" style="padding:0.85rem">
            <strong>Fraud blocked</strong>
            <div class="mono" style="color:var(--cyan);font-size:1.4rem">1,284</div>
          </div>
          <div class="glass-card" style="padding:0.85rem">
            <strong>Active sessions</strong>
            <div class="mono" style="font-size:1.4rem">38.2k</div>
          </div>
        </div>
      </div>`;
  }

  if (sol.demo === "cloud") {
    return `
      <div class="demo-server">
        <div class="rack"><span class="led"></span><div><strong>Production cluster</strong><br/><small style="color:var(--muted)">Healthy · 99.99% SLA</small></div></div>
        <div class="rack"><span class="led"></span><div><strong>Observability mesh</strong><br/><small style="color:var(--muted)">Traces · Logs · Metrics</small></div></div>
        <div class="rack"><span class="led"></span><div><strong>Security posture</strong><br/><small style="color:var(--muted)">ISO 27001 aligned</small></div></div>
      </div>`;
  }

  return `
    <div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap;justify-content:center">
      <div class="viz-atm"><div class="screen"></div><div class="slot"></div><div class="keys"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="glass-panel" style="padding:1.25rem;max-width:280px">
        <h4>Channel fleet online</h4>
        <p style="color:var(--muted);font-size:0.9rem;margin:0.5rem 0">ATM · Kiosk · Branch assist — synced to core in real time.</p>
        <div class="mono" style="color:var(--emerald)">128 devices · OK</div>
      </div>
    </div>`;
}

/* ---------- Circular 3D carousel (scroll-driven) ---------- */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function initSolutions() {
  const track = document.getElementById("scrollStoryTrack");
  const ring = document.getElementById("carouselRing");
  const dots = document.getElementById("storyDots");
  const thumbs = document.getElementById("carouselThumbs");
  const counter = document.getElementById("storyCounter");
  const fill = document.getElementById("storyProgressFill");
  const chapter = document.getElementById("storyChapter");
  const sticky = document.getElementById("scrollStorySticky");
  const infoPanel = document.getElementById("storyInfoPanel");
  if (!track || !ring) return;

  const products = STORY_PRODUCTS;
  const n = products.length;
  const step = (Math.PI * 2) / n;
  track.style.setProperty("--slides", String(n));

  ring.innerHTML = products
    .map(
      (s, i) => `
    <div class="carousel-item" data-i="${i}" style="--slide-glow:${s.glow}">
      <div class="carousel-item-glow"></div>
      <div class="carousel-item-visual">${renderStoryVisual(s.visual)}</div>
      <div class="carousel-item-label">${s.title}</div>
    </div>`
    )
    .join("");

  const items = [...ring.querySelectorAll(".carousel-item")];

  dots.innerHTML = products
    .map(
      (s, i) =>
        `<button type="button" role="tab" aria-label="${s.title}" data-i="${i}"${i === 0 ? ' class="active"' : ""}></button>`
    )
    .join("");

  if (thumbs) {
    thumbs.innerHTML = products
      .map(
        (s, i) => `
      <button type="button" class="carousel-thumb${i === 0 ? " active" : ""}" data-i="${i}" aria-label="${s.title}" style="--thumb-glow:${s.glow}">
        <span class="carousel-thumb-icon">${i + 1}</span>
        <span class="carousel-thumb-name">${s.title.split(" ")[0]}</span>
      </button>`
      )
      .join("");
  }

  const dotBtns = [...dots.querySelectorAll("button")];
  const thumbBtns = thumbs ? [...thumbs.querySelectorAll("button")] : [];

  let lastIndex = -1;
  let smoothRot = 0;
  let targetRot = 0;
  let rafId = 0;

  function setInfo(i, instant) {
    const s = products[i];
    const tag = document.getElementById("infoTag");
    const title = document.getElementById("infoTitle");
    const desc = document.getElementById("infoDesc");
    const features = document.getElementById("infoFeatures");
    if (!tag) return;

    if (!instant && infoPanel) {
      infoPanel.classList.remove("is-fresh");
      void infoPanel.offsetWidth;
      infoPanel.classList.add("is-fresh");
    }

    tag.textContent = s.tag;
    title.textContent = s.title;
    desc.textContent = s.desc;
    features.innerHTML = s.features.map((f) => `<li>${f}</li>`).join("");
    if (chapter) chapter.textContent = s.title;
    counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    fill.style.width = `${(i / Math.max(n - 1, 1)) * 100}%`;
    dotBtns.forEach((d, di) => d.classList.toggle("active", di === i));
    thumbBtns.forEach((d, di) => d.classList.toggle("active", di === i));
    if (sticky) sticky.style.setProperty("--scene-glow", s.glow);
  }

  function layout(rot) {
    const mobile = window.innerWidth < 900;
    const radius = mobile ? Math.min(150, window.innerWidth * 0.32) : Math.min(260, window.innerWidth * 0.22);
    const tilt = mobile ? 58 : 62;

    ring.style.transform = `rotateX(${tilt}deg)`;

    items.forEach((item, i) => {
      const angle = i * step - rot;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const depth = (z + radius) / (radius * 2); /* 0 back → 1 front */
      const scale = lerp(0.42, 1.08, easeOutCubic(depth));
      const opacity = lerp(0.22, 1, depth);
      const blur = (1 - depth) * 4;
      const yFace = (-angle * 180) / Math.PI;
      /* Counter-tilt so cards face the camera */
      const face = `rotateX(${-tilt}deg) rotateY(${yFace}deg)`;

      item.style.transform = `translate3d(${x}px, 0, ${z}px) ${face} scale(${scale})`;
      item.style.opacity = String(opacity);
      item.style.filter = blur > 0.4 ? `blur(${blur}px)` : "none";
      item.style.zIndex = String(Math.round(40 + depth * 60));
      item.classList.toggle("is-front", depth > 0.82);
    });

    /* Nearest-to-front index */
    let best = 0;
    let bestDepth = -1;
    for (let i = 0; i < n; i++) {
      const angle = i * step - rot;
      const z = Math.cos(angle) * radius;
      const depth = (z + radius) / (radius * 2);
      if (depth > bestDepth) {
        bestDepth = depth;
        best = i;
      }
    }

    if (best !== lastIndex) {
      lastIndex = best;
      setInfo(best, false);
    }

    const overall = (rot / ((n - 1) * step)) * 100;
    fill.style.width = `${Math.min(100, Math.max(0, overall))}%`;
  }

  function tick() {
    smoothRot += (targetRot - smoothRot) * 0.12;
    if (Math.abs(targetRot - smoothRot) < 0.0005) smoothRot = targetRot;
    layout(smoothRot);
    rafId = requestAnimationFrame(tick);
  }

  function onScroll() {
    const rect = track.getBoundingClientRect();
    const total = track.offsetHeight - window.innerHeight;
    const scrolled = total <= 0 ? 0 : Math.min(Math.max(-rect.top, 0), total);
    const progress = total <= 0 ? 0 : scrolled / total;
    targetRot = progress * (n - 1) * step;
  }

  function jumpTo(i) {
    const total = track.offsetHeight - window.innerHeight;
    const top = track.offsetTop + (i / Math.max(n - 1, 1)) * total;
    window.scrollTo({ top, behavior: "smooth" });
  }

  setInfo(0, true);
  onScroll();
  smoothRot = targetRot;
  layout(smoothRot);
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
  initStoryFx();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  dots.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-i]");
    if (btn) jumpTo(+btn.dataset.i);
  });

  thumbs?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-i]");
    if (btn) jumpTo(+btn.dataset.i);
  });

  document.getElementById("storyBookBtn")?.addEventListener("click", () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".story-book.magnetic, #storyBookBtn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}


function initStoryFx() {
  const canvas = document.getElementById("storyFx");
  const sticky = document.getElementById("scrollStorySticky");
  if (!canvas || !sticky) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    const r = sticky.getBoundingClientRect();
    canvas.width = Math.floor(r.width * devicePixelRatio);
    canvas.height = Math.floor(r.height * devicePixelRatio);
    canvas.style.width = `${r.width}px`;
    canvas.style.height = `${r.height}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * r.width,
      y: Math.random() * r.height,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.35,
      r: 0.6 + Math.random() * 1.8
    }));
  }

  resize();
  window.addEventListener("resize", resize);

  function frame() {
    const rw = canvas.clientWidth;
    const rh = canvas.clientHeight;
    ctx.clearRect(0, 0, rw, rh);

    for (let i = 0; i < 5; i++) {
      const x = ((Date.now() / 40 + i * 120) % (rw + 80)) - 40;
      const grad = ctx.createLinearGradient(x, 0, x + 80, rh);
      grad.addColorStop(0, "rgba(0,242,255,0)");
      grad.addColorStop(0.5, `rgba(0,242,255,${0.04 + i * 0.01})`);
      grad.addColorStop(1, "rgba(0,242,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, 2, rh);
    }

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = rh + 10;
        p.x = Math.random() * rw;
      }
      if (p.x < 0 || p.x > rw) p.vx *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,242,255,${0.2 + p.z * 0.5})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
}

function openStoryPreview(sol) {
  let overlay = document.getElementById("storyPreviewOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "storyPreviewOverlay";
    overlay.className = "story-preview-overlay";
    overlay.innerHTML = `
      <div class="story-preview-shell glass-panel">
        <div class="demo-toolbar">
          <div class="demo-dots"><i></i><i></i><i></i></div>
          <span class="mono" id="storyPreviewLabel">Live Preview</span>
          <button type="button" class="btn btn-ghost btn-sm" id="storyPreviewClose">Close</button>
        </div>
        <div class="demo-body" id="storyPreviewBody"></div>
        <div class="demo-cta-bar">
          <p>Ready to transform your institution?</p>
          <button type="button" class="btn btn-primary" id="storyPreviewBook">Book a Demo</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.id === "storyPreviewClose") overlay.classList.remove("open");
    });
    document.getElementById("storyPreviewBook")?.addEventListener("click", () => {
      overlay.classList.remove("open");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }
  document.getElementById("storyPreviewLabel").textContent = `${sol.title} · Live Product Preview`;
  document.getElementById("storyPreviewBody").innerHTML = renderDemo(sol);
  overlay.classList.add("open");
  if (sol.demo === "mobile") initMobileCarousel();
}


function initMobileCarousel() {
  const screens = [...document.querySelectorAll("#mbScreens .demo-screen")];
  const dotsWrap = document.getElementById("mbDots");
  if (!screens.length || !dotsWrap) return;

  let idx = 0;
  dotsWrap.innerHTML = screens.map((_, i) => `<button type="button" aria-label="Screen ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`).join("");
  const dots = [...dotsWrap.querySelectorAll("button")];

  function go(n) {
    idx = (n + screens.length) % screens.length;
    screens.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  const timer = setInterval(() => {
    if (!document.getElementById("mbScreens")) {
      clearInterval(timer);
      return;
    }
    go(idx + 1);
  }, 2800);
}

/* ---------- AI ecosystem — neon brain + moving signals ---------- */
function initEcosystem() {
  const nodesEl = document.getElementById("ecoNodes");
  const svg = document.getElementById("ecoLines");
  const canvas = document.getElementById("ecoCanvas");
  if (!nodesEl || !svg) return;

  nodesEl.innerHTML = ECO_NODES.map(
    (n, i) =>
      `<div class="eco-node" data-i="${i}" style="left:${n.x}%;top:${n.y}%">${n.label}</div>`
  ).join("");

  const nodeEls = [...nodesEl.querySelectorAll(".eco-node")];

  function curvePath(cx, cy, x, y, i) {
    const mx = (cx + x) / 2;
    const my = (cy + y) / 2;
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const bend = (i % 2 === 0 ? 1 : -1) * Math.min(48, len * 0.18);
    const ox = (-dy / len) * bend;
    const oy = (dx / len) * bend;
    return `M${cx},${cy} Q${mx + ox},${my + oy} ${x},${y}`;
  }

  function draw() {
    const vbW = 800;
    const vbH = 560;
    svg.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);
    const cx = vbW / 2;
    const cy = vbH * 0.48;

    const defs = `
      <defs>
        <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0066FF" stop-opacity="0.1"/>
          <stop offset="40%" stop-color="#00F2FF"/>
          <stop offset="100%" stop-color="#7CFFB2"/>
        </linearGradient>
        <radialGradient id="nodeHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00F2FF" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#00F2FF" stop-opacity="0"/>
        </radialGradient>
        <filter id="softNeon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;

    const paths = ECO_NODES.map((n, i) => {
      const x = (n.x / 100) * vbW;
      const y = (n.y / 100) * vbH;
      const d = curvePath(cx, cy, x, y, i);
      const delayClass = `delay-${i % 7}`;
      const dur = (2 + (i % 4) * 0.35).toFixed(2);
      return `
        <path class="eco-link-base" d="${d}"/>
        <path class="eco-link-pulse ${delayClass}" d="${d}" pathLength="100"/>
        <circle class="eco-signal-dot" r="3.5" filter="url(#softNeon)">
          <animateMotion dur="${dur}s" repeatCount="indefinite" path="${d}"/>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="${dur}s" repeatCount="indefinite"/>
        </circle>
        <circle class="eco-signal-dot" r="2" fill="#FFE566" opacity="0.85">
          <animateMotion dur="${(Number(dur) * 1.35).toFixed(2)}s" begin="${(i * 0.25).toFixed(2)}s" repeatCount="indefinite" path="${d}"/>
        </circle>
        <circle cx="${x}" cy="${y}" r="10" fill="url(#nodeHalo)" opacity="0.55">
          <animate attributeName="r" values="8;14;8" dur="2.4s" begin="${(i * 0.2).toFixed(2)}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.35;0.7;0.35" dur="2.4s" begin="${(i * 0.2).toFixed(2)}s" repeatCount="indefinite"/>
        </circle>`;
    }).join("");

    svg.innerHTML = defs + paths;
  }

  draw();
  window.addEventListener("resize", draw);

  /* Sequential highlight of nodes as signals "arrive" */
  let pulseIdx = 0;
  setInterval(() => {
    if (canvas && !canvas.matches(":hover")) {
      nodeEls.forEach((el, i) => el.classList.toggle("active", i === pulseIdx));
      pulseIdx = (pulseIdx + 1) % nodeEls.length;
    }
  }, 1600);

  nodeEls.forEach((el) => {
    el.addEventListener("pointerenter", () => {
      nodeEls.forEach((n) => n.classList.remove("active"));
      el.classList.add("active");
    });
  });
}

/* ---------- Architecture ---------- */
function initArchitecture() {
  const flow = document.getElementById("archFlow");
  if (!flow) return;

  flow.innerHTML = ARCH_NODES.map(
    (n, i) =>
      `<button type="button" class="arch-node${i === 0 ? " active" : ""}" data-i="${i}">${n.title}<small>${n.sub}</small></button>` +
      (i < ARCH_NODES.length - 1 ? `<span class="arch-arrow" data-a="${i}">→</span>` : "")
  ).join("");

  const nodes = [...flow.querySelectorAll(".arch-node")];
  const arrows = [...flow.querySelectorAll(".arch-arrow")];

  function light(upTo) {
    nodes.forEach((n, i) => n.classList.toggle("active", i <= upTo));
    arrows.forEach((a, i) => a.classList.toggle("lit", i < upTo));
  }

  nodes.forEach((n) => {
    n.addEventListener("click", () => light(+n.dataset.i));
  });

  let auto = 0;
  setInterval(() => {
    if (!flow.matches(":hover")) {
      auto = (auto + 1) % ARCH_NODES.length;
      light(auto);
    }
  }, 2200);
}

/* ---------- Stats ---------- */
function initStats() {
  const cards = document.querySelectorAll(".stat-card");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || e.target.dataset.done) return;
        e.target.dataset.done = "1";
        const counter = e.target.querySelector(".counter");
        const ring = e.target.querySelector(".ring");
        animateCounter(counter);
        drawRing(ring);
      });
    },
    { threshold: 0.4 }
  );
  cards.forEach((c) => io.observe(c));
}

function animateCounter(el) {
  if (!el) return;
  const target = +el.dataset.target;
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function drawRing(wrap) {
  if (!wrap) return;
  const canvas = wrap.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const value = +wrap.dataset.value;
  const size = 120;
  const cx = size / 2;
  const r = 48;
  let progress = 0;

  function frame() {
    progress += (value - progress) * 0.08;
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 8;
    ctx.stroke();

    const start = -Math.PI / 2;
    const end = start + (Math.PI * 2 * progress) / 100;
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#0066FF");
    grad.addColorStop(0.5, "#00F2FF");
    grad.addColorStop(1, "#00C896");
    ctx.beginPath();
    ctx.arc(cx, cx, r, start, end);
    ctx.strokeStyle = grad;
    ctx.lineCap = "round";
    ctx.lineWidth = 8;
    ctx.stroke();

    if (Math.abs(value - progress) > 0.2) requestAnimationFrame(frame);
  }
  frame();
}

/* ---------- Conversational contact ---------- */
function initChat() {
  const messages = document.getElementById("chatMessages");
  const options = document.getElementById("chatOptions");
  if (!messages || !options) return;

  const steps = [
    {
      q: "Hi — I'm Tayseer's concierge. What industry are you in?",
      options: ["Retail Banking", "Islamic Banking", "Fintech / Neo-bank", "Enterprise / Other"]
    },
    {
      q: "Great. What's your company size?",
      options: ["1–50", "51–250", "251–1000", "1000+"]
    },
    {
      q: "What outcome matters most right now?",
      options: ["Launch mobile banking", "Modernize core", "AI & fraud", "Managed operations"]
    }
  ];

  let step = 0;
  const answers = [];

  function addBubble(text, who) {
    const div = document.createElement("div");
    div.className = `bubble ${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showStep() {
    if (step < steps.length) {
      addBubble(steps[step].q, "ai");
      options.innerHTML = steps[step].options
        .map((o) => `<button type="button">${o}</button>`)
        .join("");
      options.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          addBubble(btn.textContent, "user");
          answers.push(btn.textContent);
          options.innerHTML = "";
          step++;
          setTimeout(showStep, 450);
        });
      });
    } else {
      addBubble(
        `Perfect. Based on ${answers.join(" · ")}, our specialists will tailor a walkthrough of Core Banking, Fahim AI, or MBuke. Reach us at info@tayseer.me or +966 555203079 — we'll respond within one business day.`,
        "ai"
      );
      options.innerHTML = `<a class="btn btn-primary" href="mailto:info@tayseer.me?subject=Demo%20request%20from%20prototype">Email Tayseer</a>
        <button type="button" class="btn btn-ghost" id="chatRestart">Start over</button>`;
      document.getElementById("chatRestart")?.addEventListener("click", () => {
        messages.innerHTML = "";
        answers.length = 0;
        step = 0;
        showStep();
      });
    }
  }

  showStep();
}

/* ---------- Deep-link views for Figma capture ---------- */
function openCaptureView() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  const solId = params.get("sol") || "ecosystem";
  if (!view) return;

  const sol = SOLUTIONS.find((s) => s.id === solId) || SOLUTIONS[0];
  document.getElementById("solutions")?.scrollIntoView({ behavior: "instant", block: "start" });
  if (view === "detail" || view === "demo") openStoryPreview(sol);
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initCanvas();
  initChrome();
  initSolutions();
  initEcosystem();
  initArchitecture();
  initStats();
  initChat();
  openCaptureView();
});
