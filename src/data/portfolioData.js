/**
 * KAVYA OS — Portfolio Data
 * Single Source of Truth
 *
 * This file powers:
 *   - Homepage / Hero
 *   - About section
 *   - Skills section
 *   - Project cards & case studies
 *   - Education timeline
 *   - Experience timeline
 *   - Certifications
 *   - Contact section
 *   - Recruiter view
 *   - Resume Studio (all three templates)
 *   - Generated résumé documents
 *
 * HOW TO UPDATE YOUR RÉSUMÉ:
 *   1. Edit the relevant object(s) below.
 *   2. Save the file.
 *   3. The dev server hot-reloads and the résumé preview refreshes automatically.
 *   4. For production, rebuild (npm run build) and redeploy.
 *
 * RULES:
 *   - Never add employment history, metrics, certifications, or dates you cannot verify.
 *   - Leave fields null or [] if information is not yet confirmed.
 *   - Résumé generation omits null/empty sections automatically.
 */

// ─── PROFILE ───────────────────────────────────────────────────────────────────
export const profile = {
  name: "Kavya Modi",
  headline: "Web Developer & Software Engineer",
  tagline: "I turn ideas into digital experiences.",
  summary:
    "BCA graduate from Semcom, CVM University with a 9.55 CGPA and a strong foundation in full-stack web and software development. Experienced across PHP, Python, JavaScript, VB.NET, MySQL, and modern frontend frameworks like React. Currently interning as a Web Developer at Anugrah Accounting — building real-world solutions for real clients with clean code and high performance.",
  location: "Bharuch, Gujarat, India",
  github: "https://github.com/kavyamodi889-commits",
  linkedin: "https://www.linkedin.com/in/kavya-modi",
  email: "kavyamodi746@gmail.com",
  phone: "+91 7041116223",
  whatsapp: "https://wa.me/917041116223",
  website: "https://kavyamodi19.lovable.app",
  cgpa: "9.55",
  resumeFilename: "Kavya-Modi-Resume.pdf",
};

