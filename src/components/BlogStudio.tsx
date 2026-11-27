import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  FileText,
  Globe,
  RefreshCw,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react';
import { SEED_SEO_TOPICS } from '../data/brandSeed';
import type { DriveMediaItem } from '../data/driveCatalog';
import {
  auditBlogSeo,
  blogToHostingerHtml,
  generateStrictSeoBlog,
  researchLiveSeoTopics,
} from '../services/aiService';
import type { AppSettings, BlogDraft, SeoTopicIdea, VoiceProfile } from '../types/studio';

interface BlogStudioProps {
  settings: AppSettings;
  voice: VoiceProfile;
  mediaItems: DriveMediaItem[];
  selectedMediaIds: string[];
  savedBlogs: BlogDraft[];
  onSaveBlog: (blog: BlogDraft) => void;
  onDeleteBlog: (id: string) => void;
  onOpenMediaPicker: () => void;
}

export const BlogStudio: React.FC<BlogStudioProps> = ({
  settings,
  voice,
  mediaItems,
  selectedMediaIds,
  savedBlogs,
  onSaveBlog,
  onDeleteBlog,
  onOpenMediaPicker,
}) => {
  const [topics, setTopics] = useState<SeoTopicIdea[]>(SEED_SEO_TOPICS);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [researching, setResearching] = useState(false);

  const [topicTitle, setTopicTitle] = useState(SEED_SEO_TOPICS[0].title);
  const [primaryKeyword, setPrimaryKeyword] = useState(SEED_SEO_TOPICS[0].primaryKeyword);
  const [secondaryKeywords, setSecondaryKeywords] = useState(
    SEED_SEO_TOPICS[0].secondaryKeywords.join(', ')
  );
  const [regionScope, setRegionScope] = useState<string>(SEED_SEO_TOPICS[0].regionScope);

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [fallbackNotice, setFallbackNotice] = useState(false);
  const [activeBlog, setActiveBlog] = useState<BlogDraft | null>(savedBlogs[0] || null);
  const [copiedKey, setCopiedKey] = useState('');

  const selectedMedia = mediaItems.filter((m) => selectedMediaIds.includes(m.id));

  const audit = useMemo(
    () => (activeBlog ? auditBlogSeo(activeBlog, voice) : null),
    [activeBlog, voice]
  );

  const filteredTopics = useMemo(
    () =>
      regionFilter === 'All'
        ? topics
        : topics.filter((t) => t.regionScope === regionFilter),
    [topics, regionFilter]
  );

  const handleLoadTopic = (idea: SeoTopicIdea) => {
    setTopicTitle(idea.title);
    setPrimaryKeyword(idea.primaryKeyword);
    setSecondaryKeywords(idea.secondaryKeywords.join(', '));
    setRegionScope(idea.regionScope);
  };

  const handleResearchLive = async () => {
    if (!settings.apiKey.trim()) {
      setError('Add your OpenRouter or Gemini API key in Settings to research fresh live topics.');
      return;
    }
    setResearching(true);
    setError('');
    try {
      const res = await researchLiveSeoTopics({
        settings,
        voice,
        regionFocus:
          regionFilter === 'All'
            ? 'Oklahoma (OKC, Edmond, Tulsa, Grand Lake), 5-State South Central (TX, AR, KS, MO), and national architectural plaster & microcement searches'
            : regionFilter,
      });
      if (res.topics.length > 0) {
        setTopics(res.topics);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Topic research failed.');
    } finally {
      setResearching(false);
    }
  };

  const handleGenerateBlog = async () => {
    setGenerating(true);
    setError('');
    setFallbackNotice(false);
    try {
      const { draft, usedFallback } = await generateStrictSeoBlog({
        settings,
        voice,
        topic: topicTitle,
        primaryKeyword,
        secondaryKeywords: secondaryKeywords
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        regionScope,
        selectedMedia,
      });
      setActiveBlog(draft);
      setFallbackNotice(usedFallback);
      onSaveBlog(draft);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Blog generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  const copyPlain = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1800);
  };

  const copyRichTextForHostinger = async (blog: BlogDraft) => {
    const html = blogToHostingerHtml(blog);
    const plain = `# ${blog.h1}\n\n${blog.bodyMarkdown}\n\n## Frequently Asked Questions\n\n${blog.faqs
      .map((f) => `### ${f.question}\n${f.answer}`)
      .join('\n\n')}`;
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plain], { type: 'text/plain' }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      setCopiedKey('richtext');
      setTimeout(() => setCopiedKey(''), 1800);
    } catch {
      await copyPlain('richtext', plain);
    }
  };

  const updateActiveBlog = (patch: Partial<BlogDraft>) => {
    if (!activeBlog) return;
    const updated = { ...activeBlog, ...patch };
    setActiveBlog(updated);
    onSaveBlog(updated);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Strict-SEO Blog Studio</h1>
          <p className="page-subtitle">
            Active regional &amp; national search topics written in Shawn’s voice, audited against strict SEO rules, and exported clean for Hostinger.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ink"
          onClick={() => void handleResearchLive()}
          disabled={researching}
        >
          <RefreshCw size={15} />
          {researching ? 'Researching Search Trends...' : 'Research Live Topics'}
        </button>
      </div>

      {/* Topic Radar */}
      <div className="surface" style={{ marginBottom: 22 }}>
        <div className="output-header" style={{ marginBottom: 12 }}>
          <div>
            <h2 className="surface-title" style={{ marginBottom: 2 }}>
              Active Search Topic Radar
            </h2>
            <p className="surface-desc" style={{ marginBottom: 0 }}>
              Click any topic to load its primary &amp; semantic keywords into the Strict-SEO Builder below.
            </p>
          </div>
          <div className="segmented">
            {['All', 'Oklahoma Local', '5-State Regional', 'National & Beyond'].map((r) => (
              <button
                key={r}
                type="button"
                className={`segmented-btn ${regionFilter === r ? 'active' : ''}`}
                onClick={() => setRegionFilter(r)}
                style={{ padding: '6px 11px', fontSize: 12.5 }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="two-col-equal">
          {filteredTopics.map((idea) => (
            <div
              key={idea.id}
              className="surface-subtle"
              style={{
                cursor: 'pointer',
                borderColor:
                  topicTitle === idea.title ? 'var(--accent)' : 'var(--border-subtle)',
              }}
              onClick={() => handleLoadTopic(idea)}
            >
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                <span className="badge badge-accent">
                  <Globe size={11} /> {idea.regionScope}
                </span>
                <span className="badge badge-neutral">{idea.audience}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.35 }}>
                {idea.title}
              </div>
              <div className="mono" style={{ fontSize: 11.5, color: 'var(--accent-hover)', marginBottom: 6 }}>
                Target: {idea.primaryKeyword}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{idea.whyNow}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        {/* Left: Blog Brief & Saved Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="surface">
            <h2 className="surface-title">Strict-SEO Brief</h2>

            <div className="field">
              <label className="field-label">Blog Topic / Working Headline</label>
              <input
                className="input"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Primary Target Keyword</label>
              <input
                className="input mono"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Secondary / Semantic Keywords (comma-separated)</label>
              <input
                className="input"
                value={secondaryKeywords}
                onChange={(e) => setSecondaryKeywords(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Region Scope</label>
              <select
                className="select"
                value={regionScope}
                onChange={(e) => setRegionScope(e.target.value)}
              >
                <option value="Oklahoma Local">Oklahoma Local (OKC, Edmond, Tulsa, Grand Lake)</option>
                <option value="5-State Regional">5-State Regional (OK, TX, AR, KS, MO)</option>
                <option value="National & Beyond">National &amp; Beyond</option>
              </select>
            </div>

            <div className="field">
              <label className="field-label">
                Paired Drive Photos ({selectedMedia.length})
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={onOpenMediaPicker}
                >
                  Pick Photos
                </button>
              </label>
              {selectedMedia.length > 0 ? (
                <div className="chip-row">
                  {selectedMedia.map((m) => (
                    <span key={m.id} className="chip selected">
                      {m.title}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                  Optional — agent will also suggest exact Drive filenames &amp; SEO alt text.
                </span>
              )}
            </div>

            {error && (
              <div style={{ color: 'var(--crimson)', fontSize: 13, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px 16px' }}
              onClick={() => void handleGenerateBlog()}
              disabled={generating || !topicTitle.trim()}
            >
              <Sparkles size={16} />
              {generating ? 'Writing Strict-SEO Article...' : 'Generate Hostinger-Ready SEO Blog'}
            </button>
          </div>

          {savedBlogs.length > 0 && (
            <div className="surface">
              <h3 className="surface-title">Saved Blog Drafts ({savedBlogs.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {savedBlogs.map((b) => (
                  <div
                    key={b.id}
                    className="surface-subtle"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderColor:
                        activeBlog?.id === b.id ? 'var(--accent)' : 'var(--border-subtle)',
                    }}
                    onClick={() => setActiveBlog(b)}
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
                        {b.h1}
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        /{b.urlSlug}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBlog(b.id);
                        if (activeBlog?.id === b.id) setActiveBlog(null);
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

        {/* Right: Strict SEO Output + Live Audit + Hostinger Export */}
        <div className="surface">
          {!activeBlog ? (
            <div style={{ textAlign: 'center', padding: '56px 20px', color: 'var(--text-muted)' }}>
              <FileText size={30} style={{ marginBottom: 10, opacity: 0.55 }} />
              <h3 className="surface-title" style={{ color: 'var(--text-primary)' }}>
                No blog draft generated yet
              </h3>
              <p style={{ fontSize: 14, maxWidth: 420, margin: '6px auto 0' }}>
                Pick a topic from the Radar above and click Generate to build a strict-SEO post with live audit score, JSON-LD schema, and 1-click Hostinger export.
              </p>
            </div>
          ) : (
            <div>
              {/* Hostinger Export Toolbar */}
              <div className="output-header" style={{ marginBottom: 14 }}>
                <div>
                  <span className="badge badge-sage">Hostinger Export Ready</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => void copyRichTextForHostinger(activeBlog)}
                  >
                    {copiedKey === 'richtext' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedKey === 'richtext' ? 'Copied Rich Text' : 'Copy Rich Text (Hostinger)'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => void copyPlain('html', blogToHostingerHtml(activeBlog))}
                  >
                    {copiedKey === 'html' ? <Check size={14} /> : <Code2 size={14} />}
                    {copiedKey === 'html' ? 'Copied HTML' : 'HTML + JSON-LD'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      void copyPlain(
                        'md',
                        `# ${activeBlog.h1}\n\n${activeBlog.bodyMarkdown}\n\n## Frequently Asked Questions\n\n${activeBlog.faqs
                          .map((f) => `### ${f.question}\n${f.answer}`)
                          .join('\n\n')}`
                      )
                    }
                  >
                    {copiedKey === 'md' ? <Check size={14} /> : <FileText size={14} />}
                    {copiedKey === 'md' ? 'Copied MD' : 'Markdown'}
                  </button>
                </div>
              </div>

              {fallbackNotice && (
                <div className="notice-banner" style={{ marginBottom: 14 }}>
                  <span>
                    <strong>Instant Studio Draft:</strong> Add your OpenRouter or Gemini API key in Settings for live custom-researched SEO articles.
                  </span>
                </div>
              )}

              {/* Live Strict SEO Audit */}
              {audit && (
                <div className="surface-subtle" style={{ marginBottom: 16 }}>
                  <div className="output-header" style={{ marginBottom: 8 }}>
                    <strong style={{ fontSize: 14 }}>Strict SEO &amp; Voice Audit</strong>
                    <span
                      className={`badge ${
                        audit.score >= 85
                          ? 'badge-sage'
                          : audit.score >= 60
                            ? 'badge-amber'
                            : 'badge-crimson'
                      }`}
                    >
                      Score: {audit.score}/100 • {audit.wordCount} words
                    </span>
                  </div>
                  {audit.checks.map((c, idx) => (
                    <div key={idx} className="audit-item">
                      {c.severity === 'pass' ? (
                        <CheckCircle2 size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      ) : c.severity === 'warn' ? (
                        <AlertTriangle size={16} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                      ) : (
                        <XCircle size={16} color="var(--crimson)" style={{ flexShrink: 0, marginTop: 2 }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Hostinger SEO Meta Fields */}
              <div className="output-block">
                <div className="output-header">
                  <span className="output-label">Hostinger SEO Meta Fields</span>
                </div>
                <div className="field">
                  <label className="field-label">
                    Title Tag
                    <span className="mono">{activeBlog.titleTag.length}/60 chars</span>
                  </label>
                  <input
                    className="input"
                    value={activeBlog.titleTag}
                    onChange={(e) => updateActiveBlog({ titleTag: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label className="field-label">
                    Meta Description
                    <span className="mono">{activeBlog.metaDescription.length}/155 chars</span>
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={activeBlog.metaDescription}
                    onChange={(e) => updateActiveBlog({ metaDescription: e.target.value })}
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label className="field-label">URL Slug</label>
                  <input
                    className="input mono"
                    value={activeBlog.urlSlug}
                    onChange={(e) => updateActiveBlog({ urlSlug: e.target.value })}
                  />
                </div>
              </div>

              {/* Editable Article Body */}
              <div className="output-block">
                <div className="output-header">
                  <span className="output-label">Article Body (H1 + Markdown)</span>
                </div>
                <div className="field">
                  <label className="field-label">H1 Headline</label>
                  <input
                    className="input"
                    value={activeBlog.h1}
                    onChange={(e) => updateActiveBlog({ h1: e.target.value })}
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label className="field-label">Body (H2 / H3 sections)</label>
                  <textarea
                    className="textarea"
                    rows={14}
                    value={activeBlog.bodyMarkdown}
                    onChange={(e) => updateActiveBlog({ bodyMarkdown: e.target.value })}
                  />
                </div>
              </div>

              {/* Image Alt Text Pairings */}
              {activeBlog.imagePairings.length > 0 && (
                <div className="output-block">
                  <div className="output-header">
                    <span className="output-label">Drive Image SEO Alt-Text Pairings</span>
                  </div>
                  {activeBlog.imagePairings.map((img, idx) => (
                    <div key={idx} className="surface-subtle" style={{ marginBottom: 8, padding: 11 }}>
                      <div className="mono" style={{ fontSize: 11.5, color: 'var(--accent-hover)' }}>
                        Rename for Hostinger: {img.suggestedSeoFilename}
                      </div>
                      <div style={{ fontSize: 12.5, marginTop: 4 }}>
                        <strong>Drive File:</strong> {img.fileName}
                      </div>
                      <div style={{ fontSize: 12.5, marginTop: 3 }}>
                        <strong>Alt Text:</strong> {img.altText}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQ & Schema */}
              {activeBlog.faqs.length > 0 && (
                <div className="output-block" style={{ marginBottom: 0 }}>
                  <div className="output-header">
                    <span className="output-label">
                      FAQ Section ({activeBlog.faqs.length}) + JSON-LD Schema
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        void copyPlain(
                          'schema',
                          `<script type="application/ld+json">\n${activeBlog.jsonLdSchema}\n</script>`
                        )
                      }
                    >
                      {copiedKey === 'schema' ? <Check size={14} /> : <Code2 size={14} />}
                      {copiedKey === 'schema' ? 'Copied Schema' : 'Copy JSON-LD Only'}
                    </button>
                  </div>
                  {activeBlog.faqs.map((f, idx) => (
                    <div key={idx} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{f.question}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
