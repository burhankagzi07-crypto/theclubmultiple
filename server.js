require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Nodemailer transporter using Gmail ──────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Helper: build beautiful HTML email for client ───────────
function buildClientEmail(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Membership Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#111111;border:1px solid rgba(255,69,0,0.2);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#FF4500,#FF8C00);padding:40px 40px 30px;text-align:center;">
      <div style="display:inline-block;background:rgba(0,0,0,0.3);border-radius:12px;padding:12px 20px;margin-bottom:16px;">
        <span style="color:#fff;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-weight:700;">THE CLUB MULTIPLE</span>
      </div>
      <h1 style="color:#fff;font-size:32px;font-weight:900;margin:0;letter-spacing:-0.5px;">YOU'RE OFFICIALLY IN!</h1>
      <p style="color:rgba(255,255,255,0.85);font-size:15px;margin:10px 0 0;">Membership confirmed. Let's get to work.</p>
    </div>

    <!-- Greeting -->
    <div style="padding:32px 40px 0;">
      <p style="color:#f0f0f0;font-size:16px;line-height:1.7;margin:0;">
        Hey <strong style="color:#FF6B35;">${data.name}</strong>, welcome to The Club Multiple family! 🔥<br>
        Your membership has been confirmed. Here's everything you need to know.
      </p>
    </div>

    <!-- Membership Card -->
    <div style="margin:28px 40px;background:rgba(255,69,0,0.07);border:1px solid rgba(255,69,0,0.25);border-radius:12px;overflow:hidden;">
      <div style="background:rgba(255,69,0,0.15);padding:14px 24px;">
        <span style="color:#FF6B35;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Membership Details</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);width:40%;">Plan</td>
          <td style="padding:14px 24px;color:#FF6B35;font-size:14px;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.05);">${data.planName}</td>
        </tr>
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Amount Paid</td>
          <td style="padding:14px 24px;color:#fff;font-size:14px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${data.amount}</td>
        </tr>
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Payment Mode</td>
          <td style="padding:14px 24px;color:#fff;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.05);">${data.paymentMode}</td>
        </tr>
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Your Goal</td>
          <td style="padding:14px 24px;color:#fff;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.05);">${data.goal}</td>
        </tr>
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Starts On</td>
          <td style="padding:14px 24px;color:#4ade80;font-size:14px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${data.startDate}</td>
        </tr>
        <tr>
          <td style="padding:14px 24px;color:rgba(255,255,255,0.5);font-size:13px;">Expires On</td>
          <td style="padding:14px 24px;color:#FF6B35;font-size:14px;font-weight:700;">${data.endDate}</td>
        </tr>
      </table>
    </div>

    <!-- Visit Info -->
    <div style="margin:0 40px 28px;background:rgba(255,255,255,0.03);border-radius:12px;padding:20px 24px;">
      <p style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;">Find Us</p>
      <p style="color:#f0f0f0;font-size:14px;line-height:1.7;margin:0;">
        32-33, Sector-D, Hasanji Nagar, Silicon Indore, Rau — 453331<br>
        <span style="color:rgba(255,255,255,0.5);">Near Emerald Heights School</span>
      </p>
      <p style="color:#FF6B35;font-size:13px;margin:10px 0 0;">Mon–Sat: 6:00 AM – 10:00 PM &nbsp;|&nbsp; Sunday: 8:00 AM – 2:00 PM</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:0 40px 40px;">
      <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;margin:0 0 20px;">
        Have questions? Just reply to this email or visit us at the gym.<br>We're here to help you crush your goals. 💪
      </p>
      <div style="display:inline-block;background:linear-gradient(135deg,#FF4500,#FF8C00);padding:14px 32px;border-radius:8px;">
        <span style="color:#fff;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">See You At The Gym!</span>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:rgba(0,0,0,0.4);padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">© 2025 The Club Multiple, Silicon Indore. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

// ── Helper: build notification email for gym owner ───────────
function buildOwnerEmail(data) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:#FF4500;padding:20px 28px;">
      <h2 style="color:#fff;margin:0;font-size:18px;">New Member Signup! 🎉</h2>
      <p style="color:rgba(255,255,255,0.85);font-size:13px;margin:4px 0 0;">The Club Multiple</p>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#666;width:35%;border-bottom:1px solid #f0f0f0;">Name</td><td style="padding:8px 0;font-weight:700;border-bottom:1px solid #f0f0f0;">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${data.email}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${data.phone}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Plan</td><td style="padding:8px 0;color:#FF4500;font-weight:700;border-bottom:1px solid #f0f0f0;">${data.planName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Amount</td><td style="padding:8px 0;font-weight:700;border-bottom:1px solid #f0f0f0;">${data.amount}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Payment</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${data.paymentMode}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Goal</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${data.goal}</td></tr>
        <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #f0f0f0;">Starts</td><td style="padding:8px 0;color:green;font-weight:600;border-bottom:1px solid #f0f0f0;">${data.startDate}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Expires</td><td style="padding:8px 0;color:#FF4500;font-weight:600;">${data.endDate}</td></tr>
      </table>
    </div>
    <div style="background:#f9f9f9;padding:16px 28px;font-size:12px;color:#999;text-align:center;">
      Sent automatically from The Club Multiple website
    </div>
  </div>
</body>
</html>`;
}

// ── POST /api/send-confirmation ──────────────────────────────
app.post('/api/send-confirmation', async (req, res) => {
  const data = req.body;

  if (!data.name || !data.email || !data.planName) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Email to CLIENT
    await transporter.sendMail({
      from: `"The Club Multiple" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `Welcome to The Club Multiple — ${data.planName} Confirmed! 💪`,
      html: buildClientEmail(data),
    });

    // Email to GYM OWNER
    await transporter.sendMail({
      from: `"TCM Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GYM_OWNER_EMAIL,
      subject: `New Member: ${data.name} — ${data.planName}`,
      html: buildOwnerEmail(data),
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Serve pages ──────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', '404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ The Club Multiple running at http://localhost:${PORT}`));
