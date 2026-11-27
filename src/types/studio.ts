export type NavTab = 'social' | 'blog' | 'media' | 'voice' | 'outreach';

export type SocialFormat = 'ig_post' | 'ig_reel' | 'ig_story' | 'reels_launchpad';

export type AIProvider = 'openrouter' | 'gemini';

export interface VoiceSample {
  id: string;
  source: string;
  text: string;
}

export interface VoiceProfile {
  ownerName: string;
  businessName: string;
  website: string;
  instagramHandle: string;
  phone: string;
  email: string;
  homeBase: string;
  serviceRadius: string;
  toneTraits: string[];
  signatureVocabulary: string[];
  bannedPhrases: string[];
  writingRules: string;
  samples: VoiceSample[];
  analyzedFingerprint: string;
}

export interface AppSettings {
  aiProvider: AIProvider;
  apiKey: string;
  model: string;
  googleClientId: string;
  driveConnected: boolean;
  driveAccessToken: string;
}

export interface StoryFrame {
  frame: number;
  visual: string;
  overlayText: string;
  stickerIdea: string;
}

export interface ReelShot {
  timecode: string;
  visual: string;
  spokenLine: string;
  onScreenText: string;
}

export interface SocialDraft {
  id: string;
  createdAt: string;
  format: SocialFormat;
  mediaIds: string[];
  mediaNames: string[];
  topicNote: string;
  includeStoryAddon: boolean;
  // IG Post / Reel caption fields
  hook?: string;
  caption?: string;
  carouselSlides?: string[];
  hashtags?: string[];
  callToAction?: string;
  // Story fields (standalone OR optional add-on)
  storyFrames?: StoryFrame[];
  // IG Reel fields (vertical short-form IG Reels tab)
  reelTitle?: string;
  reelCoverText?: string;
  durationSec?: string;
  audioVibe?: string;
  shots?: ReelShot[];
  fullVoiceover?: string;
  reelPinnedComment?: string;
  status: 'draft' | 'ready' | 'posted';
}

export interface SeoTopicIdea {
  id: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  regionScope: 'Oklahoma Local' | '5-State Regional' | 'National & Beyond';
  audience: 'Homeowner' | 'Designer / Architect' | 'Commercial GC';
  searchIntent: string;
  whyNow: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogImagePairing {
  mediaId?: string;
  fileName: string;
  suggestedSeoFilename: string;
  altText: string;
  caption: string;
}

export interface BlogDraft {
  id: string;
  createdAt: string;
  topic: string;
  regionScope: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  titleTag: string;
  metaDescription: string;
  urlSlug: string;
  h1: string;
  bodyMarkdown: string;
  faqs: BlogFaq[];
  imagePairings: BlogImagePairing[];
  jsonLdSchema: string;
  internalLinks: string[];
  status: 'draft' | 'ready' | 'published';
}

export interface SeoAuditCheck {
  label: string;
  passed: boolean;
  severity: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface SeoAuditResult {
  score: number;
  wordCount: number;
  bannedHits: string[];
  checks: SeoAuditCheck[];
}
