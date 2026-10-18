import { IndicatorMeta } from './types'

export const indicatorMetadata: IndicatorMeta[] = [
  // Political Freedom (6 indicators, weight 33%)
  {
    code: 'A',
    key: 'electoral_integrity',
    label: 'Electoral Integrity',
    fullName: 'Electoral Integrity — Free, fair, and competitive elections',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Assesses whether national elections are competitive, transparent, multiparty, and free from intimidation or manipulation.',
  },
  {
    code: 'B',
    key: 'speech',
    label: 'Freedom of Speech',
    fullName: 'Freedom of Speech and Expression',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Protects individual opinion and public speech without fear of harassment, state censorship, or retaliation.',
  },
  {
    code: 'C',
    key: 'media',
    label: 'Press & Media Freedom',
    fullName: 'Press Freedom and Media Pluralism',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Measures the independence and safety of journalists, critical investigative reporting, and freedom from state control.',
  },
  {
    code: 'D',
    key: 'assembly',
    label: 'Freedom of Assembly',
    fullName: 'Freedom of Peaceful Assembly and Association',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Guarantees the right of citizens to assemble peacefully, organize around civic causes, and protest government decisions.',
  },
  {
    code: 'E',
    key: 'judicial',
    label: 'Judicial Independence',
    fullName: 'Judicial Independence and Rule of Law',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Evaluates judicial impartiality, separation of powers, financial autonomy, and protection from political interference.',
  },
  {
    code: 'F',
    key: 'freedom_from_oppression',
    label: 'Right to Dignity',
    fullName: 'Freedom from Oppression and Arbitrary Detention',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description:
      'Protects citizens against torture, degrading treatment, arbitrary detention, and abuses of state power.',
  },

  // Economic Freedom (7 indicators, weight 33%)
  {
    code: 'G',
    key: 'property_rights',
    label: 'Property Rights',
    fullName: 'Property Rights and Land Tenure Security',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Determines how securely individuals and businesses can own, use, transfer, and invest in land and assets without expropriation.',
  },
  {
    code: 'H',
    key: 'ease_of_business',
    label: 'Ease of Starting a Business',
    fullName: 'Ease of Starting and Operating a Business',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Evaluates startup licensing, registration transparency, time and cost hurdles, and bureaucratic burdens on enterprise.',
  },
  {
    code: 'I',
    key: 'trade',
    label: 'Trade Freedom',
    fullName: 'Free Trade and Regional Integration',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Examines cross-border tariff barriers, customs efficiency, non-tariff restrictions, and AfCFTA implementation.',
  },
  {
    code: 'J',
    key: 'travel',
    label: 'Free Movement',
    fullName: 'Freedom of Movement and Visa Openness',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Assesses intra-continental mobility, visa-free agreements, visas on arrival, and cross-border travel ease.',
  },
  {
    code: 'K',
    key: 'tax_burden',
    label: 'Tax Burden',
    fullName: 'Taxation Burden and Fiscal Freedom',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Measures personal and corporate tax rates, tax administration complexity, and fiscal pressure on economic activity.',
  },
  {
    code: 'L',
    key: 'labour',
    label: 'Labour Freedom',
    fullName: 'Labour Market Freedom and Flexibility',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Reflects how easily workers can enter employment and switch jobs, along with hiring and operational flexibility for employers.',
  },
  {
    code: 'M',
    key: 'digital_economy',
    label: 'Digital Economy Growth',
    fullName: 'Digital Economy and Tech Business Regulation',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description:
      'Measures technology adoption, broadband connectivity, fintech innovation, and digital business regulations.',
  },

  // Prosperity (7 indicators, weight 34%)
  {
    code: 'N',
    key: 'monetary_freedom',
    label: 'Income & Financial Freedom',
    fullName: 'Monetary Freedom / Income & Financial Stability',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Ability of citizens to maintain purchasing power, avoid runaway inflation, and enjoy price stability.',
    nonComparableNote:
      'Non-comparable between editions: In the 2026 edition, this factor evaluates Monetary Freedom (price stability & inflation); in the 2025 edition, it assessed Income Levels & Poverty Reduction.',
  },
  {
    code: 'O',
    key: 'employment',
    label: 'Employment & Enterprise',
    fullName: 'Employment Opportunities and Productive Entrepreneurship',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Formal employment creation, labor market participation, and movement from necessity-based to productive opportunity-based enterprise.',
  },
  {
    code: 'P',
    key: 'education',
    label: 'Education & Literacy',
    fullName: 'Access to Quality Education and Literacy',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'School enrollment, literacy rates, educational security, and building productive human capital.',
  },
  {
    code: 'Q',
    key: 'healthcare',
    label: 'Access to Healthcare',
    fullName: 'Access to Essential Healthcare Services',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Affordability and availability of clinical care, out-of-pocket health expenditure risks, and health outcomes.',
  },
  {
    code: 'R',
    key: 'infrastructure',
    label: 'Infrastructure Access',
    fullName: 'Access to Critical Physical Infrastructure',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Reliability of electricity networks, clean potable water, transport corridors, and modern logistics.',
  },
  {
    code: 'S',
    key: 'inequality',
    label: 'Economic Inequality',
    fullName: 'Economic Inequality / Social Inclusion',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Fair distribution of economic opportunity, income concentration, and accessibility of public services across society.',
    nonComparableNote:
      'Non-comparable between editions: In the 2026 edition, this factor is measured as an Inequality Index; in the 2025 edition, it was evaluated as Social Mobility & Inequality.',
  },
  {
    code: 'T',
    key: 'peace_stability',
    label: 'Peace & Stability',
    fullName: 'Domestic Peace, Security and Absence of Conflict',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description:
      'Absence of violent armed conflict, personal security, political stability, and community safety.',
  },
]
