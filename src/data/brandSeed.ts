import type { AppSettings, SeoTopicIdea, VoiceProfile } from '../types/studio';

export const DEFAULT_SETTINGS: AppSettings = {
  aiProvider: 'openrouter',
  apiKey: '',
  model: 'google/gemini-2.5-flash',
  googleClientId: '',
  driveConnected: false,
  driveAccessToken: '',
};

export const DEFAULT_VOICE_PROFILE: VoiceProfile = {
  ownerName: 'Shawn Reeder',
  businessName: 'Organic Finishes LLC',
  website: 'https://organicfinishesllc.org',
  instagramHandle: '@organic.finishes',
  phone: '405-816-0750',
  email: 'contact@organicfinishesllc.org',
  homeBase: 'Oklahoma (OKC, Edmond, Tulsa, Grand Lake)',
  serviceRadius: 'Oklahoma, Texas, Arkansas, Kansas & Missouri',
  toneTraits: [
    'Craftsman-first & grounded',
    'Direct, plain-spoken, zero fluff',
    'Technically accurate on substrates & prep',
    'Calm confidence — never hypey or salesy',
    'Owner-operated accountability',
  ],
  signatureVocabulary: [
    'hand-troweled',
    'Venetian plaster',
    'burnished Marmorino',
    'Tadelakt',
    'seamless microcement',
    'slaked limewash',
    'zero-VOC mineral',
    'substrate prep',
    'HEPA dust-controlled',
    'waterproof membrane',
    'custom sample boards',
    'raking light',
    'single-point accountability',
  ],
  bannedPhrases: [
    'elevate your space',
    'transform your home',
    'game-changer',
    'unleash',
    'delve',
    'timeless elegance',
    'luxury meets functionality',
    'breathtaking',
    'stunning masterpiece',
    'in today’s fast-paced world',
    'look no further',
    'nestled',
  ],
  writingRules:
    'Write like an experienced solo architectural plaster applicator talking shop with a smart homeowner, interior designer, or custom home builder. Short, concrete sentences. Mention the real craft (surface prep, trowel passes, lime/mineral depth, clean HEPA containment) instead of vague marketing adjectives. Use 0–2 understated emojis max on IG; 0 emojis in SEO blogs.',
  samples: [
    {
      id: 'seed-email-1',
      source: 'Drive Email Template (Shawn)',
      text: 'My name is Shawn Reeder, owner of Organic Finishes LLC. I specialize in custom architectural plaster, Tadelakt, seamless microcement, and zero-VOC mineral paints for residential and commercial spaces across Oklahoma and the surrounding states. Whether you are working on a custom fireplace, vent hood, accent wall, or a waterproof microcement and Tadelakt wet space, I handle the entire process from surface prep to the final protective sealer.',
    },
  ],
  analyzedFingerprint:
    'Direct, steady cadence. Leads with what the work actually is (material, substrate, execution) rather than hype. Emphasizes clean job sites (HEPA prep), start-to-finish owner craftsmanship, and Oklahoma + 5-state availability.',
};

