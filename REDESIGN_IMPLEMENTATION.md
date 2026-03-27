# Stalan L.T.D Website Redesign Implementation Guide

## Completed Work

### 1. Design System (globals.css)
- Added Syne font for headings, JetBrains Mono for accents
- Implemented light/dark mode color system
- Light: #FAFAFA background, #0A0A0A text, #C8F135 accent (lime)
- Dark: #080808 background, #F5F5F5 text, #C8F135 accent
- Added lime underline animation keyframes

### 2. StalanLogo Component (/components/StalanLogo.tsx)
- Styled text logo using Syne font
- Automatically adapts to light/dark mode
- Ready for SVG image swap in future

### 3. Navbar (/components/Navbar.tsx) - REDESIGNED
- Light/dark mode toggle (Sun/Moon icons)
- Animated underline on nav links (slides in on hover)
- Sharp-corner CTA button with lime hover state
- Frosted glass effect on scroll (backdrop-blur-xl)
- Full-screen mobile overlay menu with staggered animations
- Smooth transitions between themes

---

## Implementation Guide for Remaining Sections

### Hero Section (/components/HeroSection.tsx)

**Key Changes Needed:**

1. **Ticker/Marquee at Top**
   ```tsx
   // Add above navbar, full width
   <div className="fixed top-0 left-0 right-0 h-8 bg-[#C8F135] dark:bg-[#C8F135] z-40">
     <motion.div className="flex gap-4 animate-marquee">
       <span className="font-mono text-[#0A0A0A] text-xs">SC-STATIC</span>
       <span>·</span>
       <span className="font-mono text-[#0A0A0A] text-xs">DRONE TECHNOLOGY</span>
       {/* ... repeat 2x for seamless loop */}
     </motion.div>
   </div>
   ```

2. **Layout: 60/40 Split**
   - Left (60%): Heading "ADVANCING TECHNOLOGY FOR HUMANITY" with clip-path reveal animation
   - Right (40%): Rotating ring with stats inside

3. **Left Side Heading**
   ```tsx
   // Split into 3 lines with staggered reveal
   <h1 className="text-9xl font-['Syne'] font-black text-[#0A0A0A] dark:text-[#F5F5F5] leading-[0.9]">
     ADVANCING
   </h1>
   <h1 className="text-9xl font-['Syne'] font-black text-[#0A0A0A] dark:text-[#F5F5F5] leading-[0.9] opacity-20">
     TECHNOLOGY <!-- stroke only, no fill -->
   </h1>
   <h1 className="text-9xl font-['Syne'] font-black text-[#0A0A0A] dark:text-[#F5F5F5] leading-[0.9]">
     FOR HUMANITY
   </h1>
   ```

4. **Right Side Rotating Ring**
   ```tsx
   // CSS rotation animation
   <div className="animate-spin" style={{ animationDuration: '20s' }}>
     <div className="w-64 h-64 border-2 border-dashed border-[#0A0A0A] dark:border-[#F5F5F5] rounded-full" />
   </div>
   // Inside ring: vertical stat numbers in JetBrains Mono
   <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 text-center">
     <div className="font-['JetBrains Mono'] text-4xl font-bold">03<div className="text-xs">Co-founders</div></div>
     <div className="font-['JetBrains Mono'] text-4xl font-bold">2024<div className="text-xs">Founded</div></div>
     <div className="font-['JetBrains Mono'] text-4xl font-bold">06<div className="text-xs">Channels</div></div>
   </div>
   ```

5. **Animations**
   - Headline: Use Framer Motion `whileInView` with clip-path reveal
   - Stats: Count up animation with `useMotionValue`
   - Ring: Pure CSS `animation: spin 20s linear infinite`

---

### Products Section (/components/ProductShowcase.tsx)

**Change from card grid to expandable rows:**

```tsx
// Each product is full-width row
{products.map((product, i) => (
  <motion.div
    layoutId={`product-${i}`}
    className="border-b border-[#E8E8E8] dark:border-[#222222] p-8 cursor-pointer group"
    onClick={() => setExpanded(expanded === i ? null : i)}
    whileHover={{ backgroundColor: '#C8F135' }}
  >
    {/* Collapsed: Left-Center-Right layout */}
    <div className="flex items-center justify-between">
      <span className="font-['JetBrains Mono'] text-5xl font-bold text-[#0A0A0A] dark:text-[#F5F5F5]">
        {String(i + 1).padStart(2, '0')}
      </span>
      <h3 className="font-['Syne'] text-3xl font-bold flex-1 text-center">
        {product.name}
      </h3>
      <span className="text-sm text-[#555555] dark:text-[#888888]">
        {product.category}
      </span>
    </div>

    {/* Expanded */}
    {expanded === i && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
        <p className="text-[#555555] dark:text-[#888888] mb-4">{product.description}</p>
        <Link href={`/products/${product.slug}`} className="text-[#C8F135] font-medium">
          View Product →
        </Link>
      </motion.div>
    )}
  </motion.div>
))}
```

---

### Services Section (Bento Grid)

