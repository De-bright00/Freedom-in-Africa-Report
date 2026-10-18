import { EditionConfig } from './types'

export const config2026: EditionConfig = {
  year: '2026',
  title: 'F(in)AR 2026',
  shortMark: 'F(in)AR',
  fullName: 'Freedom in Africa Report 2026',
  editionTag: '2026 Edition · Second Edition',
  headlineSummary:
    'The 2026 Freedom in Africa Report reveals an Africa of significant contrasts. Africa records an aggregate composite score of 51.2, with Political Freedom advancing to 52.8 and Prosperity rising to 56.5, while Economic Freedom dropped to 44.3 amid rising cross-border friction, inflation pressures, and tax burdens.',
  overallScore: 51.2,
  politicalScore: 52.8,
  economicScore: 44.3,
  prosperityScore: 56.5,
  coverImage: '/finar-2026-cover.png',
  pdfUrl: '/finar-2026-report.pdf',
  pdfFileName: 'F(in)AR_2026_Freedom_in_Africa_Report.pdf',
  datasetCsvUrl: '/finar-2026-indicator-dataset.csv',
  datasetCsvFileName: 'F(in)AR_2026_Country_Indicator_Dataset.csv',
  stats: [
    { value: '51.2', label: 'Africa’s overall score', note: 'out of 100 · 2026 composite' },
    { value: '52.8', label: 'Political Freedom', note: '33% weight · institutional protections' },
    { value: '44.3', label: 'Economic Freedom', note: '33% weight · property & trade openness' },
    { value: '56.5', label: 'Prosperity', note: '34% weight · living standards & peace' },
  ],
  regions: [
    {
      name: 'Southern Africa',
      avgScore: 57.7,
      standing: 'Best performing',
      leader: 'Botswana (71.2) & South Africa (70.3)',
      challenge: 'Persistent youth unemployment and acute economic inequality',
    },
    {
      name: 'Western Africa',
      avgScore: 56.1,
      standing: 'High performing',
      leader: 'Ghana (73.4), Cabo Verde (73.1) & Gambia (67.4)',
      challenge: 'Severe instability and military consolidation in the central Sahel',
    },
    {
      name: 'Eastern Africa',
      avgScore: 48.9,
      standing: 'Widest internal gap',
      leader: 'Mauritius (84.2) & Seychelles (84.1)',
      challenge: 'Fragility in South Sudan (19.6), Somalia (26.3), and Eritrea (25.3)',
    },
    {
      name: 'Northern Africa',
      avgScore: 47.9,
      standing: 'Lower tier',
      leader: 'Morocco (61.8) & Tunisia (59.9)',
      challenge: 'Armed conflict and political fracture in Sudan (33.4) and Libya (33.6)',
    },
    {
      name: 'Central Africa',
      avgScore: 43.9,
      standing: 'Lowest scoring',
      leader: 'Sao Tome and Principe (64.2) & Gabon (59.2)',
      challenge: 'Weakest institutional environment, low trade openness, and resource conflict',
    },
  ],
  globalComparison: [
    { region: 'North America', score: 84.7 },
    { region: 'Europe', score: 81.1 },
    { region: 'South America', score: 70.2 },
    { region: 'Asia', score: 58.0 },
    { region: 'Africa', score: 51.2, isAfrica: true },
  ],
  specialThemes: [
    {
      id: 'mobility',
      title: 'Visa-Free Africa & Mobility',
      badge: 'Theme 1 · Integration',
      summary:
        'Continental mobility shows positive momentum, with 53% of cross-border travel routes no longer requiring a strict prior visa (28% visa-free, 25% visa on arrival). However, 47% still require pre-departure visas, and vast disparities persist across economic blocs.',
      keyStats: [
        { label: 'Visa-free entry paths', value: '28%' },
        { label: 'Visa on arrival', value: '25%' },
        { label: 'Pre-departure visa required', value: '47%' },
        { label: 'ECOWAS Openness Score', value: '59.7' },
      ],
      findings: [
        'ECOWAS leads the continent with 100% mutual visa-free travel among remaining 12 members, followed by EAC with 53.8 openness.',
        'Togo recently became the fifth African nation to drop all visas for all African travelers, joining Kenya, The Gambia, Benin, and Rwanda.',
        'Chad and the Republic of the Congo have announced full visa-free access for all Africans starting January 1, 2027.',
        'SADC nations approved the pilot SADC UNIVISA covering Angola, Mozambique, Namibia, South Africa, and Zimbabwe.',
        'The Arab Maghreb Union (AMU) remains the most restricted bloc at 16.6 openness, where only 60% of intra-bloc routes remain open.',
      ],
    },
    {
      id: 'digital',
      title: 'Digital Freedom Under Pressure',
      badge: 'Theme 2 · Connectivity & Rights',
      summary:
        'Mobile technology generated $240 billion (7.8% of GDP) and supported 13 million jobs across Africa. Yet digital freedom is facing heavy government repression, with 30 internet shutdowns documented across 15 countries.',
      keyStats: [
        { label: 'Mobile GDP Contribution', value: '$240B' },
        { label: 'Internet Shutdowns (2025)', value: '30' },
        { label: 'Countries with Blackouts', value: '15' },
        { label: 'Unconnected Usage Gap', value: '63%' },
      ],
      findings: [
        'Tanzania experienced the most frequent network disruptions with eight recorded internet blackouts.',
        'South Africa is the only African country ranked "Free" in digital freedom (73/100). Ghana (64), Nigeria (59), and Uganda (52) rank Partly Free, while Ethiopia sits at Not Free (30).',
        'Economic fallout is severe: a two-hour nationwide internet shutdown in Kenya costs an estimated $1.2 million in lost GDP.',
        'A 63% mobile usage gap persists despite network coverage, driven by unaffordable 4G/5G smartphones and heavy data taxes.',
      ],
    },
    {
      id: 'youth',
      title: 'Civic Movements & Youth Participation',
      badge: 'Theme 3 · Democratic Voice',
      summary:
        'Youth-led movements are reshaping African civic spaces by demanding good governance and accountability, but face fierce state crackdowns. 89.8% of monitored African countries have obstructed, repressed, or closed civic space.',
      keyStats: [
        { label: 'Restricted Civic Spaces', value: '89.8%' },
        { label: 'Southern Africa Protest Arrests', value: '72.2%' },
        { label: 'Documented Protest Deaths', value: '330+' },
        { label: 'Countries Using Violent Force', value: '20' },
      ],
      findings: [
        'In Kenya, youth-led protests against the 2024 finance bill forced tax withdrawals but met with severe state suppression, escalating into 2026 with 29% protest growth.',
        'Police detained protesters in at least 19 countries and deployed excessive, violent force in at least 20 nations.',
        'Southern Africa accounted for 72.2% of documented protest arrests (5,715) and 77.8% of protest deaths (330), driven by massive demonstrations.',
        'Young Africans increasingly circumvent traditional political structures via decentralised social media and environmental campaigns.',
      ],
    },
  ],
  crossCountryComparisons: [
    {
      title: 'Ghana vs Nigeria',
      countryA: 'Ghana',
      countryB: 'Nigeria',
      scoreA: 73.4,
      scoreB: 59.6,
      analysis:
        'Ghana leads Nigeria significantly across all three dimensions. Ghana scores 88.3 in Political Freedom (vs Nigeria’s 59.3), 62.7 in Economic Freedom (vs 56.7), and 69.5 in Prosperity (vs 62.7). Ghana’s strong electoral dispute mechanisms and democratic stability give it a resilient advantage over Nigeria’s judicial interference and security headwinds.',
    },
    {
      title: 'Seychelles vs South Africa',
      countryA: 'Seychelles',
      countryB: 'South Africa',
      scoreA: 84.1,
      scoreB: 70.3,
      analysis:
        'Seychelles outperforms South Africa across Political Freedom (91.6 vs 86.5), Economic Freedom (73.3 vs 63.0), and Prosperity (87.3 vs 61.7). While both maintain vibrant democracies, Seychelles boasts a near-perfect judiciary (9.9) and high living standards, whereas South Africa struggles with extreme youth unemployment (score of 1.0) and severe income inequality.',
    },
    {
      title: 'Mauritius vs Rwanda',
      countryA: 'Mauritius',
      countryB: 'Rwanda',
      scoreA: 84.2,
      scoreB: 47.2,
      analysis:
        'Mauritius and Rwanda present the continent’s clearest contrast between holistic liberty and authoritarian developmentalism. Mauritius excels across all pillars (87.6 political, 80.8 economic, 84.1 prosperity). Rwanda records a decent prosperity score of 64.1 and economic score of 49.3, but collapses to 27.6 in political freedom, where political opposition and civic debate remain tightly repressed.',
    },
    {
      title: 'Botswana vs Zimbabwe',
      countryA: 'Botswana',
      countryB: 'Zimbabwe',
      scoreA: 71.2,
      scoreB: 36.7,
      analysis:
        'Neighbors Botswana and Zimbabwe demonstrate how institutions govern long-term human flourishing. Botswana celebrated a historic, peaceful electoral transition in 2024 with a score of 71.2, while Zimbabwe sits at 36.7, severely burdened by monetary collapse (2.4), poor judicial autonomy, and fragile property protections.',
    },
  ],
  keyFindings: [
    'Mauritius (84.2) and Seychelles (84.1) lead the continent as Africa’s freest and most prosperous societies, closely followed by Ghana (73.4), Cabo Verde (73.1), Botswana (71.2), and South Africa (70.3).',
    'Political Freedom stands at 52.8 across Africa, driven by electoral resilience and judicial reform in leading nations.',
    'Economic Freedom averages 44.3 across Africa, weighed down by higher tax burdens, customs delays under AfCFTA, and digital restrictions.',
    'Prosperity averages 56.5 across the continent, although youth unemployment, health funding gaps, and regional conflict continue to limit everyday quality of life.',
    'Regional divides remain stark: Southern Africa (57.7) and Western Africa (56.1) lead, while Central Africa (43.9) remains the most restricted.',
  ],
}
