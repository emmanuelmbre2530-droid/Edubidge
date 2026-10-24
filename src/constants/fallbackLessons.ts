import { TopicExplanation, QuizQuestion } from '../types';

export interface FallbackLessonData {
  topicKey: string;
  explanation: TopicExplanation;
  quizQuestions: QuizQuestion[];
}

export const FALLBACK_LESSONS: Record<string, FallbackLessonData> = {
  photosynthesis: {
    topicKey: 'photosynthesis',
    explanation: {
      title: 'Understanding Photosynthesis: How Plants Make Food',
      overview:
        'Photosynthesis is the fundamental biological process through which green plants, algae, and cyanobacteria manufacture glucose (chemical energy) from sunlight, carbon dioxide, and water while releasing vital oxygen into the atmosphere.',
      explanation:
        '1. Definition & Equation:\nGreen plants take in Carbon Dioxide (CO2) from the air through microscopic leaf pores called stomata, and absorb Water (H2O) from the soil through root hairs. Trapped sunlight energizes the reaction inside chloroplasts.\nEquation: 6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2.\n\n2. The Two Stages:\n- Light-Dependent Stage (Grana): Sunlight splits water molecules into hydrogen ions and oxygen gas (Photolysis of water).\n- Light-Independent Stage / Calvin Cycle (Stroma): Carbon dioxide combines with hydrogen to synthesize glucose without requiring direct light.\n\n3. Ecological Importance:\nPhotosynthesis serves as the primary energy foundation for nearly all food chains on Earth and replenishes the oxygen we breathe.',
      relatableExample:
        'Imagine preparing a pot of Afang soup in an Akwa Ibom kitchen. Waterleaf and afang leaves are the raw ingredients (water and carbon dioxide), while the kerosene or gas stove provides heat energy (sunlight). Chlorophyll acts like the chef who gathers the heat and ingredients to cook up nourishing food (glucose) while releasing fresh air into the compound!',
      keyTakeaways: [
        'Photosynthesis converts radiant solar energy into stored chemical energy in glucose.',
        'Oxygen gas is produced strictly during the light-dependent stage from the splitting (photolysis) of water.',
        'The process takes place within specialized organelles called chloroplasts, primarily in green leaf mesophyll cells.',
      ],
      comprehensionQuestion: {
        question: 'Which substance is broken down to release oxygen gas during photosynthesis?',
        hint: 'Think about whether oxygen comes from carbon dioxide or from the water absorbed by plant roots.',
        answer:
          'Water (H2O) is split during the light-dependent reaction in the grana of the chloroplast in a process called photolysis of water, releasing oxygen as a byproduct.',
      },
    },
    quizQuestions: [
      {
        id: 'fb-q1',
        question: 'Which organelle in plant cells is the primary site of photosynthesis?',
        options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi apparatus'],
        correctIndex: 1,
        explanation:
          'Chloroplasts contain chlorophyll pigments and the enzymatic machinery necessary to trap light and carry out photosynthetic reactions.',
      },
      {
        id: 'fb-q2',
        question: 'Through which microscopic structures do plant leaves exchange carbon dioxide and oxygen with the air?',
        options: ['Xylem vessels', 'Stomata', 'Lenticels on roots', 'Phloem sieve tubes'],
        correctIndex: 1,
        explanation:
          'Stomata are microscopic pores located primarily on the lower epidermis of leaves that regulate gas exchange and transpiration.',
      },
      {
        id: 'fb-q3',
        question: 'What are the two major chemical products formed during photosynthesis?',
        options: ['Glucose and Oxygen', 'Carbon Dioxide and Water', 'Nitrogen and Starch', 'Methane and Carbon Monoxide'],
        correctIndex: 0,
        explanation:
          'Photosynthesis produces glucose (chemical food stored by the plant) and oxygen gas (released into the atmosphere).',
      },
      {
        id: 'fb-q4',
        question: 'During which phase of photosynthesis does the photolysis of water occur?',
        options: ['Light-independent Calvin cycle', 'Light-dependent stage in the grana', 'Glycolysis', 'Krebs cycle'],
        correctIndex: 1,
        explanation:
          'Photolysis of water occurs in the grana/thylakoid membranes during the light-dependent phase, driven by absorbed solar photons.',
      },
      {
        id: 'fb-q5',
        question: 'What is the primary role of the green pigment chlorophyll in leaves?',
        options: ['Absorbing water from the soil', 'Transporting sugar to fruits', 'Trapping solar light energy', 'Protecting leaves from pests'],
        correctIndex: 2,
        explanation:
          'Chlorophyll absorbs wavelengths of sunlight (principally blue and red) to energize electrons that power the chemical synthesis of food.',
      },
    ],
  },
  fractions: {
    topicKey: 'fractions',
    explanation: {
      title: 'Fractions, Decimals, and Percentages Made Simple',
      overview:
        'A fraction represents an equal part or portion of a whole number. Fractions, decimals, and percentages are simply three different ways of expressing the exact same numerical quantity.',
      explanation:
        '1. Structure of a Fraction:\n- Numerator (top number): How many parts you have.\n- Denominator (bottom number): The total number of equal parts that make up the whole.\n\n2. Types of Fractions:\n- Proper Fraction: Numerator < Denominator (e.g. 3/4).\n- Improper Fraction: Numerator >= Denominator (e.g. 5/3).\n- Mixed Number: Whole number + fraction (e.g. 1 2/3).\n\n3. Conversions:\n- Fraction to Decimal: Divide the numerator by the denominator (e.g. 3/4 = 0.75).\n- Decimal to Percentage: Multiply by 100% (0.75 * 100% = 75%).',
      relatableExample:
        'Imagine buying a loaf of Agege bread or a meat pie in Uyo market. If you slice the pie into 4 equal pieces and give 1 piece to your younger sibling, your sibling gets 1/4 (one-quarter or 0.25 or 25%) of the pie, while you keep 3/4 (three-quarters or 0.75 or 75%)!',
      keyTakeaways: [
        'The denominator indicates the total parts into which the whole is divided.',
        'To add or subtract fractions with unlike denominators, always find the Lowest Common Multiple (LCM) first.',
        'Fractions, decimals, and percentages are interchangeable representations of the same portion.',
      ],
      comprehensionQuestion: {
        question: 'What is 3/5 expressed as both a decimal and a percentage?',
        hint: 'Divide 3 by 5, then multiply the resulting decimal by 100%.',
        answer: '3 divided by 5 equals 0.60. Multiplying 0.60 by 100% gives 60%.',
      },
    },
    quizQuestions: [
      {
        id: 'fb-frac-1',
        question: 'What is the sum of 1/4 and 2/4?',
        options: ['3/8', '3/4', '2/8', '1/2'],
        correctIndex: 1,
        explanation: 'When denominators are identical, simply add the numerators: 1 + 2 = 3, keeping the denominator 4 (3/4).',
      },
      {
        id: 'fb-frac-2',
        question: 'Convert the fraction 4/5 into a percentage.',
        options: ['40%', '80%', '45%', '75%'],
        correctIndex: 1,
        explanation: '4/5 = 0.80. Multiplying by 100 gives 80%.',
      },
      {
        id: 'fb-frac-3',
        question: 'Which of the following is an improper fraction?',
        options: ['3/7', '5/8', '9/4', '1/2'],
        correctIndex: 2,
        explanation: 'In 9/4, the numerator (9) is greater than the denominator (4), making it an improper fraction.',
      },
      {
        id: 'fb-frac-4',
        question: 'What is 1/2 divided by 1/4?',
        options: ['1/8', '1/2', '2', '4'],
        correctIndex: 2,
        explanation: 'To divide fractions, multiply by the reciprocal of the second: (1/2) * (4/1) = 4/2 = 2.',
      },
      {
        id: 'fb-frac-5',
        question: 'What is the Lowest Common Denominator (LCD) for 2/3 and 1/4?',
        options: ['7', '12', '24', '6'],
        correctIndex: 1,
        explanation: 'The LCM of 3 and 4 is 12, so the lowest common denominator is 12.',
      },
    ],
  },
  circuits: {
    topicKey: 'circuits',
    explanation: {
      title: "Ohm's Law and Electric Circuits",
      overview:
        "Ohm's Law is the foundational principle of electrical engineering and physics. It states that electric current flowing through a conductor between two points is directly proportional to voltage across the two points, provided physical conditions like temperature remain constant.",
      explanation:
        "1. The Core Equation:\nV = I * R\nWhere:\n- V = Potential Difference / Voltage (measured in Volts, V)\n- I = Electric Current (measured in Amperes, A)\n- R = Resistance (measured in Ohms, Ω)\n\n2. Key Circuit Configurations:\n- Series Circuit: Components connected in a single path. Current is the same throughout; total resistance is R1 + R2 + R3.\n- Parallel Circuit: Components connected across separate branches. Voltage is the same across each branch; reciprocal of total resistance is 1/R_total = 1/R1 + 1/R2.\n\n3. Safety and Control:\nFuses and circuit breakers protect appliances from excessive current that causes overheating.",
      relatableExample:
        'Think of water being pumped through a plastic PVC pipe from an overhead tank in your house. The height of the tank gives water pressure (Voltage). The volume of water flowing through per second is Current. If you squeeze or narrow the pipe, you create Resistance. The more you squeeze the pipe (higher resistance), the less water flows out (lower current)!',
      keyTakeaways: [
        "Ohm's Law formula is V = I * R, meaning Current I = V / R.",
        'In a series circuit, current is identical everywhere, while in a parallel circuit, voltage is identical across every branch.',
        'Resistance opposes current flow, converting electrical energy into heat.',
      ],
      comprehensionQuestion: {
        question: 'If a 12V battery is connected across a 4Ω resistor, what current flows through the circuit?',
        hint: "Use Ohm's Law formula: I = V / R.",
        answer: 'I = V / R = 12 Volts / 4 Ohms = 3 Amperes.',
      },
    },
    quizQuestions: [
      {
        id: 'fb-cir-1',
        question: "What is the SI unit of electrical resistance?",
        options: ['Ampere', 'Volt', 'Ohm', 'Watt'],
        correctIndex: 2,
        explanation: 'Electrical resistance is measured in Ohms, symbolized by the Greek letter Omega (Ω).',
      },
      {
        id: 'fb-cir-2',
        question: "According to Ohm's Law, what happens to current if voltage is doubled while resistance remains constant?",
        options: ['Current doubles', 'Current is halved', 'Current stays the same', 'Current drops to zero'],
        correctIndex: 0,
        explanation: 'Because Current I = V / R, current is directly proportional to voltage; doubling voltage doubles current.',
      },
      {
        id: 'fb-cir-3',
        question: 'In a series circuit with resistors of 2Ω, 3Ω, and 5Ω, what is the total equivalent resistance?',
        options: ['10Ω', '1.0Ω', '30Ω', '5Ω'],
        correctIndex: 0,
        explanation: 'In series, resistances simply add up: 2 + 3 + 5 = 10Ω.',
      },
      {
        id: 'fb-cir-4',
        question: 'Which instrument is connected in series with a circuit to measure electrical current?',
        options: ['Voltmeter', 'Ammeter', 'Galvanometer in parallel', 'Ohmmeter'],
        correctIndex: 1,
        explanation: 'An ammeter has very low internal resistance and is connected in series to measure total current passing through.',
      },
      {
        id: 'fb-cir-5',
        question: 'What is the voltage across an 8Ω resistor carrying a current of 2.5A?',
        options: ['3.2V', '10.5V', '20V', '16V'],
        correctIndex: 2,
        explanation: 'V = I * R = 2.5A * 8Ω = 20 Volts.',
      },
    ],
  },
};

export function findFallbackLesson(topic: string): FallbackLessonData | null {
  const clean = topic.toLowerCase().trim();
  if (clean.includes('photo') || clean.includes('plant food') || clean.includes('leaf')) {
    return FALLBACK_LESSONS.photosynthesis;
  }
  if (clean.includes('fraction') || clean.includes('decimal') || clean.includes('percent')) {
    return FALLBACK_LESSONS.fractions;
  }
  if (clean.includes('ohm') || clean.includes('circuit') || clean.includes('electric') || clean.includes('voltage')) {
    return FALLBACK_LESSONS.circuits;
  }
  return null;
}
