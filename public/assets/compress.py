import os
from PIL import Image

# Configuration
MAX_WIDTH = 1920        # Sharp on 1080p, 2K, and Retina screens without pixelating
QUALITY = 82            # Visual sweet-spot for web compression
OUTPUT_DIR = "optimized_gallery"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Loop through gal1.jpeg to gal10.jpeg
for i in range(1, 11):
    input_filename = f"gal_({i}).jpeg"
    
    # Check if the file exists (also checks alternative .jpg extension if needed)
    if not os.path.exists(input_filename):
        alt_name = f"gal_({i}).jpg"
        if os.path.exists(alt_name):
            input_filename = alt_name
        else:
            print(f"Skipping: {input_filename} not found.")
            continue

    with Image.open(input_filename) as img:
        # Convert color profiles to standard RGB
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Proportional resize: only downscale if image is wider than 1920px
        width, height = img.size
        if width > MAX_WIDTH:
            new_height = int((MAX_WIDTH / width) * height)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)

        # Output as modern, compressed WebP
        output_filename = os.path.join(OUTPUT_DIR, f"gal_({i}).webp")
        img.save(output_filename, "WEBP", quality=QUALITY, method=6)
        
        print(f"Optimized: {input_filename} -> {output_filename}")

print(f"\nCompleted! All compressed images are in the '{OUTPUT_DIR}' directory.")