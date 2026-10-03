# ColourPig

A high-performance modern web experience engineered with 3D WebGL visuals, fluid smooth scrolling, spring physics, and timeline motion orchestration.

## 🚀 Built With

- **[Next.js](https://nextjs.org/)** (App Router & React 19)
- **[Tailwind CSS v3.4](https://tailwindcss.com/)** + PostCSS & Autoprefixer
- **[Three.js](https://threejs.org/)** & **[@react-three/fiber](https://r3f.docs.pmnd.rs/)**
- **[@react-three/drei](https://github.com/pmndrs/drei)**
- **[Lenis](https://lenis.darkroom.engineering/)** Smooth Virtual Scrolling
- **[GSAP](https://greensock.com/gsap/)** & ScrollTrigger (synced to Lenis loop)
- **[Framer Motion v14](https://www.framer.com/motion/)** (Spring gestures & Layout transitions)
- **[Shadcn UI](https://ui.shadcn.com/)** Tokens & Radix UI Primitives
- **[TypeScript](https://www.typescriptlang.org/)**

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the experience.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
ColourPig/
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind v3 directives, design tokens, Lenis styles
│   │   ├── layout.tsx               # Root layout with SmoothScrollProvider & metadata
│   │   └── page.tsx                 # Main showcase page
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── scene-3d.tsx         # Three.js / R3F interactive 3D WebGL canvas
│   │   │   └── scene-wrapper.tsx    # SSR-safe dynamic loader
│   │   ├── icons/
│   │   │   └── github-icon.tsx      # SVG icon component
│   │   ├── navigation/
│   │   │   ├── navbar.tsx           # Glassmorphic header
│   │   │   └── footer.tsx           # Footer
│   │   ├── providers/
│   │   │   └── smooth-scroll-provider.tsx  # Lenis + GSAP ScrollTrigger ticker integration
│   │   ├── sections/
│   │   │   ├── hero-section.tsx     # Hero banner with embedded 3D scene
│   │   │   ├── gsap-showcase.tsx    # GSAP scroll-triggered stagger animation
│   │   │   └── motion-playground.tsx # Interactive Framer Motion spring playground
│   │   └── ui/
│   │       ├── badge.tsx            # Shadcn Badge
│   │       ├── button.tsx           # Shadcn Button (with glow & glass variants)
│   │       └── card.tsx             # Shadcn Card
│   └── lib/
│       └── utils.ts                 # Shadcn cn() helper (clsx + tailwind-merge)
├── components.json                  # Shadcn configuration
├── tailwind.config.ts               # Tailwind CSS v3 theme tokens & animations
└── postcss.config.mjs               # PostCSS configuration
```
