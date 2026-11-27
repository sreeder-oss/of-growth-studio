import React, { useState } from 'react';
import { Plus, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';
import { analyzeVoiceSamples } from '../services/aiService';
import type { AppSettings, VoiceProfile } from '../types/studio';

interface VoiceStudioProps {
  voice: VoiceProfile;
  settings: AppSettings;
  onChangeVoice: (next: VoiceProfile) => void;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({ voice, settings, onChangeVoice }) => {
  const [newSampleSource, setNewSampleSource] = useState('Past IG Caption');
  const [newSampleText, setNewSampleText] = useState('');
  const [newVocab, setNewVocab] = useState('');
  const [newBanned, setNewBanned] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleAddSample = () => {
    if (!newSampleText.trim()) return;
    onChangeVoice({
      ...voice,
      samples: [
        {
          id: `sample_${Date.now()}`,
          source: newSampleSource.trim() || 'Shawn Writing Sample',
          text: newSampleText.trim(),
        },
        ...voice.samples,
      ],
    });
    setNewSampleText('');
  };

  const handleRemoveSample = (id: string) => {
    onChangeVoice({
      ...voice,
      samples: voice.samples.filter((s) => s.id !== id),
    });
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setStatusMsg('');
    try {
      const res = await analyzeVoiceSamples({ settings, voice });
      const mergedVocab = Array.from(
        new Set([...voice.signatureVocabulary, ...res.suggestedVocab])
      );
      onChangeVoice({
        ...voice,
        analyzedFingerprint: res.fingerprint,
        signatureVocabulary: mergedVocab,
      });
      setStatusMsg(
        res.usedFallback
          ? 'Updated voice fingerprint locally (add an API key in Settings for deep AI style extraction).'
          : 'Voice DNA analyzed and updated from your real writing samples.'
      );
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Could not analyze samples.');
    } finally {
      setAnalyzing(false);
    }
  };

  const addTag = (field: 'signatureVocabulary' | 'bannedPhrases', value: string) => {
    const clean = value.trim();
    if (!clean) return;
    if (voice[field].includes(clean)) return;
    onChangeVoice({ ...voice, [field]: [...voice[field], clean] });
  };

  const removeTag = (field: 'signatureVocabulary' | 'bannedPhrases', value: string) => {
    onChangeVoice({ ...voice, [field]: voice[field].filter((item) => item !== value) });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Shawn’s Voice DNA</h1>
          <p className="page-subtitle">
            Paste 3–5 of your real Instagram captions, texts, or emails. Every IG post, Reel/Short script, and SEO blog post pulls directly from this voice profile.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAnalyze}
          disabled={analyzing || voice.samples.length === 0}
        >
          <Sparkles size={16} />
          {analyzing ? 'Analyzing Voice...' : 'Analyze My Voice Samples'}
        </button>
      </div>

      {statusMsg && (
        <div
          className="surface-subtle"
          style={{
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            background: 'var(--sage-soft)',
            color: 'var(--sage)',
            borderColor: '#b7d7c3',
          }}
        >
          <CheckCircle2 size={17} />
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>{statusMsg}</span>
        </div>
      )}

      <div className="two-col">
        {/* Left: Paste Real Writing Samples */}
        <div className="surface">
          <h2 className="surface-title">Paste Your Real Writing Samples</h2>
          <p className="surface-desc">
            Real captions, client texts, or quick notes work best — the closer to how you naturally talk on a job site, the better the agent mirrors you.
          </p>

          <div className="field">
            <label className="field-label">Sample Source</label>
            <input
              className="input"
              value={newSampleSource}
              onChange={(e) => setNewSampleSource(e.target.value)}
              placeholder="e.g., Past IG Caption — Tulsa Fireplace"
            />
          </div>

          <div className="field">
            <label className="field-label">Your Real Words</label>
            <textarea
              className="textarea"
              rows={4}
              value={newSampleText}
              onChange={(e) => setNewSampleText(e.target.value)}
              placeholder="Paste a real IG caption, text to a builder, or quick explanation of a finish you wrote..."
            />
          </div>

          <button
            type="button"
            className="btn btn-ink"
            onClick={handleAddSample}
            disabled={!newSampleText.trim()}
          >
            <Plus size={15} /> Add Sample to Voice DNA
          </button>

          <div style={{ marginTop: 22 }}>
            <div className="field-label" style={{ marginBottom: 10 }}>
              Saved Samples ({voice.samples.length})
            </div>
            {voice.samples.map((sample) => (
              <div key={sample.id} className="output-block" style={{ padding: 13 }}>
                <div className="output-header" style={{ marginBottom: 6 }}>
                  <span className="badge badge-neutral">{sample.source}</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleRemoveSample(sample.id)}
                    aria-label="Remove sample"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="output-pre" style={{ fontSize: 13.5 }}>
                  “{sample.text}”
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Voice Fingerprint, Vocabulary & Banned Words */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="surface">
            <h2 className="surface-title">Active Voice Fingerprint</h2>
            <p className="surface-desc">
              Injected into every Social and SEO Blog generation. Edit directly anytime.
            </p>
            <div className="field">
              <label className="field-label">Voice Fingerprint Summary</label>
              <textarea
                className="textarea"
                rows={3}
                value={voice.analyzedFingerprint}
                onChange={(e) =>
                  onChangeVoice({ ...voice, analyzedFingerprint: e.target.value })
                }
              />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label">Writing Rules</label>
              <textarea
                className="textarea"
                rows={3}
                value={voice.writingRules}
                onChange={(e) => onChangeVoice({ ...voice, writingRules: e.target.value })}
              />
            </div>
          </div>

          <div className="surface">
            <h2 className="surface-title">Signature Trade Vocabulary</h2>
            <p className="surface-desc">Terms and phrases you actually use in the field.</p>
            <div className="chip-row" style={{ marginBottom: 12 }}>
              {voice.signatureVocabulary.map((word) => (
                <button
                  key={word}
                  type="button"
                  className="chip selected"
                  onClick={() => removeTag('signatureVocabulary', word)}
                  title="Click to remove"
                >
                  {word} ×
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                value={newVocab}
                onChange={(e) => setNewVocab(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('signatureVocabulary', newVocab);
                    setNewVocab('');
                  }
                }}
                placeholder="Add phrase (e.g., burnished steel pass)..."
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  addTag('signatureVocabulary', newVocab);
                  setNewVocab('');
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="surface">
            <h2 className="surface-title">Never-Say List (Banned AI Clichés)</h2>
            <p className="surface-desc">
              Blocked in prompts AND automatically flagged by the SEO Blog Auditor.
            </p>
            <div className="chip-row" style={{ marginBottom: 12 }}>
              {voice.bannedPhrases.map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  className="chip"
                  style={{
                    background: 'var(--crimson-soft)',
                    borderColor: '#e8bcbc',
                    color: 'var(--crimson)',
                  }}
                  onClick={() => removeTag('bannedPhrases', phrase)}
                  title="Click to remove"
                >
                  {phrase} ×
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                value={newBanned}
                onChange={(e) => setNewBanned(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('bannedPhrases', newBanned);
                    setNewBanned('');
                  }
                }}
                placeholder="Add cliché to ban..."
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  addTag('bannedPhrases', newBanned);
                  setNewBanned('');
                }}
              >
                Ban
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
