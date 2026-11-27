import React, { useState } from 'react';
import {
  Check,
  Clapperboard,
  Copy,
  Film,
  Image as ImageIcon,
  Layers,
  PlaySquare,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { REELS_STARTER_PLAYBOOKS, type ReelsPlaybook } from '../data/brandSeed';
import type { DriveMediaItem } from '../data/driveCatalog';
import { generateSocialContent } from '../services/aiService';
import { fetchDriveImageAsDataUrl } from '../services/driveService';
import type { AppSettings, SocialDraft, SocialFormat, VoiceProfile } from '../types/studio';

interface SocialStudioProps {
  settings: AppSettings;
  voice: VoiceProfile;
  mediaItems: DriveMediaItem[];
  selectedMediaIds: string[];
  usedMediaIds: string[];
  savedDrafts: SocialDraft[];
  onSaveDraft: (draft: SocialDraft) => void;
  onDeleteDraft: (id: string) => void;
  onMarkPosted: (draftId: string, mediaIds: string[]) => void;
  onOpenMediaPicker: () => void;
  onSelectMediaByCategory: (category: string) => void;
  onSaveVoiceExample: (text: string, source: string) => void;
}

async function fetchLocalThumbAsDataUrl(url: string): Promise<string | null> {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export const SocialStudio: React.FC<SocialStudioProps> = ({
  settings,
  voice,
  mediaItems,
  selectedMediaIds,
  savedDrafts,
  onSaveDraft,
  onDeleteDraft,
  onMarkPosted,
  onOpenMediaPicker,
  onSelectMediaByCategory,
  onSaveVoiceExample,
}) => {
  const [format, setFormat] = useState<SocialFormat>('ig_post');
  const [topicNote, setTopicNote] = useState('');
  // Optional Story add-on (OFF by default — posts & reels don't have to go to Stories, but can!)
  const [includeStoryAddon, setIncludeStoryAddon] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [fallbackNotice, setFallbackNotice] = useState(false);
  const [activeDraft, setActiveDraft] = useState<SocialDraft | null>(savedDrafts[0] || null);
  const [copiedKey, setCopiedKey] = useState('');

  const selectedMedia = mediaItems.filter((m) => selectedMediaIds.includes(m.id));

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleGenerate = async (overrideFormat?: SocialFormat, overrideNote?: string) => {
    const targetFormat = overrideFormat || format;
    const targetNote = overrideNote !== undefined ? overrideNote : topicNote;
    setGenerating(true);
    setError('');
    setFallbackNotice(false);

    try {
      const imageDataUrls: string[] = [];
      for (const m of selectedMedia.slice(0, 2)) {
        if (m.isVideo) continue;
        if (m.localDataUrl) {
          imageDataUrls.push(m.localDataUrl);
        } else if (m.thumbnailUrl && m.thumbnailUrl.startsWith('/')) {
          const dataUrl = await fetchLocalThumbAsDataUrl(m.thumbnailUrl);
          if (dataUrl) imageDataUrls.push(dataUrl);
        } else if (settings.driveConnected && settings.driveAccessToken) {
          const dataUrl = await fetchDriveImageAsDataUrl(m.id, settings.driveAccessToken);
          if (dataUrl) imageDataUrls.push(dataUrl);
        }
      }

      const { draft, usedFallback } = await generateSocialContent({
        settings,
        voice,
        format: targetFormat,
        selectedMedia,
        topicNote: targetNote,
        includeStoryAddon: targetFormat === 'ig_story' ? true : includeStoryAddon,
        imageDataUrls,
      });

      setActiveDraft(draft);
      setFallbackNotice(usedFallback);
      onSaveDraft(draft);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  const handleUsePlaybook = (pb: ReelsPlaybook) => {
    onSelectMediaByCategory(pb.recommendedCategory);
    setFormat('ig_reel');
    const angle = `${pb.title} (${pb.length}, ${pb.filmEffort}). Hook idea: ${pb.hookExample}`;
    setTopicNote(angle);
    void handleGenerate('ig_reel', angle);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Instagram Posts, Reels &amp; Stories</h1>
          <p className="page-subtitle">
            Pick any project photo from your Outreach folder, choose Feed Post, IG Reel (the vertical Reels tab), or Stories, and generate copy in your exact voice.
          </p>
        </div>

        <div className="segmented">
          <button
            type="button"
            className={`segmented-btn ${format === 'ig_post' ? 'active' : ''}`}
            onClick={() => setFormat('ig_post')}
          >
            <ImageIcon size={15} /> IG Post
          </button>
          <button
            type="button"
            className={`segmented-btn ${format === 'ig_reel' ? 'active' : ''}`}
            onClick={() => setFormat('ig_reel')}
          >
            <Film size={15} /> IG Reel
          </button>
          <button
            type="button"
            className={`segmented-btn ${format === 'ig_story' ? 'active' : ''}`}
            onClick={() => setFormat('ig_story')}
          >
            <Layers size={15} /> IG Stories
          </button>
          <button
            type="button"
            className={`segmented-btn ${format === 'reels_launchpad' ? 'active' : ''}`}
            onClick={() => setFormat('reels_launchpad')}
          >
            <PlaySquare size={15} /> Reels Launchpad
          </button>
        </div>
      </div>

      {format === 'reels_launchpad' && (
        <div className="surface" style={{ marginBottom: 22 }}>
          <div className="output-header">
            <div>
              <h2 className="surface-title" style={{ marginBottom: 2 }}>
                IG Reels Launchpad (Getting Reels Going Without a Film Crew)
              </h2>
              <p className="surface-desc" style={{ marginBottom: 0 }}>
                Instagram’s Reels tab (vertical 9:16 short videos) is the fastest way to reach local Oklahoma homeowners, designers, and builders. Start with 2 Reels a week using these repeatable formats.
              </p>
            </div>
            <span className="badge badge-accent">15–30 sec sweet spot</span>
          </div>

          <div className="two-col-equal" style={{ marginTop: 14 }}>
            {REELS_STARTER_PLAYBOOKS.map((pb) => (
              <div key={pb.id} className="surface-subtle">
                <div className="output-header" style={{ marginBottom: 6 }}>
                  <strong style={{ fontSize: 14.5 }}>{pb.title}</strong>
                  <span className="badge badge-neutral">{pb.length}</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="badge badge-sage">{pb.filmEffort}</span>
                </div>
                <p style={{ fontSize: 13, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                  <strong>Hook:</strong> “{pb.hookExample}”
                </p>
                <p style={{ fontSize: 12.5, margin: '0 0 12px', color: 'var(--text-secondary)' }}>
                  {pb.whyItWorksOnIG}
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUsePlaybook(pb)}
                  disabled={generating}
                >
                  <Clapperboard size={14} /> Build This IG Reel Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="two-col">
        {/* Left: Composer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="surface">
            <div className="output-header">
              <h2 className="surface-title" style={{ margin: 0 }}>
                1. Selected Outreach Media
              </h2>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenMediaPicker}
              >
                Browse Photos ({mediaItems.length})
              </button>
            </div>

            {selectedMedia.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  marginBottom: 14,
                }}
              >
                {selectedMedia.map((m) => (
                  <div
                    key={m.id}
                    className="surface-subtle"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: 8,
                      flex: '1 1 200px',
                    }}
                  >
                    {(m.localDataUrl || m.thumbnailUrl) && (
                      <img
                        src={m.localDataUrl || m.thumbnailUrl}
                        alt={m.title}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 7,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {m.categoryLabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="surface-subtle"
                style={{ marginBottom: 14, fontSize: 13, color: 'var(--text-secondary)' }}
              >
                No photo selected yet — click <strong>Browse Photos</strong> to pick a fireplace, range hood, sample board, or field shot from your Outreach folder.
              </div>
            )}

            <div className="field">
              <label className="field-label">
                2. Quick Context / Job Note (optional)
                <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>
                  Location, finish, or lesson
                </span>
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={topicNote}
                onChange={(e) => setTopicNote(e.target.value)}
                placeholder="e.g., Midtown Tulsa limestone plaster fireplace, 3 thin hand-troweled coats, zero dust with Festool HEPA prep..."
              />
            </div>

            {/* Optional Story add-on */}
            {format !== 'ig_story' && (
              <div
                className="toggle-row"
                onClick={() => setIncludeStoryAddon((v) => !v)}
                role="switch"
                aria-checked={includeStoryAddon}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIncludeStoryAddon((v) => !v);
                  }
                }}
              >
                <div>
                  <div className="toggle-title">Also generate IG Story teaser frames</div>
                  <div className="toggle-sub">
                    Optional — leave off if this only goes to your Feed or Reels tab
                  </div>
                </div>
                <div className={`switch ${includeStoryAddon ? 'on' : ''}`} />
              </div>
            )}

            {error && (
              <div style={{ color: 'var(--crimson)', fontSize: 13, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px 16px' }}
              onClick={() => void handleGenerate()}
              disabled={generating}
            >
              <Sparkles size={16} />
              {generating
                ? 'Writing in Shawn’s Voice...'
                : format === 'ig_post'
                  ? 'Generate IG Post'
                  : format === 'ig_reel'
                    ? 'Generate IG Reel Script & Caption'
                    : format === 'ig_story'
                      ? 'Generate IG Story Sequence'
                      : 'Generate IG Reel Concept'}
            </button>
          </div>

          {/* Saved Drafts Queue */}
          {savedDrafts.length > 0 && (
            <div className="surface">
              <h3 className="surface-title">Recent IG Drafts ({savedDrafts.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {savedDrafts.slice(0, 8).map((d) => (
                  <div
                    key={d.id}
                    className="surface-subtle"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderColor:
                        activeDraft?.id === d.id ? 'var(--accent)' : 'var(--border-subtle)',
                    }}
                    onClick={() => setActiveDraft(d)}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {d.reelTitle || d.hook || d.mediaNames[0] || 'Untitled Draft'}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                        <span className="badge badge-neutral">{d.format.replace('_', ' ')}</span>
                        {d.status === 'posted' && <span className="badge badge-sage">Posted</span>}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDraft(d.id);
                        if (activeDraft?.id === d.id) setActiveDraft(null);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Output Studio */}
        <div className="surface">
          {!activeDraft ? (
            <div style={{ textAlign: 'center', padding: '56px 20px', color: 'var(--text-muted)' }}>
              <Sparkles size={30} style={{ marginBottom: 10, opacity: 0.6 }} />
              <h3 className="surface-title" style={{ color: 'var(--text-primary)' }}>
                Ready to draft your next Instagram post or Reel
              </h3>
              <p style={{ fontSize: 14, maxWidth: 420, margin: '6px auto 0' }}>
                Your Outreach photos are already loaded. Pick a photo and hit Generate for copy and Reel scripts written in Shawn’s voice.
              </p>
            </div>
          ) : (
            <div>
              <div className="output-header" style={{ marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span className="badge badge-accent">
                      {activeDraft.format === 'ig_post'
                        ? 'IG Feed / Carousel'
                        : activeDraft.format === 'ig_story'
                          ? 'IG Stories'
                          : 'IG Reel (9:16)'}
                    </span>
                    {activeDraft.storyFrames && activeDraft.format !== 'ig_story' && (
                      <span className="badge badge-sage">+ Optional Story Teaser</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                    {activeDraft.mediaNames.length > 0
                      ? `Media: ${activeDraft.mediaNames.join(', ')}`
                      : 'Concept Draft'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {activeDraft.caption && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        onSaveVoiceExample(activeDraft.caption!, 'Approved IG Draft')
                      }
                    >
                      Save as Voice Example
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-ink btn-sm"
                    onClick={() => {
                      onMarkPosted(activeDraft.id, activeDraft.mediaIds);
                      setActiveDraft({ ...activeDraft, status: 'posted' });
                    }}
                  >
                    <Check size={14} />
                    {activeDraft.status === 'posted' ? 'Posted' : 'Mark Posted'}
                  </button>
                </div>
              </div>

              {fallbackNotice && (
                <div className="notice-banner" style={{ marginBottom: 14 }}>
                  <span>
                    <strong>Instant Studio Preview:</strong> Add your OpenRouter or Gemini API key in Settings for live AI Vision inspection of your selected photo.
                  </span>
                </div>
              )}

              {/* IG Caption */}
              {activeDraft.caption && activeDraft.format !== 'ig_story' && (
                <div className="output-block">
                  <div className="output-header">
                    <span className="output-label">
                      {activeDraft.format === 'ig_post' ? 'Instagram Post Caption' : 'IG Reel Caption'}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        void copyText(
                          'caption',
                          `${activeDraft.caption}\n\n${(activeDraft.hashtags || []).join(' ')}`
                        )
                      }
                    >
                      {copiedKey === 'caption' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedKey === 'caption' ? 'Copied' : 'Copy Caption + Tags'}
                    </button>
                  </div>
                  <p className="output-pre">{activeDraft.caption}</p>
                  {activeDraft.hashtags && activeDraft.hashtags.length > 0 && (
                    <div
                      className="mono"
                      style={{
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: '1px solid var(--border-subtle)',
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {activeDraft.hashtags.join(' ')}
                    </div>
                  )}
                </div>
              )}

              {/* Carousel Slides */}
              {activeDraft.format === 'ig_post' &&
                activeDraft.carouselSlides &&
                activeDraft.carouselSlides.length > 0 && (
                  <div className="output-block">
                    <div className="output-header">
                      <span className="output-label">Carousel Slide Plan</span>
                    </div>
                    <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
                      {activeDraft.carouselSlides.map((s, idx) => (
                        <li key={idx} style={{ marginBottom: 5 }}>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              {/* IG Reel Shot List + Voiceover + Cover Frame */}
              {activeDraft.shots && activeDraft.shots.length > 0 && (
                <div
                  className="output-block"
                  style={{ borderColor: 'var(--accent-border)' }}
                >
                  <div className="output-header">
                    <span className="output-label">
                      IG Reel Shot-by-Shot Script ({activeDraft.durationSec || '15–25s'})
                    </span>
                    {activeDraft.fullVoiceover && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => void copyText('vo', activeDraft.fullVoiceover!)}
                      >
                        {copiedKey === 'vo' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedKey === 'vo' ? 'Copied' : 'Copy Voiceover'}
                      </button>
                    )}
                  </div>

                  {activeDraft.reelCoverText && (
                    <div style={{ marginBottom: 8, fontSize: 13 }}>
                      <strong>Reel Grid Cover Text:</strong>{' '}
                      <span className="badge badge-accent">{activeDraft.reelCoverText}</span>
                    </div>
                  )}

                  {activeDraft.audioVibe && (
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      <strong>Audio tip:</strong> {activeDraft.audioVibe}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {activeDraft.shots.map((shot, idx) => (
                      <div key={idx} className="surface-subtle" style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                          <span className="badge badge-neutral mono">{shot.timecode}</span>
                          <strong style={{ fontSize: 13 }}>{shot.onScreenText}</strong>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                          <strong>Visual:</strong> {shot.visual}
                        </div>
                        <div style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>
                          <strong>Say:</strong> “{shot.spokenLine}”
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeDraft.reelPinnedComment && (
                    <div
                      className="surface-subtle"
                      style={{ marginTop: 12, padding: 10, fontSize: 12.5 }}
                    >
                      <strong>First Pinned Comment CTA:</strong> {activeDraft.reelPinnedComment}
                    </div>
                  )}
                </div>
              )}

              {/* Optional / Standalone Story Frames */}
              {activeDraft.storyFrames && activeDraft.storyFrames.length > 0 && (
                <div className="output-block">
                  <div className="output-header">
                    <span className="output-label">
                      IG Story Sequence ({activeDraft.storyFrames.length} frames)
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        void copyText(
                          'stories',
                          activeDraft
                            .storyFrames!.map(
                              (f) =>
                                `Frame ${f.frame}:\nVisual: ${f.visual}\nText: ${f.overlayText}\nSticker: ${f.stickerIdea}`
                            )
                            .join('\n\n')
                        )
                      }
                    >
                      {copiedKey === 'stories' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedKey === 'stories' ? 'Copied' : 'Copy Stories'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeDraft.storyFrames.map((f) => (
                      <div key={f.frame} className="surface-subtle" style={{ padding: 11 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>
                          Frame {f.frame} — {f.visual}
                        </div>
                        <div style={{ fontSize: 13.5, marginBottom: 4 }}>
                          Overlay: “{f.overlayText}”
                        </div>
                        <span className="badge badge-accent">Sticker: {f.stickerIdea}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
