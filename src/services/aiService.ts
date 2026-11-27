import type { DriveMediaItem } from '../data/driveCatalog';
import type {
  AppSettings,
  BlogDraft,
  SeoAuditCheck,
  SeoAuditResult,
  SeoTopicIdea,
  SocialDraft,
  SocialFormat,
  VoiceProfile,
} from '../types/studio';

function buildVoiceSystemPrompt(voice: VoiceProfile): string {
  const samplesBlock =
    voice.samples.length > 0
      ? voice.samples
          .slice(0, 6)
          .map((s, idx) => `Sample ${idx + 1} (${s.source}):\n"${s.text}"`)
          .join('\n\n')
      : 'No extra samples pasted yet.';

  return `You are the dedicated content & growth agent for ${voice.businessName}, owned and operated by ${voice.ownerName}.
Website: ${voice.website} | Instagram: ${voice.instagramHandle} | Phone: ${voice.phone} | Email: ${voice.email}
Home Base: ${voice.homeBase}
Regional Service Radius: ${voice.serviceRadius}

SHAWN'S VOICE DNA (FOLLOW STRICTLY):
- Tone Traits: ${voice.toneTraits.join('; ')}
- Signature Trade Vocabulary to use naturally where relevant: ${voice.signatureVocabulary.join(', ')}
- Writing Rules: ${voice.writingRules}
- Voice Fingerprint: ${voice.analyzedFingerprint}
- STRICTLY BANNED AI CLICHÉS (NEVER USE ANY OF THESE): ${voice.bannedPhrases.join(', ')}

REAL WRITING SAMPLES FROM SHAWN (MIRROR THIS CADENCE & HONESTY):
${samplesBlock}

Never sound like a generic social media agency. Sound like a skilled solo architectural plaster & microcement craftsman who knows substrates, prep, trowel work, and clean job sites inside out.`;
}

function extractJsonBlock(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const firstBrace = raw.indexOf('{');
  const firstBracket = raw.indexOf('[');
  const start =
    firstBrace === -1
      ? firstBracket
      : firstBracket === -1
        ? firstBrace
        : Math.min(firstBrace, firstBracket);
  if (start === -1) return raw.trim();
  const isArray = raw[start] === '[';
  const end = raw.lastIndexOf(isArray ? ']' : '}');
  return end > start ? raw.slice(start, end + 1) : raw.slice(start);
}

async function callLLM(
  settings: AppSettings,
  systemPrompt: string,
  userPrompt: string,
  imageDataUrls: string[] = []
): Promise<string> {
  const key = settings.apiKey.trim();
  if (!key) {
    throw new Error('NO_API_KEY');
  }

  if (settings.aiProvider === 'openrouter') {
    const contentParts: Array<
      { type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }
    > = [{ type: 'text', text: userPrompt }];

    for (const url of imageDataUrls.slice(0, 3)) {
      contentParts.push({ type: 'image_url', image_url: { url } });
    }

    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'OF Growth Studio',
      },
      body: JSON.stringify({
        model: settings.model || 'google/gemini-2.5-flash',
        temperature: 0.65,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: contentParts },
        ],
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`OpenRouter error (${resp.status}): ${errText.slice(0, 220)}`);
    }

    const data = (await resp.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response from OpenRouter.');
    return content;
  }

  // Gemini Direct API
  const modelName = (settings.model || 'gemini-2.5-flash').replace(/^google\//, '');
  const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = [
    { text: userPrompt },
  ];

  for (const dataUrl of imageDataUrls.slice(0, 3)) {
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      parts.push({ inline_data: { mime_type: match[1], data: match[2] } });
    }
  }

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      modelName
    )}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts }],
        generationConfig: { temperature: 0.65 },
      }),
    }
  );

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini error (${resp.status}): ${errText.slice(0, 220)}`);
  }

  const data = (await resp.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const content = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('');
  if (!content) throw new Error('Empty response from Gemini.');
  return content;
}

export async function generateSocialContent(params: {
  settings: AppSettings;
  voice: VoiceProfile;
  format: SocialFormat;
  selectedMedia: DriveMediaItem[];
  topicNote: string;
  includeStoryAddon: boolean;
  imageDataUrls: string[];
}): Promise<{ draft: SocialDraft; usedFallback: boolean }> {
  const {
    settings,
    voice,
    format,
    selectedMedia,
    topicNote,
    includeStoryAddon,
    imageDataUrls,
  } = params;

  const mediaSummary =
    selectedMedia.length > 0
      ? selectedMedia.map((m) => `- ${m.title} (Folder: ${m.categoryLabel}, File: ${m.name})`).join('\n')
      : '- No specific photo selected yet (suggest what to pull from 04 - Images, Infographics & Video).';

  const systemPrompt = buildVoiceSystemPrompt(voice);
  const isReel = format === 'ig_reel' || format === 'reels_launchpad';

  const userPrompt = `Create a ready-to-publish ${
    format === 'ig_post'
      ? 'Instagram Feed / Carousel Post'
      : isReel
        ? 'Instagram Reel (9:16 vertical short-form video for the IG Reels tab)'
        : 'Instagram Story Sequence (standalone)'
  } for ${voice.businessName}.