**Unequal mosaic layout:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Large featured card - spans 2 columns */}
  <motion.div
    className="col-span-1 md:col-span-2 row-span-2 p-8 bg-[#FFFFFF] dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#222222] cursor-pointer group"
    whileHover={{ rotateY: 180 }} // 3D flip
    transition={{ duration: 0.6 }}
  >
    <h3 className="font-['Syne'] text-3xl font-bold mb-4">{services[0].name}</h3>
    <p className="text-[#555555] dark:text-[#888888]">{services[0].description}</p>
  </motion.div>

  {/* Smaller cards */}
  {services.slice(1).map(service => (
    <motion.div
      key={service.id}
      className="p-6 bg-[#FFFFFF] dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#222222]"
      whileHover={{
        backgroundColor: '#0A0A0A',
        color: '#F5F5F5',
        borderColor: '#C8F135'
      }}
    >
      <h4 className="font-['Syne'] font-bold">{service.name}</h4>
    </motion.div>
  ))}
</div>
```

---

### Mission Statement Section

**Scroll-driven scale transform:**

```tsx
<section className="h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#080808]">
  <motion.p
    className="text-7xl font-['Syne'] font-bold text-center max-w-4xl text-[#0A0A0A] dark:text-[#F5F5F5]"
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    To advance modern technology by engineering purposeful,{' '}
    <span className="relative">
      next-generation solutions
      <motion.span
        className="absolute bottom-2 left-0 h-1 bg-[#C8F135]"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </span>
    {' '}that enable humanity to embrace the right tools for a sustainable future.
  </motion.p>
</section>
```

---

### About Page Improvements

1. **Hero**: Just massive "ABOUT" title with thin horizontal rule
2. **Timeline**: Vertical line center, alternating cards left/right
3. **Team**: Tall portrait cards with hover overlay reveal

---

### Contact Page Styling

**Minimal design:**

```tsx
<div className="grid grid-cols-2 gap-12">
  {/* Left */}
  <div>
    <h1 className="text-7xl font-['Syne'] font-black mb-8">Let's Talk.</h1>
    <p className="text-sm text-[#555555] dark:text-[#888888]">@stalanlltd on LinkedIn</p>
    <p className="text-sm text-[#555555] dark:text-[#888888]">Lagos, Nigeria</p>
  </div>

  {/* Right - Form with floating labels */}
  <form className="space-y-8">
    <div className="relative">
      <input
        type="text"
        placeholder=" "
        className="w-full bg-transparent border-b border-[#E8E8E8] dark:border-[#222222] pb-2 focus:border-[#C8F135] outline-none transition-colors"
      />
      <label className="absolute text-sm text-[#555555] dark:text-[#888888] transition-all pointer-events-none peer-placeholder-shown:translate-y-2">
        Full Name
      </label>
    </div>
    {/* Repeat for other fields */}
    <button className="w-full bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] py-3 font-semibold relative overflow-hidden">
      <motion.span
        className="absolute inset-0 bg-[#C8F135]"
        initial={{ x: '-100%' }}
        whileHover={{ x: '0%' }}
        transition={{ duration: 0.3 }}
      />
      Send Message →
    </button>
  </form>
</div>
```

---

### Footer (Black Always)

```tsx
<footer className="bg-[#0A0A0A] text-white relative overflow-hidden">
  {/* Watermark */}
  <div className="absolute inset-0 text-[20vw] font-['Syne'] font-black opacity-5 pointer-events-none">
    STALAN
  </div>

  {/* Content grid */}
  <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
    <div className="grid grid-cols-3 gap-12 mb-12">
      {/* Links, Products, Connect sections */}
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10 pt-8 flex justify-between text-sm text-[#888888]">
      <span>© 2025 Stalan L.T.D</span>
      <a href="https://linkedin.com/company/stalan-ltd">LinkedIn →</a>
    </div>
  </div>
</footer>
```

---

## Global Animation Rules

1. **Custom Ease**: Use `[0.16, 1, 0.3, 1]` throughout
2. **Page Transitions**: Clip-path wipe from top
3. **Scroll Reveals**: `whileInView={{ /* end state */ }} viewport={{ once: true }}`
4. **No Skeleton Loaders**: Use elegant fade-ins with `initial={{ opacity: 0 }}`
5. **Number Count-ups**: Use `useMotionValue` + `useTransform`
6. **Stagger**: 0.08s between children

---

## Color Quick Reference

| Element | Light | Dark |
|---------|-------|------|
| Background | #FAFAFA | #080808 |
| Text Primary | #0A0A0A | #F5F5F5 |
| Text Secondary | #555555 | #888888 |
| Border | #E8E8E8 | #222222 |
| Accent (Lime) | #C8F135 | #C8F135 |
| Surface Card | #FFFFFF | #111111 |

---

## Font Usage

- **Syne**: All headings (h1–h6)
- **Inter**: Body text, labels
- **JetBrains Mono**: Numbers, codes, tags, stats

---

This redesign maintains all existing functionality while providing a completely fresh, premium visual layer aligned with 2026 design trends.
