<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JustABot-WhatsappSticker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        h2 {
            color: #34495e;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        p {
            line-height: 1.6;
        }
        code {
            background-color: #ecf0f1;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: "Courier New", Courier, monospace;
        }
        pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .feature-list {
            list-style-type: none;
            padding: 0;
        }
        .feature-list li {
            background-color: #e7f3fe;
            padding: 10px;
            margin: 10px 0;
            border-left: 4px solid #3498db;
        }
        .commands {
            background-color: #1abc9c;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #777;
        }
        footer a {
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📱 JustABot-WhatsappSticker</h1>

        <p><strong>JustABot-WhatsappSticker</strong> is a simple tool that converts PNG, JPG, and MP4 media into static or animated stickers for WhatsApp, leveraging <code>whatsapp-web.js</code> for message interaction.</p>

        <h2>🚀 Features</h2>
        <ul class="feature-list">
            <li>🖼️ Convert <strong>PNG/JPG</strong> images to static WhatsApp stickers.</li>
            <li>🎥 Convert <strong>MP4</strong> videos to animated WhatsApp stickers.</li>
            <li>💬 Integration with WhatsApp through <code>whatsapp-web.js</code>.</li>
        </ul>

        <h2>🛠️ Requirements</h2>
        <p>Before you begin, ensure you have the following installed:</p>
        <ul class="feature-list">
            <li><strong>Node.js</strong> (>=14.x)</li>
            <li><strong>npm</strong> or <strong>yarn</strong></li>
            <li><strong>ffmpeg</strong> (for handling media conversion)</li>
        </ul>

        <h3>NPM Packages:</h3>
        <ul>
            <li><a href="https://www.npmjs.com/package/whatsapp-web.js" target="_blank">whatsapp-web.js</a> - WhatsApp API for JavaScript.</li>
            <li><a href="https://www.npmjs.com/package/sharp" target="_blank">sharp</a> - High-performance image manipulation.</li>
            <li><a href="https://www.npmjs.com/package/fluent-ffmpeg" target="_blank">fluent-ffmpeg</a> - Media processing tool (required for video to sticker conversion).</li>
            <li><a href="https://nodejs.org/api/fs.html" target="_blank">fs</a> - Node.js file system module.</li>
            <li><a href="https://www.npmjs.com/package/axios" target="_blank">axios</a> - Promise-based HTTP client for Node.js.</li>
        </ul>

        <h2>📦 Installation</h2>
        <p>First, clone the repository and install the required dependencies:</p>
        <pre><code>
# Clone this repository
git clone https://github.com/YourUsername/JustABot-WhatsappSticker.git

# Navigate to the project directory
cd JustABot-WhatsappSticker

# Install dependencies
npm install
        </code></pre>

        <p>Ensure you have <strong>ffmpeg</strong> installed:</p>
        <pre><code>
# Install ffmpeg (Linux)
sudo apt-get install ffmpeg

# Install ffmpeg (MacOS)
brew install ffmpeg

# Install ffmpeg (Windows)
choco install ffmpeg
        </code></pre>

        <h2>🔧 Usage</h2>
        <p>Once you have everything installed, you're ready to start converting media into WhatsApp stickers!</p>

        <h3>1. Start the Bot</h3>
        <pre><code>node bot.js</code></pre>
        <p>This will start the bot, which connects to WhatsApp Web and listens for incoming messages.</p>

        <h3>2. Convert PNG/JPG to Static Sticker</h3>
        <p>To convert an image (PNG/JPG) to a sticker, simply send the image in WhatsApp, and the bot will automatically convert it into a static sticker.</p>
        <pre><code>
// Example for image to sticker
client.on('message', async (message) => {
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        if (media.mimetype.includes('image')) {
            // Convert image to sticker
            const sticker = await createStickerFromImage(media);
            message.reply(sticker);
        }
    }
});
        </code></pre>

        <h3>3. Convert MP4 to Animated Sticker</h3>
        <p>To convert an MP4 video into an animated sticker, send the video to the bot:</p>
        <pre><code>
// Example for video to animated sticker
client.on('message', async (message) => {
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        if (media.mimetype.includes('video')) {
            // Convert video to animated sticker
            const sticker = await createStickerFromVideo(media);
            message.reply(sticker);
        }
    }
});
        </code></pre>

        <h2>🛠️ Customization</h2>
        <p>You can further customize the behavior by tweaking the conversion settings, such as:</p>
        <ul>
            <li>Image sticker size and resolution</li>
            <li>Video sticker length and compression</li>
        </ul>
        <p>Simply adjust the settings in <code>sharp</code> and <code>ffmpeg</code> as per your needs.</p>

        <h2>📝 License</h2>
        <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

        <h2>📞 Contact</h2>
        <p>For any issues, suggestions, or feature requests, feel free to reach out or submit an issue on GitHub.</p>
    </div>

    <footer>
        &copy; 2024 JustABot-WhatsappSticker | Built with 💙 by <a href="https://github.com/YourUsername">YourUsername</a>
    </footer>
</body>
</html>
