import { DEFAULT_SETTINGS, DEFAULT_VOICE_PROFILE } from '../data/brandSeed';
import type { AppSettings, BlogDraft, SocialDraft, VoiceProfile } from '../types/studio';

const KEYS = {
  settings: 'of_growth_settings_v1',
  voice: 'of_growth_voice_v1',
  usedMedia: 'of_growth_used_media_v1',
  socialDrafts: 'of_growth_social_drafts_v1',
  blogDrafts: 'of_growth_blog_drafts_v1',
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function readArray<T>(key: string, fallback: T[] = []): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function loadSettings(): AppSettings {
  return readJson(KEYS.settings, DEFAULT_SETTINGS);
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export function loadVoiceProfile(): VoiceProfile {
  return readJson(KEYS.voice, DEFAULT_VOICE_PROFILE);
}

export function saveVoiceProfile(profile: VoiceProfile): void {
  localStorage.setItem(KEYS.voice, JSON.stringify(profile));
}

export function loadUsedMediaIds(): string[] {
  return readArray<string>(KEYS.usedMedia, []);
}

export function saveUsedMediaIds(ids: string[]): void {
  localStorage.setItem(KEYS.usedMedia, JSON.stringify(Array.from(new Set(ids))));
}

export function loadSocialDrafts(): SocialDraft[] {
  return readArray<SocialDraft>(KEYS.socialDrafts, []);
}

export function saveSocialDrafts(drafts: SocialDraft[]): void {
  localStorage.setItem(KEYS.socialDrafts, JSON.stringify(drafts));
}

export function loadBlogDrafts(): BlogDraft[] {
  return readArray<BlogDraft>(KEYS.blogDrafts, []);
}

export function saveBlogDrafts(drafts: BlogDraft[]): void {
  localStorage.setItem(KEYS.blogDrafts, JSON.stringify(drafts));
}
