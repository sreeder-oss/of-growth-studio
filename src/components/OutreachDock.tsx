import React from 'react';
import { ArrowRight, Layers, Mail, MessageSquare, Users } from 'lucide-react';

interface OutreachDockProps {
  socialCount: number;
  blogCount: number;
  mediaCount: number;
}

export const OutreachDock: React.FC<OutreachDockProps> = ({
  socialCount,
  blogCount,
  mediaCount,
}) => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Outreach Agent Dock (Phase 2)</h1>
          <p className="page-subtitle">
            Architected to snap directly into this standalone PWA once your IG Posts/Reels/Stories and SEO Blog workflows are dialed in.
          </p>
        </div>
        <span className="badge badge-accent" style={{ fontSize: 12.5, padding: '6px 12px' }}>
          Queued for Phase 2
        </span>
      </div>

      <div className="surface" style={{ marginBottom: 20 }}>
        <h2 className="surface-title">Why Outreach Belongs Right Next to Content</h2>
        <p className="surface-desc" style={{ maxWidth: 760 }}>
          Instead of sending generic “just checking in” emails to Tulsa/OKC designers, custom home builders, and commercial GCs, Phase 2 connects your verified leads in Google Drive (<code>01 - Lead Trackers &amp; Spreadsheets</code>) to the exact content you create here.
        </p>

        <div className="three-col" style={{ marginTop: 18 }}>
          <div className="surface-subtle">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Users size={18} color="var(--accent)" />
              <strong style={{ fontSize: 14.5 }}>Shared Voice DNA</strong>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0 }}>
              Every cold email, IG DM, and 3-touch follow-up uses the exact same Voice DNA profile you calibrate here — zero stiff AI phrasing.
            </p>
          </div>

          <div className="surface-subtle">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Mail size={18} color="var(--accent)" />
              <strong style={{ fontSize: 14.5 }}>Content-Powered Follow-Ups</strong>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0 }}>
              Attach a newly published Hostinger SEO guide (e.g., <em>Microcement Showers vs. Tile</em>) or a recent fireplace photo directly to a designer follow-up.
            </p>
          </div>

          <div className="surface-subtle">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MessageSquare size={18} color="var(--accent)" />
              <strong style={{ fontSize: 14.5 }}>Merge or Keep Separate Later</strong>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0 }}>
              Keeps OF Studio Manager lean and bloat-free while you test. Once proven, we decide together whether to keep this as your dedicated Growth PWA or merge select tabs.
            </p>
          </div>
        </div>
      </div>

      <div className="surface">
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <Layers size={18} color="var(--accent)" />
          <h3 className="surface-title" style={{ margin: 0 }}>
            Shared Assets Ready for Phase 2
          </h3>
        </div>
        <div className="three-col">
          <div className="output-block" style={{ marginBottom: 0 }}>
            <div className="output-label">Drive Media Library</div>
            <div style={{ fontSize: 26, fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {mediaCount}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
              Categorized photos &amp; clips ready for designer decks &amp; DMs
            </div>
          </div>

          <div className="output-block" style={{ marginBottom: 0 }}>
            <div className="output-label">Social Drafts Saved</div>
            <div style={{ fontSize: 26, fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {socialCount}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
              IG posts, Reels &amp; Story scripts in your library
            </div>
          </div>

          <div className="output-block" style={{ marginBottom: 0 }}>
            <div className="output-label">SEO Blog Drafts Saved</div>
            <div style={{ fontSize: 26, fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {blogCount}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
              Publishable Hostinger articles ready to share with leads
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13.5,
            color: 'var(--text-secondary)',
          }}
        >
          <ArrowRight size={15} color="var(--accent)" />
          <span>
            When you’re ready to activate Phase 2, we’ll wire in your <code>Master Verified Outreach Leads</code> sheet and 3-Touch Follow-Up Queue right here.
          </span>
        </div>
      </div>
    </div>
  );
};