// ─── SKILLS ────────────────────────────────────────────────────────────────────
export const skills = [
  {
    category: "Languages & Frameworks",
    items: ["Python", "PHP", "JavaScript", "HTML5", "CSS3", "VB.NET", "React", "Node.js"],
  },
  {
    category: "Styling & UI",
    items: ["Tailwind CSS", "Responsive Design", "Framer Motion", "Flexbox / Grid"],
  },
  {
    category: "Databases & Storage",
    items: ["MySQL", "MS SQL Server", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "GitHub", "VS Code", "Vite", "Vercel", "Netlify", "REST APIs"],
  },
  {
    category: "Professional Skills",
    items: ["Problem Solving", "Analytical Thinking", "Client Coordination", "Team Collaboration"],
  },
];

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "glovix-anand",
    title: "Glovix — Anand Overseas",
    shortDescription:
      "Premium consultancy platform for global education — IELTS coaching, visa counselling, and university placement across the USA, UK, Canada, Australia, and Europe.",
    description:
      "Designed and developed a high-conversion lead generation platform for Anand Overseas study abroad consultancy. Features comprehensive course catalogs, destination guides, visa assistance intakes, and mobile-first responsive interfaces.",
    tech: ["React", "Tailwind CSS", "Netlify", "Responsive Design"],
    category: "Web Application",
    status: "Active",
    highlights: [
      "Interactive country guides and university program discovery",
      "High-conversion lead intake for visa and IELTS coaching",
      "Production deployment on Netlify with sub-second page loads",
      "Fully responsive component architecture",
    ],
    github: null,
    live: "https://glovix.netlify.app/",
    image: null,
    featured: true,
    year: 2025,
  },
  {
    id: "anugrah-accounting",
    title: "Anugrah Accounting Official Website",
    shortDescription:
      "Official professional website for a chartered accounting firm — dynamic PHP pages, service catalogue, and contact intake.",
    description:
      "Delivered end-to-end client website for Anugrah Accounting in Bharuch. Built responsive frontend layouts, dynamic PHP service templates, contact inquiry handling, and secure server-side form validation.",
    tech: ["PHP", "HTML5", "CSS3", "JavaScript"],
    category: "Web Application",
    status: "Completed",
    highlights: [
      "Complete client requirement gathering and design delivery",
      "Dynamic PHP service pages and tax consultation inquiries",
      "Client-side & server-side form validation",
      "Production live deployment at anugrah.gt.tc",
    ],
    github: null,
    live: "https://anugrah.gt.tc/",
    image: null,
    featured: true,
    year: 2025,
  },
  {
    id: "rangila-resto",
    title: "Rangila Resto",
    shortDescription:
      "Vibrant, modern restaurant landing experience showcasing the menu, ambience, and online reservations with smooth animations.",
    description:
      "Built a modern dining web application with interactive food menus, category filtering, table reservation scheduling, and visual dining atmosphere galleries.",
    tech: ["React", "Vite", "Tailwind CSS", "Vercel"],
    category: "Web Application",
    status: "Active",
    highlights: [
      "Dynamic menu filtering by cuisine and dietary preferences",
      "Online table reservation booking interface",
      "Fluid responsive layout optimized for mobile diners",
      "Deployed with continuous integration on Vercel",
    ],
    github: null,
    live: "https://rangila-resto.vercel.app/",
    image: null,
    featured: true,
    year: 2025,
  },
  {
    id: "pixel-plus-media",
    title: "Pixel Plus Media",
    shortDescription:
      "Production-grade portfolio for a media and content agency — bold visuals, motion-rich layouts, and a refined creative narrative.",
    description:
      "Engineered a visual-heavy agency showcase featuring case studies, brand identity campaigns, client testimonials, and interactive motion transitions built with Framer Motion and React.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "Web Application",
    status: "Active",
    highlights: [
      "Curated media showcase with smooth entrance animations",
      "Client case studies with creative design metrics",
      "High-performance image loading and responsive viewports",
    ],
    github: null,
    live: "https://pixelplusmedia.vercel.app/",
    image: null,
    featured: true,
    year: 2025,
  },
  {
    id: "bank-locker",
    title: "Bank Locker Management System",
    shortDescription:
      "A secure enterprise system for managing bank locker allocations, customer records, and access logs with role-based access control.",
    description:
      "Designed and developed a complete bank locker allocation and safety deposit vault management solution using VB.NET, PHP, and MySQL / SQL Server. Features administrator dashboards, customer registration, allocation tracking, and automated audit logging.",
    tech: ["PHP", "VB.NET", "MySQL", "MS SQL Server", "Windows Forms"],
    category: "Enterprise System",
    status: "Completed",
    highlights: [
      "Role-based access control (RBAC) for bank staff and auditors",
      "Deterministic locker occupancy tracking and key allocation",
      "Relational database design with normalized access history logs",
      "Form validation and transactional integrity",
    ],
    github: null,
    live: null,
    image: null,
    featured: true,
    year: 2024,
  },
  {
    id: "laundry-management",
    title: "Laundry Management System",
    shortDescription:
      "A desktop and business application for managing laundry orders, customer records, and automated billing workflows.",
    description:
      "Built a complete management application for laundry businesses handling customer intake, garment categorization, service pricing calculation, and print-ready thermal invoice generation.",
    tech: ["VB.NET", "PHP", "MySQL", "Windows Forms"],
    category: "Business Software",
    status: "Completed",
    highlights: [
      "Customer order intake and garment status tracking lifecycle",
      "Service pricing and automated tax/discount calculation",
      "Print-ready invoice and pickup receipt generation",
      "Reliable local record store and customer database",
    ],
    github: null,
    live: null,
    image: null,
    featured: true,
    year: 2024,
  },
  {
    id: "streamverse-platform",
    title: "StreamVerse — Video Streaming Platform",
    shortDescription:
      "A full-stack video streaming and content management platform with adaptive playback, user channels, and recommendation feed.",
    description:
      "A comprehensive video streaming product featuring user authentication, video uploads, adaptive bitrate playback, comments, live interactions, and recommendation feeds built with React, Node.js, Express, MongoDB, and Python services.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Python", "FastAPI"],
    category: "Full-Stack Platform",
    status: "Active",
    highlights: [
      "Adaptive video streaming with offline caching",
      "Channel creation, subscriptions, and comment threads",
      "FastAPI microservice for personalized content recommendations",
      "Creator studio and video management dashboard",
    ],
    github: "https://github.com/kavyamodi889-commits/youtube",
    live: null,
    image: null,
    featured: true,
    year: 2026,
  },
];

