import React, { useMemo, useRef, useState } from 'react';
import {
  Check,
  ExternalLink,
  Film,
  FolderOpen,
  Image as ImageIcon,
  RefreshCw,
  Shuffle,
  Upload,
} from 'lucide-react';
import { DRIVE_FOLDERS, type DriveMediaItem, type MediaCategory } from '../data/driveCatalog';

interface MediaBrowserProps {
  mediaItems: DriveMediaItem[];
  selectedIds: string[];
  usedIds: string[];
  driveConnected: boolean;
  syncingDrive: boolean;
  onToggleSelect: (id: string) => void;
  onClearSelection: () => void;
  onMarkUsed: (ids: string[]) => void;
  onMarkFresh: (ids: string[]) => void;
  onSyncDrive: () => void;
  onAddLocalMedia: (item: DriveMediaItem) => void;
  onSendToSocial?: () => void;
  onSendToBlog?: () => void;
  compact?: boolean;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({
  mediaItems,
  selectedIds,
  usedIds,
  driveConnected,
  syncingDrive,
  onToggleSelect,
  onClearSelection,
  onMarkUsed,
  onMarkFresh,
  onSyncDrive,
  onAddLocalMedia,
  onSendToSocial,
  onSendToBlog,
  compact = false,
}) => {
  const [category, setCategory] = useState<'all' | MediaCategory>('all');
  const [freshFilter, setFreshFilter] = useState<'all' | 'fresh' | 'used'>('all');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const usedSet = useMemo(() => new Set(usedIds), [usedIds]);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const filtered = useMemo(() => {
    return mediaItems.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      const isUsed = usedSet.has(item.id);
      if (freshFilter === 'fresh' && isUsed) return false;
      if (freshFilter === 'used' && !isUsed) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [mediaItems, category, freshFilter, search, usedSet]);

  const handleSuggestFresh = () => {
    const freshPool = mediaItems.filter((m) => !usedSet.has(m.id) && !m.isVideo);
    const pool = freshPool.length > 0 ? freshPool : mediaItems;
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    onClearSelection();
    onToggleSelect(pick.id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result);
        const item: DriveMediaItem = {
          id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
          category: 'fieldwork',
          categoryLabel: 'Phone / Local Upload',
          mimeType: file.type || 'image/jpeg',
          isVideo: file.type.startsWith('video/'),
          driveUrl: '',
          localDataUrl: dataUrl,
        };
        onAddLocalMedia(item);
        onToggleSelect(item.id);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <div className="surface">
      <div className="output-header" style={{ marginBottom: 14 }}>
        <div>
          <h2 className="surface-title" style={{ marginBottom: 2 }}>
            Drive Media Library
          </h2>
          <p className="surface-desc" style={{ marginBottom: 0 }}>
            <code>04 - Images, Infographics &amp; Video</code> • {mediaItems.length} files indexed ({mediaItems.length - usedIds.length} fresh)
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleSuggestFresh}>
            <Shuffle size={14} /> Suggest Fresh
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} /> Add Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <button
            type="button"
            className="btn btn-ink btn-sm"
            onClick={onSyncDrive}
            disabled={syncingDrive}
          >
            <RefreshCw size={14} className={syncingDrive ? 'spin' : ''} />
            {driveConnected ? 'Sync Drive' : 'Connect Live Drive'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button
          type="button"
          className={`chip ${category === 'all' ? 'selected' : ''}`}
          onClick={() => setCategory('all')}
        >
          All ({mediaItems.length})
        </button>
        {DRIVE_FOLDERS.map((folder) => (
          <button
            key={folder.key}
            type="button"
            className={`chip ${category === folder.key ? 'selected' : ''}`}
            onClick={() => setCategory(folder.key)}
          >
            {folder.label}
          </button>
        ))}
      </div>

      {/* Search & Freshness Filter */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 14,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          className="input"
          style={{ flex: '1 1 220px' }}
          placeholder="Search fireplaces, Venetian plaster, trowels, microcement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="segmented">
          {(['all', 'fresh', 'used'] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={`segmented-btn ${freshFilter === f ? 'active' : ''}`}
              onClick={() => setFreshFilter(f)}
              style={{ padding: '6px 11px', fontSize: 12.5 }}
            >
              {f === 'all' ? 'All' : f === 'fresh' ? 'Fresh Only' : 'Posted'}
            </button>
          ))}
        </div>
      </div>

      {/* Selection Bar */}
      {selectedIds.length > 0 && (
        <div
          className="surface-subtle"
          style={{
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {onSendToSocial && (
              <button type="button" className="btn btn-primary btn-sm" onClick={onSendToSocial}>
                Create IG Post / Reel / Story
              </button>
            )}
            {onSendToBlog && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={onSendToBlog}>
                Pair With SEO Blog
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onMarkUsed(selectedIds)}
            >
              Mark Posted
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => onMarkFresh(selectedIds)}
            >
              Mark Fresh
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClearSelection}>
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        className="media-grid"
        style={compact ? { maxHeight: 380, overflowY: 'auto', paddingRight: 4 } : undefined}
      >
        {filtered.map((item) => {
          const isSelected = selectedSet.has(item.id);
          const isUsed = usedSet.has(item.id);
          const resolvedThumb =
            item.thumbnailUrl && item.thumbnailUrl.startsWith('/')
              ? `${import.meta.env.BASE_URL}${item.thumbnailUrl.slice(1)}`
              : item.thumbnailUrl;
          const thumbSrc = item.localDataUrl || resolvedThumb;

          return (
            <button
              key={item.id}
              type="button"
              className={`media-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleSelect(item.id)}
            >
              <div className="media-thumb">
                {thumbSrc ? (
                  <img src={thumbSrc} alt={item.title} loading="lazy" />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 5,
                      padding: 12,
                      textAlign: 'center',
                    }}
                  >
                    {item.isVideo ? <Film size={24} /> : <ImageIcon size={24} />}
                    <span style={{ fontSize: 10.5, fontWeight: 600, opacity: 0.8 }}>
                      {item.categoryLabel.split(' ')[0]}
                    </span>
                  </div>
                )}

                {isSelected && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Check size={14} />
                  </span>
                )}

                <span
                  className={`badge ${isUsed ? 'badge-neutral' : 'badge-sage'}`}
                  style={{ position: 'absolute', bottom: 7, left: 7, fontSize: 10 }}
                >
                  {isUsed ? 'Posted' : 'Fresh'}
                </span>
              </div>

              <div className="media-body">
                <div className="media-name">{item.title}</div>
                <div className="media-meta">
                  <span>{item.isVideo ? 'Video' : 'Photo'}</span>
                  {item.driveUrl && (
                    <a
                      href={item.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        color: 'var(--accent)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        textDecoration: 'none',
                      }}
                    >
                      Drive <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 12px', color: 'var(--text-muted)' }}>
          <FolderOpen size={28} style={{ marginBottom: 8, opacity: 0.6 }} />
          <div>No media files match that filter.</div>
        </div>
      )}
    </div>
  );
};
