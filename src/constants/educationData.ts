import { SubjectOption } from '../types';

// ==========================================
// 1. SECONDARY SCHOOL DATA
// ==========================================

export const JSS_SUBJECTS: SubjectOption[] = [
  {
    id: 'jss-math',
    name: 'Mathematics',
    category: 'General',
    popularTopics: [
      'Fractions, Decimals & Percentages',
      'Directed Numbers & Basic Algebra',
      'Linear Equations in One Variable',
      'Angles, Polygons & Triangles',
      'Simple Interest & Commercial Arithmetic',
      'Perimeter and Area of Plane Figures',
    ],
  },
  {
    id: 'jss-english',
    name: 'English Language',
    category: 'General',
    popularTopics: [
      'Parts of Speech (Nouns, Verbs, Adjectives)',
      'Tenses: Present, Past, and Continuous',
      'Active and Passive Voice',
      'Informal and Formal Letter Writing',
      'Punctuation Marks and Capitalization',
      'Reading Comprehension Strategies',
    ],
  },
  {
    id: 'jss-basic-science',
    name: 'Basic Science',
    category: 'Science',
    popularTopics: [
      'Living and Non-Living Things',
      'Human Body Systems (Digestive & Respiratory)',
      'Forms and Transformation of Energy',
      'The Solar System & Planetary Motion',
      'Pollution: Water, Air, and Soil',
      'Reproductive Health and Changes in Puberty',
    ],
  },
  {
    id: 'jss-basic-tech',
    name: 'Basic Technology',
    category: 'Technology',
    popularTopics: [
      'Workshop Safety Rules & First Aid',
      'Hand Tools: Woodwork and Metalwork Tools',
      'Technical Drawing: Board Practice & Angles',
      'Properties of Materials: Wood, Metal, Plastic',
      'Basic Electricity & Simple Circuits',
      'Building Construction: Foundation & Walls',
    ],
  },
  {
    id: 'jss-civic',
    name: 'Civic Education',
    category: 'Humanities',
    popularTopics: [
      'Values, Honesty and Integrity',
      'Citizenship: Rights, Duties and Obligations',
      'Democratic Governance in Nigeria',
      'National Symbols and The Constitution',
      'Human Rights and Protection from Abuse',
    ],
  },
  {
    id: 'jss-agric',
    name: 'Agricultural Science',
    category: 'Vocational',
    popularTopics: [
      'Classification of Farm Crops',
      'Common Farm Tools and Maintenance',
      'Soil Types: Sandy, Loamy, and Clay',
      'Animal Husbandry: Poultry and Goats',
      'Weeds and Pests: Prevention & Control',
    ],
  },
  {
    id: 'jss-computer',
    name: 'Computer Studies / ICT',
    category: 'Technology',
    popularTopics: [
      'Historical Development of Computers',
      'Hardware: Input, Output and Storage Devices',
      'Computer Software: System vs Application',
      'Computer Ethics and Safe Usage',
      'Introduction to The Internet and Email',
    ],
  },
  {
    id: 'jss-social-studies',
    name: 'Social Studies',
    category: 'Humanities',
    popularTopics: [
      'The Family and Socialization',
      'Culture and Social Values in Nigeria',
      'Drug Abuse and Substance Prevention',
      'Peace, Conflict and Conflict Resolution',
      'Environmental Problems and Conservation',
    ],
  },
  {
    id: 'jss-business-studies',
    name: 'Business Studies',
    category: 'Commercial',
    popularTopics: [
      'Introduction to Commerce and Trade',
      'The Office: Departments and Clerical Roles',
      'Double Entry System & Ledgers',
      'Source Documents (Invoices, Receipts)',
      'Consumer Rights and Fair Trading',
    ],
  },
  {
    id: 'jss-crs-irs',
    name: 'Christian Religious Studies / IRS',
    category: 'Humanities',
    popularTopics: [
      'The Creation Story and Purpose of Man',
      'The Call and Obedience of Abraham',
      'The Early Life and Ministry of Jesus',
      'The Sermon on the Mount & Moral Living',
      'The Holy Spirit and Early Church in Acts',
    ],
  },
  {
    id: 'jss-phe',
    name: 'Physical & Health Education',
    category: 'General',
    popularTopics: [
      'Athletics: Track and Field Events',
      'Ball Games: Football and Basketball Rules',
      'Personal Hygiene and Sanitation',
      'First Aid and Handling Sports Injuries',
      'Components of Physical Fitness',
    ],
  },
];

