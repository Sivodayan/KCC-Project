export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; 

export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

export function validateImageFile(file) {
  if (!file) {
    throw new Error('No file provided.');
  }

  const mimeType = (file.type || '').toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
    throw new Error('Invalid image format. Supported formats: JPEG, PNG, WEBP, and GIF (SVGs are restricted for security).');
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`File size (${sizeMb} MB) exceeds the 5 MB maximum limit. Please choose an image under 5 MB.`);
  }

  return true;
}

export function processImageFile(file, options = {}) {
  const {
    compress = true,
    maxWidth = 1920,
    maxHeight = 1280,
    quality = 0.88
  } = options;

  return new Promise((resolve, reject) => {
    try {
      validateImageFile(file);
    } catch (err) {
      reject(err);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file from disk.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Corrupt or unsupported image format.'));
      img.onload = () => {
        let { width, height } = img;
        const originalWidth = width;
        const originalHeight = height;

        if (compress) {
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: e.target.result,
            originalSize: file.size,
            compressedSize: file.size,
            width: originalWidth,
            height: originalHeight,
            format: file.type,
            savedPercent: 0
          });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        let targetMime = compress ? 'image/webp' : file.type;
        let dataUrl = canvas.toDataURL(targetMime, compress ? quality : 0.95);

        if (compress && !dataUrl.startsWith('data:image/webp')) {
          targetMime = 'image/jpeg';
          dataUrl = canvas.toDataURL(targetMime, quality);
        }

        const base64Data = dataUrl.split(',')[1] || '';
        const compressedSize = Math.round((base64Data.length * 3) / 4);
        const savedPercent = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

        resolve({
          dataUrl,
          originalSize: file.size,
          compressedSize,
          width,
          height,
          format: targetMime,
          savedPercent
        });
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}