// ─── EDUCATION ─────────────────────────────────────────────────────────────────
export const education = [
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Semcom, CVM University",
    location: "Vallabh Vidyanagar, Gujarat, India",
    status: "Completed",
    startYear: 2023,
    endYear: 2026,
    score: "9.55 CGPA (Semester 6)",
    relevant: [
      "Python Programming",
      "PHP & Web Development",
      "VB.NET Application Development",
      "Database Management Systems (MySQL)",
      "Data Structures & Algorithms",
      "Software Engineering",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "GNFC Narmada Vidyalaya",
    location: "Bharuch, Gujarat (Gujarat Board)",
    status: "Completed",
    startYear: 2021,
    endYear: 2023,
    score: "73.46%",
    relevant: [
      "Science & Mathematics Foundation",
      "Computer Fundamentals",
      "Logical & Quantitative Reasoning",
    ],
  },
];

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
export const experience = [
  {
    id: "pattern-llc",
    role: "Operating Executive",
    company: "Pattern LLC",
    location: "Vadodara, Gujarat, India",
    type: "Full-Time",
    startDate: "2024",
    endDate: "Present",
    description:
      "Pattern LLC is a Vadodara-based business solutions company providing operations management, consulting, and enterprise services. As an Operating Executive, responsible for overseeing day-to-day operational workflows, managing cross-functional teams, streamlining internal processes, and ensuring business targets are consistently met.",
    tech: ["Operations Management", "Team Leadership", "Process Optimization", "Business Strategy", "Client Relations"],
    highlights: [
      "Supervised and coordinated daily operational activities across multiple departments",
      "Streamlined internal processes to improve efficiency and reduce turnaround time",
      "Managed client relationships and ensured delivery of high-quality business outcomes",
      "Collaborated with leadership to align operational goals with strategic business objectives",
      "Monitored KPIs and generated performance reports for executive review",
    ],
    website: "https://www.patternllc.in",
  },
  {
    id: "anugrah-internship",
    role: "Web Developer Intern",
    company: "Anugrah Accounting",
    location: "Bharuch, Gujarat, India",
    type: "Internship",
    startDate: "December 2024",
    endDate: "Present",
    description:
      "Designed and developed the official corporate website end-to-end using PHP, HTML5, CSS3, and JavaScript. Built dynamic server-side form processing, implemented mobile-first responsive layouts, and coordinated directly with the client throughout requirements gathering, design, and deployment.",
    tech: ["PHP", "HTML5", "CSS3", "JavaScript", "Responsive Design", "Full-Stack"],
    highlights: [
      "Owned the complete development lifecycle from requirement analysis to live production launch",
      "Developed responsive layouts ensuring seamless compatibility across mobile and desktop devices",
      "Built dynamic PHP backend components for client consultation inquiries and form handling",
      "Client coordination and scheduled milestone delivery",
    ],
  },
];

