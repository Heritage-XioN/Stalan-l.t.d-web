# Logo CSS Styling Guide - Stalan L.T.D

## Overview
This guide explains how the Stalan L.T.D logo is styled across the website and how to adjust its CSS properties for optimal visual hierarchy, responsive scaling, and professional appearance.

## Logo Component File Structure
**Location**: `/components/Logo.tsx`

The Logo component is a reusable React component that handles logo rendering across the entire website with support for multiple size variants and responsive behavior.

---

## Size Variants & CSS Dimensions

The Logo component uses four size variants, each with specific pixel dimensions and Tailwind container classes:

### 1. **Small (sm)** - Navbar & Compact Spaces
```typescript
sm: { image: 32, container: 'h-8' }
```
- **Image Width/Height**: 32px × 32px
- **Container Height**: 32px (Tailwind `h-8`)
- **Usage**: Mobile navigation, small sidebar logos
- **CSS Classes**: `h-8` (height: 2rem; 32px)
- **Text Visibility**: Hidden on mobile (uses `hidden sm:inline`)

### 2. **Medium (md)** - Default Navigation & Footer
```typescript
md: { image: 40, container: 'h-10' }
```
- **Image Width/Height**: 40px × 40px
- **Container Height**: 40px (Tailwind `h-10`)
- **Usage**: Primary Navbar logo, footer logo
- **CSS Classes**: `h-10` (height: 2.5rem; 40px)
- **Text Visibility**: "STALAN" text visible on tablets and up

### 3. **Large (lg)** - Legacy Large Size (Deprecated for Hero)
```typescript
lg: { image: 56, container: 'h-14' }
```
- **Image Width/Height**: 56px × 56px
- **Container Height**: 56px (Tailwind `h-14`)
- **Usage**: Former hero section (now replaced by "hero" variant)
- **CSS Classes**: `h-14` (height: 3.5rem; 56px)

### 4. **Hero (hero)** - Hero Section Responsive
```typescript
hero: { image: 80, container: 'h-20 sm:h-28 lg:h-32' }
```
- **Image Dimensions**: 80px × 80px (base)
- **Responsive Heights**:
  - **Mobile**: `h-20` (80px / 5rem)
  - **Tablet**: `sm:h-28` (112px / 7rem)
  - **Desktop**: `lg:h-32` (128px / 8rem)
- **Usage**: Hero section featured logo display
- **CSS Classes**: Responsive Tailwind breakpoint system

---

## Logo Container Styling

### Hero Section Container (Current Implementation)
**File**: `/components/HeroSection.tsx` (lines 115-127)

```jsx
<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
  className="p-3 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-cyan-400/10 border border-cyan-400/30 backdrop-blur-sm"
>
  <Logo size="hero" animated={false} />
</motion.div>
```

**Breakdown**:
- **Padding** (responsive):
  - Mobile: `p-3` (12px)
  - Tablet: `sm:p-4` (16px)
  - Desktop: `lg:p-5` (20px)
- **Border Radius** (responsive):
  - Mobile: `rounded-2xl` (16px)
  - Tablet: `sm:rounded-3xl` (24px)
- **Background**: Gradient overlay
  - `bg-gradient-to-br` - Bottom-right gradient direction
  - `from-white/10` - 10% white (light top-left)
  - `to-cyan-400/10` - 10% cyan (accent bottom-right)
- **Border**: `border border-cyan-400/30` (30% opacity cyan)
- **Backdrop**: `backdrop-blur-sm` (glassmorphism effect)
- **Animation**: Floating effect (`y: [0, -8, 0]`) over 3 seconds

---

## Logo Image Properties

### Next.js Image Component Configuration
**File**: `/components/Logo.tsx` (lines 37-49)

```jsx
<Image
  src="/logo.png"
  alt="Stalan L.T.D Logo"
  width={sizeMap[size].image}
  height={sizeMap[size].image}
  priority
  className="w-auto h-auto"
/>
```

