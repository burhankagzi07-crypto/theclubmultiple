require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');
const mongoose   = require('mongoose');
const Razorpay   = require('razorpay');
const crypto     = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB ──────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(e  => console.warn('⚠️  MongoDB:', e.message));

const memberSchema = new mongoose.Schema({
  membershipId:  { type: String, unique: true },
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, required: true },
  goal:          String,
  planName:      String,
  planKey:       String,
  amount:        String,
  amountPaise:   Number,
  paymentMode:   String,
  paymentId:     { type: String, default: null },
  orderId:       { type: String, default: null },
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  startDate:     { type: Date, default: Date.now },
  endDate:       Date,
  active:        { type: Boolean, default: true },
  joinedAt:      { type: Date, default: Date.now },
});
const Member = mongoose.model('Member', memberSchema);

async function genMembershipId() {
  const n = await Member.countDocuments();
  return `TCM-${new Date().getFullYear()}-${String(n + 1).padStart(5,'0')}`;
}

// ─── Razorpay ─────────────────────────────────────────────────
let rzp;
try {
  rzp = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('✅ Razorpay ready');
} catch(e) { console.warn('⚠️  Razorpay not initialised'); }

// ─── Nodemailer ───────────────────────────────────────────────
const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

const IG = () => process.env.INSTAGRAM_HANDLE || 'theclubmultiple';
const fmt = d => new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});

// ─── Client confirmation email HTML ──────────────────────────
function clientEmail(d) {
return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

<tr><td style="background:linear-gradient(135deg,#FF4500,#FF8C00);border-radius:14px 14px 0 0;padding:36px 36px 28px;text-align:center;">
  <p style="color:rgba(255,255,255,0.7);font-size:10px;letter-spacing:5px;text-transform:uppercase;margin:0 0 14px;">THE CLUB MULTIPLE · SILICON INDORE</p>
  <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px;">Membership Confirmed! 🔥</h1>
  <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">Welcome to the family. Your journey starts today.</p>
</td></tr>

<tr><td style="background:#161616;padding:28px 36px 20px;">
  <p style="color:#e8e8e8;font-size:15px;line-height:1.75;margin:0;">
    Hey <strong style="color:#FF6B35;">${d.name}</strong> 👋<br><br>
    Your membership at <strong>The Club Multiple</strong> is <strong style="color:#4ade80;">officially active</strong>.
    Your Membership ID is <strong style="color:#FF6B35;font-size:16px;">${d.membershipId}</strong>.
    Please save this email — it's your membership proof.
  </p>
</td></tr>

<tr><td style="background:#161616;padding:0 36px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1c1c1c;border:1px solid rgba(255,69,0,0.22);border-radius:10px;overflow:hidden;">
  <tr><td colspan="2" style="background:rgba(255,69,0,0.1);padding:12px 20px;border-bottom:1px solid rgba(255,69,0,0.12);">
    <strong style="color:#FF6B35;font-size:10px;letter-spacing:3px;text-transform:uppercase;">Membership Card</strong>
  </td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);width:40%;">Membership ID</td><td style="padding:11px 20px;color:#FF6B35;font-size:12px;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.04);">${d.membershipId}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Member</td><td style="padding:11px 20px;color:#fff;font-size:12px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.04);">${d.name}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Phone</td><td style="padding:11px 20px;color:#fff;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">${d.phone}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Plan</td><td style="padding:11px 20px;color:#FF6B35;font-size:12px;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.04);">${d.planName}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Amount Paid</td><td style="padding:11px 20px;color:#fff;font-size:12px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.04);">${d.amount}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Payment</td><td style="padding:11px 20px;color:#fff;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">${d.paymentMode}${d.paymentId?` · <span style="font-size:10px;color:rgba(255,255,255,0.3);">${d.paymentId}</span>`:''}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Fitness Goal</td><td style="padding:11px 20px;color:#fff;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">${d.goal}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);">Valid From</td><td style="padding:11px 20px;color:#4ade80;font-size:12px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.04);">${d.startDate}</td></tr>
  <tr><td style="padding:11px 20px;color:rgba(255,255,255,0.4);font-size:12px;">Valid Until</td><td style="padding:11px 20px;color:#FF6B35;font-size:14px;font-weight:800;">${d.endDate}</td></tr>
</table>
</td></tr>

