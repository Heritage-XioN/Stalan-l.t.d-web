# Stalan L.T.D — Next-Generation Technology Platform

A modern, full-stack Next.js website for Stalan L.T.D, a multi-disciplinary technology firm advancing safe, purposeful innovation for humanity.

## Overview

Stalan L.T.D is committed to engineering next-generation solutions across multiple domains:
- **SC-STATIC**: Advanced RCD with 6-channel isolation architecture for electrical safety
- **Drone Technology**: Autonomous logistics and delivery solutions
- **Smart Home Systems**: Integrated automation and control systems
- **AI & Machine Learning**: Continuous intelligence across all product lines
- **Autonomous Vehicles**: Advanced transportation research and development

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Auth**: Custom httpOnly cookie-based authentication
- **Deployment**: Vercel + Neon (serverless Postgres)

## Project Structure

```
stalan-ltd/
├── app/
│   ├── (public routes)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About page
│   │   ├── products/page.tsx     # Products listing
│   │   ├── products/[slug]/      # Product detail (dynamic)
│   │   ├── services/page.tsx     # Services overview
│   │   ├── contact/page.tsx      # Contact form
│   │   └── layout.tsx            # Root layout with Navbar/Footer
│   ├── admin/                    # Protected admin dashboard
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── messages/page.tsx     # Contact form submissions
│   │   ├── products/page.tsx     # Product management
│   │   ├── services/page.tsx     # Service management
│   │   ├── team/page.tsx         # Team management
│   │   ├── newsletter/page.tsx   # Newsletter subscribers
│   │   ├── login/page.tsx        # Admin login
│   │   └── layout.tsx            # Admin layout with sidebar
│   ├── api/
│   │   ├── products/             # Public product APIs
│   │   ├── services/             # Public services API
│   │   ├── team/                 # Public team API
│   │   ├── newsletter/           # Newsletter subscription
│   │   ├── contact/              # Contact form submission
│   │   ├── admin/                # Protected admin APIs
│   │   └── auth/                 # Authentication APIs
│   └── globals.css               # Global styles & design tokens
├── components/
│   ├── Navbar.tsx                # Main navigation
│   ├── Footer.tsx                # Site footer
│   ├── HeroSection.tsx           # Homepage hero
│   ├── StatsBar.tsx              # Statistics display
│   ├── ProductShowcase.tsx       # Featured products
│   ├── MissionBanner.tsx         # Mission statement
│   ├── ServicesTeaser.tsx        # Services preview
│   ├── AboutTeaser.tsx           # About section preview
│   ├── NewsletterStrip.tsx       # Newsletter signup
│   ├── CTASection.tsx            # Call to action
│   ├── ContactForm.tsx           # Contact form component
│   ├── LoadingSkeleton.tsx       # Loading state UI
│   ├── about/                    # About page components
│   ├── admin/                    # Admin components
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── products.ts               # Product data
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding script
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database (local or cloud provider like Neon)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd stalan-ltd

# Install dependencies
pnpm install
# or
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/stalan_db` |
| `ADMIN_PASSWORD` | Admin dashboard password | `your-secure-password` |
| `NEXT_PUBLIC_SITE_URL` | Website URL for links | `http://localhost:3000` |

### 3. Database Setup

```bash
# Run migrations
pnpm prisma migrate dev --name init

# Seed database with sample data
pnpm prisma db seed
```

### 4. Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Public Pages

- **Homepage**: Hero section with animated stats, product showcase, mission statement, services teaser, and newsletter signup
- **Products Page**: Grid of all 5 products with filtering and detailed pages for each
- **Services Page**: Complete list of 6 engineering services with descriptions
- **About Page**: Company story, timeline, leadership team, and credentials
- **Contact Page**: Contact form with email validation, pre-filled fields, and API integration

### Admin Dashboard (Protected)

- **Authentication**: Password-based login with httpOnly cookies
- **Dashboard Overview**: Key metrics and statistics
- **Message Management**: View, mark as read, and delete contact form submissions
- **Product Management**: Full CRUD operations for products
- **Service Management**: Add, edit, and manage services
- **Team Management**: Manage leadership team information
- **Newsletter Management**: View and manage subscribers

### API Endpoints

**Public APIs:**
- `GET /api/products` — All published products (sorted by order)
- `GET /api/products/[slug]` — Single product details
- `GET /api/services` — All published services
- `GET /api/team` — All team members
- `POST /api/newsletter` — Subscribe to newsletter
- `POST /api/contact` — Submit contact form