**Key Properties**:
- **src**: `/logo.png` - Public folder reference
- **alt**: "Stalan L.T.D Logo" - Accessibility text
- **width/height**: Dynamic from `sizeMap` object
- **priority**: True (lazy loading disabled for above-the-fold)
- **className**: `w-auto h-auto` (maintains aspect ratio)

---

## Responsive Breakpoints & CSS Classes

The logo uses Tailwind's responsive prefix system to scale appropriately:

| Breakpoint | CSS Class Prefix | Width | Screen Size |
|-----------|-----------------|-------|------------|
| Mobile | Default | < 640px | Phone |
| Tablet | `sm:` | ≥ 640px | iPad |
| Desktop | `lg:` | ≥ 1024px | Laptop/Desktop |
| Wide | `xl:` | ≥ 1280px | Large monitors |

### Example - Hero Logo Container Responsive Classes:
```
p-3          sm:p-4          lg:p-5
(12px)       (16px)          (20px)
─────────────────────────────────────
Mobile       Tablet          Desktop
< 640px      640px-1023px    1024px+
```

---

## How to Adjust Logo Styling

### 1. **Change Logo Size in Hero Section**

**File**: `/components/HeroSection.tsx`

**Current** (Line 125):
```jsx
<Logo size="hero" animated={false} />
```

**Options**:
- `size="sm"` - 32px (too small for hero)
- `size="md"` - 40px (small, for compact hero)
- `size="lg"` - 56px (medium, former default)
- `size="hero"` - 80-128px responsive (current best practice)

### 2. **Adjust Hero Container Padding**

**File**: `/components/HeroSection.tsx` (Line 123)

**Current**:
```jsx
className="p-3 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl ..."
```

**To add more space around logo**:
```jsx
className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl ..."
// Mobile: 16px → 16px, Tablet: 16px → 24px, Desktop: 20px → 32px
```

**To reduce space**:
```jsx
className="p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl ..."
```

### 3. **Modify Border Radius (Roundness)**

**File**: `/components/HeroSection.tsx` (Line 123)

**Current** (Rounder corners):
```jsx
rounded-2xl sm:rounded-3xl
// 16px radius on mobile, 24px on tablet+
```

**For sharper corners** (more rectangular):
```jsx
rounded-lg sm:rounded-2xl
// 8px radius on mobile, 16px on tablet+
```

**For pill-shaped container** (maximum roundness):
```jsx
rounded-full
// 50% border radius, fully rounded
```

### 4. **Adjust Floating Animation**

**File**: `/components/HeroSection.tsx` (Lines 121-122)

**Current** (subtle 8px float):
```jsx
animate={{ y: [0, -8, 0] }}
transition={{ duration: 3, repeat: Infinity }}
```

**For more dramatic float** (20px movement, 4 seconds):
```jsx
animate={{ y: [0, -20, 0] }}
transition={{ duration: 4, repeat: Infinity }}
```

**For subtle float** (4px movement, 5 seconds):
```jsx
animate={{ y: [0, -4, 0] }}
transition={{ duration: 5, repeat: Infinity }}
```

**To disable animation**:
```jsx
<motion.div className="...">
  {/* Remove animate and transition props */}
</motion.div>
```

### 5. **Update Logo Colors for Different Themes**

**File**: `/components/Logo.tsx` (Lines 41-48)

To invert logo for light backgrounds:
```jsx
<Image
  src="/logo.png"
  alt="Stalan L.T.D Logo"
  width={sizeMap[size].image}
  height={sizeMap[size].image}
  priority
  className="w-auto h-auto invert" // Add invert filter
/>
```

### 6. **Adjust Navbar Logo Size**

**File**: `/components/Navbar.tsx` (Line 54)

**Current**:
```jsx
<Logo size="md" href="/" animated={true} />
```

**To make navbar logo larger**:
```jsx
<Logo size="lg" href="/" animated={true} />
```

**To make smaller**:
```jsx
<Logo size="sm" href="/" animated={true} />
```

