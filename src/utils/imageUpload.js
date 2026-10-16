/**
 * Client-Side Image Processing & Optimization Utility
 *
 * Reads image files from local PC, resizes them to optimal web dimensions,
 * and encodes them into compressed Base64 Data URLs so they persist seamlessly
 * in localStorage and render instantly in the 3D gallery coverflow.
 */

/**
 * Reads an image file from user's PC, resizes it if needed to optimal web dimensions,
 * and returns a promise resolving to a high-quality JPEG Data URL.
 *
 * @param {File} file - The uploaded image file from input[type="file"].
 * @param {number} [maxWidth=1400] - Maximum width for optimization.
 * @param {number} [maxHeight=1050] - Maximum height for optimization.
 * @param {number} [quality=0.85] - Compression quality (0.0 to 1.0).
 * @returns {Promise<string>} Base64 Data URL.
 */
export function processImageFile(file, maxWidth = 1400, maxHeight = 1050, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided.'));
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image (JPEG, PNG, WEBP, etc. required).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file from disk.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Corrupt or unsupported image format.'));
      img.onload = () => {
        let { width, height } = img;

        // Maintain aspect ratio while bounding within maxWidth x maxHeight
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data url if canvas context fails
          resolve(e.target.result);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}
