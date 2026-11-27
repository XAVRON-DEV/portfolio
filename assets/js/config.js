/* ==========================================================================
   XAVRON PORTFOLIO — CENTRAL CONFIGURATION
   All editable copy, links, project metadata, and TODO placeholders live here.
   Search for "TODO" in this file to customize any unconfigured details.
   ========================================================================== */

window.PORTFOLIO_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. OWNER & BRAND IDENTITY
  // --------------------------------------------------------------------------
  brand: "XAVRON",
  ownerName: "Dilkash",
  location: "Kolkata, India",
  locationShort: "Kolkata, IN",
  timezone: "Asia/Kolkata",
  // TODO: Replace with your final live domain after deployment
  siteUrl: "https://xavron.dev",

  availability: {
    available: true,
    shortLabel: "Available for freelance",
    contactLabel: "Available for freelance, replies within 24 hours"
  },

  // --------------------------------------------------------------------------
  // 2. CONTACT & SOCIAL LINKS (Replace TODO placeholders)
  // --------------------------------------------------------------------------
  contact: {
    email: "webdevlop4uu@gmail.com",
    formspreeEndpoint: "https://formspree.io/f/xvkakkvr",
    telegram: "https://t.me/Webdevlop4u",
    instagram: "https://www.instagram.com/web.devlop.4u?fqnt=MXJmN2g5NjJsemdtMQ==",
    githubPersonal: "https://github.com/XAVRON-DEV",
    githubOrg: "https://github.com/stackotools",
    // TODO: Replace with a hosted PDF link (e.g. /assets/Dilkash-Resume.pdf or Google Drive link)
    resumeUrl: "TODO"
  },

  // --------------------------------------------------------------------------
  // 3. NAVIGATION
  // --------------------------------------------------------------------------
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],

  // --------------------------------------------------------------------------
  // 4. HOME HERO & REAL STATS
  // --------------------------------------------------------------------------
  hero: {
    greeting: "Hi, I'm Dilkash",
    tagline: "Full-stack developer building fast, useful web products.",
    supportingLine:
      "I design and engineer clean, mobile-first websites, full-stack web apps, browser utilities, and Meta Ads campaigns—built to load fast and convert cleanly.",
    primaryCta: { label: "View Projects", href: "/projects" },
    secondaryCta: { label: "Contact Me", href: "/contact" },
    studioTabs: [
      {
        id: "apps",
        tabLabel: "Web Apps",
        badge: "MERN Stack",
        title: "Full-stack web applications",
        summary: "Authentication, REST APIs, dashboards, and AI-assisted workflows shipped with React, Node.js, and MongoDB.",
        specs: [
          { k: "Featured", v: "QueryHub & AI Finance" },
          { k: "Backend", v: "Express + MongoDB + JWT" },
          { k: "Frontend", v: "React + Tailwind CSS" }
        ],
        ctaLabel: "Explore Projects →",
        ctaHref: "/projects"
      },
      {
        id: "tools",
        tabLabel: "Web Tools",
        badge: "Client-Side",
        title: "15 browser utilities built",
        summary: "Zero-signup PDF converters, image optimization, and direct WebRTC file sharing running directly in the browser.",
        specs: [
          { k: "Featured", v: "StackoTools Suite" },
          { k: "Core", v: "HTML5 · JS · WebRTC" },
          { k: "Privacy", v: "100% Browser-Side" }
        ],
        ctaLabel: "View Case Study →",
        ctaHref: "/projects/webtools"
      },
      {
        id: "ads",
        tabLabel: "Meta Ads",
        badge: "FB & IG Ads",
        title: "Ads + fast landing pages",
        summary: "Campaign architecture, Meta Pixel verification, and custom-coded mobile pages built for leads and conversions.",
        specs: [
          { k: "Platform", v: "Meta Ads Manager" },
          { k: "Tracking", v: "Meta Pixel & Events" },
          { k: "Destination", v: "Custom Landing Pages" }
        ],
        ctaLabel: "Meta Ads Scope →",
        ctaHref: "/services"
      }
    ]
  },

  // Only verified numbers grounded in your shipped repositories.
  // TODO: Add client/experience stats once you have verified numbers to display.
  stats: [
    { value: 3, suffix: "", label: "Shipped Web Products" },
    { value: 2, suffix: "", label: "Full-Stack MERN Apps" },
    { value: 15, suffix: "", label: "Browser Tools Built" }
    // { value: "TODO", suffix: "+", label: "Years Experience" }, // TODO: Uncomment when ready
  ],

  // --------------------------------------------------------------------------
  // 5. MARQUEE & SKILLS (Web Engineering + Meta Ads)
  // --------------------------------------------------------------------------
  marqueeItems: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Vite",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
    "Meta Ads Manager",
    "Facebook & Instagram Ads",
    "Meta Pixel & Events",
    "Git & GitHub"
  ],

  skillGroups: [
    {
      title: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Vite", "Recharts"]
    },
    {
      title: "Backend & Tools",
      items: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "REST APIs",
        "JWT Auth",
        "Git",
        "GitHub",
        "Netlify",
        "Render",
        "Vercel"
        // TODO: Add "Figma" here if you use Figma in your design workflow
      ]
    },
    {
      title: "Meta Ads & Growth",
      items: [
        "Meta Ads Manager",
        "Facebook & Instagram Ads",
        "Meta Pixel & Event Setup",
        "Custom & Lookalike Audiences",
        "Creative & Copy Testing",
        "Ad Landing Pages"
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 5B. META ADS MANAGEMENT CAPABILITIES (No invented ROAS/spend claims)
  // --------------------------------------------------------------------------
  metaAds: {
    eyebrow: "Paid Social · Meta Ads Management",
    heading: "Meta Ads paired with fast, conversion-ready pages",
    intro:
      "Paid campaigns perform best when creative targeting, tracking, and page speed work together. Alongside full-stack web engineering, I manage Facebook & Instagram ad setups built around clean Meta Pixel verification and fast mobile landing experiences.",
    image: "/assets/img/meta-ads-showcase.webp",
    imageAlt: "Dark editorial illustration showing a Facebook/Instagram ad card flowing through conversion analytics into a mobile landing page",
    imageWidth: 1008,
    imageHeight: 630,
    funnelModes: [
      {
        id: "leads",
        tabLabel: "Lead Gen",
        objective: "Leads / Instant Form or Web Form",
        placement: "Instagram Reels, Feed & Facebook Feed",
        tracking: "Meta Pixel Lead + Formspree verification",
        flow: "Hook Creative → Fast Mobile Page → Qualified Inquiry"
      },
      {
        id: "messages",
        tabLabel: "DM / Telegram",
        objective: "Engagement / Messaging Conversations",
        placement: "IG Stories, Reels & FB Mobile Feed",
        tracking: "Click & conversation-start attribution",
        flow: "Problem Hook → Direct Chat Prompt → Fast Reply"
      },
      {
        id: "conversions",
        tabLabel: "Landing Funnel",
        objective: "Sales / Custom Web Conversion Event",
        placement: "Advantage+ & Retargeting Placements",
        tracking: "PageView → ViewContent → Lead / Purchase",
        flow: "Ad Angle Match → <1s Landing Page → Retargeting Pool"
      }
    ],
    pillars: [
      {
        number: "01",
        title: "Campaign Structure & Testing",
        desc: "Structured Meta Ads Manager campaigns for leads, messages, or sales with organized creative hooks, copy variants, and placements."
      },
      {
        number: "02",
        title: "Audience & Retargeting Setup",
        desc: "Layered interest targeting paired with Custom Audiences (site visitors, video viewers, IG engagers) and Lookalike segments."
      },
      {
        number: "03",
        title: "Meta Pixel & Event Verification",
        desc: "Clean Pixel and event configuration (PageView, Lead, Contact, Purchase) tested before spend scales so optimization stays accurate."
      },
      {
        number: "04",
        title: "Dedicated Ad Landing Pages",
        desc: "Custom-coded, mobile-first landing pages aligned to each ad angle—eliminating slow templates and turning clicks into inquiries."
      }
    ],
    // TODO: Replace this invite note with verified Meta Ads campaign case studies (objective, creative format, verified results)
    caseStudyTodoNote:
      "Looking for Meta Ads campaign setups, creative structures, or landing funnel walkthroughs? Reach out on Telegram (@WebDevlop4u) or email (webdevlop4uu@gmail.com) to review examples tailored to your niche."
  },

  // --------------------------------------------------------------------------
  // 6. SELECTED PROJECTS (Researched directly from repos & live deployments)
  // --------------------------------------------------------------------------
  projects: [
    {
      number: "01",
      slug: "queryhub",
      title: "QueryHub",
      subtitle: "Full-Stack Community Q&A Platform",
      oneLiner:
        "A collaborative Q&A web app where users ask questions across 12 topics, post answers, vote on helpful responses, bookmark threads, and follow contributors.",
      liveUrl: "https://qaskio.netlify.app",
      repoUrl: "https://github.com/stackotools/QueryHub",
      caseStudyUrl: "/projects/queryhub",
      image: "/assets/img/queryhub.webp",
      imageAlt:
        "QueryHub web app landing view showing Ask Anything Know Everything headline and floating question preview cards",
      imageWidth: 1008,
      imageHeight: 630,
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveNote:
        "Public landing page is open; creating, voting, and browsing the main feed require signing in.",
      overview:
        "QueryHub is a full-stack community question-and-answer platform built with React on the frontend and an Express/MongoDB REST API on the backend. Designed so learners and developers can organize discussions cleanly by category and tag, it brings together structured threads, voting, user profiles, notifications, and moderation in one application.",
      problem:
        "Chat groups and social feeds bury useful answers quickly. People asking technical or study questions need a dedicated place where answers stay searchable, community upvotes highlight the most helpful response, and contributors can build a public profile around what they know.",
      features: [
        "JWT authentication with hashed passwords, profile editing, and protected user routes",
        "Question creation across 12 topic categories with lowercase normalized tags and optional anonymous posting",
        "Nested answers, comment threads, upvote/downvote scoring, and Best Answer marking by the question author",
        "Search, trending tags, category filters, and sorting by newest, oldest, most viewed, most answered, or top score",
        "Following system with a personalized feed, question bookmarks, and auto-expiring 7-day in-app notifications",
        "Protected admin dashboard with platform stats, user ban/unban controls, and question/answer moderation"
      ],
      techStack: [
        { group: "Frontend", items: ["React 19", "React Router v7", "Tailwind CSS", "Axios", "React Hot Toast"] },
        { group: "Backend", items: ["Node.js", "Express 4", "MongoDB", "Mongoose 7", "JWT", "bcryptjs"] },
        { group: "Security & Hosting", items: ["Helmet", "Express Rate Limit", "Netlify (Frontend)", "Render (API)"] }
      ],
      challengeTitle: "Preventing vote race conditions and slow feed sorting",
      challengeDetail:
        "Computing upvote scores from raw user arrays on every feed request slows down sorting and risks race conditions on rapid clicks. I solved this in the Question and Answer schemas and routes using atomic MongoDB $addToSet, $pull, and $inc updates paired with persistent indexed score, upvotesCount, and downvotesCount fields—keeping feed sorting fast at the database level. On startup, the backend also checks MongoDB Atlas SRV DNS resolution and falls back to public DNS (8.8.8.8 / 1.1.1.1) when ISP resolvers return ENOTFOUND.",
      learned: [
        "Modeling atomic vote transitions and persistent counters in MongoDB rather than computing scores in memory",
        "Splitting 18 React Router pages with React.lazy and Suspense to keep initial JavaScript bundles smaller",
        "Layering Helmet headers and separate rate limits for general API traffic versus login and signup endpoints"
      ],
      nextSlug: "webtools"
    },
    {
      number: "02",
      slug: "webtools",
      title: "Web Tools",
      subtitle: "Browser-Based Utility Suite (StackoTools)",
      oneLiner:
        "A fast, zero-signup collection of 15 browser utilities—covering PDF conversion, image compression, QR codes, text analysis, and direct WebRTC file sharing.",
      liveUrl: "https://stackotools.github.io/webtools/",
      repoUrl: "https://github.com/stackotools/webtools",
      caseStudyUrl: "/projects/webtools",
      image: "/assets/img/webtools.webp",
      imageAlt:
        "StackoTools Web Tools homepage showing tool search bar, popular tool chips, and featured utility cards",
      imageWidth: 1008,
      imageHeight: 630,
      tags: ["HTML5", "CSS3", "JavaScript", "WebRTC", "pdf-lib"],
      liveNote: "Static web app hosted on GitHub Pages—all tools run directly in the browser.",
      overview:
        "Web Tools (published under StackoTools) is a multi-page static utility portal built so anyone can handle quick file conversions, text checks, and developer tasks without installing software or creating an account. Every tool runs client-side inside the browser using vanilla JavaScript and targeted browser libraries.",
      problem:
        "Everyday tasks like turning images into a PDF, resizing a photo, counting words, converting CSV to JSON, or sending a file between two devices often force users onto ad-heavy sites that upload private files to unknown servers.",
      features: [
        "15 standalone client-side tools organized across 6 category hubs (PDF, Image, Text, Calculators, Converters, Developer Tools)",
        "Instant directory search and live card filtering across the tool catalog without page reloads",
        "Browser-side PDF tools: Image to PDF, Text to PDF, Word (DOC/DOCX) to PDF via Mammoth + pdf-lib, and PDF to JPG ZIP export via pdf.js + JSZip",
        "Direct peer-to-peer browser file transfer powered by PeerJS (WebRTC) with peer ID sharing and live progress bar",
        "Interactive Image Resizer, Image Compressor, QR Code Generator (custom size & color download), Password Generator, Word Counter with keyword density, Unit Converter, Color Picker, and CSV to JSON converter"
      ],
      techStack: [
        { group: "Core Web", items: ["HTML5", "CSS3", "Vanilla JavaScript", "Tailwind CSS (CDN)", "Font Awesome"] },
        { group: "Browser Libraries", items: ["PeerJS (WebRTC)", "pdf-lib", "pdf.js", "Mammoth.js", "JSZip", "FileSaver.js", "QRCode.js"] },
        { group: "Hosting", items: ["GitHub Pages"] }
      ],
      challengeTitle: "Keeping heavy file workflows 100% client-side",
      challengeDetail:
        "Handling Word-to-PDF conversion, multi-page PDF rasterization, image resizing, and cross-device file sharing without a backend server meant choosing libraries that operate cleanly on browser Blobs, Canvas, and WebRTC data channels. Combining Mammoth.js for DOCX extraction, pdf-lib and pdf.js for PDF reading/writing, and PeerJS for direct peer data streams keeps files on the user's device and eliminates server storage.",
      learned: [
        "Working with browser Blob APIs, FileReader, Canvas image compression, and WebRTC peer connections",
        "Structuring a static multi-page tool directory with instant search and responsive mobile drawer navigation",
        "Spotting UI polish details during real QA (for instance, keeping password strength meters aligned with generator rules)"
      ],
      nextSlug: "ai-finance-manager"
    },
    {
      number: "03",
      slug: "ai-finance-manager",
      title: "AI Finance Manager",
      subtitle: "Smart Expense Tracker & Bank Statement Analyzer",
      oneLiner:
        "A full-stack personal finance app for Indian users that parses CSV, Excel, and PhonePe/UPI PDF statements, auto-categorizes expenses, and delivers AI insights.",
      liveUrl: "https://financeai-stack.onrender.com/",
      wakeUpNote: "May take a few seconds to wake up",
      repoUrl: "https://github.com/stackotools/ai-finance-manager",
      caseStudyUrl: "/projects/ai-finance-manager",
      image: "/assets/img/ai-finance-manager.webp",
      imageAlt:
        "AI Finance Manager landing page highlighting AI-powered expense categorization and personal finance controls",
      imageWidth: 1008,
      imageHeight: 630,
      tags: ["React", "Vite", "Node.js", "MongoDB", "Gemini AI"],
      liveNote:
        "Hosted on Render's free tier (first visit may take 30–60 seconds to wake up). The main dashboard is behind user login.",
      overview:
        "AI Finance Manager (FinanceAI) is a full-stack personal finance platform tailored around Indian currency (₹ INR) and Indian banking workflows. Users can log daily income and expenses or upload raw bank and UPI statements, review parsed rows before saving, track category budgets, forecast next month's spending, and ask natural-language questions about their own data.",
      problem:
        "Manually typing dozens of monthly UPI and bank transactions into a spreadsheet takes too much effort, and generic finance apps often fail to read Indian bank export formats or PhonePe/UPI PDF statements reliably.",
      features: [
        "4-step Bank Statement Importer (Upload → Map Columns → Preview → Import) supporting CSV, XLS/XLSX, and PDF files",
        "Custom PDF & UPI parsers handling standard bank tables plus PhonePe/UPI PDF statement layouts and Indian date formats",
        "Hybrid auto-categorization that strips UPI/IMPS/NEFT prefixes, checks custom/default keyword rules first, and falls back to Google Gemini AI",
        "Interactive React dashboard with Recharts category pie and monthly cashflow bar charts, plus 50/30/20 Needs/Wants/Savings budget guidance",
        "Next-month expense forecasting built on a 3–6 month Weighted Moving Average (WMA) model with confidence badges",
        "Floating AI chat assistant supporting English and Hinglish queries with a deterministic rule-based fallback over the user's real transactions"
      ],
      techStack: [
        { group: "Frontend", items: ["React 18", "Vite 5", "Tailwind CSS v4", "React Router v6", "Recharts", "Lucide React"] },
        { group: "Backend & Parsers", items: ["Node.js", "Express 4", "MongoDB", "Mongoose 8", "Multer", "PapaParse", "SheetJS (xlsx)", "pdf-parse"] },
        { group: "AI & Security", items: ["Google Gemini SDK", "Anthropic SDK (fallback)", "Rule-Based Engine", "JWT", "Helmet", "Express Rate Limit"] }
      ],
      challengeTitle: "Parsing messy bank/UPI PDFs and preventing AI single points of failure",
      challengeDetail:
        "Indian bank exports vary widely in column headers, date formats (DD/MM/YYYY vs Excel serial numbers), and multi-line PhonePe PDF blocks. In statementParser.js, I built a multi-strategy parser that tries specialized UPI horizontal/block extraction before falling back to line-stitched bank table parsing—then lets users verify column mapping in a preview step before saving. For AI insights and chat, aiService.js and chatService.js fall back cleanly from Gemini to deterministic rule-based analytics (supporting English and Hinglish) so users still get accurate numbers even if an API key is unavailable.",
      learned: [
        "Building defensive multi-format file parsers (CSV, XLSX, PDF) with explicit preview and error reporting for invalid rows",
        "Combining rule-based keyword matching with LLM classification to cut unnecessary AI calls on predictable merchants",
        "Serving a Vite React production build directly from Express behind Helmet, CORS normalization, and tiered API rate limiters"
      ],
      nextSlug: "queryhub"
    }
  ],

  // --------------------------------------------------------------------------
  // 7. SERVICES (All pricing stays clearly marked ₹TODO until confirmed)
  // --------------------------------------------------------------------------
  services: [
    {
      number: "01",
      title: "Landing Pages & Business Websites",
      shortDesc:
        "Fast, mobile-first websites crafted to present your product or business clearly, load cleanly, and turn visitors into inquiries.",
      price: "Starting at ₹TODO",
      deliverables: [
        "Responsive layout tested across phones, tablets, and desktops",
        "Clean semantic HTML, on-page SEO metadata, and fast assets",
        "Contact form integration and deployment setup"
      ]
    },
    {
      number: "02",
      title: "Full-Stack Web Applications",
      shortDesc:
        "End-to-end React, Node.js, and MongoDB web apps with authentication, clean REST APIs, dashboards, and role-based workflows.",
      price: "Starting at ₹TODO",
      deliverables: [
        "React frontend with modular components and responsive states",
        "Express & MongoDB backend with JWT authentication and rate limiting",
        "Data visualization, file/statement parsing, or AI API integration"
      ]
    },
    {
      number: "03",
      title: "Custom Web Tools & Utilities",
      shortDesc:
        "Interactive browser calculators, converters, generators, and workflow helpers tailored to your customers or internal team.",
      price: "Starting at ₹TODO",
      deliverables: [
        "Zero-login client-side tools that work directly in the browser",
        "PDF, image, CSV/JSON, or real-time browser processing",
        "Clean UI built for speed and ease of use"
      ]
    },
    {
      number: "04",
      title: "Meta Ads Management (FB & IG)",
      shortDesc:
        "Structured Facebook & Instagram ad management—campaign setup, audience targeting, creative testing, Meta Pixel verification, and landing page alignment.",
      price: "Starting at ₹TODO",
      deliverables: [
        "Campaign setup in Meta Ads Manager for leads, messages, or conversions",
        "Audience research, retargeting pools, and creative A/B testing",
        "Meta Pixel event verification and clear weekly progress summaries"
      ]
    }
  ],

  processSteps: [
    {
      step: "01",
      title: "Discovery",
      desc: "We align on your goals, target users, core features, and timeline in plain language before any code is written."
    },
    {
      step: "02",
      title: "Design",
      desc: "I map the page structure, responsive layout, and visual hierarchy so everything feels intuitive on both mobile and desktop."
    },
    {
      step: "03",
      title: "Build",
      desc: "Clean, well-structured frontend and backend implementation with regular progress check-ins and real-device testing."
    },
    {
      step: "04",
      title: "Launch",
      desc: "Final cross-browser QA, SEO metadata setup, deployment to Vercel, Netlify, or Render, and clean handoff."
    }
  ],

  whyWorkWithMe: [
    {
      title: "Fast replies",
      desc: "Direct communication without agency layers—questions get answered within 24 hours."
    },
    {
      title: "Clear communication",
      desc: "Plain-English updates on scope, tradeoffs, and progress instead of confusing jargon."
    },
    {
      title: "Mobile-first",
      desc: "Every layout is designed and tested for real phone screens first, then scaled cleanly up to desktop."
    },
    {
      title: "Clean code",
      desc: "Readable, maintainable structure with proper error handling and zero bloated dependencies."
    }
  ],

  // --------------------------------------------------------------------------
  // 8. ABOUT PAGE (Keep TODO placeholders clearly marked)
  // --------------------------------------------------------------------------
  about: {
    teaser:
      "I'm Dilkash, a full-stack developer based in Kolkata, India, building under the name XAVRON. Whether it's a MERN application with AI-assisted workflows or a lightweight browser utility, I focus on clear interfaces, solid backend fundamentals, and fast mobile performance.",
    intro:
      "I'm Dilkash—a web developer from Kolkata, India, working under the alias XAVRON. I enjoy taking ideas from an empty repository to a live, usable product on the web.",
    whatIBuild:
      "Across my software projects on GitHub (under stackotools and XAVRON-DEV), I've built full-stack MERN applications like QueryHub and AI Finance Manager as well as client-side browser tools in Web Tools. Alongside development, I manage Meta Ads (Facebook & Instagram)—connecting campaign targeting, Meta Pixel tracking, and fast mobile landing pages.",
    // TODO: Replace with what you are actively learning right now
    currentlyLearning:
      "TODO: Add the technologies, frameworks, or CS topics you are currently focused on learning.",
    // TODO: Replace placeholder timeline items with your real milestones & dates
    timeline: [
      {
        period: "TODO (Year)",
        title: "TODO: Add learning or project milestone",
        detail: "TODO: Describe what you built or focused on during this stage."
      },
      {
        period: "TODO (Year)",
        title: "TODO: Add learning or project milestone",
        detail: "TODO: Describe key skills, stacks, or projects shipped."
      },
      {
        period: "Present",
        title: "Building full-stack products & freelance web work",
        detail:
          "Shipping React, Node.js, Express, and MongoDB applications plus lightweight static web experiences from Kolkata."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 9. FOOTER
  // --------------------------------------------------------------------------
  footer: {
    credit: "Designed & built by XAVRON"
  }
};
