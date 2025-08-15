# 🧪 Mad Scientists Meme Generator

A pixel art meme generator featuring Mad Scientist templates with the signature green theme.

## 🚀 Quick Start

### Option 1: Using the Startup Script
```bash
./start-server.sh
```

### Option 2: Manual Server Start
```bash
python3 -m http.server 8000
```

Then open your browser and go to: **http://localhost:8000**

## 🎯 Features

- **6 Mad Scientist Templates** - Pixel art style with green theme
- **Real-time Text Editing** - Add top and bottom text
- **Full Customization** - Font, size, color, outline
- **Download Functionality** - Save as PNG
- **Responsive Design** - Works on desktop and mobile
- **Mad Scientists Theme** - Dark UI with neon green accents

## 📁 Template Collection

1. **Classic Mad Scientist** - Basic scientist with lab coat
2. **Toxic Scientist** - Scientist with dangerous chemicals
3. **Laboratory Scientist** - Scientist working in the lab
4. **Happy Scientist** - Excited scientist with discovery
5. **Coffee Loving Scientist** - Scientist in love with coffee
6. **Beaker Scientist** - Scientist with experimental beakers

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript
- **Canvas**: HTML5 Canvas for image manipulation
- **Images**: PNG format in `templates/` folder
- **Server**: Python HTTP server for local development

## 🚨 Important Notes

- **Must use HTTP server** - Cannot run directly from file system due to browser security
- **Local development only** - This is a client-side application
- **Image format**: All templates are PNG files
- **Browser compatibility**: Modern browsers with HTML5 Canvas support

## 🛠️ File Structure

```
cosmos/
├── index.html          # Main landing page
├── editor.html         # Meme editor page
├── styles.css          # Mad Scientists theme styling
├── script.js           # Landing page functionality
├── editor.js           # Meme editor functionality
├── start-server.sh     # Server startup script
├── templates/          # Meme template images
│   ├── mad-scientist-basic.png
│   ├── coffee-scientist.png
│   ├── lab-scientist.png
│   ├── happy-scientist.png
│   ├── toxic-scientist.png
│   └── beaker-scientist.png
└── README.md           # This file
```

## 🎨 Usage

1. **Start the server** using one of the methods above
2. **Open http://localhost:8000** in your browser
3. **Select a template** from the gallery
4. **Add your text** and customize styling
5. **Download your meme** as PNG

## 🧪 Made for Mad Scientists Community

This meme generator is themed for the Mad Scientists community with:
- Dark laboratory aesthetic
- Signature neon green (#00ff80) accents
- Pixel art scientist characters
- Scientific equipment and themes

Enjoy creating your Mad Scientist memes! 🧪⚗️ 