export const SEED_SEO_TOPICS: SeoTopicIdea[] = [
  {
    id: 'topic-microcement-ok',
    title: 'Microcement Showers vs. Tile in Oklahoma Custom Homes: Cost, Waterproofing & Maintenance',
    primaryKeyword: 'microcement shower Oklahoma',
    secondaryKeywords: [
      'seamless microcement bathroom Tulsa',
      'groutless shower Oklahoma City',
      'waterproof microcement cost',
    ],
    regionScope: 'Oklahoma Local',
    audience: 'Homeowner',
    searchIntent: 'Commercial investigation — homeowners and custom builders comparing grout-free showers to porcelain tile.',
    whyNow: 'High regional demand in Edmond, Nichols Hills, and South Tulsa luxury remodels tired of scrubbing stained grout.',
  },
  {
    id: 'topic-plaster-fireplace-tulsa',
    title: 'Hand-Troweled Limestone & Venetian Plaster Fireplaces: What Oklahoma Builders Need to Know About Substrate Prep',
    primaryKeyword: 'plaster fireplace Tulsa Oklahoma',
    secondaryKeywords: [
      'Venetian plaster range hood OKC',
      'lime plaster fireplace surround',
      'custom plaster fireplace prep',
    ],
    regionScope: 'Oklahoma Local',
    audience: 'Designer / Architect',
    searchIntent: 'Informational + local service intent from custom builders & designers specifying monolithic fireplaces.',
    whyNow: 'Plaster fireplaces and sculpted range hoods are the #1 requested focal point across Tulsa and OKC luxury builds.',
  },
  {
    id: 'topic-tadelakt-wet-rooms',
    title: 'Tadelakt vs. Microcement for Wet Rooms: Choosing the Right Waterproof Mineral Finish',
    primaryKeyword: 'Tadelakt vs microcement shower',
    secondaryKeywords: [
      'Moroccan lime plaster shower',
      'waterproof lime plaster applicator',
      'organic modern bathroom finishes',
    ],
    regionScope: 'National & Beyond',
    audience: 'Designer / Architect',
    searchIntent: 'High-volume national search query by designers comparing traditional soap-burnished Tadelakt to polymer microcement.',
    whyNow: 'Strong evergreen + rising organic-modern wellness architecture search traffic nationwide.',
  },
  {
    id: 'topic-commercial-microcement-5state',
    title: 'Zero-Demolition Commercial Microcement Over Existing Tile for Retail & Hospitality Spaces (OK, TX, AR, KS, MO)',
    primaryKeyword: 'commercial microcement flooring contractor',
    secondaryKeywords: [
      'microcement over existing tile retail',
      'HEPA dust-free commercial renovation',
      'Division 09 specialty plaster contractor',
    ],
    regionScope: '5-State Regional',
    audience: 'Commercial GC',
    searchIntent: 'B2B vendor search by commercial GCs, restaurant groups, and boutique retail managers needing fast off-hours turnarounds.',
    whyNow: 'Directly targets your 5-state commercial mobilization capability and HEPA off-hours advantage.',
  },
  {
    id: 'topic-limewash-vs-roman-clay',
    title: 'Slaked Limewash vs. Roman Clay vs. Burnished Marmorino: How to Pick the Right Wall Finish',
    primaryKeyword: 'limewash vs Venetian plaster',
    secondaryKeywords: [
      'slaked lime paint Oklahoma',
      'Marmorino plaster walls',
      'zero VOC mineral wall finish',
    ],
    regionScope: 'National & Beyond',
    audience: 'Homeowner',
    searchIntent: 'Top-of-funnel educational search comparing mineral wall finishes by sheen, movement, durability, and price.',
    whyNow: 'Captures both local Oklahoma searches and national traffic looking for real applicator advice (not DIY paint blogs).',
  },
];

export interface ReelsPlaybook {
  id: string;
  title: string;
  length: string;
  filmEffort: 'Zero filming (use Drive photos)' | '15-sec phone clip on site' | '30-sec shop/sample board';
  hookExample: string;
  whyItWorksOnIG: string;
  recommendedCategory: string;
}

export const REELS_STARTER_PLAYBOOKS: ReelsPlaybook[] = [
  {
    id: 'reels-photo-breakdown',
    title: '3-Photo Detail → Process → Wide Reveal Reel',
    length: '15–22 sec',
    filmEffort: 'Zero filming (use Drive photos)',
    hookExample: 'Everyone asks how we get a seamless fireplace with zero paint lines — here are the 3 layers.',
    whyItWorksOnIG:
      'Instagram Reels rewards quick 2–3 second visual cuts + a clear spoken explanation. Build this today from 3 existing Drive photos right inside the IG Reels editor.',
    recommendedCategory: 'fireplaces',
  },
  {
    id: 'reels-trowel-asmr',
    title: 'Real Trowel Pass + 1-Line Craft Fact',
    length: '12–18 sec',
    filmEffort: '15-sec phone clip on site',
    hookExample: 'Listen to the burnish pass — that steel trowel is what closes the pores in real lime plaster.',
    whyItWorksOnIG:
      'Satisfying trowel audio + authentic craftsmanship gets huge replay and save rates in the IG Reels tab without needing to talk on camera.',
    recommendedCategory: 'fieldwork',
  },
  {
    id: 'reels-sample-raking-light',
    title: 'Tilt a Sample Board in Natural Light',
    length: '15–25 sec',
    filmEffort: '30-sec shop/sample board',
    hookExample: 'Why flat paint never looks like real Marmorino — watch what happens when daylight hits it.',
    whyItWorksOnIG:
      'Shoot in your shop in 60 seconds. Tulsa & OKC interior designers save and share sample-board Reels directly to client mood boards.',
    recommendedCategory: 'samples',
  },
  {
    id: 'reels-myth-buster',
    title: 'Quick Trade Myth-Buster (Microcement / Grout / Prep)',
    length: '20–30 sec',
    filmEffort: 'Zero filming (use Drive photos)',
    hookExample: 'No, you do not have to jackhammer your old tile to get a seamless concrete-look shower.',
    whyItWorksOnIG:
      'Answering one real client question triggers comments and DMs from homeowners and custom builders actively planning a remodel.',
    recommendedCategory: 'walls',
  },
];