**Admin APIs (Protected):**
- `GET /api/admin/messages` — All contact messages
- `PATCH /api/admin/messages/[id]` — Mark message as read
- `DELETE /api/admin/messages/[id]` — Delete message
- `GET /api/admin/products` — Get all products
- `POST /api/admin/products` — Create product
- `PATCH /api/admin/products/[id]` — Update product
- `DELETE /api/admin/products/[id]` — Delete product
- Similar endpoints for services, team, and newsletter

## Database Schema

### Core Models

**ContactMessage**
- id, name, email, company, subject, message
- read (Boolean), createdAt, updatedAt

**Product**
- id, slug (unique), name, category, status, description
- features (JSON), tags (array), imageUrl, order, published
- createdAt, updatedAt

**Service**
- id, name, description, iconName, order, published
- createdAt, updatedAt

**TeamMember**
- id, name, role, title, bio, imageUrl
- linkedin, order, createdAt, updatedAt

**NewsletterSubscriber**
- id, email (unique), createdAt

## Deployment

### Vercel + Neon Postgres

1. **Create Neon Database**
   - Sign up at [neon.tech](https://neon.tech)
   - Create new project and copy connection string

2. **Deploy to Vercel**
   - Push code to GitHub
   - Connect GitHub repo to Vercel project
   - Add `DATABASE_URL` and `ADMIN_PASSWORD` to Environment Variables
   - Deploy

3. **Run Migrations**
   ```bash
   # Run in Vercel deployment or locally with production DB
   pnpm prisma migrate deploy
   pnpm prisma db seed
   ```

### Environment Variables for Production

```
DATABASE_URL=postgresql://...neon.tech/...
ADMIN_PASSWORD=your-secure-admin-password-min-12-chars
NEXT_PUBLIC_SITE_URL=https://stalan.ltd
NODE_ENV=production
```

## Design System

### Color Palette
- **Primary Dark**: `#0A1628` (navy)
- **Primary Blue**: `#1A4FBF` (brand blue)
- **Accent Cyan**: `#00C2FF` (cyan)
- **Light Background**: `#F0F4FF` (light)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, sizes 2xl-5xl
- **Body**: Regular, 14-16px, 1.5-1.6 line-height

### Components
All UI components use shadcn/ui with custom Stalan theming. Key components:
- Button, Card, Input, Dialog, Table, Badge, Switch, Spinner
- Custom: Navbar, Footer, ProductCard, ServiceCard, TeamCard

## Development Guidelines

### Adding a New Page

1. Create file in `app/[section]/page.tsx`
2. Add metadata export for SEO
3. Wrap client-side logic in separate client components
4. Add `id="main-content"` to main element for accessibility

### Adding Products/Services/Team

Update via admin dashboard or directly seed database:
```typescript
// Update prisma/seed.ts with new data
await prisma.product.create({ data: { ... } })
```

### API Route Protection

Admin routes check for ADMIN_SECRET cookie:
```typescript
const admin = req.cookies.get('ADMIN_SECRET')?.value
if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

## Performance & Best Practices

- **Images**: Use Next.js Image component with proper sizing
- **Code Splitting**: Components auto-split at route boundaries
- **Animations**: Framer Motion with `whileInView` for scroll triggers
- **SEO**: Metadata on all pages, structured data ready
- **Accessibility**: Focus rings, skip links, ARIA labels, reduced motion support
- **Security**: Security headers, XSS protection, CSRF tokens on forms

## Troubleshooting

**Database Connection Error**
- Verify `DATABASE_URL` is correct
- Check network/firewall rules for remote databases
- Ensure PostgreSQL service is running

**Admin Login Not Working**
- Confirm `ADMIN_PASSWORD` is set in `.env.local`
- Check browser console for cookie errors
- Clear cookies and try again

**Images Not Loading**
- Verify image URLs in admin dashboard
- Check `remotePatterns` in `next.config.mjs`
- Use placeholder images from public folder

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

© 2025 Stalan L.T.D. All rights reserved.

## Support

For issues, questions, or feature requests, please contact:
- **Email**: contact@stalan.ltd
- **LinkedIn**: [linkedin.com/company/stalan-ltd](https://linkedin.com/company/stalan-ltd)
- **Website**: [stalan.ltd](https://stalan.ltd)

---

**Built with next-generation technology for humanity.**
