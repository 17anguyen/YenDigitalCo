#!/bin/bash
# Install Wrangler CLI (Cloudflare's tool)
npm install -g wrangler

# Configure Wrangler with your R2 credentials
# You'll be prompted for API token and account ID
wrangler r2 create yen-videos --jurisdiction eu

# Upload all videos
for file in public/videos/*.mp4; do
  echo "Uploading $file..."
  wrangler r2 object put yen-videos/videos/$(basename "$file") "$file"
done

echo "✓ All videos uploaded!"