<tr><td style="background:#161616;padding:0 36px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;padding:18px 20px;border:1px solid rgba(255,255,255,0.05);">
  <tr><td style="padding-bottom:10px;"><strong style="color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:3px;text-transform:uppercase;">Your First Visit Checklist</strong></td></tr>
  <tr><td style="color:#e0e0e0;font-size:13px;line-height:2;">
    ✅ &nbsp;Show this email at reception on arrival<br>
    ✅ &nbsp;Carry a government-issued photo ID<br>
    ✅ &nbsp;Your trainer will meet you at the gym floor<br>
    ✅ &nbsp;Locker assigned at the front desk<br>
    ✅ &nbsp;Comfortable workout clothes &amp; water bottle
  </td></tr>
</table>
</td></tr>

<tr><td style="background:#161616;padding:0 36px 30px;border-bottom:1px solid rgba(255,255,255,0.06);">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="50%" valign="top" style="padding-right:10px;">
      <p style="color:rgba(255,255,255,0.3);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Location</p>
      <p style="color:#e0e0e0;font-size:13px;line-height:1.75;margin:0;">32-33, Sector-D, Hasanji Nagar<br>Silicon Indore, Rau — 453331<br><span style="color:rgba(255,255,255,0.4);">Near Emerald Heights School</span></p>
    </td>
    <td width="50%" valign="top" style="padding-left:10px;">
      <p style="color:rgba(255,255,255,0.3);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Hours & Social</p>
      <p style="color:#e0e0e0;font-size:13px;line-height:1.75;margin:0;">Mon–Sat: 6:00 AM – 10:00 PM<br>Sunday: 8:00 AM – 2:00 PM<br><a href="https://instagram.com/${IG()}" style="color:#FF6B35;text-decoration:none;">@${IG()}</a></p>
    </td>
  </tr>
</table>
</td></tr>

<tr><td style="background:#111;border-radius:0 0 14px 14px;padding:18px 36px;text-align:center;">
  <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">© 2025 The Club Multiple, Silicon Indore. All rights reserved.</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// ─── Owner notification email HTML ───────────────────────────