// ─── CERTIFICATIONS ────────────────────────────────────────────────────────────
export const certifications = [
  {
    id: "cert-python-basics",
    name: "Python: Basic Structures",
    title: "Python: Basic Structures",
    issuer: "Python Institute / Certified",
    date: "2024",
    category: "Programming",
  },
  {
    id: "cert-python-iteration",
    name: "Python: Selection & Iteration",
    title: "Python: Selection & Iteration",
    issuer: "Python Institute / Certified",
    date: "2024",
    category: "Programming",
  },
  {
    id: "cert-cybersecurity",
    name: "Foundations of Cybersecurity",
    title: "Foundations of Cybersecurity",
    issuer: "Cybersecurity Certified",
    date: "2024",
    category: "Security",
  },
  {
    id: "cert-genai",
    name: "Generative AI Chatbot",
    title: "Generative AI Chatbot",
    issuer: "DevTown",
    date: "2024",
    category: "Artificial Intelligence",
  },
  {
    id: "cert-internship",
    name: "Web Developer Internship Certificate",
    title: "Web Developer Internship Certificate",
    issuer: "Anugrah Accounting, Bharuch",
    date: "2025",
    category: "Work Experience",
  },
];

// ─── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
export const achievements = [
  {
    id: "achieve-cgpa",
    title: "Academic Excellence — 9.55 CGPA",
    description: "Achieved top academic distinction with 9.55 CGPA in Semester 6 during Bachelor of Computer Applications.",
    year: "2026",
  },
  {
    id: "achieve-hackathon",
    title: "Techathon — CyberShadez Hackathon",
    description: "Recognized participant and finalist at Techathon organized by SEMCOM, CVM University.",
    year: "2024",
  },
];

// ─── LANGUAGES ─────────────────────────────────────────────────────────────────
export const languages = [
  { name: "English", proficiency: "Professional / Fluent" },
  { name: "Hindi", proficiency: "Native" },
  { name: "Gujarati", proficiency: "Native" },
];

// ─── CONTACT / LINKS ───────────────────────────────────────────────────────────
export const contactLinks = [
  {
    label: "Email",
    url: "mailto:kavyamodi746@gmail.com",
    icon: "email",
    public: true,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/kavya-modi",
    icon: "linkedin",
    public: true,
  },
  {
    label: "GitHub",
    url: "https://github.com/kavyamodi889-commits",
    icon: "github",
    public: true,
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/917041116223",
    icon: "whatsapp",
    public: true,
  },
  {
    label: "Portfolio Website",
    url: "https://kavyamodi19.lovable.app",
    icon: "website",
    public: true,
  },
];

