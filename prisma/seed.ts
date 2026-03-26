import { prisma } from '../lib/prisma'

async function main() {
  // Clear existing data
  await prisma.product.deleteMany()
  await prisma.service.deleteMany()
  await prisma.teamMember.deleteMany()

  // Seed Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        slug: 'sc-static',
        name: 'SC-STATIC',
        category: 'Electrical Safety',
        status: 'Active Development',
        description: 'An autonomous MultiZone Residual Current Device (RCD) designed to modernize electrical safety for homes, businesses, and marine vessels using 6-Channel Isolation Architecture.',
        features: [
          { title: 'Life Safety', description: '30mA residual current monitoring' },
          { title: 'Asset Safety', description: 'Auto cut at <150V or >250V' },
          { title: 'Business Continuity', description: 'Zone isolation prevents total blackout' }
        ],
        tags: ['RCD', 'Electrical Safety', 'IoT', 'Smart'],
        order: 1,
        published: true
      }
    }),
    prisma.product.create({
      data: {
        slug: 'drone-technology',
        name: 'Drone Technology',
        category: 'Logistics & UAV',
        status: 'In Planning',
        description: 'Revolutionizing logistics through faster, cost-efficient last-mile delivery and warehouse automation using UAVs that bypass traffic and geographical barriers.',
        features: [
          { title: 'Last-Mile Delivery', description: 'Fast, efficient package delivery' },
          { title: 'Warehouse Automation', description: 'Streamlined inventory management' },
          { title: 'Geographic Flexibility', description: 'Bypass traffic and terrain barriers' }
        ],
        tags: ['UAV', 'Logistics', 'Delivery', 'Automation'],
        order: 2,
        published: true
      }
    }),
    prisma.product.create({
      data: {
        slug: 'smart-home',
        name: 'Smart Home Technology',
        category: 'Home Automation',
        status: 'Upcoming',
        description: 'An integrated system using connected devices, sensors, and software to automate and control household functions including lighting, security, climate, and energy management.',
        features: [
          { title: 'Smart Lighting', description: 'Automated lighting control' },
          { title: 'Security', description: 'Advanced security monitoring' },
          { title: 'Energy Management', description: 'Optimize energy consumption' }
        ],
        tags: ['Smart Home', 'IoT', 'Automation', 'Energy'],
        order: 3,
        published: true
      }
    }),
    prisma.product.create({
      data: {
        slug: 'autonomous-vehicles',
        name: 'Autonomous Vehicles',
        category: 'Transportation',
        status: 'Research Phase',
        description: 'Advanced autonomous vehicle research aimed at safer, smarter, and more efficient transportation solutions for tomorrow.',
        features: [
          { title: 'Safety', description: 'Advanced safety protocols' },
          { title: 'Intelligence', description: 'AI-powered decision making' },
          { title: 'Efficiency', description: 'Optimized routing and fuel efficiency' }
        ],
        tags: ['AI', 'Autonomous', 'Transport'],
        order: 4,
        published: true
      }
    }),
    prisma.product.create({
      data: {
        slug: 'artificial-intelligence',
        name: 'Artificial Intelligence',
        category: 'AI & ML',
        status: 'Ongoing',
        description: 'Continuous AI advancements integrated across all Stalan product lines to enable smarter, more adaptive technology.',
        features: [
          { title: 'Machine Learning', description: 'Adaptive learning systems' },
          { title: 'Deep Learning', description: 'Neural network implementations' },
          { title: 'Integration', description: 'Cross-product AI integration' }
        ],
        tags: ['AI', 'Machine Learning', 'Deep Learning'],
        order: 5,
        published: true
      }
    })
  ])

  // Seed Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Marine Logistics',
        description: 'Local and global logistics solutions including third-party shipping, marine logistics, planning, port and terminal services, distribution and operations management.',
        iconName: 'anchor',
        order: 1,
        published: true
      }
    }),
    prisma.service.create({
      data: {
        name: 'Design & Development',
        description: 'Blueprints, layouts, specifications, and CAD drawings for infrastructure (roads, bridges) or products.',
        iconName: 'compass',
        order: 2,
        published: true
      }
    }),
    prisma.service.create({
      data: {
        name: 'Consultation & Analysis',
        description: 'Expert advice, feasibility studies, and safety inspections from licensed professionals.',
        iconName: 'chartBar',
        order: 3,
        published: true
      }
    }),
    prisma.service.create({
      data: {
        name: 'Project Management & Supervision',
        description: 'Overseeing construction, ensuring code compliance, and managing Engineering, Procurement, and Construction (EPC) tasks.',
        iconName: 'clipboardList',
        order: 4,
        published: true
      }
    }),
    prisma.service.create({
      data: {
        name: 'Technical Support',
        description: 'Specialized knowledge in mechanical, electrical, civil, and software engineering.',
        iconName: 'wrench',
        order: 5,
        published: true
      }
    }),
    prisma.service.create({
      data: {
        name: 'Software & Systems Engineering',
        description: 'Designing software for automation, control systems, and IT infrastructure.',
        iconName: 'code',
        order: 6,
        published: true
      }
    })
  ])

  // Seed Team Members
  const team = await Promise.all([
    prisma.teamMember.create({
      data: {
        name: 'Ogu Chidiebube Victory',
        role: 'Founder & CEO',
        title: 'Chief Executive Officer',
        bio: 'Visionary leader driving Stalan towards next-generation technology innovation.',
        linkedin: 'https://linkedin.com/in/ogu-chidiebube-victory',
        order: 1
      }
    }),
    prisma.teamMember.create({
      data: {
        name: 'Obianayo Victor Chiemerie',
        role: 'Co-Founder & DOM',
        title: 'Director of Marketing',
        bio: 'Strategic marketer shaping Stalan\'s market presence and brand identity.',
        linkedin: 'https://linkedin.com/in/obianayo-victor-chiemerie',
        order: 2
      }
    }),
    prisma.teamMember.create({
      data: {
        name: 'Israel-Ogiribo Gideon Oghene-Kevwe',
        role: 'Co-Founder & COO',
        title: 'Chief Operating Officer',
        bio: 'Operations expert ensuring seamless execution of Stalan\'s strategic initiatives.',
        linkedin: 'https://linkedin.com/in/israel-ogiribo-gideon',
        order: 3
      }
    })
  ])

  console.log('Seeding completed!')
  console.log(`Created ${products.length} products`)
  console.log(`Created ${services.length} services`)
  console.log(`Created ${team.length} team members`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