export const SSS_SUBJECTS: SubjectOption[] = [
  {
    id: 'sss-math',
    name: 'General Mathematics',
    category: 'General',
    popularTopics: [
      'Quadratic Equations & Formula',
      'Simultaneous Linear Equations',
      'Indices, Logarithms and Surds',
      'Circle Geometry & Theorems',
      'Trigonometric Ratios & Angles of Elevation',
      'Probability and Permutations',
      'Statistics: Mean, Variance & Standard Deviation',
    ],
  },
  {
    id: 'sss-english',
    name: 'English Language',
    category: 'General',
    popularTopics: [
      'Subject-Verb Agreement (Grammatical Concord)',
      'Direct and Indirect Speech',
      'Lexis and Structure: Idioms & Synonyms',
      'Summary Writing Techniques for WAEC/NECO',
      'Continuous Writing: Expository & Argumentative',
      'Phonology: Vowel and Consonant Sounds',
    ],
  },
  {
    id: 'sss-biology',
    name: 'Biology',
    category: 'Sciences',
    popularTopics: [
      'Photosynthesis and Plant Nutrition',
      'Cell Division: Mitosis vs Meiosis',
      'Osmosis, Diffusion & Plasmolysis',
      'Mendelian Genetics and Heredity',
      'Ecology: Ecosystem, Food Chains & Webs',
      'Human Circulatory & Respiratory Systems',
      'Excretion and The Kidney Nephron',
    ],
  },
  {
    id: 'sss-chemistry',
    name: 'Chemistry',
    category: 'Sciences',
    popularTopics: [
      'Periodic Table and Periodic Trends',
      'Chemical Bonding: Ionic, Covalent & Metallic',
      'The Mole Concept & Stoichiometry',
      'Acids, Bases, Salts and pH Calculation',
      'Redox Reactions and Oxidation Numbers',
      'Organic Chemistry: Alkanes, Alkenes & Alkynes',
      'Chemical Equilibrium & Le Chatelier’s Principle',
    ],
  },
  {
    id: 'sss-physics',
    name: 'Physics',
    category: 'Sciences',
    popularTopics: [
      "Ohm's Law, Resistance and Electric Circuits",
      "Newton's Three Laws of Motion & Momentum",
      'Work, Energy, Power and Conservation',
      'Wave Motion: Sound Waves and Light Waves',
      'Refraction and Snell’s Law of Refraction',
      'Thermal Heat: Specific Heat Capacity',
      'Electromagnetic Induction and Transformers',
    ],
  },
  {
    id: 'sss-further-math',
    name: 'Further Mathematics',
    category: 'Sciences',
    popularTopics: [
      'Differentiation: Product, Quotient & Chain Rules',
      'Integration and Area Under Curves',
      'Matrices and Determinants',
      'Vectors in Two and Three Dimensions',
      'Polynomials and Remainder Theorem',
      'Mechanics: Resolution of Forces and Projectiles',
    ],
  },
  {
    id: 'sss-economics',
    name: 'Economics',
    category: 'Commercial',
    popularTopics: [
      'The Law of Demand and Supply',
      'Price Elasticity of Demand & Supply',
      'Market Structures: Perfect Competition vs Monopoly',
      'Inflation: Causes, Effects and Control in Nigeria',
      'Money, Commercial Banks and The Central Bank',
      'National Income Accounting: GDP, GNP and NNI',
    ],
  },
  {
    id: 'sss-accounting',
    name: 'Financial Accounting',
    category: 'Commercial',
    popularTopics: [
      'Double Entry System and Principle of Ledgers',
      'The Trial Balance and Correction of Errors',
      'Bank Reconciliation Statements',
      'Depreciation: Straight Line vs Reducing Balance',
      'Final Accounts: Trading, Profit & Loss Account',
      'Partnership Accounts and Goodwill',
    ],
  },
  {
    id: 'sss-commerce',
    name: 'Commerce',
    category: 'Commercial',
    popularTopics: [
      'Home Trade vs Foreign Trade (Import/Export)',
      'Wholesale and Retail Trading Channels',
      'Documents Used in Commerce (Bill of Lading, Invoice)',
      'Warehousing and Storage Management',
      'Insurance: Principles and Utmost Good Faith',
      'Advertising and Sales Promotion',
    ],
  },
  {
    id: 'sss-government',
    name: 'Government',
    category: 'Arts & Humanities',
    popularTopics: [
      'Separation of Powers & Checks and Balances',
      'Federalism in Nigeria: Evolution & Challenges',
      'The Rule of Law and Fundamental Human Rights',
      'Functions of Legislature, Executive, & Judiciary',
      'Electoral Systems: First-Past-The-Post & Proportional',
      'Colonial Administration in Nigeria (Indirect Rule)',
    ],
  },
  {
    id: 'sss-literature',
    name: 'Literature in English',
    category: 'Arts & Humanities',
    popularTopics: [
      'Literary Devices: Irony, Metaphor, Imagery, Tone',
      'Analysis of Prescribed African Drama & Prose',
      'Non-African Poetry and Themes',
      'Characterization and Thematic Analysis',
      'Tragic Hero Concept in Classical Drama',
    ],
  },
  {
    id: 'sss-geography',
    name: 'Geography',
    category: 'Social Sciences',
    popularTopics: [
      'Map Reading and Contour Interpretation',
      'The Solar System and Earth’s Rotation/Revolution',
      'Rocks: Igneous, Sedimentary and Metamorphic',
      'Weather and Climate: Climatic Zones of Nigeria',
      'Settlement Patterns and Urbanization',
    ],
  },
  {
    id: 'sss-agric',
    name: 'Agricultural Science',
    category: 'Sciences',
    popularTopics: [
      'Soil Fertility, Mineral Cycles & Fertilizers',
      'Crop Improvement and Breeding Techniques',
      'Animal Nutrition: Ruminant vs Non-Ruminant Digestion',
      'Farm Management and Agricultural Economics',
      'Agricultural Mechanization in Nigeria',
    ],
  },
  {
    id: 'sss-civic',
    name: 'Civic Education',
    category: 'General',
    popularTopics: [
      'Rule of Law and Defense of Human Rights',
      'Cultism and Juvenile Delinquency: Dangers & Solutions',
      'Public Service and Responsible Governance',
      'Democracy and Political Apathy in Nigeria',
      'HIV/AIDS and Stigma Prevention',
    ],
  },
  {
    id: 'sss-computer',
    name: 'Computer Studies / ICT',
    category: 'Sciences',
    popularTopics: [
      'Introduction to Programming Concepts & Flowcharts',
      'Binary, Octal, and Hexadecimal Number Systems',
      'Database Management Systems (DBMS)',
      'Computer Networking: LAN, WAN and The Internet',
      'Cybersecurity and Computer Ethics in Nigeria',
    ],
  },
  {
    id: 'sss-technical-drawing',
    name: 'Technical Drawing',
    category: 'Technology',
    popularTopics: [
      'Geometrical Construction: Circles, Tangents, Arcs',
      'Orthographic Projections: First & Third Angle',
      'Isometric and Oblique Pictorial Drawings',
      'Sectional Views and Section Lines',
      'Building Drawing: Plans and Elevations',
    ],
  },
];

// ==========================================
// 2. WAEC / NECO PREPARATION DATA
// ==========================================

