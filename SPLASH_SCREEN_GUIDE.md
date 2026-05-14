# 🎨 EcoConnect Splash Screen Guide

## Current Configuration

Your splash screen is now configured with:

- **Background Color**: #4CAF50 (Eco Green)
- **Dark Mode Background**: #2E7D32 (Darker Green)
- **Icon Size**: 250px width
- **Resize Mode**: contain

## 📐 Image Specifications

### Required Image

**File**: `assets/images/splash-icon.png`

**Specifications**:

- **Size**: 1024x1024 pixels (recommended)
- **Format**: PNG with transparent background
- **Content**: Logo/icon only (background color is set in config)
- **Safe Area**: Keep important content within 512x512px center

## 🎨 Design Recommendations

### Option 1: Simple Logo Design (Recommended)

Create a PNG image with:

```
┌─────────────────────────┐
│                         │
│                         │
│       🌍 or 🌱          │
│                         │
│     EcoConnect          │
│                         │
│                         │
└─────────────────────────┘
```

**Elements**:

- Earth icon or leaf icon (centered)
- "EcoConnect" text below
- White or light color (shows on green background)
- Transparent background

### Option 2: Icon Only

```
┌─────────────────────────┐
│                         │
│                         │
│          🌍             │
│        with             │
│      recycling          │
│       symbol            │
│                         │
└─────────────────────────┘
```

### Option 3: Text + Icon Combination

```
┌─────────────────────────┐
│                         │
│      ┌─────────┐        │
│      │  🌱 Eco │        │
│      │ Connect │        │
│      └─────────┘        │
│                         │
│   Sustainable Living    │
└─────────────────────────┘
```

## 🛠️ How to Create the Image

### Method 1: Using Canva (Easiest)

1. Go to [Canva.com](https://www.canva.com)
2. Create custom size: 1024x1024px
3. Set background to transparent
4. Add elements:
   - Earth/leaf icon from Canva library
   - "EcoConnect" text (white, bold font)
   - Center everything
5. Download as PNG with transparent background
6. Save to `assets/images/splash-icon.png`

### Method 2: Using Figma

1. Create 1024x1024px frame
2. Add your logo/icon
3. Add "EcoConnect" text
4. Export as PNG (transparent background)
5. Save to `assets/images/splash-icon.png`

### Method 3: Using Online Tools

**Recommended Sites**:

- [Photopea](https://www.photopea.com) - Free Photoshop alternative
- [Remove.bg](https://www.remove.bg) - Remove backgrounds
- [Flaticon](https://www.flaticon.com) - Free icons

### Method 4: Simple Text-Based (Quick Solution)

If you need something quick, I can help you create a simple text-based splash:

1. Use any image editor
2. Create 1024x1024px canvas
3. Transparent background
4. Add white text "EcoConnect" (centered, large font)
5. Add a simple icon (🌍 or 🌱)
6. Save as PNG

## 📱 Quick Test Design

Here's a simple design you can create in 5 minutes:

**Background**: Transparent
**Content**:

```
     ┌─────────┐
     │    🌍   │  ← Earth emoji or icon
     └─────────┘

   EcoConnect     ← White text, bold, 72pt

  Sustainable     ← White text, regular, 36pt
     Living
```

**Colors**:

- Text: White (#FFFFFF)
- Icon: White or light green
- Background: Transparent (green is in config)

## 🎨 Color Palette for Design

Use these colors from your app theme:

```
Primary Green:    #4CAF50
Light Green:      #81C784
Dark Green:       #2E7D32
White:            #FFFFFF
Light Blue:       #2196F3
```

## 📦 File Structure

```
assets/
└── images/
    ├── splash-icon.png     ← Your splash screen icon (1024x1024)
    ├── icon.png            ← App icon
    └── ...
```

## 🚀 After Creating the Image

1. **Save the image** as `splash-icon.png`
2. **Place it** in `assets/images/` folder
3. **Rebuild the app**:
   ```bash
   npm start -- --clear
   ```
4. **Test it**: Close and reopen the app

## 🎯 Design Tips

### Do's ✅

- Keep it simple and clean
- Use high contrast (white on green)
- Center your content
- Use transparent background
- Make it recognizable
- Test on real device

### Don'ts ❌

- Don't add too much detail
- Don't use small text
- Don't fill entire canvas
- Don't use low resolution
- Don't use complex gradients
- Don't forget transparent background

## 🖼️ Example Design Specs

### Minimalist Design

```
Canvas: 1024x1024px
Background: Transparent

Elements:
- Icon: 400x400px (centered)
- Text: "EcoConnect" (white, 80pt, bold)
- Spacing: 40px between icon and text
- Position: Vertically centered
```

### Professional Design

```
Canvas: 1024x1024px
Background: Transparent

Elements:
- Logo/Icon: 350x350px
- App Name: "EcoConnect" (white, 72pt, bold)
- Tagline: "Sustainable Living" (white, 32pt, light)
- Layout: Vertical stack, centered
- Padding: 100px from edges
```

## 🔧 Alternative: Use Existing Icon

If you already have an app icon, you can use it:

1. Copy your `icon.png`
2. Rename to `splash-icon.png`
3. Place in `assets/images/`
4. Done!

## 📱 Preview Your Splash Screen

After creating the image:

1. **Clear cache**:

   ```bash
   npm start -- --clear
   ```

2. **Rebuild**:

   ```bash
   npx expo prebuild --clean
   ```

3. **Test on device**:
   - Close the app completely
   - Reopen to see splash screen

## 🎨 Quick DIY Template

If you want to create it yourself quickly:

**Step 1**: Open any image editor
**Step 2**: Create 1024x1024px canvas
**Step 3**: Add this layout:

```
┌───────────────────────────┐
│                           │
│         (200px)           │
│                           │
│      ┌─────────┐          │
│      │    🌍   │          │ ← 300x300px icon
│      └─────────┘          │
│                           │
│         (50px)            │
│                           │
│     EcoConnect            │ ← 80pt, white, bold
│                           │
│         (20px)            │
│                           │
│  Sustainable Living       │ ← 36pt, white, regular
│                           │
│         (200px)           │
│                           │
└───────────────────────────┘
```

## 🌟 Professional Touch

For a more professional look:

1. **Add subtle shadow** to text
2. **Use custom font** (Google Fonts)
3. **Add small accent** (leaf icon)
4. **Keep it minimal** and clean

## 📝 Current Configuration Summary

```json
{
  "backgroundColor": "#4CAF50", // Eco green
  "imageWidth": 250, // Icon size
  "resizeMode": "contain", // Fit icon
  "dark": {
    "backgroundColor": "#2E7D32" // Dark green
  }
}
```

## 🎯 Final Checklist

Before submitting:

- [ ] Image is 1024x1024px
- [ ] Background is transparent
- [ ] Content is centered
- [ ] Text is readable
- [ ] Colors match app theme
- [ ] File is named `splash-icon.png`
- [ ] File is in `assets/images/`
- [ ] Tested on real device
- [ ] Looks good in light mode
- [ ] Looks good in dark mode

## 🚀 Need Help?

If you need a quick splash screen image, you can:

1. **Use a free tool**: Canva, Figma, Photopea
2. **Hire on Fiverr**: $5-20 for custom design
3. **Use AI**: DALL-E, Midjourney for icon generation
4. **Keep it simple**: Just text "EcoConnect" works fine!

---

**Remember**: A simple, clean splash screen is better than a complex one. Keep it minimal and professional! 🌍✨
