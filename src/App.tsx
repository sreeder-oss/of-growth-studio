import { useEffect, useState } from 'react';
import {
  Camera,
  FileText,
  FolderOpen,
  Mic,
  Send,
  Settings,
} from 'lucide-react';
import { SEED_DRIVE_MEDIA, type DriveMediaItem } from './data/driveCatalog';
import { BlogStudio } from './components/BlogStudio';
import { MediaBrowser } from './components/MediaBrowser';
import { OutreachDock } from './components/OutreachDock';
import { SettingsModal } from './components/SettingsModal';
import { SocialStudio } from './components/SocialStudio';
import { VoiceStudio } from './components/VoiceStudio';
import { fetchLiveDriveMedia, requestDriveAccessToken } from './services/driveService';
import {
  loadBlogDrafts,
  loadSettings,
  loadSocialDrafts,
  loadUsedMediaIds,
  loadVoiceProfile,
  saveBlogDrafts,
  saveSettings,
  saveSocialDrafts,
  saveUsedMediaIds,
  saveVoiceProfile,
} from './services/storage';
import type {
  AppSettings,
  BlogDraft,
  NavTab,
  SocialDraft,
  VoiceProfile,
} from './types/studio';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('social');
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [voice, setVoice] = useState<VoiceProfile>(() => loadVoiceProfile());
  const [mediaItems, setMediaItems] = useState<DriveMediaItem[]>(SEED_DRIVE_MEDIA);
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([
    SEED_DRIVE_MEDIA[0]?.id || '',
  ].filter(Boolean));
  const [usedMediaIds, setUsedMediaIds] = useState<string[]>(() => loadUsedMediaIds());
  const [socialDrafts, setSocialDrafts] = useState<SocialDraft[]>(() => loadSocialDrafts());
  const [blogDrafts, setBlogDrafts] = useState<BlogDraft[]>(() => loadBlogDrafts());

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [syncingDrive, setSyncingDrive] = useState(false);
  const [driveError, setDriveError] = useState('');

  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => saveVoiceProfile(voice), [voice]);
  useEffect(() => saveUsedMediaIds(usedMediaIds), [usedMediaIds]);
  useEffect(() => saveSocialDrafts(socialDrafts), [socialDrafts]);
  useEffect(() => saveBlogDrafts(blogDrafts), [blogDrafts]);

  const handleToggleMediaSelect = (id: string) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectByCategory = (category: string) => {
    const usedSet = new Set(usedMediaIds);
    const candidates = mediaItems.filter((m) => m.category === category);
    const fresh = candidates.filter((m) => !usedSet.has(m.id));
    const pool = fresh.length > 0 ? fresh : candidates;
    if (pool.length > 0) {
      setSelectedMediaIds([pool[0].id]);
    }
  };

  const handleConnectDrive = async () => {
    if (!settings.googleClientId.trim()) {
      setSettingsOpen(true);
      setDriveError('Paste your Google OAuth Web Client ID below to connect live Drive thumbnails.');
      return;
    }
    setSyncingDrive(true);
    setDriveError('');
    try {
      const token = await requestDriveAccessToken(settings.googleClientId);
      const liveItems = await fetchLiveDriveMedia(token);
      setSettings((prev) => ({
        ...prev,
        driveConnected: true,
        driveAccessToken: token,
      }));
      if (liveItems.length > 0) {
        setMediaItems((prev) => {
          const localUploads = prev.filter((m) => m.id.startsWith('local_'));
          return [...localUploads, ...liveItems];
        });
      }
    } catch (err) {
      setDriveError(err instanceof Error ? err.message : 'Google Drive connection failed.');
    } finally {
      setSyncingDrive(false);
    }
  };

  const handleDisconnectDrive = () => {
    setSettings((prev) => ({
      ...prev,
      driveConnected: false,
      driveAccessToken: '',
    }));
  };

  const handleSaveSocialDraft = (draft: SocialDraft) => {
    setSocialDrafts((prev) => [draft, ...prev.filter((d) => d.id !== draft.id)]);
  };

  const handleMarkSocialPosted = (draftId: string, mediaIds: string[]) => {
    setSocialDrafts((prev) =>
      prev.map((d) => (d.id === draftId ? { ...d, status: 'posted' } : d))
    );
    if (mediaIds.length > 0) {
      setUsedMediaIds((prev) => Array.from(new Set([...prev, ...mediaIds])));
    }
  };

  const handleSaveBlog = (blog: BlogDraft) => {
    setBlogDrafts((prev) => [blog, ...prev.filter((b) => b.id !== blog.id)]);
  };

  const handleSaveVoiceExample = (text: string, source: string) => {
    setVoice((prev) => ({
      ...prev,
      samples: [{ id: `sample_${Date.now()}`, source, text }, ...prev.samples],
    }));
  };

  const navItems: Array<{
    id: NavTab;
    label: string;
    shortLabel: string;
    icon: typeof Camera;
    badge?: string;
  }> = [
    { id: 'social', label: 'IG Posts & Reels', shortLabel: 'Instagram', icon: Camera },
    { id: 'blog', label: 'SEO Blog Studio', shortLabel: 'SEO Blog', icon: FileText },
    {
      id: 'media',
      label: 'Outreach Media',
      shortLabel: 'Media',
      icon: FolderOpen,
      badge: `${mediaItems.length}`,
    },
    { id: 'voice', label: 'Shawn’s Voice DNA', shortLabel: 'Voice', icon: Mic },
    { id: 'outreach', label: 'Outreach Dock', shortLabel: 'Outreach', icon: Send, badge: 'P2' },
  ];

  return (
    <div className="app-shell">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="brand-lockup">
          <img
            src={`${import.meta.env.BASE_URL}brand/of-logo.png`}
            alt="Organic Finishes — Paint & Plaster"
            className="brand-logo-img"
          />
          <div className="brand-subtitle">Growth Studio • Standalone PWA</div>
        </div>

        <div className="nav-section-label">Agents &amp; Assets</div>
        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-pill">
            <span className={`status-dot ${settings.apiKey ? 'live' : 'warn'}`} />
            <span>{settings.apiKey ? 'Live AI Active' : 'Instant Preview Mode'}</span>
          </div>
          <div className="status-pill">
            <span className={`status-dot ${settings.driveConnected ? 'live' : 'live'}`} />
            <span>
              {settings.driveConnected
                ? 'Drive Live Synced'
                : `Outreach Loaded (${mediaItems.length})`}
            </span>
          </div>
          <button
            type="button"
            className="nav-item"
            onClick={() => setSettingsOpen(true)}
            style={{ marginTop: 4 }}
          >
            <Settings size={17} />
            <span>Settings &amp; Keys</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header className="mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={`${import.meta.env.BASE_URL}icon.svg`}
              alt="OF Growth Studio"
              width={30}
              height={30}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.1 }}>
                Organic Finishes
              </div>
              <div style={{ fontSize: 10, color: '#49a33d', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Growth Studio
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setSettingsOpen(true)}
          >
            <Settings size={17} /> Settings
          </button>
        </header>

        <main className="main-content">
          {activeTab === 'social' && (
            <SocialStudio
              settings={settings}
              voice={voice}
              mediaItems={mediaItems}
              selectedMediaIds={selectedMediaIds}
              usedMediaIds={usedMediaIds}
              savedDrafts={socialDrafts}
              onSaveDraft={handleSaveSocialDraft}
              onDeleteDraft={(id) =>
                setSocialDrafts((prev) => prev.filter((d) => d.id !== id))
              }
              onMarkPosted={handleMarkSocialPosted}
              onOpenMediaPicker={() => setActiveTab('media')}
              onSelectMediaByCategory={handleSelectByCategory}
              onSaveVoiceExample={handleSaveVoiceExample}
            />
          )}

          {activeTab === 'blog' && (
            <BlogStudio
              settings={settings}
              voice={voice}
              mediaItems={mediaItems}
              selectedMediaIds={selectedMediaIds}
              savedBlogs={blogDrafts}
              onSaveBlog={handleSaveBlog}
              onDeleteBlog={(id) =>
                setBlogDrafts((prev) => prev.filter((b) => b.id !== id))
              }
              onOpenMediaPicker={() => setActiveTab('media')}
            />
          )}

          {activeTab === 'media' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">OF Outreach Media Library</h1>
                  <p className="page-subtitle">
                    Loaded directly from your <code>04 - Images, Infographics &amp; Video</code> folder. Select photos to feed directly into IG Posts, Reels, Stories, or SEO Blog alt-text pairings.
                  </p>
                </div>
              </div>
              <MediaBrowser
                mediaItems={mediaItems}
                selectedIds={selectedMediaIds}
                usedIds={usedMediaIds}
                driveConnected={settings.driveConnected}
                syncingDrive={syncingDrive}
                onToggleSelect={handleToggleMediaSelect}
                onClearSelection={() => setSelectedMediaIds([])}
                onMarkUsed={(ids) =>
                  setUsedMediaIds((prev) => Array.from(new Set([...prev, ...ids])))
                }
                onMarkFresh={(ids) =>
                  setUsedMediaIds((prev) => prev.filter((id) => !ids.includes(id)))
                }
                onSyncDrive={() => void handleConnectDrive()}
                onAddLocalMedia={(item) => setMediaItems((prev) => [item, ...prev])}
                onSendToSocial={() => setActiveTab('social')}
                onSendToBlog={() => setActiveTab('blog')}
              />
            </div>
          )}

          {activeTab === 'voice' && (
            <VoiceStudio voice={voice} settings={settings} onChangeVoice={setVoice} />
          )}

          {activeTab === 'outreach' && (
            <OutreachDock
              socialCount={socialDrafts.length}
              blogCount={blogDrafts.length}
              mediaCount={mediaItems.length}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={19} />
              <span>{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      <SettingsModal
        open={settingsOpen}
        settings={settings}
        driveError={driveError}
        connectingDrive={syncingDrive}
        onClose={() => setSettingsOpen(false)}
        onChangeSettings={setSettings}
        onConnectDrive={() => void handleConnectDrive()}
        onDisconnectDrive={handleDisconnectDrive}
      />
    </div>
  );
}

export default App;