export const WAEC_NECO_SUBJECTS: SubjectOption[] = [
  {
    id: 'waec-math',
    name: 'General Mathematics (WAEC / NECO)',
    category: 'General',
    popularTopics: [
      'Quadratic Equations (Factorization, Formula & Graph)',
      'Simultaneous Linear and Quadratic Equations',
      'Circle Theorems & Proofs for WAEC Theory',
      'Trigonometry & Bearing/Distance Problems',
      'Cumulative Frequency Curves (Ogive) & Box Plots',
      'Commercial Arithmetic: Compound Interest & Taxation',
      'Surds, Logarithms and Number Bases',
    ],
  },
  {
    id: 'waec-english',
    name: 'English Language (WAEC / NECO)',
    category: 'General',
    popularTopics: [
      'WAEC Summary Writing: Exact Score Rules',
      'Oral English: Vowel & Consonant Contrasts, Rhymes',
      'Formal & Informal Essay Structures for SSCE',
      'Grammatical Name & Function in WAEC Comprehension',
      'Rules of Concord & Idiomatic Usage',
    ],
  },
  {
    id: 'waec-biology',
    name: 'Biology (WAEC / NECO SSCE)',
    category: 'Sciences',
    popularTopics: [
      'Photosynthesis Experiments & Starch Practical',
      'Mendelian Genetics: Monohybrid & Dihybrid Crosses',
      'Human Circulatory System & Double Circulation',
      'Osmosis Practical Setup: Potato Osmometer',
      'Ecology: Food Webs, Energy Pyramids & Nutrient Cycles',
      'Excretory Organs: Mammalian Kidney & Nephron Structure',
    ],
  },
  {
    id: 'waec-chemistry',
    name: 'Chemistry (WAEC / NECO SSCE)',
    category: 'Sciences',
    popularTopics: [
      'Volumetric Analysis (Titration Practical Calculations)',
      'Qualitative Analysis: Confirmatory Tests for Cations & Anions',
      'The Mole Concept, Molar Mass & Stoichiometry',
      'Periodic Trends: Electronegativity & Ionization Energy',
      'Organic Chemistry: Functional Groups, Alkanols & Esterification',
      'Electrochemistry: Electrolysis of CuSO4 & Faraday’s Laws',
    ],
  },
  {
    id: 'waec-physics',
    name: 'Physics (WAEC / NECO SSCE)',
    category: 'Sciences',
    popularTopics: [
      "Ohm's Law, Resistivity & Potentiometer Experiment",
      "Newton's Laws, Momentum & Collisions (Elastic/Inelastic)",
      'Optics: Refraction through Triangular Glass Prism',
      'Simple Harmonic Motion: Pendulum Periodicity',
      'Wave Motion: Resonance, Frequency & Speed of Sound',
      'Thermal Expansion & Heat Capacity Calorimetry',
    ],
  },
  {
    id: 'waec-further-math',
    name: 'Further Mathematics (WAEC / NECO)',
    category: 'Sciences',
    popularTopics: [
      'Differentiation: Applications to Maxima and Minima',
      'Definite and Indefinite Integration & Areas',
      'Matrices, Determinants & Inverse of 2x2/3x3',
      'Vectors: Scalar and Vector Products',
      'Mechanics: Projectile Motion & Equilibrium of Coplanar Forces',
    ],
  },
  {
    id: 'waec-economics',
    name: 'Economics (WAEC / NECO SSCE)',
    category: 'Commercial',
    popularTopics: [
      'Demand & Supply Elasticity Calculations',
      'Theory of Consumer Behaviour (Marginal Utility)',
      'Production Cost Curves: Fixed, Variable, Marginal Cost',
      'Inflation in Nigeria: Demand-Pull vs Cost-Push',
      'Central Bank of Nigeria: Monetary Policy Tools',
      'National Income: Expenditure, Income and Output Methods',
    ],
  },
  {
    id: 'waec-accounting',
    name: 'Financial Accounting (WAEC / NECO)',
    category: 'Commercial',
    popularTopics: [
      'Bank Reconciliation Statement with Adjusted Cash Book',
      'Suspense Account & Correction of Errors',
      'Final Accounts of a Sole Trader with Balance Sheet',
      'Partnership Appropriation & Current Accounts',
      'Company Accounts: Shares, Debentures & Dividends',
      'Manufacturing Accounts: Prime Cost & Factory Cost',
    ],
  },
  {
    id: 'waec-commerce',
    name: 'Commerce (WAEC / NECO)',
    category: 'Commercial',
    popularTopics: [
      'International Trade: Balance of Trade vs Payments',
      'Functions of The Stock Exchange & Commodity Market',
      'Consumer Protection Agencies in Nigeria (FCCPC, NAFDAC)',
      'Transportation Modes: Advantages & Disadvantages',
      'Principles of Insurance: Subrogation, Indemnity, Insurable Interest',
    ],
  },
  {
    id: 'waec-government',
    name: 'Government (WAEC / NECO)',
    category: 'Arts & Humanities',
    popularTopics: [
      'Constitutional Developments in Nigeria (Clifford to 1999)',
      'Features and Structure of Federalism in Nigeria',
      'Separation of Powers vs Checks and Balances',
      'Local Government Reforms & Functions in Nigeria',
      'Civil Service: Principles of Neutrality, Anonymity & Permanence',
    ],
  },
  {
    id: 'waec-literature',
    name: 'Literature in English (WAEC / NECO)',
    category: 'Arts & Humanities',
    popularTopics: [
      'Prescribed African Prose Text Analysis',
      'Prescribed African Drama Text Analysis',
      'Non-African Prose Text Analysis',
      'Non-African Drama (Shakespearean or Classical)',
      'Literary Devices, Diction and Poetic Structure',
    ],
  },
  {
    id: 'waec-geography',
    name: 'Geography (WAEC / NECO)',
    category: 'Social Sciences',
    popularTopics: [
      'Contour Interpretation & Gradient Calculation on Topo Maps',
      'Atmospheric Circulation, Inter-Tropical Discontinuity (ITD)',
      'Rivers: Stages of a River Valley & Landforms',
      'Economic Geography: Mineral Resources of Nigeria',
      'Transportation & Industrial Development in West Africa',
    ],
  },
  {
    id: 'waec-agric',
    name: 'Agricultural Science (WAEC / NECO)',
    category: 'Sciences',
    popularTopics: [
      'Soil Science: Mechanical Analysis & Soil Textural Triangle',
      'Pasture and Forage Crops Management in Nigeria',
      'Diseases of Farm Animals (Rinderpest, Newcastle, Coccidiosis)',
      'Farm Accounts and Production Functions',
      'Agricultural Extension Methods & Farmer Training',
    ],
  },
  {
    id: 'waec-civic',
    name: 'Civic Education (WAEC / NECO)',
    category: 'General',
    popularTopics: [
      'Rule of Law and Independence of the Judiciary',
      'National Ethics, Integrity and Anti-Corruption Agencies',
      'Political Participation and Electoral Malpractices',
      'Human Rights Violations and Redress Mechanisms',
      'Cultism and Social Vices in Educational Institutions',
    ],
  },
];

// ==========================================
// 3. POLYTECHNIC (ND / HND) PROGRAMMES & COURSES
// ==========================================

export interface PolyProgrammeData {
  id: string;
  name: string;
  faculty: string;
  ndCourseUnits: SubjectOption[];
  hndCourseUnits: SubjectOption[];
}

