# The Club Multiple — Website v2.0

## Project Structure
```
the-club-multiple/
├── server.js              ← Node.js backend (email sending)
├── package.json
├── .env.example           ← Rename to .env and fill your values
├── public/
│   ├── index.html         ← Home page
│   ├── about.html         ← About Us + Trainers
│   ├── membership.html    ← Plans + Join Modal
│   ├── gallery.html       ← Photo & Video Gallery
│   ├── reviews.html       ← Member Reviews
│   ├── contact.html       ← Contact + Map
│   ├── 404.html           ← Page not found
│   ├── css/
│   │   └── style.css      ← All global styles
│   ├── js/
│   │   └── components.js  ← Shared nav, footer, utilities
│   ├── images/            ← Drop your gym photos here
│   └── videos/            ← Drop your gym videos here
```

---

## Setup Guide (Step by Step)

### Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (choose the LTS version)

### Step 2 — Open the project folder
Open a terminal / command prompt in the `the-club-multiple` folder.

### Step 3 — Install dependencies
```
npm install
```

### Step 4 — Set up environment variables
1. Find the file called `.env.example`
2. Rename it to `.env`
3. Open it and fill in your values:

```
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GYM_OWNER_EMAIL=gymowner@gmail.com
PORT=3000
```

**How to get your Gmail App Password:**
1. Go to your Google Account → Security
2. Make sure 2-Step Verification is ON
3. Search for "App Passwords" → click it
4. Select app: Mail → Select device: Other → type "TCM Website"
5. Click Generate → copy the 16-character password → paste it in .env

### Step 5 — Start the server
```
npm start
```
Or for development with auto-restart:
```
npm run dev
```

### Step 6 — Open the website
Go to http://localhost:3000 in your browser.

---

## Adding Photos to Gallery
1. Copy your gym photos (JPG/PNG) into `public/images/`
2. Open `public/gallery.html`
3. Find the placeholder divs that say "Your photo will appear here"
4. Replace them with:
```html
<div class="gallery-item" onclick="openLightbox('/images/your-photo.jpg', 'photo')">
  <img src="/images/your-photo.jpg" alt="Gym photo" />
</div>
```

## Adding Videos to Gallery
1. Copy your .mp4 files into `public/videos/`
2. In `gallery.html`, replace the video placeholder divs with:
```html
<div class="gallery-item" style="aspect-ratio:16/9;">
  <video src="/videos/your-video.mp4" controls style="width:100%;height:100%;object-fit:cover;"></video>
</div>
```
Or paste a YouTube embed iframe directly.

---

## Deploying to the Internet (Free)
Use **Railway.app** or **Render.com** — both support Node.js for free.

1. Push your project to GitHub
2. Connect Railway/Render to your GitHub repo
3. Set environment variables (GMAIL_USER, GMAIL_APP_PASSWORD, GYM_OWNER_EMAIL) in the platform dashboard
4. Deploy — your site will be live at a public URL!
