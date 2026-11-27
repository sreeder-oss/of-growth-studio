import React from 'react';
import { CheckCircle2, Cloud, KeyRound, X } from 'lucide-react';
import type { AIProvider, AppSettings } from '../types/studio';

interface SettingsModalProps {
  open: boolean;
  settings: AppSettings;
  driveError: string;
  connectingDrive: boolean;
  onClose: () => void;
  onChangeSettings: (next: AppSettings) => void;
  onConnectDrive: () => void;
  onDisconnectDrive: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  settings,
  driveError,
  connectingDrive,
  onClose,
  onChangeSettings,
  onConnectDrive,
  onDisconnectDrive,
}) => {
  if (!open) return null;

  const setProvider = (provider: AIProvider) => {
    onChangeSettings({
      ...settings,
      aiProvider: provider,
      model:
        provider === 'openrouter' ? 'google/gemini-2.5-flash' : 'gemini-2.5-flash',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(28, 25, 23, 0.56)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="surface"
        style={{ width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="output-header" style={{ marginBottom: 14 }}>
          <h2 className="surface-title" style={{ margin: 0 }}>
            Studio Connections &amp; Settings
          </h2>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* AI Engine */}
        <div className="surface-subtle" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <KeyRound size={16} color="var(--accent)" />
            <strong style={{ fontSize: 14.5 }}>AI Engine (Vision + Copy + SEO)</strong>
          </div>

          <div className="segmented" style={{ marginBottom: 12 }}>
            <button
              type="button"
              className={`segmented-btn ${settings.aiProvider === 'openrouter' ? 'active' : ''}`}
              onClick={() => setProvider('openrouter')}
            >
              OpenRouter (Recommended)
            </button>
            <button
              type="button"
              className={`segmented-btn ${settings.aiProvider === 'gemini' ? 'active' : ''}`}
              onClick={() => setProvider('gemini')}
            >
              Gemini Direct
            </button>
          </div>

          <div className="field">
            <label className="field-label">
              {settings.aiProvider === 'openrouter' ? 'OpenRouter API Key' : 'Gemini API Key'}
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Stored locally in browser
              </span>
            </label>
            <input
              type="password"
              className="input mono"
              value={settings.apiKey}
              onChange={(e) => onChangeSettings({ ...settings, apiKey: e.target.value })}
              placeholder={settings.aiProvider === 'openrouter' ? 'sk-or-v1-...' : 'AIza...'}
            />
          </div>

          <div className="field" style={{ marginBottom: 0 }}>
            <label className="field-label">Model</label>
            <select
              className="select mono"
              value={settings.model}
              onChange={(e) => onChangeSettings({ ...settings, model: e.target.value })}
            >
              {settings.aiProvider === 'openrouter' ? (
                <>
                  <option value="google/gemini-2.5-flash">google/gemini-2.5-flash (Fast + Vision)</option>
                  <option value="google/gemini-2.5-pro">google/gemini-2.5-pro (Deep SEO + Vision)</option>
                  <option value="anthropic/claude-3.7-sonnet">anthropic/claude-3.7-sonnet</option>
                </>
              ) : (
                <>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Fast + Vision)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Deep SEO + Vision)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Google Drive OAuth */}
        <div className="surface-subtle" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Cloud size={16} color="var(--accent)" />
            <strong style={{ fontSize: 14.5 }}>Google Drive Live Media (Read-Only)</strong>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
            Pre-linked to <code>Organic Finishes - Outreach / 04 - Images, Infographics &amp; Video</code>. Connect with your Google OAuth Web Client ID to load live thumbnails and feed full-res Drive photos straight into AI Vision.
          </p>

          <div className="field">
            <label className="field-label">Google OAuth Web Client ID</label>
            <input
              className="input mono"
              value={settings.googleClientId}
              onChange={(e) =>
                onChangeSettings({ ...settings, googleClientId: e.target.value })
              }
              placeholder="123456789-xxxx.apps.googleusercontent.com"
            />
          </div>

          {driveError && (
            <div style={{ fontSize: 12.5, color: 'var(--crimson)', marginBottom: 10 }}>
              {driveError}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {settings.driveConnected ? (
              <>
                <span className="badge badge-sage">
                  <CheckCircle2 size={13} /> Connected to Google Drive
                </span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={onConnectDrive}
                  disabled={connectingDrive}
                >
                  Refresh Media
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={onDisconnectDrive}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-ink btn-sm"
                onClick={onConnectDrive}
                disabled={connectingDrive || !settings.googleClientId.trim()}
              >
                {connectingDrive ? 'Connecting...' : 'Sign In & Sync Drive Folder'}
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