function ownerEmail(d) {
return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;background:#f0f0f0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
<tr><td style="background:#FF4500;border-radius:10px 10px 0 0;padding:20px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr>
    <td><p style="color:rgba(255,255,255,0.75);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 4px;">The Club Multiple</p>
    <h2 style="color:#fff;font-size:18px;font-weight:700;margin:0;">🎉 New Member Signup!</h2></td>
    <td align="right"><div style="background:rgba(0,0,0,0.2);border-radius:6px;padding:8px 12px;">
      <p style="color:rgba(255,255,255,0.6);font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 2px;">Member ID</p>
      <p style="color:#fff;font-size:13px;font-weight:700;margin:0;">${d.membershipId}</p>
    </div></td>
  </tr></table>
</td></tr>
<tr><td style="background:#fff;padding:22px 24px 0;">
  <p style="color:#555;font-size:13px;line-height:1.7;margin:0 0 18px;">A new member just signed up via the website. Member has been sent their confirmation email automatically.</p>
</td></tr>
<tr><td style="background:#fff;padding:0 24px 22px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eaeaea;border-radius:7px;overflow:hidden;font-size:13px;">
  <tr style="background:#fafafa;"><td colspan="2" style="padding:10px 16px;border-bottom:1px solid #eee;"><strong style="color:#FF4500;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Member Info</strong></td></tr>
  <tr><td style="padding:9px 16px;color:#888;width:36%;border-bottom:1px solid #f5f5f5;">Name</td><td style="padding:9px 16px;font-weight:600;color:#111;border-bottom:1px solid #f5f5f5;">${d.name}</td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Email</td><td style="padding:9px 16px;border-bottom:1px solid #f5f5f5;"><a href="mailto:${d.email}" style="color:#FF4500;">${d.email}</a></td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Phone</td><td style="padding:9px 16px;border-bottom:1px solid #f5f5f5;"><a href="tel:${d.phone}" style="color:#FF4500;">${d.phone}</a></td></tr>
  <tr><td style="padding:9px 16px;color:#888;">Goal</td><td style="padding:9px 16px;">${d.goal}</td></tr>
  <tr style="background:#fafafa;"><td colspan="2" style="padding:10px 16px;border-top:1px solid #eee;border-bottom:1px solid #eee;"><strong style="color:#FF4500;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Plan & Payment</strong></td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Plan</td><td style="padding:9px 16px;font-weight:700;color:#FF4500;border-bottom:1px solid #f5f5f5;">${d.planName}</td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Amount</td><td style="padding:9px 16px;font-weight:700;border-bottom:1px solid #f5f5f5;">${d.amount}</td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Mode</td><td style="padding:9px 16px;border-bottom:1px solid #f5f5f5;">${d.paymentMode}</td></tr>
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Status</td><td style="padding:9px 16px;border-bottom:1px solid #f5f5f5;">
    <span style="background:${d.paymentStatus==='paid'?'#dcfce7':'#fef9c3'};color:${d.paymentStatus==='paid'?'#166534':'#854d0e'};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;text-transform:uppercase;">${d.paymentStatus}</span>
  </td></tr>
  ${d.paymentId?`<tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Payment ID</td><td style="padding:9px 16px;font-family:monospace;font-size:11px;color:#666;border-bottom:1px solid #f5f5f5;">${d.paymentId}</td></tr>`:''}
  <tr><td style="padding:9px 16px;color:#888;border-bottom:1px solid #f5f5f5;">Starts</td><td style="padding:9px 16px;color:#16a34a;font-weight:600;border-bottom:1px solid #f5f5f5;">${d.startDate}</td></tr>
  <tr><td style="padding:9px 16px;color:#888;">Expires</td><td style="padding:9px 16px;color:#FF4500;font-weight:700;">${d.endDate}</td></tr>
</table>
</td></tr>
<tr><td style="background:#fafafa;border-radius:0 0 10px 10px;padding:12px 24px;text-align:center;border-top:1px solid #eee;">
  <p style="color:#aaa;font-size:11px;margin:0;">Auto-sent by TCM Website · ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

// ─── Routes ───────────────────────────────────────────────────
// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  if (!rzp) return res.status(503).json({ error: 'Razorpay not configured' });
  try {
    const { amount, planKey, name } = req.body;
    const order = await rzp.orders.create({ amount, currency: 'INR', receipt: `tcm_${Date.now()}`, notes: { planKey, name } });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Verify Razorpay payment → save member → emails
app.post('/api/confirm-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, memberData } = req.body;
  if (razorpay_payment_id && process.env.RAZORPAY_KEY_SECRET) {
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if (expected !== razorpay_signature)
      return res.status(400).json({ success: false, error: 'Payment verification failed' });
  }
  await handleMemberSave(res, { ...memberData, paymentId: razorpay_payment_id, orderId: razorpay_order_id, paymentStatus: 'paid' });
});

// UPI / Walk-in path
app.post('/api/send-confirmation', async (req, res) => {
  await handleMemberSave(res, { ...req.body, paymentId: null, orderId: null, paymentStatus: 'pending' });
});

// Core: save + email
async function handleMemberSave(res, data) {
  try {
    const membershipId = await genMembershipId();
    const startDate    = new Date();
    const endDate      = new Date();
    endDate.setMonth(endDate.getMonth() + (data.months || 1));

    await new Member({ ...data, membershipId, startDate, endDate }).save();

    const emailData = { ...data, membershipId, startDate: fmt(startDate), endDate: fmt(endDate) };
    try {
      await mail.sendMail({ from:`"The Club Multiple" <${process.env.GMAIL_USER}>`, to: data.email, subject:`Membership Confirmed — ${data.planName} | ${membershipId}`, html: clientEmail(emailData) });
      await mail.sendMail({ from:`"TCM Website" <${process.env.GMAIL_USER}>`, to: process.env.GYM_OWNER_EMAIL, subject:`New Member: ${data.name} | ${data.planName} | ${membershipId}`, html: ownerEmail(emailData) });
    } catch(e) { console.warn('Email error:', e.message); }

    res.json({ success: true, membershipId });
  } catch(e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
}

// Admin: list all members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 }).select('-__v');
    res.json({ success: true, count: members.length, members });
  } catch(e) { res.status(500).json({ success: false, error: e.message }); }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', '404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🏋️  The Club Multiple → http://localhost:${PORT}`);
  console.log(`   Razorpay : ${process.env.RAZORPAY_KEY_ID     ? '✅ ready' : '⚠️  not set'}`);
  console.log(`   MongoDB  : ${process.env.MONGODB_URI          ? '✅ connecting' : '⚠️  not set'}`);
  console.log(`   Gmail    : ${process.env.GMAIL_USER           ? '✅ ready' : '⚠️  not set'}\n`);
});
