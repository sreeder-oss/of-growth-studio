// Auto-indexed from Google Drive: Organic Finishes - Outreach / 04 - Images, Infographics & Video
export interface DriveFolderMeta {
  key: MediaCategory;
  label: string;
  folderId: string;
  count: number;
}

export type MediaCategory =
  | "fireplaces"
  | "ceilings"
  | "walls"
  | "samples"
  | "fieldwork"
  | "infographics"
  | "videos";

export interface DriveMediaItem {
  id: string;
  name: string;
  title: string;
  category: MediaCategory;
  categoryLabel: string;
  mimeType: string;
  isVideo: boolean;
  driveUrl: string;
  thumbnailUrl?: string;
  localDataUrl?: string;
}

export const DRIVE_ROOT_MEDIA_FOLDER_ID = "1_yABek03OvKvQQhK-eu3GA5XOBsic0RC";
export const DRIVE_WORK_IN_WILD_FOLDER_ID = "1mUuT1ELIqiiR7iqoNdlqFrkF4nFpfKZ7";

export const DRIVE_FOLDERS: DriveFolderMeta[] = [
  {
    "key": "fireplaces",
    "label": "Fireplaces & Range Hoods",
    "folderId": "1FE33xOGoDUJoif-_A9-hDbhvb1vVrC0w",
    "count": 12
  },
  {
    "key": "ceilings",
    "label": "Ceilings, Arches & Architectural",
    "folderId": "1dxbBlt8WBdLUSEIVb1zq5LZnuNUdvne7",
    "count": 10
  },
  {
    "key": "walls",
    "label": "Luxury Walls & Art Finishes",
    "folderId": "1Uuy612mlymdQGMYf4w4jNth2pKqZeSyQ",
    "count": 9
  },
  {
    "key": "samples",
    "label": "Sample Boards & Textures",
    "folderId": "1b2C90L7KxQ4UA0Bri4CH94cNiFubjnOq",
    "count": 10
  },
  {
    "key": "fieldwork",
    "label": "Field Work, Tools & Process",
    "folderId": "1FxAzFObxynjo13PYd9J9cRvCQFr_wvjS",
    "count": 12
  },
  {
    "key": "infographics",
    "label": "Infographics & Spec Decks",
    "folderId": "1xIm3ii9XpS9X_XzrSttsg3Vkdjlla1A6",
    "count": 16
  },
  {
    "key": "videos",
    "label": "Video Clips",
    "folderId": "1mluL9hYHc34zzWTTZCcSWYA2gPX89Rci",
    "count": 2
  }
];

