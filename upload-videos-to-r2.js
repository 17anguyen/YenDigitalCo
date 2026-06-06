const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUCKET_NAME = 'yen-videos';
const VIDEOS_DIR = path.join(__dirname, 'public', 'videos');

console.log('📹 Uploading videos to Cloudflare R2...\n');

if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`❌ Videos directory not found: ${VIDEOS_DIR}`);
    process.exit(1);
}

const videoFiles = fs
    .readdirSync(VIDEOS_DIR)
    .filter(f => f.endsWith('.mp4'));

if (videoFiles.length === 0) {
    console.error(`❌ No .mp4 files found in ${VIDEOS_DIR}`);
    process.exit(1);
}

console.log(`Found ${videoFiles.length} video(s) to upload:\n`);
videoFiles.forEach(f => console.log(`  - ${f}`));
console.log();

let uploadedCount = 0;

videoFiles.forEach(file => {
    const filePath = path.join(VIDEOS_DIR, file);
    const fileSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);

    try {
        console.log(`⬆️  Uploading ${file} (${fileSize}MB)...`);

        execSync(
            `wrangler r2 object put ${BUCKET_NAME}/videos/${file} --file "${filePath}"`,
            { stdio: 'inherit' }
        );

        uploadedCount++;
        console.log(`✓ ${file} uploaded successfully\n`);
    } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error.message, '\n');
    }
});

console.log(`\n✅ Completed: ${uploadedCount}/${videoFiles.length} videos uploaded to R2`);
console.log(`\n📍 Access via: https://pub-28a37ca9f30345e7a8a22f258f719aa3.r2.dev/videos/`);
console.log('\n📋 Verify uploads at: https://dash.cloudflare.com/?to=/:account/r2/buckets/yen-videos');
