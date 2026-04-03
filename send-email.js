// FILE LOCATION: api/send-email.js
// (create a folder called "api" next to your index.html, put this file inside it)
//
// HOW TO DEPLOY FREE ON VERCEL:
// 1. Go to vercel.com → sign up free with GitHub
// 2. Put your index.html + this api/ folder in a GitHub repo
// 3. Import that repo into Vercel → it auto-deploys
// 4. In Vercel dashboard → Settings → Environment Variables → add:
//    Name: RESEND_API_KEY   Value: re_xxxxxxxxx  (from resend.com)
// 5. Your send endpoint becomes: https://your-project.vercel.app/api/send-email

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    to_name, to_email, phone, plan_name,
    amount, payment_mode, goal,
    start_date, end_date, gym_name, gym_address
  } = req.body;

  if (!to_email || !to_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#0e0e0e;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0e0e0e;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0"
  style="max-width:600px;width:100%;background-color:#141410;border:1px solid #2a2a20;font-family:Arial,sans-serif;">

  <tr><td style="background-color:#c9a84c;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <tr><td style="padding:40px 48px 32px;text-align:center;border-bottom:1px solid #1e1e16;">
    <p style="font-family:Impact,Arial,sans-serif;font-size:38px;letter-spacing:5px;color:#c9a84c;margin:0 0 2px;line-height:1;">THE CLUB</p>
    <p style="font-size:10px;letter-spacing:9px;color:#555540;text-transform:uppercase;margin:0 0 22px;">MULTIPLE</p>
    <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
      <tr><td style="background-color:#c9a84c;padding:7px 20px;border-radius:2px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0a0a0a;">
          &#10003; &nbsp;MEMBERSHIP CONFIRMED
        </span>
      </td></tr>
    </table>
    <p style="font-size:21px;font-weight:700;color:#f5f0e8;margin:0 0 8px;">Welcome, ${to_name}!</p>
    <p style="font-size:14px;color:#777760;margin:0;line-height:1.6;">Your membership is active and confirmed.<br/>Here are your details below.</p>
  </td></tr>

  <tr><td style="padding:36px 48px 0;">
    <p style="font-size:10px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;font-weight:700;margin:0 0 20px;">Membership Details</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;width:38%;vertical-align:middle;">Plan</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:15px;color:#f0f0e0;font-weight:700;vertical-align:middle;">${plan_name}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Amount</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:20px;color:#c9a84c;font-weight:700;vertical-align:middle;">${amount}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Payment</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:15px;color:#f0f0e0;vertical-align:middle;">${payment_mode}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Goal</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:15px;color:#f0f0e0;vertical-align:middle;">${goal}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Phone</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:15px;color:#f0f0e0;vertical-align:middle;">${phone}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Starts</td>
        <td style="padding:13px 0;border-bottom:1px solid #1e1e16;font-size:15px;color:#f0f0e0;vertical-align:middle;">${start_date}</td>
      </tr>
      <tr>
        <td style="padding:13px 0;font-size:11px;letter-spacing:1.5px;color:#555540;text-transform:uppercase;font-weight:700;vertical-align:middle;">Expires</td>
        <td style="padding:13px 0;font-size:15px;color:#f0f0e0;vertical-align:middle;">${end_date}</td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:32px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="background-color:#111108;border-left:3px solid #c9a84c;padding:18px 22px;">
        <p style="font-family:Impact,Arial,sans-serif;font-size:20px;letter-spacing:3px;color:#c9a84c;margin:0 0 5px;">SEE YOU AT THE GYM &#128170;</p>
        <p style="font-size:13px;color:#555540;margin:0;">Every rep counts. Your journey starts now.</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background-color:#0a0a08;padding:26px 48px;border-top:1px solid #1e1e16;text-align:center;">
    <p style="font-family:Impact,Arial,sans-serif;font-size:16px;letter-spacing:3px;color:#c9a84c;margin:0 0 5px;">${gym_name}</p>
    <p style="font-size:12px;color:#444430;margin:0 0 14px;line-height:1.6;">${gym_address}</p>
    <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 14px;">
      <tr><td style="background-color:#111108;border:1px solid #222218;border-radius:20px;padding:8px 18px;">
        <span style="font-size:11px;color:#555540;">Mon&ndash;Sat: 6 AM &ndash; 10 PM &nbsp;|&nbsp; Sun: 8 AM &ndash; 2 PM</span>
      </td></tr>
    </table>
    <p style="font-size:11px;color:#2a2a20;margin:0;">This is an automated confirmation. Please do not reply to this email.</p>
  </td></tr>

  <tr><td style="background-color:#c9a84c;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:    `${gym_name} <onboarding@resend.dev>`,  // change to your domain once verified
        to:      [to_email],
        subject: `✅ Membership Confirmed — ${gym_name}`,
        html:    html
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(400).json({ error: err.message });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}