export const POLYTECHNIC_PROGRAMMES: PolyProgrammeData[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    faculty: 'Applied Science & Technology',
    ndCourseUnits: [
      {
        id: 'com-111',
        name: 'Introduction to Computing (COM 111)',
        popularTopics: [
          'History and Generations of Computers',
          'Computer Hardware Architecture and CPU Components',
          'Number Systems (Binary, Octal, Hexadecimal Arithmetic)',
          'Operating Systems: Process Management and Memory Allocation',
          'Computer Virus, Malware and Security Measures',
        ],
      },
      {
        id: 'com-112',
        name: 'Logic and Linear Algebra (MTH 111)',
        popularTopics: [
          'Propositional Logic and Truth Tables',
          'Set Theory and Venn Diagrams in Computing',
          'Matrices and Determinants: Solutions to Linear Systems',
          'Boolean Algebra and Logic Gates Simplification',
          'Mathematical Induction',
        ],
      },
      {
        id: 'com-113',
        name: 'Introduction to Digital Electronics',
        popularTopics: [
          'Logic Gates (AND, OR, NOT, NAND, NOR, XOR)',
          'Karnaugh Maps (K-Maps) Minimization',
          'Combinational Circuits: Adders, Decoders, Multiplexers',
          'Sequential Logic: Flip-Flops (SR, JK, D-Type)',
          'Registers and Binary Counters',
        ],
      },
      {
        id: 'com-121',
        name: 'Scientific Programming with Python / C (COM 121)',
        popularTopics: [
          'Variables, Data Types and Control Flow (if-else, loops)',
          'Functions, Parameter Passing and Scope',
          'Arrays, Lists and String Manipulation',
          'Pointers and Memory Allocation in C',
          'File Handling (Reading and Writing text files)',
        ],
      },
      {
        id: 'com-211',
        name: 'Data Structures and Algorithms (COM 211)',
        popularTopics: [
          'Arrays and Linked Lists (Singly & Doubly Linked)',
          'Stacks and Queues: Implementation and Applications',
          'Binary Search Trees (BST) and Tree Traversals',
          'Sorting Algorithms: Bubble, Quick, and Merge Sort',
          'Algorithm Complexity & Big O Notation',
        ],
      },
      {
        id: 'com-212',
        name: 'Database Design I / SQL (COM 212)',
        popularTopics: [
          'Relational Database Model and Relational Algebra',
          'Entity-Relationship (ER) Modeling',
          'Database Normalization (1NF, 2NF, 3NF, BCNF)',
          'SQL Queries: SELECT, JOIN, GROUP BY, Aggregate Functions',
          'Database Integrity Constraints and Primary/Foreign Keys',
        ],
      },
      {
        id: 'com-221',
        name: 'Computer Networks & Internet Technology (COM 221)',
        popularTopics: [
          'OSI 7-Layer Model vs TCP/IP Protocol Suite',
          'Network Topologies: Star, Ring, Mesh, Bus',
          'IP Addressing, IPv4 Subnetting & CIDR',
          'Routing Protocols and Switching Concepts',
          'Client-Server vs Peer-to-Peer Architecture',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'com-311',
        name: 'Object-Oriented Programming with Java / C++ (COM 311)',
        popularTopics: [
          'Classes, Objects, Constructors and Methods',
          'Encapsulation, Data Hiding and Access Modifiers',
          'Inheritance and Polymorphism (Method Overriding/Overloading)',
          'Abstract Classes and Interfaces',
          'Exception Handling and Custom Exceptions',
        ],
      },
      {
        id: 'com-312',
        name: 'Operating Systems & Systems Programming',
        popularTopics: [
          'Process Scheduling Algorithms (FCFS, SJF, Round Robin)',
          'Concurrency, Race Conditions and Semaphores',
          'Deadlocks: Prevention, Avoidance (Banker’s Algorithm) & Detection',
          'Virtual Memory, Paging, and Page Replacement Algorithms',
          'File System Architecture and Disk Scheduling',
        ],
      },
      {
        id: 'com-321',
        name: 'Software Engineering (COM 321)',
        popularTopics: [
          'Software Development Life Cycle (SDLC) Models (Agile, Waterfall)',
          'Requirements Engineering and Use Case Modeling',
          'UML Diagrams: Class, Sequence, and Activity Diagrams',
          'Software Testing Strategies (Unit, Integration, System Testing)',
          'Software Quality Assurance & Maintenance',
        ],
      },
      {
        id: 'com-411',
        name: 'Compiler Construction (COM 411)',
        popularTopics: [
          'Phases of a Compiler: Lexical, Syntax, Semantic Analysis',
          'Regular Expressions and Finite Automata (DFA / NFA)',
          'Context-Free Grammars (CFG) and Parse Trees',
          'Top-down vs Bottom-up Parsing (LL, LR Parsers)',
          'Code Generation and Optimization',
        ],
      },
      {
        id: 'com-412',
        name: 'Network Security & Cryptography',
        popularTopics: [
          'Symmetric vs Asymmetric Key Cryptography (AES, RSA)',
          'Cryptographic Hash Functions (SHA-256) and Digital Signatures',
          'Firewalls, Intrusion Detection Systems (IDS) & VPNs',
          'Common Cyber Attacks: MITM, SQL Injection, DDoS, Phishing',
          'Public Key Infrastructure (PKI) and SSL/TLS Certificates',
        ],
      },
    ],
  },
  {
    id: 'eee',
    name: 'Electrical / Electronic Engineering',
    faculty: 'Engineering Technology',
    ndCourseUnits: [
      {
        id: 'eec-111',
        name: 'Electric Circuit Theory I (EEC 115)',
        popularTopics: [
          "Kirchhoff's Voltage and Current Laws (KVL & KCL)",
          'Mesh and Nodal Analysis of DC Circuits',
          'Superposition, Thevenin and Norton Theorems',
          'Maximum Power Transfer Theorem',
          'Capacitors, Inductors and Transient RL/RC Circuits',
        ],
      },
      {
        id: 'eec-112',
        name: 'Electrical Measurement and Instrumentation',
        popularTopics: [
          'PMMC Instruments and Moving Iron Meters',
          'Extending Meter Ranges (Shunts and Multipliers)',
          'DC and AC Bridges (Wheatstone, Maxwell, Wien)',
          'Cathode Ray Oscilloscope (CRO) Operations',
          'Errors in Measurement: Systematic and Random',
        ],
      },
      {
        id: 'eec-121',
        name: 'Basic Electronics (EEC 124)',
        popularTopics: [
          'Semiconductor Physics: P-N Junction Diode Characteristics',
          'Diode Rectifier Circuits (Half-Wave and Full-Wave Bridge)',
          'Zener Diode as a Voltage Regulator',
          'Bipolar Junction Transistor (BJT) Biasing and Operating Modes',
          'Field Effect Transistors (FET and MOSFET) Basics',
        ],
      },
      {
        id: 'eec-211',
        name: 'Electrical Machines I (EEC 212)',
        popularTopics: [
          'DC Generators: Construction, Types and E.M.F Equation',
          'DC Motors: Torque Equation, Speed Control and Back E.M.F',
          'Single Phase Transformers: Construction and Losses',
          'Transformer Equivalent Circuit and Efficiency Calculation',
          'Auto-Transformers vs Two-Winding Transformers',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'eec-311',
        name: 'Control Systems Engineering',
        popularTopics: [
          'Open-Loop vs Closed-Loop Feedback Control Systems',
          'Transfer Functions and Block Diagram Reduction',
          'Time Domain Response of First and Second Order Systems',
          'Routh-Hurwitz Stability Criterion',
          'Root Locus Techniques and Bode Plots',
        ],
      },
      {
        id: 'eec-312',
        name: 'Electric Power Systems & Transmission',
        popularTopics: [
          'Transmission Line Parameters: Resistance, Inductance, Capacitance',
          'Performance of Short, Medium and Long Transmission Lines',
          'Power Factor Correction and Economic Implications in Nigeria',
          'Fault Analysis: Symmetrical and Unsymmetrical Faults',
          'Substation Layout and Switchgear Equipment',
        ],
      },
      {
        id: 'eec-411',
        name: 'Microprocessor Systems & Embedded Architecture',
        popularTopics: [
          '8085 / 8086 Microprocessor Architecture and Pin Functions',
          'Assembly Language Programming and Addressing Modes',
          'Memory Interfacing: RAM and ROM Chip Decoders',
          'Input/Output Interfacing (Programmable Peripheral Interface 8255)',
          'Interrupts Handling and Interrupt Service Routines (ISR)',
        ],
      },
    ],
  },
  {
    id: 'slt',
    name: 'Science Laboratory Technology (SLT)',
    faculty: 'Applied Science & Technology',
    ndCourseUnits: [
      {
        id: 'slt-111',
        name: 'General Laboratory Techniques (STC 111)',
        popularTopics: [
          'Laboratory Safety Rules, Hazards and Chemical Storage',
          'Preparation of Standard Solutions and Molarities',
          'Care and Calibration of Analytical Balances and pH Meters',
          'Volumetric Glassware Calibration (Pipettes, Burettes)',
          'First Aid Protocols for Laboratory Chemical Accidents',
        ],
      },
      {
        id: 'slt-112',
        name: 'Cell Biology and Microscopy (STB 111)',
        popularTopics: [
          'Compound Light Microscope: Parts, Care and Magnification',
          'Cell Structure: Organelles in Plant vs Animal Cells',
          'Staining Techniques (Gram Staining and Simple Staining)',
          'Cell Membrane Transport: Active Transport, Endocytosis',
          'Microtomy and Tissue Slide Preparation',
        ],
      },
      {
        id: 'slt-211',
        name: 'Analytical Chemistry Techniques (STC 211)',
        popularTopics: [
          'Gravimetric Analysis: Precipitation and Ignition',
          'Acid-Base, Redox and Complexometric Titrations',
          'Chromatography: Paper, Thin-Layer (TLC) and Column',
          'Introduction to Colorimetry and UV-Visible Spectrophotometry',
          'Water Quality Testing (BOD, COD, pH, Dissolved Oxygen)',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'slt-311',
        name: 'Instrumental Analysis & Spectroscopy',
        popularTopics: [
          'Beer-Lambert Law and UV-Visible Spectrophotometry',
          'Atomic Absorption Spectroscopy (AAS) Principles & Application',
          'High Performance Liquid Chromatography (HPLC)',
          'Gas Chromatography (GC) and Mass Spectrometry (GC-MS)',
          'Infrared (IR) Spectroscopy for Organic Functional Groups',
        ],
      },
      {
        id: 'slt-312',
        name: 'Microbial Physiology and Genetics',
        popularTopics: [
          'Bacterial Growth Curve and Kinetic Parameters',
          'Microbial Metabolism: Glycolysis, TCA and Fermentation',
          'DNA Replication, Transcription and Translation in Bacteria',
          'Gene Mutations and Repair Mechanisms',
          'Bacterial Plasmids and Recombinant DNA Techniques',
        ],
      },
    ],
  },
  {
    id: 'acc',
    name: 'Accountancy',
    faculty: 'Business & Management Studies',
    ndCourseUnits: [
      {
        id: 'acc-111',
        name: 'Principles of Financial Accounting I (ACC 111)',
        popularTopics: [
          'Nature and Scope of Accounting and Accounting Concepts',
          'Double Entry Principles and Subsidiary Books',
          'Trial Balance Preparation and Correction of Errors',
          'Bank Reconciliation Statement with Cash Book',
          'Final Accounts of a Sole Trader with Year-End Adjustments',
        ],
      },
      {
        id: 'acc-121',
        name: 'Cost Accounting I (ACC 123)',
        popularTopics: [
          'Elements of Cost: Material, Labour, and Expenses',
          'Material Costing: FIFO, LIFO, and Weighted Average',
          'Labour Costing: Incentive Schemes and Wage Calculations',
          'Overhead Allocation, Apportionment and Absorption',
          'Cost Classification for Decision Making',
        ],
      },
      {
        id: 'acc-211',
        name: 'Partnership & Special Accounts',
        popularTopics: [
          'Partnership Formation and Partnership Deed',
          'Appropriation of Profit, Capital and Current Accounts',
          'Admission and Retirement of a Partner (Goodwill Treatment)',
          'Dissolution of Partnership and Realization Account',
          'Hire Purchase Accounts and Royalties',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'acc-311',
        name: 'Advanced Financial Accounting (ACC 311)',
        popularTopics: [
          'International Financial Reporting Standards (IFRS) Framework',
          'Consolidated Financial Statements for Group Companies',
          'Accounting for Business Mergers, Acquisitions & Goodwill',
          'Accounting for Foreign Currency Transactions',
          'Earnings Per Share (EPS) and Segment Reporting',
        ],
      },
      {
        id: 'acc-312',
        name: 'Taxation & Tax Management',
        popularTopics: [
          'Nigerian Tax System and Administrative Machinery (FIRS/SIRS)',
          'Personal Income Tax (PITA): Computation of Taxable Income',
          'Companies Income Tax (CITA): Allowable vs Disallowable Deductions',
          'Value Added Tax (VAT) and Withholding Tax (WHT)',
          'Capital Allowances Computation and Reliefs',
        ],
      },
      {
        id: 'acc-411',
        name: 'Auditing and Investigation',
        popularTopics: [
          'Nature, Purpose and Scope of Auditing',
          'Auditor’s Appointment, Rights, Duties and Liabilities',
          'Internal Control Systems and Risk Assessment',
          'Audit Evidence, Sampling Techniques and Working Papers',
          'Audit Reports and Types of Audit Opinions',
        ],
      },
    ],
  },
  {
    id: 'bam',
    name: 'Business Administration & Management',
    faculty: 'Business & Management Studies',
    ndCourseUnits: [
      {
        id: 'bam-111',
        name: 'Introduction to Business (BAM 111)',
        popularTopics: [
          'Concept of Business, Objectives and Business Environment',
          'Forms of Business Ownership in Nigeria',
          'Business Ethics and Corporate Social Responsibility',
          'Business Functions: Production, Marketing, Finance, HR',
          'Government Regulations of Business in Nigeria',
        ],
      },
      {
        id: 'bam-121',
        name: 'Principles of Management (BAM 122)',
        popularTopics: [
          'Evolution of Management Thought (Taylor, Fayol, Weber)',
          'Management Functions: Planning, Organizing, Leading, Controlling',
          'Decision-Making Process and Models',
          'Organizational Structures: Functional, Divisional, Matrix',
          'Motivation Theories: Maslow, Herzberg, McGregor',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'bam-311',
        name: 'Organizational Behaviour',
        popularTopics: [
          'Individual Behaviour: Personality, Perception, and Attitudes',
          'Group Dynamics, Team Building and Intergroup Conflict',
          'Leadership Theories: Trait, Behavioural, and Contingency',
          'Power, Politics and Organizational Culture',
          'Organizational Change and Stress Management',
        ],
      },
      {
        id: 'bam-312',
        name: 'Strategic Management & Policy',
        popularTopics: [
          'Strategic Management Process and Environmental Scanning (SWOT, PESTEL)',
          'Corporate-Level, Business-Level, and Functional Strategies',
          "Porter's Five Forces Industry Analysis",
          'Strategy Implementation and Resource Allocation',
          'Strategic Evaluation and Control Techniques',
        ],
      },
    ],
  },
  {
    id: 'mass-comm',
    name: 'Mass Communication',
    faculty: 'Information & Communication Studies',
    ndCourseUnits: [
      {
        id: 'mac-111',
        name: 'Introduction to Mass Communication (MAC 111)',
        popularTopics: [
          'Definition, Models and Elements of Communication',
          'Print Media vs Electronic Media Development in Nigeria',
          'Functions of Mass Media in Society',
          'Theories of Mass Communication (Hypodermic Needle, Agenda Setting)',
          'Barriers to Effective Communication',
        ],
      },
      {
        id: 'mac-121',
        name: 'News Writing and Reporting',
        popularTopics: [
          'News Elements: Timeliness, Proximity, Prominence, Conflict',
          'The Inverted Pyramid Structure and News Leads',
          'Interviewing Techniques and Sourcing for News',
          'Beat Reporting: Crime, Judiciary, Education, Politics',
          'Libel, Slander and Defamation Basics',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'mac-311',
        name: 'Investigative Journalism',
        popularTopics: [
          'Principles and Techniques of In-depth Investigation',
          'Documentary and Data Sourcing: Freedom of Information (FOI) Act',
          'Undercover Journalism Ethics and Safety Precautions',
          'Fact-Checking and Verification of Digital Sources',
          'Case Studies of Impactful Investigative Reporting in Nigeria',
        ],
      },
      {
        id: 'mac-312',
        name: 'Public Relations & Advertising Strategy',
        popularTopics: [
          'PR Planning: The RACE Model (Research, Action, Comm, Evaluation)',
          'Crisis Communication and Media Relations',
          'Advertising Copywriting and Campaign Design',
          'Consumer Behaviour and Target Audience Segmentation',
          'Media Planning and Budgeting for Campaigns',
        ],
      },
    ],
  },
  {
    id: 'civil-eng',
    name: 'Civil Engineering Technology',
    faculty: 'Engineering Technology',
    ndCourseUnits: [
      {
        id: 'civ-111',
        name: 'Strength of Materials I',
        popularTopics: [
          'Direct Stress, Strain and Elastic Modulus (Hooke’s Law)',
          'Mechanical Properties of Construction Materials',
          'Shear Force and Bending Moment Diagrams (SFD & BMD)',
          'Bending Stresses in Simple Beams',
          'Torsion in Circular Shafts',
        ],
      },
      {
        id: 'civ-112',
        name: 'Soil Mechanics I',
        popularTopics: [
          'Soil Origin, Classification and Index Properties',
          'Atterberg Limits: Liquid Limit, Plastic Limit, Plasticity Index',
          'Soil Compaction: Standard Proctor Test and Optimum Moisture',
          'Permeability and Seepage in Soils (Darcy’s Law)',
          'Site Investigation and Soil Sampling Procedures',
        ],
      },
    ],
    hndCourseUnits: [
      {
        id: 'civ-311',
        name: 'Structural Analysis II',
        popularTopics: [
          'Determinate vs Indeterminate Structures',
          'Moment Distribution Method (Hardy Cross Method)',
          'Slope Deflection Method for Continuous Beams',
          'Virtual Work and Energy Methods in Structures',
          'Influence Lines for Moving Loads',
        ],
      },
      {
        id: 'civ-312',
        name: 'Reinforced Concrete Design',
        popularTopics: [
          'Limit State Design Principles (BS 8110 / Eurocode 2)',
          'Design of Singly and Doubly Reinforced Beams',
          'Design of Solid Slabs: One-Way and Two-Way Slabs',
          'Short Columns Subjected to Axial Loads and Bending',
          'Foundation Design: Pad Footings and Soil Bearing Capacity',
        ],
      },
    ],
  },
];

// ==========================================
// 4. UNIVERSITY DATA
// ==========================================

export interface UniversityDisciplineData {
  id: string;
  name: string;
  faculty: string;
  year100Units: SubjectOption[];
  seniorUnits: SubjectOption[];
}

export const UNIVERSITY_DISCIPLINES: UniversityDisciplineData[] = [
  {
    id: 'uni-cs',
    name: 'Computer Science / Software Engineering',
    faculty: 'Faculty of Science / Computing',
    year100Units: [
      {
        id: 'mth-101',
        name: 'MTH 101: Elementary Mathematics I (Calculus & Algebra)',
        popularTopics: [
          'Set Theory, Mappings and Binary Operations',
          'Quadratic Theory and Mathematical Induction',
          'Limits of Functions, Continuity and Derivatives',
          'Integration: Indefinite and Definite Integrals',
          'Binomial Theorem and Mathematical Proofs',
        ],
      },
      {
        id: 'phy-101',
        name: 'PHY 101: General Physics I (Mechanics & Thermal)',
        popularTopics: [
          'Dimensional Analysis and Vector Operations',
          'Kinematics, Newton’s Laws of Motion & Momentum',
          'Work, Energy, Power and Conservation Principles',
          'Rotational Motion, Moment of Inertia and Angular Momentum',
          'Thermal Expansion, Calorimetry and The Laws of Thermodynamics',
        ],
      },
      {
        id: 'gst-101',
        name: 'GST 101: Use of English & Communication Skills',
        popularTopics: [
          'Study Skills, Note-Taking and Academic Vocabulary',
          'Sentence Structure, Clause Analysis and Grammatical Concord',
          'Paragraph Development, Topic Sentences and Cohesion',
          'Academic Referencing (APA Style) and Plagiarism Avoidance',
        ],
      },
      {
        id: 'cos-101',
        name: 'COS 101: Introduction to Computer Science',
        popularTopics: [
          'Computer Architecture, CPU, Memory Hierarchy',
          'Algorithms, Pseudo-code and Flowcharting',
          'Data Representation: Binary, Two’s Complement, ASCII',
          'Introduction to Problem Solving via Python / C',
        ],
      },
    ],
    seniorUnits: [
      {
        id: 'csc-201',
        name: 'CSC 201: Data Structures and Algorithms',
        popularTopics: [
          'Asymptotic Notations (Big O, Omega, Theta)',
          'Linked Lists, Stacks, Queues and Priority Queues',
          'Binary Search Trees, AVL Trees and Red-Black Trees',
          'Sorting & Searching: QuickSort, MergeSort, Binary Search',
          'Graph Algorithms: BFS, DFS, Dijkstra’s Shortest Path',
        ],
      },
      {
        id: 'csc-202',
        name: 'CSC 202: Computer Architecture & Organization',
        popularTopics: [
          'Instruction Set Architecture (ISA) & Addressing Modes',
          'Arithmetic Logic Unit (ALU) Design & Floating Point',
          'Pipelining, Hazard Resolution & Superscalar CPUs',
          'Cache Memory: Mapping Techniques & Hit/Miss Ratios',
          'Input/Output and Direct Memory Access (DMA)',
        ],
      },
      {
        id: 'csc-301',
        name: 'CSC 301: Operating Systems & Systems Programming',
        popularTopics: [
          'Process Synchronization, Mutex and Semaphores',
          'CPU Scheduling Algorithms & Multi-Core Systems',
          'Deadlock Avoidance: Banker’s Algorithm',
          'Virtual Memory Management: Paging, Segmentation, TLB',
          'Storage Systems & Distributed File Systems',
        ],
      },
      {
        id: 'csc-302',
        name: 'CSC 302: Database Systems & Relational Modeling',
        popularTopics: [
          'Relational Algebra and Calculus',
          'Database Design: Normal Forms (1NF through 5NF)',
          'Transaction Management, ACID Properties & Concurrency',
          'SQL Optimization, Indexing (B-Trees) and Query Plans',
          'NoSQL Databases: Document, Key-Value and Graph Stores',
        ],
      },
      {
        id: 'csc-401',
        name: 'CSC 401: Software Engineering & Architecture',
        popularTopics: [
          'Architectural Patterns: Microservices, MVC, Event-Driven',
          'Agile Methodologies, Scrum Framework and DevOps',
          'Design Patterns: Singleton, Factory, Observer, Strategy',
          'Continuous Integration & Continuous Deployment (CI/CD)',
        ],
      },
      {
        id: 'csc-402',
        name: 'CSC 402: Artificial Intelligence & Machine Learning',
        popularTopics: [
          'State Space Search: A* Search, Minimax & Alpha-Beta Pruning',
          'Supervised Learning: Linear Regression, Logistic Regression',
          'Neural Networks, Backpropagation and Activation Functions',
          'Clustering Algorithms (K-Means) and Dimensionality Reduction (PCA)',
          'Natural Language Processing & Transformer Models Overview',
        ],
      },
    ],
  },
  {
    id: 'uni-eng',
    name: 'Engineering (Electrical / Mechanical / Civil)',
    faculty: 'Faculty of Engineering',
    year100Units: [
      {
        id: 'mth-101-eng',
        name: 'MTH 101: Mathematical Methods I',
        popularTopics: [
          'Functions, Limits, Continuity and Derivatives',
          'Techniques of Integration & Applications to Geometry',
          'Matrices, Determinants & Cramer’s Rule',
          'Vectors in 3-Space and Dot/Cross Products',
        ],
      },
      {
        id: 'phy-101-eng',
        name: 'PHY 101: Mechanics and Properties of Matter',
        popularTopics: [
          'Vectors, Statics and Equilibrium of Rigid Bodies',
          'Dynamics: Newton’s Laws, Energy and Linear Momentum',
          'Elasticity: Modulus of Elasticity, Stress and Strain',
          'Fluid Mechanics: Pascal’s Principle, Bernoulli’s Equation',
        ],
      },
      {
        id: 'chm-101-eng',
        name: 'CHM 101: General Chemistry for Engineers',
        popularTopics: [
          'Atomic Structure, Chemical Bonding and Hybridization',
          'Chemical Kinetics, Reaction Rates and Catalysis',
          'Thermochemistry, Enthalpy and Free Energy',
          'Electrochemistry, Corrosion and Cathodic Protection',
        ],
      },
      {
        id: 'eng-101',
        name: 'ENG 101: Engineering Drawing I',
        popularTopics: [
          'Lettering, Dimensioning and Geometrical Constructions',
          'Orthographic Projections: 1st and 3rd Angle Views',
          'Isometric and Axonometric Projections',
          'Sectioning Principles and Conventional Representations',
        ],
      },
    ],
    seniorUnits: [
      {
        id: 'eng-201',
        name: 'ENG 201: Engineering Mathematics (Differential Equations)',
        popularTopics: [
          'First Order Ordinary Differential Equations (Separable, Exact)',
          'Second Order Linear ODEs with Constant Coefficients',
          'Laplace Transforms and Applications to Initial Value Problems',
          'Fourier Series and Harmonic Analysis',
          'Partial Differential Equations (Wave and Heat Equations)',
        ],
      },
      {
        id: 'eng-202',
        name: 'ENG 202: Engineering Thermodynamics',
        popularTopics: [
          'First Law of Thermodynamics for Open and Closed Systems',
          'Second Law: Carnot Cycle, Entropy and Irreversibility',
          'Thermodynamic Property Relations (Steam Tables, Ideal Gases)',
          'Gas Power Cycles: Otto, Diesel, Brayton Cycles',
          'Vapour Power Cycles: Rankine Cycle and Refrigeration',
        ],
      },
      {
        id: 'eng-301',
        name: 'ENG 301: Fluid Mechanics & Hydraulics',
        popularTopics: [
          'Fluid Statics: Hydrostatic Forces on Submerged Surfaces',
          'Fluid Kinematics: Streamlines, Velocity Potential & Stream Function',
          'Navier-Stokes Equations and Bernoulli’s Energy Equation',
          'Flow in Closed Conduits: Friction Factor & Moody Chart',
          'Boundary Layer Theory and Lift/Drag Forces',
        ],
      },
      {
        id: 'eng-302',
        name: 'ENG 302: Mechanics of Deformable Bodies',
        popularTopics: [
          'Stress-Strain Relations: Plane Stress and Plane Strain',
          'Mohr’s Circle of Stress and Principal Stresses',
          'Bending Stresses and Deflection of Beams (Macaulay’s Method)',
          'Torsion of Non-Circular and Thin-Walled Members',
          'Buckling of Columns: Euler’s Buckling Formula',
        ],
      },
      {
        id: 'eng-401',
        name: 'ENG 401: Control Systems Engineering',
        popularTopics: [
          'Mathematical Modeling of Physical Dynamic Systems',
          'State Space Representation and State Transition Matrix',
          'Frequency Response Analysis (Nyquist, Bode, Nichols Plots)',
          'PID Controller Design and Tuning',
          'Controllability and Observability Concepts',
        ],
      },
    ],
  },
  {
    id: 'uni-med',
    name: 'Medicine & Health Sciences (MBBS / Nursing / MLS)',
    faculty: 'College of Health / Medical Sciences',
    year100Units: [
      {
        id: 'bio-101-med',
        name: 'BIO 101: General Biology I (Cell & Diversity)',
        popularTopics: [
          'Ultrastructure of Eukaryotic and Prokaryotic Cells',
          'Cell Membrane Chemistry and Transport Mechanisms',
          'Cell Cycle, Mitosis, Meiosis and Karyotype Analysis',
          'Mendelian Genetics, DNA Structure and Replication',
          'Taxonomy and Classification of Living Organisms',
        ],
      },
      {
        id: 'chm-101-med',
        name: 'CHM 101: General & Organic Chemistry for Pre-Med',
        popularTopics: [
          'Stereochemistry: Chirality, Enantiomers, Optical Activity',
          'Organic Functional Groups: Alcohols, Carbonyls, Carboxylic Acids',
          'Acids, Bases, Buffers and Physiological pH Homeostasis',
          'Colligative Properties, Osmotic Pressure and Dialysis',
        ],
      },
      {
        id: 'phy-101-med',
        name: 'PHY 101: Physics for Medical Sciences',
        popularTopics: [
          'Biomechanics: Levers, Forces and Torque in Human Joints',
          'Fluids in Motion: Poiseuille’s Law and Blood Flow Hemodynamics',
          'Geometrical Optics: Lenses and The Human Eye Vision Defects',
          'Medical Radiation: X-rays, Radioactivity and Ultrasound Basics',
        ],
      },
    ],
    seniorUnits: [
      {
        id: 'ana-201',
        name: 'ANA 201: Gross Anatomy (Upper/Lower Limb, Thorax)',
        popularTopics: [
          'Anatomy of Upper Limb: Brachial Plexus, Axilla & Hand Spaces',
          'Anatomy of Lower Limb: Femoral Triangle, Popliteal Fossa',
          'Thorax: Thoracic Wall, Lungs, Pleura and Mediastinum',
          'Cardiovascular Anatomy: Heart Chambers, Coronary Circulation',
        ],
      },
      {
        id: 'phs-201',
        name: 'PHS 201: Systemic Human Physiology',
        popularTopics: [
          'Action Potential Generation in Nerve and Muscle Fibers',
          'Cardiovascular Physiology: Cardiac Output, Blood Pressure Regulation',
          'Respiratory Physiology: Gas Exchange, Ventilation-Perfusion Ratio',
          'Renal Physiology: Glomerular Filtration Rate (GFR) and Countercurrent',
          'Gastrointestinal Secretions and Endocrine System Hormones',
        ],
      },
      {
        id: 'bch-201',
        name: 'BCH 201: Medical Biochemistry & Metabolism',
        popularTopics: [
          'Enzyme Kinetics: Michaelis-Menten Equation and Inhibitors',
          'Carbohydrate Metabolism: Glycolysis, Krebs Cycle, Gluconeogenesis',
          'Lipid Metabolism: Beta-Oxidation of Fatty Acids and Cholesterol',
          'Electron Transport Chain and Oxidative Phosphorylation',
          'Inborn Errors of Metabolism and Clinical Biomarkers',
        ],
      },
      {
        id: 'pth-301',
        name: 'PTH 301: General Pathology & Immunology',
        popularTopics: [
          'Cellular Injury, Necrosis vs Apoptosis',
          'Acute and Chronic Inflammation Mechanisms and Mediators',
          'Innate vs Adaptive Immunity: Antibodies, T-Cells, Complement System',
          'Neoplasia: Benign vs Malignant Tumors and Carcinogenesis',
          'Thrombosis, Embolism, Ischemia and Infarction',
        ],
      },
      {
        id: 'phm-301',
        name: 'PHM 301: General Pharmacology',
        popularTopics: [
          'Pharmacokinetics: Absorption, Distribution, Metabolism, Excretion',
          'Pharmacodynamics: Receptor Theory, Agonists vs Antagonists',
          'Autonomic Pharmacology: Sympathomimetics and Parasympathomimetics',
          'Antimicrobial Chemotherapy and Mechanisms of Drug Resistance',
        ],
      },
    ],
  },
  {
    id: 'uni-econ',
    name: 'Economics / Business Administration / Finance',
    faculty: 'Faculty of Social & Management Sciences',
    year100Units: [
      {
        id: 'eco-101',
        name: 'ECO 101: Principles of Economics I (Microeconomics)',
        popularTopics: [
          'Scarcity, Choice and Opportunity Cost',
          'Theory of Demand and Supply and Price Equilibrium',
          'Elasticity Concepts: Price, Income and Cross-Elasticity',
          'Consumer Behaviour: Cardinal vs Ordinal Utility Analysis',
          'Theory of Production and Law of Diminishing Returns',
        ],
      },
      {
        id: 'eco-102',
        name: 'ECO 102: Principles of Economics II (Macroeconomics)',
        popularTopics: [
          'Circular Flow of National Income and Sectoral Output',
          'Measuring GDP: Output, Income and Expenditure Approaches',
          'Classical vs Keynesian Macroeconomic Perspectives',
          'Money Supply, Inflation and Unemployment (Phillips Curve)',
          'Fiscal Policy and Government Budgeting in Nigeria',
        ],
      },
      {
        id: 'acc-101-uni',
        name: 'ACC 101: Introduction to Financial Accounting',
        popularTopics: [
          'Basic Accounting Principles and Double Entry Framework',
          'Recording in Journals and General Ledgers',
          'Trial Balance, Bad Debts and Adjustments for Accruals/Prepayments',
          'Preparation of Income Statement and Statement of Financial Position',
        ],
      },
    ],
    seniorUnits: [
      {
        id: 'eco-201',
        name: 'ECO 201: Intermediate Microeconomics',
        popularTopics: [
          'Consumer Optimization: Indifference Curves and Budget Constraints',
          'Slutsky Equation: Substitution Effect vs Income Effect',
          'Production Functions: Cobb-Douglas and CES Functions',
          'Market Structures: Monopoly, Oligopoly (Cournot, Bertrand) & Duopoly',
          'General Equilibrium and Pareto Optimality Welfare Economics',
        ],
      },
      {
        id: 'eco-202',
        name: 'ECO 202: Intermediate Macroeconomics',
        popularTopics: [
          'IS-LM Model: Monetary and Fiscal Policy Effectiveness',
          'Aggregate Demand and Aggregate Supply (AD-AS) Framework',
          'Mundell-Fleming Model for Open Economies',
          'Economic Growth Models: Harrod-Domar and Solow Growth Model',
          'Exchange Rate Determination and Purchasing Power Parity (PPP)',
        ],
      },
      {
        id: 'eco-301',
        name: 'ECO 301: Econometrics I',
        popularTopics: [
          'Classical Linear Regression Model (CLRM) Assumptions',
          'Ordinary Least Squares (OLS) Derivation and Estimators',
          'Hypothesis Testing: t-test, F-test and R-squared Goodness of Fit',
          'Violations of OLS: Heteroscedasticity, Autocorrelation, Multicollinearity',
          'Dummy Variables and Model Specification Errors',
        ],
      },
      {
        id: 'bfn-301',
        name: 'BFN 301: Corporate Finance & Investment Analysis',
        popularTopics: [
          'Time Value of Money: NPV, IRR, Payback Period',
          'Capital Budgeting Under Risk and Uncertainty',
          'Capital Asset Pricing Model (CAPM) and Cost of Capital (WACC)',
          'Capital Structure Theories: Modigliani-Miller Theorems',
          'Dividend Policies and Working Capital Management',
        ],
      },
    ],
  },
  {
    id: 'uni-law',
    name: 'Law (LL.B)',
    faculty: 'Faculty of Law',
    year100Units: [
      {
        id: 'law-101',
        name: 'LAW 101: Legal Methods I',
        popularTopics: [
          'Nature, Function and Theories of Law (Natural, Positivist, Realist)',
          'Sources of Nigerian Law: Primary and Secondary Sources',
          'Common Law, Equity and The Doctrine of Judicial Precedent (Stare Decisis)',
          'Statutory Interpretation: Literal, Golden and Mischief Rules',
          'Structure of The Nigerian Court System',
        ],
      },
      {
        id: 'law-102',
        name: 'LAW 102: Nigerian Legal System',
        popularTopics: [
          'Reception of English Law into Nigeria (Ordinances & Statutes)',
          'Customary Law and Islamic Law: Validity Tests (Repugnancy Test)',
          'Hierarchy and Jurisdiction of Superior Courts of Record',
          'Legal Aid, Legal Profession and Legal Ethics in Nigeria',
        ],
      },
    ],
    seniorUnits: [
      {
        id: 'law-201',
        name: 'LAW 201: Constitutional Law',
        popularTopics: [
          'Supremacy of The 1999 Constitution of Nigeria',
          'Separation of Powers, Checks and Balances and Rule of Law',
          'Fundamental Human Rights (Chapter IV) and Limitations',
          'Federalism, Legislative Competence (Exclusive vs Concurrent Lists)',
          'Judicial Review and Executive Immunity (Section 308)',
        ],
      },
      {
        id: 'law-202',
        name: 'LAW 202: Law of Contract',
        popularTopics: [
          'Essentials of a Valid Contract: Offer, Acceptance, Consideration, Intention',
          'Capacity to Contract: Infants, Lunatics and Corporations',
          'Vitiating Elements: Mistake, Misrepresentation, Duress, Undue Influence',
          'Privity of Contract and Exceptions',
          'Discharge of Contract and Remedies for Breach (Damages, Specific Performance)',
        ],
      },
      {
        id: 'law-301',
        name: 'LAW 301: Criminal Law',
        popularTopics: [
          'General Principles of Criminal Liability: Actus Reus and Mens Rea',
          'General Defenses: Insanity (M’Naghten Rules), Self-Defense, Provocation',
          'Homicide: Murder vs Manslaughter Criteria',
          'Offenses Against Property: Stealing, Robbery, Obtaining by False Pretenses',
          'Parties to Offenses: Principals and Accessories',
        ],
      },
      {
        id: 'law-302',
        name: 'LAW 302: Law of Torts',
        popularTopics: [
          'Nature and Objectives of Tortious Liability vs Contract and Crime',
          'Negligence: Duty of Care (Donoghue v Stevenson), Breach and Remoteness',
          'Nuisance: Public and Private Nuisance',
          'Defamation: Libel and Slander, Defenses (Justification, Privilege)',
          'Strict Liability: The Rule in Rylands v Fletcher',
        ],
      },
    ],
  },
];
