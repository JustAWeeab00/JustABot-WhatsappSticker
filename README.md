Here's a cool and structured `README.md` for your **JustABot-WhatsappSticker** project:

---

# 📱 JustABot-WhatsappSticker

**JustABot-WhatsappSticker** is a simple tool that converts PNG, JPG, and MP4 media into static or animated stickers for WhatsApp, leveraging `whatsapp-web.js` for message interaction.

## 🚀 Features

- 🖼️ Convert **PNG/JPG** images to static WhatsApp stickers.
- 🎥 Convert **MP4** videos to animated WhatsApp stickers.
- 💬 Integration with WhatsApp through `whatsapp-web.js`.

## 🛠️ Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (>=14.x)
- **npm** or **yarn**
- **ffmpeg** (for handling media conversion)

### NPM Packages:

- [`whatsapp-web.js`](https://www.npmjs.com/package/whatsapp-web.js) - WhatsApp API for JavaScript.
- [`sharp`](https://www.npmjs.com/package/sharp) - High-performance image manipulation.
- [`fluent-ffmpeg`](https://www.npmjs.com/package/fluent-ffmpeg) - Media processing tool (required for video to sticker conversion).
- [`fs`](https://nodejs.org/api/fs.html) - Node.js file system module.
- [`axios`](https://www.npmjs.com/package/axios) - Promise-based HTTP client for Node.js.

## 📦 Installation

First, clone the repository and install the required dependencies:

```bash
# Clone this repository
git clone https://github.com/YourUsername/JustABot-WhatsappSticker.git

# Navigate to the project directory
cd JustABot-WhatsappSticker

# Install dependencies
npm install
```

Ensure you have **ffmpeg** installed:

```bash
# Install ffmpeg (Linux)
sudo apt-get install ffmpeg

# Install ffmpeg (MacOS)
brew install ffmpeg

# Install ffmpeg (Windows)
choco install ffmpeg
```

## 🔧 Usage

Once you have everything installed, you're ready to start converting media into WhatsApp stickers!

### 1. Start the Bot

```bash
node bot.js
```

This will start the bot, which connects to WhatsApp Web and listens for incoming messages.

### 2. Convert PNG/JPG to Static Sticker

To convert an image (PNG/JPG) to a sticker, simply send the image in WhatsApp, and the bot will automatically convert it into a static sticker.

```js
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
```

### 3. Convert MP4 to Animated Sticker

To convert an MP4 video into an animated sticker, send the video to the bot:

```js
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
```

## 🛠️ Customization

You can further customize the behavior by tweaking the conversion settings, such as:

- Image sticker size and resolution
- Video sticker length and compression

Simply adjust the settings in `sharp` and `ffmpeg` as per your needs.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any issues, suggestions, or feature requests, feel free to reach out or submit an issue on GitHub.

------------------    -------    ---------
