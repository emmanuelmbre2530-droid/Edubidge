import { EducationLevel, ExplanationStyle, SubjectOption } from '../types';

export const EDUCATION_LEVELS: { id: EducationLevel; label: string; desc: string; badge: string }[] = [
  {
    id: 'Secondary School',
    label: 'Secondary School (JSS/SSS)',
    desc: 'Foundational concepts, clear core principles, building confidence',
    badge: 'JSS / SSS',
  },
  {
    id: 'WAEC/NECO Preparation',
    label: 'WAEC / NECO Preparation',
    desc: 'O-Level syllabus focus, past question style, exam definitions',
    badge: 'WAEC / NECO / JAMB',
  },
  {
    id: 'ND/HND',
    label: 'ND / HND (Polytechnic)',
    desc: 'Practical technical applications, vocational & industrial perspective',
    badge: 'Polytechnic',
  },
  {
    id: 'University',
    label: 'University (Undergraduate)',
    desc: 'In-depth theoretical rigor, analytical depth, scientific models',
    badge: 'Higher Ed',
  },
];

export const EXPLANATION_STYLES: { id: ExplanationStyle; label: string; tag: string; description: string }[] = [
  {
    id: 'Everyday Nigerian Examples',
    label: 'Everyday Nigerian Examples',
    tag: '🇳🇬 Cultural & Local Analogies',
    description: 'Relatable examples from Akwa Ibom & Nigeria (markets, cooking afang, generators, keke trips)',
  },
  {
    id: 'Step-by-step',
    label: 'Step-by-step Breakdown',
    tag: '🪜 Numbered & Logical',
    description: 'Systematic progression breaking complex mechanics into simple sequential building blocks',
  },
  {
    id: 'Simple English',
    label: 'Simple English',
    tag: '📖 Plain Language',
    description: 'Clean vocabulary without unnecessary jargon, immediate plain-word definitions',
  },
];

export const SUBJECTS: SubjectOption[] = [
  {
    id: 'biology',
    name: 'Biology',
    icon: 'Leaf',
    category: 'Sciences',
    popularTopics: [
      'Photosynthesis',
      'Cell Division (Mitosis vs Meiosis)',
      'Osmosis and Diffusion',
      'Mendelian Genetics & Inheritance',
      'Human Digestive System',
      'Pollination and Fertilization in Plants',
    ],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Calculator',
    category: 'Sciences',
    popularTopics: [
      'Fractions, Decimals and Percentages',
      'Quadratic Equations',
      'Simultaneous Linear Equations',
      'Circle Theorems',
      'Trigonometric Ratios (SOHCAHTOA)',
      'Statistics: Mean, Median, Mode & Variance',
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Zap',
    category: 'Sciences',
    popularTopics: [
      "Ohm's Law and Electric Circuits",
      "Newton's Three Laws of Motion",
      'Work, Energy and Power',
      'Electromagnetic Induction',
      'Refraction and Lenses',
      'Thermal Heat Expansion and Specific Heat',
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'FlaskConical',
    category: 'Sciences',
    popularTopics: [
      'Periodic Table and Periodic Trends',
      'Acids, Bases and Salts',
      'Organic Chemistry: Hydrocarbons (Alkanes, Alkenes)',
      'The Mole Concept & Stoichiometry',
      'Chemical Bonding (Ionic vs Covalent)',
      'Redox Reactions and Oxidation Numbers',
    ],
  },
  {
    id: 'computer-studies',
    name: 'Computer Studies / ICT',
    icon: 'Laptop',
    category: 'Sciences',
    popularTopics: [
      'Introduction to Programming Concepts',
      'What is an Algorithm and Flowchart?',
      'Binary Number System & Conversions',
      'Computer Hardware vs Software',
      'Computer Networking & The Internet',
      'Data Privacy and Cybersecurity Basics',
    ],
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: 'TrendingUp',
    category: 'Commercial',
    popularTopics: [
      'Law of Demand and Supply',
      'Price Elasticity of Demand',
      'Inflation: Causes and Remedies in Nigeria',
      'Production Possibility Curve (PPC)',
      'Money, Commercial Banks and Central Bank Roles',
      'Gross Domestic Product (GDP) vs GNP',
    ],
  },
  {
    id: 'financial-accounting',
    name: 'Financial Accounting',
    icon: 'FileSpreadsheet',
    category: 'Commercial',
    popularTopics: [
      'Double Entry Bookkeeping Principles',
      'Trial Balance and Correction of Errors',
      'Bank Reconciliation Statement',
      'Trading, Profit and Loss Account',
      'Depreciation Methods (Straight Line vs Reducing)',
    ],
  },
  {
    id: 'english-language',
    name: 'English Language',
    icon: 'BookOpen',
    category: 'Arts & Humanities',
    popularTopics: [
      'Subject-Verb Agreement (Concord)',
      'Direct and Indirect Speech',
      'Figures of Speech (Metaphor, Simile, Irony)',
      'Active and Passive Voice',
      'Summary Writing Techniques for WAEC',
    ],
  },
  {
    id: 'government',
    name: 'Government',
    icon: 'Landmark',
    category: 'Arts & Humanities',
    popularTopics: [
      'Separation of Powers & Checks and Balances',
      'Federalism in Nigeria: Structure & History',
      'Rule of Law and Fundamental Human Rights',
      'Functions of the Legislature, Executive, & Judiciary',
      'Electoral Systems and Suffrage',
    ],
  },
  {
    id: 'agricultural-science',
    name: 'Agricultural Science',
    icon: 'Sprout',
    category: 'Sciences',
    popularTopics: [
      'Soil Composition and Soil Fertility',
      'Crop Protection: Weeds, Pests and Diseases',
      'Farm Animal Nutrition and Digestion in Ruminants',
      'Agricultural Mechanization in Nigeria',
      'Aquaculture and Fish Farming Management',
    ],
  },
];
