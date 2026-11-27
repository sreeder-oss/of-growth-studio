import { DRIVE_FOLDERS, type DriveMediaItem } from '../data/driveCatalog';

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (resp: { access_token?: string; error?: string }) => void;
          }) => { requestAccessToken: (opts?: { prompt?: string }) => void };
        };
      };
    };
  }
}

let gisScriptPromise: Promise<void> | null = null;

function loadGoogleIdentityScript(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (gisScriptPromise) return gisScriptPromise;

  gisScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services script.'));
    document.head.appendChild(script);
  });
  return gisScriptPromise;
}

export async function requestDriveAccessToken(clientId: string): Promise<string> {
  if (!clientId.trim()) {
    throw new Error('Add your Google OAuth Client ID in Settings first.');
  }
  await loadGoogleIdentityScript();
  if (!window.google?.accounts?.oauth2) {
    throw new Error('Google OAuth client did not initialize.');
  }

  return new Promise((resolve, reject) => {
    const tokenClient = window.google!.accounts!.oauth2!.initTokenClient({
      client_id: clientId.trim(),
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error || 'Google Drive sign-in was cancelled.'));
          return;
        }
        resolve(response.access_token);
      },
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
}

export async function fetchLiveDriveMedia(accessToken: string): Promise<DriveMediaItem[]> {
  const results: DriveMediaItem[] = [];

  for (const folder of DRIVE_FOLDERS) {
    const q = encodeURIComponent(`'${folder.folderId}' in parents and trashed = false`);
    const fields = encodeURIComponent('files(id,name,mimeType,thumbnailLink,webViewLink)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=100&orderBy=name`;

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!resp.ok) {
      if (resp.status === 401) {
        throw new Error('Google Drive session expired. Please reconnect in Settings.');
      }
      continue;
    }

    const data = (await resp.json()) as {
      files?: Array<{
        id: string;
        name: string;
        mimeType: string;
        thumbnailLink?: string;
        webViewLink?: string;
      }>;
    };

    for (const f of data.files || []) {
      const clean = f.name
        .replace(/\.[^.]+$/, '')
        .replace(/_/g, ' — ')
        .replace(/-/g, ' ');
      results.push({
        id: f.id,
        name: f.name,
        title: clean,
        category: folder.key,
        categoryLabel: folder.label,
        mimeType: f.mimeType,
        isVideo: f.mimeType.startsWith('video/'),
        driveUrl: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`,
        thumbnailUrl: f.thumbnailLink,
      });
    }
  }

  return results;
}

export async function fetchDriveImageAsDataUrl(
  fileId: string,
  accessToken: string
): Promise<string | null> {
  try {
    const resp = await fetch(
      `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Failed to read image blob'));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