export const SEED_DRIVE_MEDIA: DriveMediaItem[] = [
  {
    "id": "1qZkWi2zyrOwIEpPEAu5pz1TY9agyUlSM",
    "name": "Fireplace_Contemporary-Limestone-Plaster-Mantel.jpg",
    "title": "Fireplace \u2014 Contemporary Limestone Plaster Mantel",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1qZkWi2zyrOwIEpPEAu5pz1TY9agyUlSM/view",
    "thumbnailUrl": "/outreach-thumbs/1qZkWi2zyrOwIEpPEAu5pz1TY9agyUlSM.jpg"
  },
  {
    "id": "1ODoQy20nBT3lspzM-sBfEN6K0HtknOrU",
    "name": "Fireplace_Stepped-Cantilever-Hearth-Overview.jpg",
    "title": "Fireplace \u2014 Stepped Cantilever Hearth Overview",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1ODoQy20nBT3lspzM-sBfEN6K0HtknOrU/view",
    "thumbnailUrl": "/outreach-thumbs/1ODoQy20nBT3lspzM-sBfEN6K0HtknOrU.jpg"
  },
  {
    "id": "1r1kXt4KALYFHc_ipSRIqI9GJeI1zmd2E",
    "name": "Fireplace_Stepped-Cantilever-Plaster-Shelf-Vessel.jpg",
    "title": "Fireplace \u2014 Stepped Cantilever Plaster Shelf Vessel",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1r1kXt4KALYFHc_ipSRIqI9GJeI1zmd2E/view",
    "thumbnailUrl": "/outreach-thumbs/1r1kXt4KALYFHc_ipSRIqI9GJeI1zmd2E.jpg"
  },
  {
    "id": "1LDl8x9JzjIuyxqei4-dcl0YYwH9Xugka",
    "name": "Fireplace_Stepped-Plaster-Mantel-Close-Up.jpg",
    "title": "Fireplace \u2014 Stepped Plaster Mantel Close Up",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1LDl8x9JzjIuyxqei4-dcl0YYwH9Xugka/view",
    "thumbnailUrl": "/outreach-thumbs/1LDl8x9JzjIuyxqei4-dcl0YYwH9Xugka.jpg"
  },
  {
    "id": "1V0mlrhRIJWs-O7gZAzdqrCdEuyzTiS_f",
    "name": "Fireplace_Stepped-Plaster-Mantel-Frontal-View.jpg",
    "title": "Fireplace \u2014 Stepped Plaster Mantel Frontal View",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1V0mlrhRIJWs-O7gZAzdqrCdEuyzTiS_f/view",
    "thumbnailUrl": "/outreach-thumbs/1V0mlrhRIJWs-O7gZAzdqrCdEuyzTiS_f.jpg"
  },
  {
    "id": "1FAGbvqZSMpvDzacTg4S2FYCj4p0XbQvm",
    "name": "Fireplace_Stepped-Plaster-Mantel-High-Angle.jpg",
    "title": "Fireplace \u2014 Stepped Plaster Mantel High Angle",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1FAGbvqZSMpvDzacTg4S2FYCj4p0XbQvm/view",
    "thumbnailUrl": "/outreach-thumbs/1FAGbvqZSMpvDzacTg4S2FYCj4p0XbQvm.jpg"
  },
  {
    "id": "1ruepEy02LGRp1nk0UngjKJZGuVBA378e",
    "name": "Fireplace_Vertical-Raked-Plaster-Hearth-Detail.jpg",
    "title": "Fireplace \u2014 Vertical Raked Plaster Hearth Detail",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1ruepEy02LGRp1nk0UngjKJZGuVBA378e/view",
    "thumbnailUrl": "/outreach-thumbs/1ruepEy02LGRp1nk0UngjKJZGuVBA378e.jpg"
  },
  {
    "id": "1nJWl6KzKImusBDJ10W9PU9At6fc8Izmw",
    "name": "Range-Hood_Charcoal-Venetian-Plaster-Flared.jpg",
    "title": "Range Hood \u2014 Charcoal Venetian Plaster Flared",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1nJWl6KzKImusBDJ10W9PU9At6fc8Izmw/view",
    "thumbnailUrl": "/outreach-thumbs/1nJWl6KzKImusBDJ10W9PU9At6fc8Izmw.jpg"
  },
  {
    "id": "12Skc7NkJFXcZaFIAindgGDkCYF66CGBz",
    "name": "Range-Hood_Contemporary-White-Microcement.jpg",
    "title": "Range Hood \u2014 Contemporary White Microcement",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/12Skc7NkJFXcZaFIAindgGDkCYF66CGBz/view",
    "thumbnailUrl": "/outreach-thumbs/12Skc7NkJFXcZaFIAindgGDkCYF66CGBz.jpg"
  },
  {
    "id": "1L3SB0pXSQevfuOhHA9hxeCr4nLs0mpn3",
    "name": "Range-Hood_Modern-White-Plaster-Flared-Oak.jpg",
    "title": "Range Hood \u2014 Modern White Plaster Flared Oak",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1L3SB0pXSQevfuOhHA9hxeCr4nLs0mpn3/view",
    "thumbnailUrl": "/outreach-thumbs/1L3SB0pXSQevfuOhHA9hxeCr4nLs0mpn3.jpg"
  },
  {
    "id": "1nnwFYAhfks7UDkEIh9w-EBjrRkjNdH9g",
    "name": "Range-Hood_Spanish-Arched-Corbel-Counter-Detail.jpg",
    "title": "Range Hood \u2014 Spanish Arched Corbel Counter Detail",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1nnwFYAhfks7UDkEIh9w-EBjrRkjNdH9g/view",
    "thumbnailUrl": "/outreach-thumbs/1nnwFYAhfks7UDkEIh9w-EBjrRkjNdH9g.jpg"
  },
  {
    "id": "1rlR7KV3Z3LLUmRP3s1hGJ81JxwG07GMF",
    "name": "Range-Hood_Spanish-Arched-Corbel-Plaster.jpg",
    "title": "Range Hood \u2014 Spanish Arched Corbel Plaster",
    "category": "fireplaces",
    "categoryLabel": "Fireplaces & Range Hoods",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1rlR7KV3Z3LLUmRP3s1hGJ81JxwG07GMF/view",
    "thumbnailUrl": "/outreach-thumbs/1rlR7KV3Z3LLUmRP3s1hGJ81JxwG07GMF.jpg"
  },
  {
    "id": "1X4Z9CUy4_IQCgkXEnAMpG4FC4kQX9zpg",
    "name": "Architectural_Arched-Passageway-Classic-Black-Door.jpg",
    "title": "Architectural \u2014 Arched Passageway Classic Black Door",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1X4Z9CUy4_IQCgkXEnAMpG4FC4kQX9zpg/view",
    "thumbnailUrl": "/outreach-thumbs/1X4Z9CUy4_IQCgkXEnAMpG4FC4kQX9zpg.jpg"
  },
  {
    "id": "1yXv0xje6NdnKPd6MzkDIiNfftH5jk0CA",
    "name": "Architectural_Carved-Plaster-Fluting.jpg",
    "title": "Architectural \u2014 Carved Plaster Fluting",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1yXv0xje6NdnKPd6MzkDIiNfftH5jk0CA/view",
    "thumbnailUrl": "/outreach-thumbs/1yXv0xje6NdnKPd6MzkDIiNfftH5jk0CA.jpg"
  },
  {
    "id": "1SGrqx_yhKrEepXG_lB75V5ov0EDVCQjA",
    "name": "Architectural_Full-Room-Floating-Shelves-Ceiling.jpg",
    "title": "Architectural \u2014 Full Room Floating Shelves Ceiling",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1SGrqx_yhKrEepXG_lB75V5ov0EDVCQjA/view",
    "thumbnailUrl": "/outreach-thumbs/1SGrqx_yhKrEepXG_lB75V5ov0EDVCQjA.jpg"
  },
  {
    "id": "1MWXZ7JfuKY0FbufpfwvZ3h-okV5PJMCb",
    "name": "Architectural_Seamless-Plaster-Floating-Shelves.jpg",
    "title": "Architectural \u2014 Seamless Plaster Floating Shelves",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1MWXZ7JfuKY0FbufpfwvZ3h-okV5PJMCb/view",
    "thumbnailUrl": "/outreach-thumbs/1MWXZ7JfuKY0FbufpfwvZ3h-okV5PJMCb.jpg"
  },
  {
    "id": "1YQz8i8GPJYJGkluK5XTMyLNNtkCG0T4L",
    "name": "Ceiling_Coffered-Plaster-Beams-Apex.jpg",
    "title": "Ceiling \u2014 Coffered Plaster Beams Apex",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1YQz8i8GPJYJGkluK5XTMyLNNtkCG0T4L/view",
    "thumbnailUrl": "/outreach-thumbs/1YQz8i8GPJYJGkluK5XTMyLNNtkCG0T4L.jpg"
  },
  {
    "id": "1qh0uxHxREtvTSYazZftZwOTqBKwS1rxk",
    "name": "Ceiling_Crisp-Geometric-Soffit-Transition.jpg",
    "title": "Ceiling \u2014 Crisp Geometric Soffit Transition",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1qh0uxHxREtvTSYazZftZwOTqBKwS1rxk/view",
    "thumbnailUrl": "/outreach-thumbs/1qh0uxHxREtvTSYazZftZwOTqBKwS1rxk.jpg"
  },
  {
    "id": "1ZSFMCvSP3raTxA69MyRlAB-CdZ1VKafT",
    "name": "Ceiling_Curved-Barrel-Vault-Dome-Transition.jpg",
    "title": "Ceiling \u2014 Curved Barrel Vault Dome Transition",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1ZSFMCvSP3raTxA69MyRlAB-CdZ1VKafT/view",
    "thumbnailUrl": "/outreach-thumbs/1ZSFMCvSP3raTxA69MyRlAB-CdZ1VKafT.jpg"
  },
  {
    "id": "14cITxL-G2ZRIVj6uVr-NLCNeqTu3qtCU",
    "name": "Ceiling_Groined-Vault-Arches-Lighting.jpg",
    "title": "Ceiling \u2014 Groined Vault Arches Lighting",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/14cITxL-G2ZRIVj6uVr-NLCNeqTu3qtCU/view",
    "thumbnailUrl": "/outreach-thumbs/14cITxL-G2ZRIVj6uVr-NLCNeqTu3qtCU.jpg"
  },
  {
    "id": "1qLNNx9TeUBm06JywrB2jUklyqAfC-zRz",
    "name": "Ceiling_Groined-Vault-Compound-Curves.jpg",
    "title": "Ceiling \u2014 Groined Vault Compound Curves",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1qLNNx9TeUBm06JywrB2jUklyqAfC-zRz/view",
    "thumbnailUrl": "/outreach-thumbs/1qLNNx9TeUBm06JywrB2jUklyqAfC-zRz.jpg"
  },
  {
    "id": "1rMi1X0q2ggO7qV0dBEHXwhlaK5v6kadT",
    "name": "Ceiling_Groined-Vault-Plaster-Apex.jpg",
    "title": "Ceiling \u2014 Groined Vault Plaster Apex",
    "category": "ceilings",
    "categoryLabel": "Ceilings, Arches & Architectural",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1rMi1X0q2ggO7qV0dBEHXwhlaK5v6kadT/view",
    "thumbnailUrl": "/outreach-thumbs/1rMi1X0q2ggO7qV0dBEHXwhlaK5v6kadT.jpg"
  },
  {
    "id": "1Ll1vIBpBw8yc8hyTRS-MD6NOWBFhKccq",
    "name": "Art-Plaster_Bas-Relief-Botanical-Branch.jpg",
    "title": "Art Plaster \u2014 Bas Relief Botanical Branch",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1Ll1vIBpBw8yc8hyTRS-MD6NOWBFhKccq/view",
    "thumbnailUrl": "/outreach-thumbs/1Ll1vIBpBw8yc8hyTRS-MD6NOWBFhKccq.jpg"
  },
  {
    "id": "1qmQAUHeDefLdwXjI8DqV3pFo-5z4Et6O",
    "name": "Microcement_Mottled-Grey-Mineral-Floor.jpg",
    "title": "Microcement \u2014 Mottled Grey Mineral Floor",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1qmQAUHeDefLdwXjI8DqV3pFo-5z4Et6O/view",
    "thumbnailUrl": "/outreach-thumbs/1qmQAUHeDefLdwXjI8DqV3pFo-5z4Et6O.jpg"
  },
  {
    "id": "1EKlF-8SIRmQT8oyfaVxbjwfFQWdSugCZ",
    "name": "Relief-Plaster_Embossed-Damask-Floral-Wall.jpg",
    "title": "Relief Plaster \u2014 Embossed Damask Floral Wall",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1EKlF-8SIRmQT8oyfaVxbjwfFQWdSugCZ/view",
    "thumbnailUrl": "/outreach-thumbs/1EKlF-8SIRmQT8oyfaVxbjwfFQWdSugCZ.jpg"
  },
  {
    "id": "1Nt6gZ7DJ4zASNjQtOfwaTcTa35E8QqFR",
    "name": "Relief-Plaster_Moroccan-Lattice-Trellis-Wall.jpg",
    "title": "Relief Plaster \u2014 Moroccan Lattice Trellis Wall",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1Nt6gZ7DJ4zASNjQtOfwaTcTa35E8QqFR/view",
    "thumbnailUrl": "/outreach-thumbs/1Nt6gZ7DJ4zASNjQtOfwaTcTa35E8QqFR.jpg"
  },
  {
    "id": "1XV2hVq-0qImZ0gGZfp3OSpIYvtukwm_-",
    "name": "Venetian-Plaster_Faux-Marble-Macro-Detail.jpg",
    "title": "Venetian Plaster \u2014 Faux Marble Macro Detail",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1XV2hVq-0qImZ0gGZfp3OSpIYvtukwm_-/view",
    "thumbnailUrl": "/outreach-thumbs/1XV2hVq-0qImZ0gGZfp3OSpIYvtukwm_-.jpg"
  },
  {
    "id": "1RrQ3NxCIwMjLyyg_D6Z3UIPeYaCWjk8B",
    "name": "Venetian-Plaster_Faux-Marble-Veining-Close-Angle.jpg",
    "title": "Venetian Plaster \u2014 Faux Marble Veining Close Angle",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1RrQ3NxCIwMjLyyg_D6Z3UIPeYaCWjk8B/view",
    "thumbnailUrl": "/outreach-thumbs/1RrQ3NxCIwMjLyyg_D6Z3UIPeYaCWjk8B.jpg"
  },
  {
    "id": "1eoDKqV94REMupz7ezNriiGV3LmwXuXLs",
    "name": "Venetian-Plaster_Faux-Marble-Veining-With-Vessel.jpg",
    "title": "Venetian Plaster \u2014 Faux Marble Veining With Vessel",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1eoDKqV94REMupz7ezNriiGV3LmwXuXLs/view",
    "thumbnailUrl": "/outreach-thumbs/1eoDKqV94REMupz7ezNriiGV3LmwXuXLs.jpg"
  },
  {
    "id": "1eYQvEpVQpaH9tENvXvIXyssSNGMfztHz",
    "name": "Venetian-Plaster_High-Polish-Mirror-Reflection.jpg",
    "title": "Venetian Plaster \u2014 High Polish Mirror Reflection",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1eYQvEpVQpaH9tENvXvIXyssSNGMfztHz/view",
    "thumbnailUrl": "/outreach-thumbs/1eYQvEpVQpaH9tENvXvIXyssSNGMfztHz.jpg"
  },
  {
    "id": "1YKAodetyuN6-wMVS1JGPJDWye7jvCXVz",
    "name": "Venetian-Plaster_Montana-Estate-Lake-Panoramic.jpg",
    "title": "Venetian Plaster \u2014 Montana Estate Lake Panoramic",
    "category": "walls",
    "categoryLabel": "Luxury Walls & Art Finishes",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1YKAodetyuN6-wMVS1JGPJDWye7jvCXVz/view",
    "thumbnailUrl": "/outreach-thumbs/1YKAodetyuN6-wMVS1JGPJDWye7jvCXVz.jpg"
  },
  {
    "id": "1WX2r2e7Bd89XUDqztdsdvcFnGTf59bBA",
    "name": "Sample_Black-Plaster-Gold-Leaf-Band.jpg",
    "title": "Sample \u2014 Black Plaster Gold Leaf Band",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1WX2r2e7Bd89XUDqztdsdvcFnGTf59bBA/view",
    "thumbnailUrl": "/outreach-thumbs/1WX2r2e7Bd89XUDqztdsdvcFnGTf59bBA.jpg"
  },
  {
    "id": "1wyXEd_4FeiWm6Yt9A42Fwio71UOPMMm2",
    "name": "Sample_Concentric-Spiral-Plaster-Medallions.jpg",
    "title": "Sample \u2014 Concentric Spiral Plaster Medallions",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1wyXEd_4FeiWm6Yt9A42Fwio71UOPMMm2/view",
    "thumbnailUrl": "/outreach-thumbs/1wyXEd_4FeiWm6Yt9A42Fwio71UOPMMm2.jpg"
  },
  {
    "id": "1pR2146-O86aSIVHFhZBYw-BZKpW3tQxh",
    "name": "Sample_Dual-Texture-Plaster-Crown-Moulding.jpg",
    "title": "Sample \u2014 Dual Texture Plaster Crown Moulding",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1pR2146-O86aSIVHFhZBYw-BZKpW3tQxh/view",
    "thumbnailUrl": "/outreach-thumbs/1pR2146-O86aSIVHFhZBYw-BZKpW3tQxh.jpg"
  },
  {
    "id": "1eHonyIBkFbbbC3RfhfRXka1vBiOxP59v",
    "name": "Sample_Five-Board-Fan-Array-On-Floor.jpg",
    "title": "Sample \u2014 Five Board Fan Array On Floor",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1eHonyIBkFbbbC3RfhfRXka1vBiOxP59v/view",
    "thumbnailUrl": "/outreach-thumbs/1eHonyIBkFbbbC3RfhfRXka1vBiOxP59v.jpg"
  },
  {
    "id": "18YVee42nBObT3PTDI1108T1GrqbXwpdv",
    "name": "Sample_Hand-Held-Floral-Relief-Tile.jpg",
    "title": "Sample \u2014 Hand Held Floral Relief Tile",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/18YVee42nBObT3PTDI1108T1GrqbXwpdv/view",
    "thumbnailUrl": "/outreach-thumbs/18YVee42nBObT3PTDI1108T1GrqbXwpdv.jpg"
  },
  {
    "id": "1MvYde9kJSab_GhSNHVPY62jhffVeAViY",
    "name": "Sample_Hand-Held-Moroccan-And-Grey-Boards.jpg",
    "title": "Sample \u2014 Hand Held Moroccan And Grey Boards",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1MvYde9kJSab_GhSNHVPY62jhffVeAViY/view",
    "thumbnailUrl": "/outreach-thumbs/1MvYde9kJSab_GhSNHVPY62jhffVeAViY.jpg"
  },
  {
    "id": "1OlkXeCRR1dxixzOdWi22J9r91srBBdPR",
    "name": "Sample_Heavy-Raked-Plaster-Corner-Bead.jpg",
    "title": "Sample \u2014 Heavy Raked Plaster Corner Bead",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1OlkXeCRR1dxixzOdWi22J9r91srBBdPR/view",
    "thumbnailUrl": "/outreach-thumbs/1OlkXeCRR1dxixzOdWi22J9r91srBBdPR.jpg"
  },
  {
    "id": "1NksLVdzM8tYEqEuxtqe6xalm0mQeLP3S",
    "name": "Sample_Metallic-Aged-Copper-Bronze.jpg",
    "title": "Sample \u2014 Metallic Aged Copper Bronze",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1NksLVdzM8tYEqEuxtqe6xalm0mQeLP3S/view",
    "thumbnailUrl": "/outreach-thumbs/1NksLVdzM8tYEqEuxtqe6xalm0mQeLP3S.jpg"
  },
  {
    "id": "1jeYJSDMoOh3b5GTIOFGrSkXrfVV-lqP5",
    "name": "Sample_Slaked-Limewash-Cloud-Blue-Grey.jpg",
    "title": "Sample \u2014 Slaked Limewash Cloud Blue Grey",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1jeYJSDMoOh3b5GTIOFGrSkXrfVV-lqP5/view",
    "thumbnailUrl": "/outreach-thumbs/1jeYJSDMoOh3b5GTIOFGrSkXrfVV-lqP5.jpg"
  },
  {
    "id": "1k1cslfNxACU7xl4A90DTM3xeCheZTx59",
    "name": "Sample_Vertical-Raked-Linear-Stone-Board.jpg",
    "title": "Sample \u2014 Vertical Raked Linear Stone Board",
    "category": "samples",
    "categoryLabel": "Sample Boards & Textures",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1k1cslfNxACU7xl4A90DTM3xeCheZTx59/view",
    "thumbnailUrl": "/outreach-thumbs/1k1cslfNxACU7xl4A90DTM3xeCheZTx59.jpg"
  },
  {
    "id": "1SAwumoI3Qilwv-bfr3S069k-sjOpjrDQ",
    "name": "Artisan-Action_Hand-Troweling-Textured-Basecoat.jpg",
    "title": "Artisan Action \u2014 Hand Troweling Textured Basecoat",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1SAwumoI3Qilwv-bfr3S069k-sjOpjrDQ/view",
    "thumbnailUrl": "/outreach-thumbs/1SAwumoI3Qilwv-bfr3S069k-sjOpjrDQ.jpg"
  },
  {
    "id": "1oXzMDwjcnnmEIZztFk9oSxOlKm2aRrAq",
    "name": "Artisan-Tools_Venetian-Burnishing-Trowels-Flat-Lay.jpg",
    "title": "Artisan Tools \u2014 Venetian Burnishing Trowels Flat Lay",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1oXzMDwjcnnmEIZztFk9oSxOlKm2aRrAq/view",
    "thumbnailUrl": "/outreach-thumbs/1oXzMDwjcnnmEIZztFk9oSxOlKm2aRrAq.jpg"
  },
  {
    "id": "1SC0nXhxY77pDtq1TWyWo6JC-E8EAOj3L",
    "name": "Field-Work_Arched-Masonry-Fireplace-Framing.jpg",
    "title": "Field Work \u2014 Arched Masonry Fireplace Framing",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1SC0nXhxY77pDtq1TWyWo6JC-E8EAOj3L/view",
    "thumbnailUrl": "/outreach-thumbs/1SC0nXhxY77pDtq1TWyWo6JC-E8EAOj3L.jpg"
  },
  {
    "id": "1SRSDfzk3EccX_M1d1mSmrrCHOJ5OJltq",
    "name": "Field-Work_Artisan-Mirror-Selfie-On-Site.jpg",
    "title": "Field Work \u2014 Artisan Mirror Selfie On Site",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1SRSDfzk3EccX_M1d1mSmrrCHOJ5OJltq/view",
    "thumbnailUrl": "/outreach-thumbs/1SRSDfzk3EccX_M1d1mSmrrCHOJ5OJltq.jpg"
  },
  {
    "id": "18XtvxW7bSVGuostceKJDyZ-FaoLdW2x3",
    "name": "Field-Work_Black-Hood-Kitchen-Scaffolding-Install.jpg",
    "title": "Field Work \u2014 Black Hood Kitchen Scaffolding Install",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/18XtvxW7bSVGuostceKJDyZ-FaoLdW2x3/view",
    "thumbnailUrl": "/outreach-thumbs/18XtvxW7bSVGuostceKJDyZ-FaoLdW2x3.jpg"
  },
  {
    "id": "1iDKtBRiGz-gOsnZ7Fjv4jzr8ZJr1l4Ir",
    "name": "Field-Work_Corner-Touch-Before-Wax.jpg",
    "title": "Field Work \u2014 Corner Touch Before Wax",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1iDKtBRiGz-gOsnZ7Fjv4jzr8ZJr1l4Ir/view",
    "thumbnailUrl": "/outreach-thumbs/1iDKtBRiGz-gOsnZ7Fjv4jzr8ZJr1l4Ir.jpg"
  },
  {
    "id": "1e5YqDTqgCnWMGqdNxS7vMdvPWRxfMzMl",
    "name": "Field-Work_Great-Room-Scaffolding-Staging.jpg",
    "title": "Field Work \u2014 Great Room Scaffolding Staging",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1e5YqDTqgCnWMGqdNxS7vMdvPWRxfMzMl/view",
    "thumbnailUrl": "/outreach-thumbs/1e5YqDTqgCnWMGqdNxS7vMdvPWRxfMzMl.jpg"
  },
  {
    "id": "1BB0i-b0LkdmS9PnWJaEqeX4fKUX48xMU",
    "name": "Field-Work_Limewash-Cloud-Room-Application-Sprayers.jpg",
    "title": "Field Work \u2014 Limewash Cloud Room Application Sprayers",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1BB0i-b0LkdmS9PnWJaEqeX4fKUX48xMU/view",
    "thumbnailUrl": "/outreach-thumbs/1BB0i-b0LkdmS9PnWJaEqeX4fKUX48xMU.jpg"
  },
  {
    "id": "1GsEk73u7HyhlRwR3s8uEdXmeyzfvzYW2",
    "name": "Field-Work_Montana-Hallway-Scaffolding-In-Progress.jpg",
    "title": "Field Work \u2014 Montana Hallway Scaffolding In Progress",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1GsEk73u7HyhlRwR3s8uEdXmeyzfvzYW2/view",
    "thumbnailUrl": "/outreach-thumbs/1GsEk73u7HyhlRwR3s8uEdXmeyzfvzYW2.jpg"
  },
  {
    "id": "1SHIorAYqqsN8KOqYhwqClUAnf0K72Fyh",
    "name": "Field-Work_Raked-Plaster-Shelf-With-Toy-Car.jpg",
    "title": "Field Work \u2014 Raked Plaster Shelf With Toy Car",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1SHIorAYqqsN8KOqYhwqClUAnf0K72Fyh/view",
    "thumbnailUrl": "/outreach-thumbs/1SHIorAYqqsN8KOqYhwqClUAnf0K72Fyh.jpg"
  },
  {
    "id": "1-T6DOIFRM2PE5UJhYx7hGtBqamj63mP8",
    "name": "Field-Work_Two-Story-Great-Room-Fireplace-Scale.jpg",
    "title": "Field Work \u2014 Two Story Great Room Fireplace Scale",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1-T6DOIFRM2PE5UJhYx7hGtBqamj63mP8/view",
    "thumbnailUrl": "/outreach-thumbs/1-T6DOIFRM2PE5UJhYx7hGtBqamj63mP8.jpg"
  },
  {
    "id": "1WIDDJhLyl0vAE6bJRNMhUL2FQuDDN8Dx",
    "name": "Field-Work_White-Hood-Subway-Tile-Kitchen-Install.jpg",
    "title": "Field Work \u2014 White Hood Subway Tile Kitchen Install",
    "category": "fieldwork",
    "categoryLabel": "Field Work, Tools & Process",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1WIDDJhLyl0vAE6bJRNMhUL2FQuDDN8Dx/view",
    "thumbnailUrl": "/outreach-thumbs/1WIDDJhLyl0vAE6bJRNMhUL2FQuDDN8Dx.jpg"
  },
  {
    "id": "1iYVBBxGLa2Ma5Ql6a7gnpZTAJf7kCxH6",
    "name": "ASSET_1.png (1).jpg",
    "title": "ASSET \u2014 1.png (1)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1iYVBBxGLa2Ma5Ql6a7gnpZTAJf7kCxH6/view",
    "thumbnailUrl": "/outreach-thumbs/1iYVBBxGLa2Ma5Ql6a7gnpZTAJf7kCxH6.jpg"
  },
  {
    "id": "1jbri1gPa0wZ41yhuumUTpTLDmzAos2IG",
    "name": "ASSET_1.png (3).jpg",
    "title": "ASSET \u2014 1.png (3)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1jbri1gPa0wZ41yhuumUTpTLDmzAos2IG/view",
    "thumbnailUrl": "/outreach-thumbs/1jbri1gPa0wZ41yhuumUTpTLDmzAos2IG.jpg"
  },
  {
    "id": "1J_toOdp8EEOO51b0EeOn_y3PqGVh0Y2E",
    "name": "ASSET_1.png.jpg",
    "title": "ASSET \u2014 1.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1J_toOdp8EEOO51b0EeOn_y3PqGVh0Y2E/view",
    "thumbnailUrl": "/outreach-thumbs/1J_toOdp8EEOO51b0EeOn_y3PqGVh0Y2E.jpg"
  },
  {
    "id": "1-zvSdiiOR4mWndXfdNLXcE5477AQfksz",
    "name": "ASSET_2.png (2).jpg",
    "title": "ASSET \u2014 2.png (2)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1-zvSdiiOR4mWndXfdNLXcE5477AQfksz/view",
    "thumbnailUrl": "/outreach-thumbs/1-zvSdiiOR4mWndXfdNLXcE5477AQfksz.jpg"
  },
  {
    "id": "1FEknUBZL_2jeuIzCYrSgYsS6uq5cox_l",
    "name": "ASSET_3.png (1).jpg",
    "title": "ASSET \u2014 3.png (1)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1FEknUBZL_2jeuIzCYrSgYsS6uq5cox_l/view",
    "thumbnailUrl": "/outreach-thumbs/1FEknUBZL_2jeuIzCYrSgYsS6uq5cox_l.jpg"
  },
  {
    "id": "1rH_YxT2huIjJHTfmNQrcfwIfR2_EHVUt",
    "name": "ASSET_4.png (2).jpg",
    "title": "ASSET \u2014 4.png (2)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1rH_YxT2huIjJHTfmNQrcfwIfR2_EHVUt/view",
    "thumbnailUrl": "/outreach-thumbs/1rH_YxT2huIjJHTfmNQrcfwIfR2_EHVUt.jpg"
  },
  {
    "id": "1ped_icosJxAyi5-B5AeJo-oTyT-HbLGM",
    "name": "ASSET_5.png (3).jpg",
    "title": "ASSET \u2014 5.png (3)",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1ped_icosJxAyi5-B5AeJo-oTyT-HbLGM/view",
    "thumbnailUrl": "/outreach-thumbs/1ped_icosJxAyi5-B5AeJo-oTyT-HbLGM.jpg"
  },
  {
    "id": "1_W1uSZxAJMoYAw4JAcbIbzkzOqDSZKfa",
    "name": "image.png",
    "title": "image",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/png",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1_W1uSZxAJMoYAw4JAcbIbzkzOqDSZKfa/view",
    "thumbnailUrl": "/outreach-thumbs/1_W1uSZxAJMoYAw4JAcbIbzkzOqDSZKfa.jpg"
  },
  {
    "id": "1mirI_bUiEH8ygF65CYopuMfXdE2JL3uU",
    "name": "Lime_wash1.png.jpg",
    "title": "Lime \u2014 wash1.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1mirI_bUiEH8ygF65CYopuMfXdE2JL3uU/view",
    "thumbnailUrl": "/outreach-thumbs/1mirI_bUiEH8ygF65CYopuMfXdE2JL3uU.jpg"
  },
  {
    "id": "1QbmFCpXDZKvbJNdN0F7SD3RfslXcobnh",
    "name": "Lime_wash5.png.jpg",
    "title": "Lime \u2014 wash5.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1QbmFCpXDZKvbJNdN0F7SD3RfslXcobnh/view",
    "thumbnailUrl": "/outreach-thumbs/1QbmFCpXDZKvbJNdN0F7SD3RfslXcobnh.jpg"
  },
  {
    "id": "1TJL_8LfgP3m0Xh4d1D9czl8y3XHEc2xN",
    "name": "Lime_wash_2.png.jpg",
    "title": "Lime \u2014 wash \u2014 2.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1TJL_8LfgP3m0Xh4d1D9czl8y3XHEc2xN/view",
    "thumbnailUrl": "/outreach-thumbs/1TJL_8LfgP3m0Xh4d1D9czl8y3XHEc2xN.jpg"
  },
  {
    "id": "1kB8daXw-SJJmVl8rwTxCgm4ARgIHeU9Y",
    "name": "Lime_wash_3.png.jpg",
    "title": "Lime \u2014 wash \u2014 3.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1kB8daXw-SJJmVl8rwTxCgm4ARgIHeU9Y/view",
    "thumbnailUrl": "/outreach-thumbs/1kB8daXw-SJJmVl8rwTxCgm4ARgIHeU9Y.jpg"
  },
  {
    "id": "1XvlK-0FdRRd0KH9sKkuLV3gz0DSGxn2s",
    "name": "Lime_wash_4.png.jpg",
    "title": "Lime \u2014 wash \u2014 4.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1XvlK-0FdRRd0KH9sKkuLV3gz0DSGxn2s/view",
    "thumbnailUrl": "/outreach-thumbs/1XvlK-0FdRRd0KH9sKkuLV3gz0DSGxn2s.jpg"
  },
  {
    "id": "1Ov_8Ua8YHL-jJteoCLtvK8noEtW7RVtw",
    "name": "Lime_wash_6.png.jpg",
    "title": "Lime \u2014 wash \u2014 6.png",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1Ov_8Ua8YHL-jJteoCLtvK8noEtW7RVtw/view",
    "thumbnailUrl": "/outreach-thumbs/1Ov_8Ua8YHL-jJteoCLtvK8noEtW7RVtw.jpg"
  },
  {
    "id": "1tKmIoat8tKVB4eP1dYGNtv3VCQZZz8-w",
    "name": "micro-cement_info.jpeg",
    "title": "micro cement \u2014 info",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/jpeg",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1tKmIoat8tKVB4eP1dYGNtv3VCQZZz8-w/view",
    "thumbnailUrl": "/outreach-thumbs/1tKmIoat8tKVB4eP1dYGNtv3VCQZZz8-w.jpg"
  },
  {
    "id": "1AI9BaI_3aMo5gSvaENXDFq0X81_TTOHq",
    "name": "simple-and-clean-brand-board.png",
    "title": "simple and clean brand board",
    "category": "infographics",
    "categoryLabel": "Infographics & Spec Decks",
    "mimeType": "image/png",
    "isVideo": false,
    "driveUrl": "https://drive.google.com/file/d/1AI9BaI_3aMo5gSvaENXDFq0X81_TTOHq/view",
    "thumbnailUrl": "/outreach-thumbs/1AI9BaI_3aMo5gSvaENXDFq0X81_TTOHq.jpg"
  },
  {
    "id": "1eGp-Z8YFbR-lCPQscxTms6AU5G_cY9TY",
    "name": "Day2_Cut.mp4",
    "title": "Day2 \u2014 Cut",
    "category": "videos",
    "categoryLabel": "Video Clips",
    "mimeType": "video/mp4",
    "isVideo": true,
    "driveUrl": "https://drive.google.com/file/d/1eGp-Z8YFbR-lCPQscxTms6AU5G_cY9TY/view"
  },
  {
    "id": "1tDIHbakRCWpj0__myxt61qHsnhkqnofS",
    "name": "gemini_generated_video_7df42ff5.mp4",
    "title": "gemini \u2014 generated \u2014 video \u2014 7df42ff5",
    "category": "videos",
    "categoryLabel": "Video Clips",
    "mimeType": "video/mp4",
    "isVideo": true,
    "driveUrl": "https://drive.google.com/file/d/1tDIHbakRCWpj0__myxt61qHsnhkqnofS/view"
  }
];
