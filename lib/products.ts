export type Product = {
  id: string;
  name: string;
  slug: string;
  badge: string;
  category: string;
  description: string;
  shortDescription: string;
  tags: string[];
  icon: string;
  imagePlaceholder: string;
  imageLabel: string;
  fullContent?: {
    operationalLogic?: {
      title: string;
      features: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
    keyDifferentiators?: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    relatedProducts?: string[];
  };
};

export const products: Product[] = [
  {
    id: '1',
    name: 'SC-STATIC',
    slug: 'sc-static',
    badge: 'Active Development',
    category: 'Electrical Safety',
    description: 'An autonomous MultiZone Residual Current Device (RCD) designed to modernize electrical safety for homes, businesses, and marine vessels using 6-Channel Isolation Architecture.',
    shortDescription: 'Advanced RCD with 6-channel isolation architecture for modernized electrical safety.',
    tags: ['RCD', 'Electrical Safety', 'IoT', 'Smart'],
    icon: 'shield',
    imagePlaceholder: 'Fig 1.1',
    imageLabel: 'Fig 1.1 — PCB Design of SC-STATIC',
    fullContent: {
      operationalLogic: {
        title: 'Operational Logic',
        features: [
          {
            title: 'Life Safety (Shock Protection)',
            description: '30mA residual current monitoring to protect against electric shock hazards in residential and commercial installations.',
            icon: 'zap',
          },
          {
            title: 'Asset Safety (Voltage Protection)',
            description: 'Automatic circuit cut at voltages below 150V or above 250V to prevent equipment damage and maintain system stability.',
            icon: 'activity',
          },
          {
            title: 'Business Continuity',
            description: 'Zone isolation prevents total blackout, allowing critical systems to remain operational during partial failures.',
            icon: 'layers',
          },
        ],
      },
      keyDifferentiators: [
        {
          title: 'Zone-Based Isolation',
          description: '6 independent channels enabling granular control and redundancy across different electrical zones.',
          icon: 'network',
        },
        {
          title: 'Smart Monitoring',
          description: 'Real-time voltage and current analysis for predictive maintenance and system insights.',
          icon: 'radar',
        },
        {
          title: 'Retrofit Friendly',
          description: 'Split-core sensors enable installation without cable disconnection, reducing downtime.',
          icon: 'wrench',
        },
      ],
      relatedProducts: ['drone-technology', 'smart-home'],
    },
  },
  {
    id: '2',
    name: 'Drone Technology',
    slug: 'drone-technology',
    badge: 'In Planning',
    category: 'Logistics & UAV',
    description: 'Revolutionizing logistics through faster, cost-efficient last-mile delivery and warehouse automation using UAVs that bypass traffic and geographical barriers.',
    shortDescription: 'UAV-powered logistics for efficient last-mile delivery and automation.',
    tags: ['UAV', 'Logistics', 'Delivery', 'Automation'],
    icon: 'drone',
    imagePlaceholder: 'Fig 1.2',
    imageLabel: 'Fig 1.2 — Stalan Team on Drone Technology',
    fullContent: {
      keyDifferentiators: [
        {
          title: 'Traffic-Independent Delivery',
          description: 'Bypass congestion and geographical barriers for faster delivery times.',
          icon: 'map-pin',
        },
        {
          title: 'Cost-Efficient Operations',
          description: 'Reduced fuel consumption and labor costs compared to traditional logistics.',
          icon: 'dollar-sign',
        },
        {
          title: 'Warehouse Automation',
          description: 'Autonomous inventory management and goods transfer within facilities.',
          icon: 'package',
        },
      ],
      relatedProducts: ['autonomous-vehicles', 'artificial-intelligence'],
    },
  },
  {
    id: '3',
    name: 'Smart Home Technology',
    slug: 'smart-home',
    badge: 'Upcoming',
    category: 'Home Automation',
    description: 'An integrated system using connected devices, sensors, and software to automate and control household functions including lighting, security, climate, and energy management.',
    shortDescription: 'Integrated smart home automation for lighting, security, climate, and energy.',
    tags: ['Smart Home', 'IoT', 'Automation', 'Energy'],
    icon: 'home',
    imagePlaceholder: 'Fig 1.3',
    imageLabel: 'Fig 1.3 — Smart Home Characteristics',
    fullContent: {
      keyDifferentiators: [
        {
          title: 'Unified Control',
          description: 'Single platform to manage all smart home devices seamlessly.',
          icon: 'settings',
        },
        {
          title: 'Energy Optimization',
          description: 'AI-driven algorithms for reducing energy consumption and costs.',
          icon: 'battery',
        },
        {
          title: 'Security Integration',
          description: 'Comprehensive security monitoring with automated response systems.',
          icon: 'lock',
        },
      ],
      relatedProducts: ['sc-static', 'artificial-intelligence'],
    },
  },
  {
    id: '4',
    name: 'Autonomous Vehicles',
    slug: 'autonomous-vehicles',
    badge: 'Research Phase',
    category: 'Transportation',
    description: 'Advanced autonomous vehicle research aimed at safer, smarter, and more efficient transportation solutions for tomorrow.',
    shortDescription: 'Next-generation autonomous vehicles for safer and efficient transportation.',
    tags: ['AI', 'Autonomous', 'Transport'],
    icon: 'car',
    imagePlaceholder: 'Fig 1.4',
    imageLabel: 'Fig 1.4 — Autonomous Vehicle Prototype',
    fullContent: {
      keyDifferentiators: [
        {
          title: 'Advanced AI Navigation',
          description: 'Machine learning-powered systems for intelligent route planning and obstacle avoidance.',
          icon: 'brain',
        },
        {
          title: 'Safety First',
          description: 'Multiple redundant systems ensuring safe operation in complex environments.',
          icon: 'shield-check',
        },
        {
          title: 'Sustainable Transport',
          description: 'Electric-powered with zero emissions for environmentally conscious mobility.',
          icon: 'leaf',
        },
      ],
      relatedProducts: ['drone-technology', 'artificial-intelligence'],
    },
  },
  {
    id: '5',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    badge: 'Ongoing',
    category: 'AI & ML',
    description: 'Continuous AI advancements integrated across all Stalan product lines to enable smarter, more adaptive technology.',
    shortDescription: 'AI integration across all Stalan products for intelligent automation.',
    tags: ['AI', 'Machine Learning', 'Deep Learning'],
    icon: 'zap',
    imagePlaceholder: 'Fig 1.5',
    imageLabel: 'Fig 1.5 — AI Architecture Overview',
    fullContent: {
      keyDifferentiators: [
        {
          title: 'Predictive Analytics',
          description: 'Harness data to predict failures and optimize system performance proactively.',
          icon: 'trending-up',
        },
        {
          title: 'Adaptive Learning',
          description: 'Systems that learn from user behavior to improve efficiency over time.',
          icon: 'refresh-cw',
        },
        {
          title: 'Cross-Product Integration',
          description: 'Unified AI backbone enabling seamless interaction between all Stalan products.',
          icon: 'link-2',
        },
      ],
      relatedProducts: ['sc-static', 'drone-technology', 'smart-home'],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
