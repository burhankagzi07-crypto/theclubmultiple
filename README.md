# The Club Multiple — Website v3.0

## What's New in v3.0
- ✅ Full mobile responsiveness (all pages fixed)
- ✅ MongoDB — every member saved to database automatically
- ✅ Razorpay — online payment (UPI, cards, net banking, wallets)
- ✅ New shield + flame logo (trendy, youth-oriented)
- ✅ Gym-themed background (dumbbell/barbell SVG pattern)
- ✅ Professional HTML emails — client + gym owner
- ✅ Instagram link in footer and emails

## Project Structure
```
the-club-multiple/
├── server.js              ← Node.js backend
├── package.json
├── .env.example           ← Rename to .env
├── public/
│   ├── index.html         ← Home
│   ├── about.html         ← About + Trainers
│   ├── membership.html    ← Plans + Razorpay
│   ├── gallery.html       ← Photo & Video Gallery
│   ├── reviews.html       ← Member Reviews
│   ├── contact.html       ← Contact + Map
│   ├── css/style.css      ← All styles
│   ├── js/components.js   ← Shared components
│   ├── images/            ← Add gym photos here
│   └── videos/            ← Add gym videos here
```

## Setup (Step by Step)

### 1. Install Node.js
Download LTS from https://nodejs.org

### 2. Install dependencies
```bash
npm install
```

### 3. Set up .env
Rename `.env.example` → `.env` and fill in all values:

```
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx    ← Gmail App Password
GYM_OWNER_EMAIL=gymowner@gmail.com
MONGODB_URI=mongodb+srv://...             ← from MongoDB Atlas
RAZORPAY_KEY_ID=rzp_live_...              ← from Razorpay dashboard
RAZORPAY_KEY_SECRET=...
INSTAGRAM_HANDLE=theclubmultiple
PORT=3000
```

### 4. Gmail App Password
1. Google Account → Security → 2-Step Verification → ON
2. Search "App Passwords" → Mail → Other → "TCM Website"
3. Copy the 16-char password into .env

### 5. MongoDB Atlas (free)
1. Go to mongodb.com/atlas → Create free account
2. Create a free cluster → Connect → Drivers → Node.js
3. Copy the connection string into MONGODB_URI in .env

### 6. Razorpay
1. Go to razorpay.com → Sign up (use test mode first)
2. Dashboard → Settings → API Keys → Generate
3. Copy Key ID and Key Secret into .env
4. For TEST mode, use: rzp_test_XXXXXXXXXX (no real money)
5. For LIVE mode, activate your Razorpay account

### 7. Instagram
Replace `theclubmultiple` in .env with the gym's actual Instagram handle (without @).

### 8. Run the server
```bash
npm start
```
Open http://localhost:3000

## Adding Photos & Videos
- Photos → drop .jpg/.png files into `public/images/`
- Videos → drop .mp4 files into `public/videos/`
- Then replace placeholder divs in gallery.html (instructions inside the file)

## Deploy to the Internet (Free)
1. Push to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Set all .env variables in Railway dashboard
4. Your site is live! 🚀

## API Endpoints
- POST /api/create-order       → Create Razorpay order
- POST /api/confirm-payment    → Verify payment + save member + send emails
- POST /api/send-confirmation  → UPI/Walk-in path (save + send emails)
- GET  /api/members            → List all members (admin)