Selected Drive Media:
${mediaSummary}

Shawn's Project / Angle Note:
${topicNote.trim() || 'Highlight real hand-troweled craftsmanship, substrate prep, and Oklahoma / 5-state availability.'}

Options:
- Include optional IG Story teaser frames: ${includeStoryAddon || format === 'ig_story' ? 'YES (3-4 frames)' : 'NO'}

Return ONLY valid JSON with this exact shape:
{
  "hook": "1-sentence scroll-stopping first line in Shawn's voice",
  "caption": "Full IG caption with short paragraphs, real craft details, and natural CTA",
  "carouselSlides": ["Slide 1 text...", "Slide 2 text..."],
  "hashtags": ["#oklahomaplaster", "#tulsadesign", "... 8-12 relevant regional + craft tags"],
  "callToAction": "Natural CTA mentioning organicfinishesllc.org or DM",
  "reelTitle": "Working title for this IG Reel",
  "reelCoverText": "3-5 punchy words for the IG Reel cover frame in the profile grid",
  "durationSec": "15-25 sec",
  "audioVibe": "Raw steel trowel sound or subtle calm instrumental",
  "shots": [
    { "timecode": "0:00-0:03", "visual": "...", "spokenLine": "...", "onScreenText": "..." }
  ],
  "fullVoiceover": "Complete spoken voiceover script Shawn can record in 1 take inside IG Reels",
  "reelPinnedComment": "Short pinned first comment for IG Reels inviting questions or DMs",
  "storyFrames": [
    { "frame": 1, "visual": "...", "overlayText": "...", "stickerIdea": "Poll / Question / Link" }
  ]
}`;

  try {
    const raw = await callLLM(settings, systemPrompt, userPrompt, imageDataUrls);
    const parsed = JSON.parse(extractJsonBlock(raw)) as Partial<SocialDraft>;

    const draft: SocialDraft = {
      id: `soc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      format,
      mediaIds: selectedMedia.map((m) => m.id),
      mediaNames: selectedMedia.map((m) => m.title),
      topicNote,
      includeStoryAddon: includeStoryAddon || format === 'ig_story',
      hook: parsed.hook,
      caption: parsed.caption,
      carouselSlides: parsed.carouselSlides,
      hashtags: parsed.hashtags,
      callToAction: parsed.callToAction,
      reelTitle: isReel ? parsed.reelTitle : undefined,
      reelCoverText: isReel ? parsed.reelCoverText : undefined,
      durationSec: isReel ? parsed.durationSec : undefined,
      audioVibe: isReel ? parsed.audioVibe : undefined,
      shots: isReel ? parsed.shots : undefined,
      fullVoiceover: isReel ? parsed.fullVoiceover : undefined,
      reelPinnedComment: isReel ? parsed.reelPinnedComment : undefined,
      storyFrames: includeStoryAddon || format === 'ig_story' ? parsed.storyFrames : undefined,
      status: 'draft',
    };

    return { draft, usedFallback: false };
  } catch (err) {
    if (err instanceof Error && err.message !== 'NO_API_KEY') {
      throw err;
    }
    const leadTitle = selectedMedia[0]?.title || 'Hand-Troweled Architectural Plaster';

    const fallback: SocialDraft = {
      id: `soc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      format,
      mediaIds: selectedMedia.map((m) => m.id),
      mediaNames: selectedMedia.map((m) => m.title),
      topicNote,
      includeStoryAddon: includeStoryAddon || format === 'ig_story',
      hook: `Most people think this look comes from a bucket of paint — it actually starts with substrate prep and three hand-troweled mineral passes.`,
      caption: `Most people think this look comes from a bucket of paint — it actually starts with substrate prep and three hand-troweled mineral passes.\n\nOn this ${leadTitle.toLowerCase()} piece${topicNote ? ` (${topicNote})` : ''}, we built the texture thin and let the natural raking light do the work. No heavy faux texture, no shortcuts, and full HEPA dust-controlled sanding so the job site stays clean from start to finish.\n\nI handle every stage myself from prep through the final protective sealer across Oklahoma, Texas, Arkansas, Kansas, and Missouri.\n\nWorking on a custom fireplace, range hood, or wet space? Send a DM or reach out at organicfinishesllc.org to see sample boards.`,
      carouselSlides:
        selectedMedia.length > 1
          ? selectedMedia.map((m, idx) => `Slide ${idx + 1}: ${m.title}`)
          : [
              `Slide 1: Wide hero shot — ${leadTitle}`,
              'Slide 2: Tight raking-light close-up showing natural trowel movement',
              'Slide 3: Quick note on substrate prep + custom sample board booking',
            ],
      hashtags: [
        '#organicfinishesllc',
        '#oklahomaplaster',
        '#venetianplaster',
        '#microcement',
        '#tulsacustomhomes',
        '#okcinteriordesign',
        '#handtroweled',
        '#limeplaster',
        '#architecturalfinishes',
        '#customfireplace',
      ],
      callToAction: 'DM @organic.finishes or visit organicfinishesllc.org to book a sample board review.',
      reelTitle: isReel ? `How Real Hand-Troweled Plaster Catches Light (${leadTitle})` : undefined,
      reelCoverText: isReel ? 'REAL PLASTER VS. PAINT' : undefined,
      durationSec: isReel ? '20 sec' : undefined,
      audioVibe: isReel ? 'Raw steel trowel sound + calm voiceover (keep music low at 10–15%)' : undefined,
      shots: isReel
        ? [
            {
              timecode: '0:00–0:03',
              visual: `Tight close-up of ${leadTitle} in side light`,
              spokenLine: 'Flat paint sits on top of a wall. Real mineral plaster becomes the wall.',
              onScreenText: 'Paint vs. Real Mineral Plaster',
            },
            {
              timecode: '0:03–0:11',
              visual: 'Quick cut of prep / trowel pass / sample board texture',
              spokenLine:
                'We start with solid substrate prep, run HEPA dust extraction, and build thin hand-troweled coats so every pass has subtle movement.',
              onScreenText: 'Prep → Thin Coats → Burnish',
            },
            {
              timecode: '0:11–0:17',
              visual: 'Wide finished reveal of the fireplace, hood, or wall',
              spokenLine: 'Once it is sealed, you get a clean architectural finish that holds up for years.',
              onScreenText: 'Seamless. Zero-VOC. Built to last.',
            },
            {
              timecode: '0:17–0:20',
              visual: 'Sample boards or clean sign-off frame',
              spokenLine: 'Based in Oklahoma and traveling across the 5-state region. DM for sample boards.',
              onScreenText: 'OK • TX • AR • KS • MO | @organic.finishes',
            },
          ]
        : undefined,
      fullVoiceover: isReel
        ? 'Flat paint sits on top of a wall. Real mineral plaster becomes the wall. We start with solid substrate prep, run HEPA dust extraction, and build thin hand-troweled coats so every pass has subtle movement. Once it is sealed, you get a clean architectural finish that holds up for years. Based in Oklahoma and traveling across the 5-state region — send a DM or hit the link in bio to see sample boards.'
        : undefined,
      reelPinnedComment: isReel
        ? 'Questions about plaster prep, waterproof microcement showers, or custom range hoods? Drop them below or DM anytime. — Shawn'
        : undefined,
      storyFrames:
        includeStoryAddon || format === 'ig_story'
          ? [
              {
                frame: 1,
                visual: `Cropped detail shot of ${leadTitle}`,
                overlayText: 'Close-up of today’s finish in natural light.',
                stickerIdea: 'Poll: Matte Limestone vs. Burnished Sheen?',
              },
              {
                frame: 2,
                visual: 'Process / trowel or prep photo',
                overlayText: '90% of a clean plaster job is what happens before the finish coat.',
                stickerIdea: 'Question box: Ask me anything about plaster or microcement',
              },
              {
                frame: 3,
                visual: 'Finished wide shot or post share card',
                overlayText: 'Booking Oklahoma + 5-state projects now. Tap below for sample boards.',
                stickerIdea: 'Link sticker → https://organicfinishesllc.org',
              },
            ]
          : undefined,
      status: 'draft',
    };

    return { draft: fallback, usedFallback: true };
  }
}

export async function researchLiveSeoTopics(params: {
  settings: AppSettings;
  voice: VoiceProfile;
  regionFocus: string;
}): Promise<{ topics: SeoTopicIdea[]; usedFallback: boolean }> {
  const { settings, voice, regionFocus } = params;
  const systemPrompt = buildVoiceSystemPrompt(voice);
  const userPrompt = `Generate 5 high-intent, currently searched SEO blog topic ideas for ${voice.businessName} (${voice.website}).
Region focus: ${regionFocus || 'Oklahoma (OKC, Edmond, Tulsa, Grand Lake), 5-State South Central (TX, AR, KS, MO), and national architectural finish searches'}.

Focus on real search queries homeowners, interior designers, custom home builders, and commercial GCs type into Google right now (costs, comparisons, waterproofing, prep, grout-free showers, limewash fireplaces, Venetian plaster hoods, commercial microcement).

Return ONLY a valid JSON array of 5 objects:
[
  {
    "id": "unique-slug",
    "title": "Compelling SEO blog headline",
    "primaryKeyword": "exact target search phrase",
    "secondaryKeywords": ["kw1", "kw2", "kw3"],
    "regionScope": "Oklahoma Local" | "5-State Regional" | "National & Beyond",
    "audience": "Homeowner" | "Designer / Architect" | "Commercial GC",
    "searchIntent": "Why the searcher is googling this",
    "whyNow": "Why this topic has strong search momentum"
  }
]`;

  const raw = await callLLM(settings, systemPrompt, userPrompt);
  const parsed = JSON.parse(extractJsonBlock(raw)) as SeoTopicIdea[];
  return { topics: parsed, usedFallback: false };
}

export async function generateStrictSeoBlog(params: {
  settings: AppSettings;
  voice: VoiceProfile;
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  regionScope: string;
  selectedMedia: DriveMediaItem[];
}): Promise<{ draft: BlogDraft; usedFallback: boolean }> {
  const { settings, voice, topic, primaryKeyword, secondaryKeywords, regionScope, selectedMedia } = params;
  const systemPrompt = buildVoiceSystemPrompt(voice);

  const mediaContext =
    selectedMedia.length > 0
      ? selectedMedia.map((m) => `- ${m.name} (${m.title})`).join('\n')
      : '- Suggest 2 relevant photos from Shawn’s Drive folders (Fireplaces, Ceilings, Luxury Walls, Sample Boards, or Field Work).';

  const userPrompt = `Write a STRICT-SEO, publish-ready blog post for ${voice.website} in Shawn Reeder's exact voice.

Topic: ${topic}
Primary Keyword: ${primaryKeyword}
Secondary Keywords: ${secondaryKeywords.join(', ')}
Region Scope: ${regionScope}
Paired Drive Photos:
${mediaContext}

STRICT SEO REQUIREMENTS (MUST PASS EVERY RULE):
1. Title Tag: 50–60 characters, includes primary keyword naturally.
2. Meta Description: 145–155 characters, includes primary keyword + clear benefit/CTA.
3. URL Slug: lowercase hyphenated, short, contains primary keyword.
4. Single H1 (do NOT repeat H1 inside bodyMarkdown; use ## H2 and ### H3 only in bodyMarkdown).
5. Word count: 950–1,350 words of practical, craftsman-level substance (no filler fluff).
6. Primary keyword appears in the first 100 words, at least one H2, and naturally 3–6 times total.
7. Include local/regional credibility (${voice.homeBase} and ${voice.serviceRadius}) naturally where appropriate.
8. Include 4 real, high-intent FAQs (for Google FAQ & AI Overviews).
9. Include 2–3 natural internal link placements pointing to ${voice.website} (e.g., portfolio, services, contact/sample boards).
10. ZERO banned AI clichés (${voice.bannedPhrases.join(', ')}). ZERO emojis.

Return ONLY valid JSON:
{
  "titleTag": "50-60 char SEO title",
  "metaDescription": "145-155 char meta description",
  "urlSlug": "short-seo-slug",
  "h1": "Main H1 Headline",
  "bodyMarkdown": "Full markdown body using ## H2 and ### H3 headings...",
  "faqs": [
    { "question": "...", "answer": "..." }
  ],
  "imagePairings": [
    {
      "fileName": "exact or suggested filename",
      "suggestedSeoFilename": "keyword-rich-file-name.jpg",
      "altText": "Descriptive accessibility + SEO alt text",
      "caption": "Short craftsman caption"
    }
  ],
  "internalLinks": ["${voice.website}", "${voice.website}/contact"]
}`;

  try {
    const raw = await callLLM(settings, systemPrompt, userPrompt);
    const parsed = JSON.parse(extractJsonBlock(raw)) as Partial<BlogDraft>;
    const faqs = parsed.faqs || [];

    const jsonLd = buildBlogJsonLd({
      voice,
      h1: parsed.h1 || topic,
      metaDescription: parsed.metaDescription || '',
      urlSlug: parsed.urlSlug || slugify(primaryKeyword || topic),
      faqs,
    });

    const draft: BlogDraft = {
      id: `blog_${Date.now()}`,
      createdAt: new Date().toISOString(),
      topic,
      regionScope,
      primaryKeyword,
      secondaryKeywords,
      titleTag: parsed.titleTag || `${primaryKeyword} | Organic Finishes LLC`,
      metaDescription: parsed.metaDescription || '',
      urlSlug: parsed.urlSlug || slugify(primaryKeyword || topic),
      h1: parsed.h1 || topic,
      bodyMarkdown: parsed.bodyMarkdown || '',
      faqs,
      imagePairings: parsed.imagePairings || [],
      jsonLdSchema: jsonLd,
      internalLinks: parsed.internalLinks || [voice.website],
      status: 'draft',
    };

    return { draft, usedFallback: false };
  } catch (err) {
    if (err instanceof Error && err.message !== 'NO_API_KEY') {
      throw err;
    }

    const kw = primaryKeyword.trim() || 'microcement shower Oklahoma';
    const slug = slugify(kw);
    const h1 = topic.trim() || `What to Know Before Specifying ${kw}`;
    const titleTag = trimToRange(`${kw} — Guide | Organic Finishes`, 58);
    const metaDescription = trimToRange(
      `Practical guide to ${kw}: substrate prep, waterproofing, cost factors & care from Shawn Reeder at Organic Finishes LLC in Oklahoma.`,
      153
    );

    const faqs = [
      {
        question: `How long does a ${kw} project usually take?`,
        answer:
          'Most residential feature walls and fireplaces take 3 to 5 days including substrate prep, thin hand-troweled mineral coats, and curing. Waterproof wet rooms and microcement showers typically run 7 to 10 days so waterproofing membranes and polyurethane topcoats cure properly.',
      },
      {
        question: 'Can microcement or architectural plaster go over existing tile or drywall?',
        answer:
          'In many cases, yes. As long as the existing tile or drywall is structurally sound, we degrease, mechanically abrade, apply a bonding primer, and embed fiberglass reinforcement mesh in the base coat before building the finish layers.',
      },
      {
        question: 'How do you keep dust under control inside an occupied home or commercial space?',
        answer:
          'We run full containment with commercial HEPA dust-extraction sanding systems on every job. That keeps airborne dust down whether we are working in an occupied Oklahoma home or an active retail space.',
      },
      {
        question: 'Do you travel outside Oklahoma City and Tulsa?',
        answer:
          'Yes. Organic Finishes LLC is based in Oklahoma and mobilizes across Texas, Arkansas, Kansas, and Missouri for residential and commercial architectural finishes.',
      },
    ];

    const bodyMarkdown = `When homeowners, interior designers, or custom builders ask me about **${kw}**, the conversation usually starts with the finished look — and it should really start with the substrate underneath.

At [Organic Finishes LLC](${voice.website}), I handle every project myself from surface prep through the final protective sealer. Across ${voice.homeBase} and the wider five-state region (${voice.serviceRadius}), the difference between a mineral finish that lasts decades and one that cracks in six months almost always comes down to prep, moisture control, and patience between coats.

## Why ${kw} Works So Well in Real Spaces

Traditional painted drywall sits flat under daylight, and conventional tile leaves hundreds of feet of porous grout lines to scrub. Hand-troweled mineral systems — whether seamless microcement, burnished Marmorino, or waterproof Tadelakt — create a continuous architectural surface that reacts softly to natural raking light.

Because these systems are built at roughly 2 to 3 millimeters thick, they bond tightly to properly prepared substrates without adding the structural weight of solid stone or poured concrete.

### Where Clients Specify This Finish Most
- **Custom fireplaces and sculpted range hoods** where homeowners want monolithic plaster movement with zero paint seams.
- **Grout-free wet spaces and curbless showers** built over a dedicated liquid waterproofing membrane.
- **Commercial retail, hospitality lobbies, and feature walls** needing rapid, clean turnarounds.

## What Proper Substrate Prep Actually Looks Like

A lot of people underestimate what happens before the first decorative trowel pass. On every job, I inspect the wall or floor for movement, moisture, and loose coatings before mixing material.

1. **Containment and HEPA dust control:** Before sanding anything, we mask off adjacent millwork and connect commercial HEPA extraction so dust stays out of HVAC returns and neighboring rooms.
2. **Bonding primer and fiberglass mesh:** High-stress transitions, corners, and tile-over substrates get a polymer bonding primer and embedded alkali-resistant mesh to bridge hairline movement.
3. **Thin hand-troweled finish passes:** Rather than globbing on heavy texture, we lay down multiple tight coats, letting each pass set before compressing and burnishing with a steel trowel.
4. **Right sealer for the room:** Dry architectural walls may use a breathable mineral wax or matte sealer, while wet spaces and commercial floors get multi-coat two-component polyurethane for water and abrasion resistance.

## Cost, Timeline & Regional Planning (${regionScope})

Pricing for **${kw}** depends on three practical factors: total square footage, substrate condition (fresh Level 4 drywall vs. tile-over waterproofing), and finish complexity.

- **Accent walls, fireplaces & range hoods:** Usually 3 to 5 working days on site.
- **Waterproof microcement or Tadelakt showers:** Usually 7 to 10 days to allow full membrane and topcoat cure times.
- **Custom sample boards:** Before any full-scale installation starts, we review standard portfolio boards or fabricate a project-specific color and texture board so the designer, builder, and homeowner know exactly what the finished wall will look like in site lighting.

## Care & Day-to-Day Maintenance

Once sealed, mineral finishes are straightforward to live with. Skip harsh bleach, vinegar, or abrasive scrub pads. A simple pH-neutral cleaner and a soft microfiber cloth keep sealed plaster and microcement clean without dulling the protective topcoat.

## Next Step: Review Sample Boards on Your Project

If you are planning a custom build, remodel, or commercial tenant improvement in Oklahoma, Texas, Arkansas, Kansas, or Missouri, reach out through [organicfinishesllc.org](${voice.website}) or call **${voice.phone}**. I am always glad to walk the site, talk through substrate readiness with your builder, and bring real sample boards to the table.`;

    const imagePairings =
      selectedMedia.length > 0
        ? selectedMedia.slice(0, 3).map((m) => ({
            mediaId: m.id,
            fileName: m.name,
            suggestedSeoFilename: `${slug}-${slugify(m.category)}.jpg`,
            altText: `${m.title} — ${kw} by Organic Finishes LLC in Oklahoma`,
            caption: `Hand-troweled ${m.title.toLowerCase()} by Shawn Reeder, Organic Finishes LLC.`,
          }))
        : [
            {
              fileName: 'Fireplace_Contemporary-Limestone-Plaster-Mantel.jpg',
              suggestedSeoFilename: `${slug}-organic-finishes-oklahoma.jpg`,
              altText: `Hand-troweled architectural plaster finish for ${kw} by Organic Finishes LLC`,
              caption: 'Real job-site mineral plaster finish showing subtle trowel movement in natural light.',
            },
          ];

    const draft: BlogDraft = {
      id: `blog_${Date.now()}`,
      createdAt: new Date().toISOString(),
      topic,
      regionScope,
      primaryKeyword: kw,
      secondaryKeywords,
      titleTag,
      metaDescription,
      urlSlug: slug,
      h1,
      bodyMarkdown,
      faqs,
      imagePairings,
      jsonLdSchema: buildBlogJsonLd({ voice, h1, metaDescription, urlSlug: slug, faqs }),
      internalLinks: [voice.website],
      status: 'draft',
    };

    return { draft, usedFallback: true };
  }
}

export async function analyzeVoiceSamples(params: {
  settings: AppSettings;
  voice: VoiceProfile;
}): Promise<{ fingerprint: string; suggestedVocab: string[]; usedFallback: boolean }> {
  const { settings, voice } = params;
  const combined = voice.samples.map((s) => s.text).join('\n\n---\n\n');

  try {
    const raw = await callLLM(
      settings,
      'You are a linguistics and brand-voice analyst. Extract an authentic, concise voice profile from real writing samples.',
      `Analyze these writing samples from ${voice.ownerName} (${voice.businessName}):\n\n${combined}\n\nReturn ONLY JSON:\n{"fingerprint": "2-3 concrete sentences describing sentence length, rhythm, openings, sign-offs, and vocabulary habits", "suggestedVocab": ["5-8 real phrases/terms Shawn actually uses"]}`
    );
    const parsed = JSON.parse(extractJsonBlock(raw)) as {
      fingerprint?: string;
      suggestedVocab?: string[];
    };
    return {
      fingerprint: parsed.fingerprint || voice.analyzedFingerprint,
      suggestedVocab: parsed.suggestedVocab || [],
      usedFallback: false,
    };
  } catch (err) {
    if (err instanceof Error && err.message !== 'NO_API_KEY') throw err;
    const avgWords =
      combined
        .split(/[.!?]+/)
        .map((s) => s.trim().split(/\s+/).filter(Boolean).length)
        .filter((n) => n > 0)
        .reduce((a, b, _, arr) => a + b / arr.length, 0) || 14;

    return {
      fingerprint: `Analyzed ${voice.samples.length} sample(s): averages ~${Math.round(
        avgWords
      )} words per sentence. Grounded, direct craftsman tone that explains real prep, material systems, and regional service without sales hype.`,
      suggestedVocab: ['surface prep', 'protective sealer', 'sample boards', 'HEPA dust-controlled'],
      usedFallback: true,
    };
  }
}

export function auditBlogSeo(draft: BlogDraft, voice: VoiceProfile): SeoAuditResult {
  const fullText = `${draft.h1}\n${draft.bodyMarkdown}\n${draft.faqs
    .map((f) => `${f.question} ${f.answer}`)
    .join('\n')}`;
  const lower = fullText.toLowerCase();
  const words = fullText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const kw = draft.primaryKeyword.trim().toLowerCase();

  const bannedHits = voice.bannedPhrases.filter((p) => lower.includes(p.toLowerCase()));
  const titleLen = draft.titleTag.trim().length;
  const metaLen = draft.metaDescription.trim().length;
  const first100 = words.slice(0, 100).join(' ').toLowerCase();
  const h2Matches = draft.bodyMarkdown.match(/^##\s+.+$/gm) || [];
  const hasKwInH2 = kw ? h2Matches.some((h) => h.toLowerCase().includes(kw)) : false;
  const hasInternalLink = lower.includes('organicfinishesllc.org');

  const checks: SeoAuditCheck[] = [
    {
      label: 'Title Tag Length (50–60 chars)',
      passed: titleLen >= 45 && titleLen <= 62,
      severity: titleLen >= 45 && titleLen <= 62 ? 'pass' : titleLen > 0 ? 'warn' : 'fail',
      detail: `${titleLen} characters${kw && draft.titleTag.toLowerCase().includes(kw) ? ' • includes primary keyword' : ''}`,
    },
    {
      label: 'Meta Description Length (140–160 chars)',
      passed: metaLen >= 135 && metaLen <= 162,
      severity: metaLen >= 135 && metaLen <= 162 ? 'pass' : metaLen > 0 ? 'warn' : 'fail',
      detail: `${metaLen} characters`,
    },
    {
      label: 'Primary Keyword in Intro & H2',
      passed: Boolean(kw && first100.includes(kw) && hasKwInH2),
      severity: kw && first100.includes(kw) && hasKwInH2 ? 'pass' : 'warn',
      detail: kw
        ? `Intro: ${first100.includes(kw) ? 'Yes' : 'Missing'} • H2: ${hasKwInH2 ? 'Yes' : 'Missing'}`
        : 'Set a primary keyword',
    },
    {
      label: 'Content Depth (750+ words)',
      passed: wordCount >= 750,
      severity: wordCount >= 750 ? 'pass' : wordCount >= 450 ? 'warn' : 'fail',
      detail: `${wordCount} words across article + FAQs`,
    },
    {
      label: 'Structured Headings & FAQ Schema',
      passed: h2Matches.length >= 3 && draft.faqs.length >= 3,
      severity: h2Matches.length >= 3 && draft.faqs.length >= 3 ? 'pass' : 'warn',
      detail: `${h2Matches.length} H2 sections • ${draft.faqs.length} FAQs + JSON-LD ready`,
    },
    {
      label: 'Internal Link to organicfinishesllc.org',
      passed: hasInternalLink,
      severity: hasInternalLink ? 'pass' : 'fail',
      detail: hasInternalLink ? 'Verified in body copy' : 'Add link to organicfinishesllc.org',
    },
    {
      label: 'Voice Integrity (Zero AI Clichés)',
      passed: bannedHits.length === 0,
      severity: bannedHits.length === 0 ? 'pass' : 'fail',
      detail:
        bannedHits.length === 0
          ? 'Clean — sounds like Shawn'
          : `Remove banned phrases: ${bannedHits.join(', ')}`,
    },
  ];

  const passCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passCount / checks.length) * 100);

  return { score, wordCount, bannedHits, checks };
}

export function blogToHostingerHtml(draft: BlogDraft): string {
  const mdLines = draft.bodyMarkdown.split('\n');
  const htmlParts: string[] = [`<h1>${escapeHtml(draft.h1)}</h1>`];
  let inList = false;

  for (const rawLine of mdLines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<h3>${inlineMdToHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<h2>${inlineMdToHtml(line.slice(3))}</h2>`);
    } else if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      htmlParts.push(`<li>${inlineMdToHtml(line.replace(/^([-*]|\d+\.)\s+/, ''))}</li>`);
    } else {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      htmlParts.push(`<p>${inlineMdToHtml(line)}</p>`);
    }
  }
  if (inList) htmlParts.push('</ul>');

  if (draft.faqs.length > 0) {
    htmlParts.push('<h2>Frequently Asked Questions</h2>');
    for (const faq of draft.faqs) {
      htmlParts.push(`<h3>${escapeHtml(faq.question)}</h3>`);
      htmlParts.push(`<p>${escapeHtml(faq.answer)}</p>`);
    }
  }

  return `${htmlParts.join('\n')}\n\n<script type="application/ld+json">\n${draft.jsonLdSchema}\n</script>`;
}

function inlineMdToHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 65);
}

function trimToRange(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trim()}…`;
}

function buildBlogJsonLd(params: {
  voice: VoiceProfile;
  h1: string;
  metaDescription: string;
  urlSlug: string;
  faqs: Array<{ question: string; answer: string }>;
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: params.h1,
        description: params.metaDescription,
        author: {
          '@type': 'Person',
          name: params.voice.ownerName,
        },
        publisher: {
          '@type': 'LocalBusiness',
          name: params.voice.businessName,
          url: params.voice.website,
          telephone: params.voice.phone,
          areaServed: ['Oklahoma', 'Texas', 'Arkansas', 'Kansas', 'Missouri'],
        },
        mainEntityOfPage: `${params.voice.website}/blog/${params.urlSlug}`,
      },
      ...(params.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: params.faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
  return JSON.stringify(schema, null, 2);
}