// ─── ARCHITECTURES ─────────────────────────────────────────────────────────────
export const architectures = [
  {
    id: "bank-locker",
    title: "Bank Locker Management System",
    subtitle: "Three-Tier Relational Web Architecture",
    description: "Designed with strict separation between client presentation, application authentication/authorization, and normalized relational persistence.",
    tech: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    nodes: [
      {
        id: "client",
        name: "Web UI & Form Layer",
        category: "Presentation Tier",
        description: "Responsive HTML5/CSS3 interface with client-side form validation for locker applications and customer registration.",
        metrics: "Client-side validation & clean UX",
      },
      {
        id: "auth",
        name: "Session & Auth Guard",
        category: "Security Tier",
        description: "PHP session management, role-based authorization (Admin vs. Customer), and credential protection against unauthorized access.",
        metrics: "Role-based access control",
      },
      {
        id: "controller",
        name: "Locker Allocation Controller",
        category: "Application Tier",
        description: "Core business logic enforcing locker occupancy rules, key assignment algorithms, and automated audit logging.",
        metrics: "Deterministic allocation rules",
      },
      {
        id: "db",
        name: "MySQL Relational Schema",
        category: "Data Tier",
        description: "Normalized relational schema storing customers, locker inventories, assigned leases, and timestamped access logs with foreign key constraints.",
        metrics: "ACID transactions & referential integrity",
      },
    ],
    connections: [
      { from: "client", to: "auth", label: "HTTP POST / Authenticate" },
      { from: "auth", to: "controller", label: "Authorized Session" },
      { from: "controller", to: "db", label: "SQL Queries / Transactions" },
    ],
  },
  {
    id: "laundry-management",
    title: "Laundry Management System",
    subtitle: "Desktop Event-Driven & Subsystem Architecture",
    description: "Built for high-efficiency cashier operations with native Windows event handling, automatic receipt printing, and local data persistence.",
    tech: ["VB.NET", "Windows Forms", "ADO.NET"],
    nodes: [
      {
        id: "winforms",
        name: "Windows Forms UI",
        category: "UI Tier",
        description: "Native desktop event-driven interface designed for rapid order entry, garment tagging, and quick status lookups.",
        metrics: "Low latency native UI",
      },
      {
        id: "order_engine",
        name: "Order Processing Engine",
        category: "Business Tier",
        description: "Manages garment categorization, custom cleaning instructions, and status lifecycle (Received -> In Process -> Ready -> Collected).",
        metrics: "Lifecycle state machine",
      },
      {
        id: "billing",
        name: "Pricing & Billing Calculator",
        category: "Finance Tier",
        description: "Calculates itemized service fees, garment quantities, applicable discounts, and outstanding customer balances.",
        metrics: "Accurate real-time billing",
      },
      {
        id: "printing",
        name: "Thermal Invoice Subsystem",
        category: "Hardware I/O",
        description: "Direct Windows printer spooler integration generating print-ready thermal customer receipts and identification tags.",
        metrics: "Instant physical receipt generation",
      },
      {
        id: "data_store",
        name: "Relational Record Store",
        category: "Data Tier",
        description: "Structured database managed via ADO.NET ensuring reliable persistence for customer histories and sales ledgers.",
        metrics: "Safe local persistence",
      },
    ],
    connections: [
      { from: "winforms", to: "order_engine", label: "Order Events" },
      { from: "order_engine", to: "billing", label: "Calculate Totals" },
      { from: "billing", to: "printing", label: "Spool Invoice" },
      { from: "order_engine", to: "data_store", label: "ADO.NET Persistence" },
    ],
  },
  {
    id: "aura-platform",
    title: "AURA Video Platform",
    subtitle: "Distributed Full-Stack Streaming Architecture",
    description: "Modern modular architecture decoupling client-side media playback, high-concurrency API/WebSockets, and Python AI microservices.",
    tech: ["React", "Node.js", "Express", "MongoDB", "FastAPI", "Socket.IO"],
    nodes: [
      {
        id: "react_app",
        name: "React Modern SPA",
        category: "Frontend Client",
        description: "Component-driven frontend featuring adaptive HLS video playback, dark glassmorphism aesthetic, and IndexedDB offline caching.",
        metrics: "Adaptive bitrate streaming",
      },
      {
        id: "api_gateway",
        name: "Express REST & WebSocket Gateway",
        category: "Gateway Tier",
        description: "Central backend managing authentication, media metadata routing, and real-time Socket.IO live stream chat.",
        metrics: "Sub-100ms real-time chat latency",
      },
      {
        id: "ai_service",
        name: "FastAPI Recommendation Engine",
        category: "AI Microservice",
        description: "Python FastAPI service computing personalized content embeddings and real-time trending feeds.",
        metrics: "High-throughput asynchronous inference",
      },
      {
        id: "db_cluster",
        name: "MongoDB Document Cluster",
        category: "Data Tier",
        description: "High-throughput document store for user profiles, media catalog, watch histories, and engagement metrics.",
        metrics: "Flexible schema for rich media metadata",
      },
    ],
    connections: [
      { from: "react_app", to: "api_gateway", label: "REST APIs & WebSocket" },
      { from: "api_gateway", to: "ai_service", label: "Inference Requests" },
      { from: "api_gateway", to: "db_cluster", label: "Mongoose ODM CRUD" },
    ],
  },
];

// ─── NAVIGATION SECTIONS ───────────────────────────────────────────────────────
export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "terminal", label: "Terminal" },
  { id: "architecture", label: "Architecture" },
  { id: "education", label: "Education" },
  { id: "recruiter", label: "Recruiter" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume Studio", isRoute: true, path: "/resume" },
];

// ─── RESUME SECTIONS VISIBILITY ────────────────────────────────────────────────
export const resumeSections = {
  summary: true,
  contact: true,
  skills: true,
  projects: true,
  education: true,
  experience: true,
  certifications: true,
  achievements: true,
  languages: true,
};