---

## Aspect Ratio & Clarity

### Maintaining Perfect Aspect Ratio
The logo image uses `className="w-auto h-auto"` which ensures:
- ✓ Aspect ratio always 1:1 (square)
- ✓ No stretching or distortion
- ✓ Responsive scaling preserves clarity
- ✓ Works with any container size

### Image Optimization
- **Format**: PNG with transparency
- **Location**: `/public/logo.png`
- **Optimization**: Next.js Image component automatically:
  - Compresses on build
  - Serves optimized formats (WebP where supported)
  - Adds lazy loading (except with `priority={true}`)

---

## Visual Hierarchy Best Practices

### Current Implementation (Recommended)
1. **Logo** (80-128px) - Eye-catching brand mark
2. **Floating Badge** - "Founded 2024 · Nigeria"
3. **Headline** (text-5xl to text-7xl) - Main message
4. **Subheadline** (text-lg to text-xl) - Supporting text
5. **CTA Buttons** - Call-to-action

### Spacing Between Elements
```jsx
{/* Logo */}
<motion.div className="mb-6 sm:mb-8">...</motion.div>

{/* Badge */}
<motion.div className="mb-6">...</motion.div>

{/* Headline */}
<motion.h1 className="mb-6">...</motion.h1>

{/* Subheadline */}
<motion.p className="mb-8 sm:mb-12">...</motion.p>

{/* Buttons */}
<motion.div>...</motion.div>
```

---

## Mobile-First Responsive Design

The logo styling follows mobile-first principles:

1. **Mobile (320px - 639px)**
   - Logo: 80px × 80px (`h-20`)
   - Container padding: 12px (`p-3`)
   - Border radius: 16px (`rounded-2xl`)

2. **Tablet (640px - 1023px)**
   - Logo: 112px × 112px (`sm:h-28`)
   - Container padding: 16px (`sm:p-4`)
   - Border radius: 24px (`sm:rounded-3xl`)

3. **Desktop (1024px+)**
   - Logo: 128px × 128px (`lg:h-32`)
   - Container padding: 20px (`lg:p-5`)
   - Border radius: 24px (maintained)

---

## Testing Logo Responsiveness

### Browser DevTools Steps:
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at breakpoints:
   - **375px** (Mobile)
   - **768px** (Tablet)
   - **1024px** (Desktop)
   - **1440px** (Large Desktop)

### Checklist:
- [ ] Logo maintains square aspect ratio
- [ ] Logo doesn't overlap with other elements
- [ ] Text remains readable on all sizes
- [ ] Container padding looks balanced
- [ ] Floating animation is smooth
- [ ] No pixelation or blur at any size

---

## Files to Modify

To adjust logo styling, you'll interact with these files:

| File | Purpose | Lines |
|------|---------|-------|
| `/components/Logo.tsx` | Logo component definition & sizes | 1-62 |
| `/components/HeroSection.tsx` | Hero section logo placement | 115-127 |
| `/components/Navbar.tsx` | Navbar logo implementation | 54 |
| `/components/Footer.tsx` | Footer logo implementation | Line N/A |
| `/public/logo.png` | Logo image asset | N/A |

---

## Quick Reference: CSS Classes

### Spacing (Padding)
- `p-2` = 8px | `p-3` = 12px | `p-4` = 16px | `p-5` = 20px | `p-6` = 24px

### Border Radius
- `rounded-lg` = 8px | `rounded-2xl` = 16px | `rounded-3xl` = 24px | `rounded-full` = 50%

### Heights
- `h-8` = 32px | `h-10` = 40px | `h-14` = 56px | `h-20` = 80px | `h-28` = 112px | `h-32` = 128px

### Opacity
- `/10` = 10% opacity | `/20` = 20% opacity | `/30` = 30% opacity

---

## Support & Future Enhancements

For additional adjustments or to create custom size variants, edit the `sizeMap` object in `/components/Logo.tsx` and add your own responsive size configuration.
