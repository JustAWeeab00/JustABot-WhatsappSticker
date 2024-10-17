const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const sharp = require('sharp'); // For image processing
const ffmpeg = require('fluent-ffmpeg'); // For video/GIF processing
const fs = require('fs'); // For handling file system
const axios = require('axios'); // For IP location fetching

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox'],
        timeout: 60000,
    }
});

// Command prefix and cooldown settings
const prefix = "!";
const lastCommandTime = new Map();
const cooldown = 5000; // 5 seconds

// Helper function to check cooldown
function isOnCooldown(msg) {
    const currentTime = Date.now();
    const lastTime = lastCommandTime.get(msg.from) || 0;
    if (currentTime - lastTime < cooldown) {
        const remainingTime = ((cooldown - (currentTime - lastTime)) / 1000).toFixed(1);
        client.sendMessage(msg.from, `Please wait ${remainingTime} more seconds before sending another command.`);
        return true;
    }
    lastCommandTime.set(msg.from, currentTime);
    return false;
}

// Helper function to download and process media
async function downloadMedia(msg) {
    let mediaMsg = msg;
    if (!msg.hasMedia && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            mediaMsg = quotedMsg;
        }
    }
    if (mediaMsg.hasMedia) {
        const mediaData = await mediaMsg.downloadMedia();
        if (!mediaData) {
            await client.sendMessage(msg.from, "Failed to download media.");
            return null;
        }
        return mediaData;
    }
    await client.sendMessage(msg.from, "No media found in the message.");
    return null;
}

// Process image for sticker creation
async function processImageSticker(mediaData, textToOverlay, msg) {
    const imgBuffer = Buffer.from(mediaData.data, 'base64');
    const processedImgPath = `./temp/processed-sticker.png`;

    await sharp(imgBuffer)
        .resize(512, 512)
        .composite([{
            input: Buffer.from(`
                <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="50%" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">${textToOverlay}</text>
                </svg>
            `),
            top: 0,
            left: 0
        }])
        .png()
        .toFile(processedImgPath);

    const processedMedia = MessageMedia.fromFilePath(processedImgPath);
    await client.sendMessage(msg.from, processedMedia, { sendMediaAsSticker: true });
    fs.unlinkSync(processedImgPath);
}

// Process video for sticker creation
function processVideoSticker(mediaData, msg) {
    const videoBuffer = Buffer.from(mediaData.data, 'base64');
    const inputVideoPath = './temp/input.mp4';
    const outputStickerPath = './temp/output-sticker.webp';

    // Write video buffer to input path
    fs.writeFileSync(inputVideoPath, videoBuffer);

    // Start FFmpeg conversion
    ffmpeg(inputVideoPath)
        .outputOptions([
            '-vcodec', 'libwebp',
            '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white',
            '-lossless', '1',
            '-loop', '0',
            '-ss', '0',
            '-t', '6', // Limit to 6 seconds
            '-preset', 'default',
            '-an',
            '-vsync', '0'
        ])
        .save(outputStickerPath)
        .on('end', async () => {
            console.log('FFmpeg: Video conversion completed.');

            // Check if file exists before sending
            if (fs.existsSync(outputStickerPath)) {
                const stickerMedia = MessageMedia.fromFilePath(outputStickerPath);
                try {
                    await client.sendMessage(msg.from, stickerMedia, { sendMediaAsSticker: true });
                    console.log('Sticker sent successfully!');
                } catch (sendError) {
                    console.error('Error sending sticker:', sendError);
                }

                // Cleanup
                fs.unlinkSync(inputVideoPath);
                fs.unlinkSync(outputStickerPath);
            } else {
                console.error('Output file not found after FFmpeg conversion.');
                await client.sendMessage(msg.from, "Error: Sticker conversion failed.");
            }
        })
        .on('error', async (err) => {
            console.error('FFmpeg error during video conversion:', err);
            await client.sendMessage(msg.from, "Failed to process video.");
        });
}

// Handle commands
client.on('message', async msg => {
    if (msg.body.startsWith(prefix)) {
        if (isOnCooldown(msg)) return;

        const [cmd, ...args] = msg.body.slice(1).split(" ");
        const textToOverlay = args.join(" ");

        switch (cmd) {
            case "s": // Sticker command for images and videos
                try {
                    const mediaData = await downloadMedia(msg);
                    if (!mediaData) return;

                    if (mediaData.mimetype === 'image/webp') {
                        await client.sendMessage(msg.from, mediaData, { sendMediaAsSticker: true });
                    } else if (mediaData.mimetype === 'video/mp4') {
                        processVideoSticker(mediaData, msg);
                    } else if (mediaData.mimetype === 'image/jpeg' || mediaData.mimetype === 'image/png') {
                        await processImageSticker(mediaData, textToOverlay, msg);
                    } else {
                        await client.sendMessage(msg.from, "Unsupported media format. Please send an image (PNG, JPG) or a video (MP4).");
                    }
                } catch (error) {
                    console.error('Error processing media:', error);
                    await client.sendMessage(msg.from, "Failed to process media.");
                }
                break;

            case "s2": // Sticker command for GIFs and short videos
                try {
                    const mediaData = await downloadMedia(msg);
                    if (!mediaData) return;

                    if (mediaData.mimetype === 'image/gif' || mediaData.mimetype === 'video/mp4') {
                        processVideoSticker(mediaData, msg);
                    } else {
                        await client.sendMessage(msg.from, "Please send a GIF or video to convert into an animated sticker.");
                    }
                } catch (error) {
                    console.error('Error processing media:', error);
                    await client.sendMessage(msg.from, "Failed to process media.");
                }
                break;

            default:
                try {
                    const { data } = await axios.get('https://ipapi.co/json/');
                    const statusMessage = `Status: Online Oji-san\nLocation: ${data.city}, ${data.region}, ${data.country_name}\nIP: ${data.ip}\nTime: ${new Date().toLocaleString()}`;
                    await client.sendMessage(msg.from, statusMessage);
                } catch (error) {
                    console.error('Error fetching IP location or time:', error);
                    await client.sendMessage(msg.from, "Failed to retrieve status information.");
                }
                break;
        }
    }
});

client.initialize();
