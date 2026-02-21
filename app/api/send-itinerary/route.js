import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Dynamic themes per itinerary type
const ITINERARY_THEMES = {
  "1 Day Tour": {
    emoji: "🏰",
    badge: "1-Day Royal Heritage Tour",
    hook: "One day. Seven gates. One thousand years of bravery.",
    color: "#D4AF37",
  },
  "2 Day Tour": {
    emoji: "🐆",
    badge: "2-Day Wildlife & Heritage Expedition",
    hook: "From ancient fort walls to the untamed Aravallis — two days of wonder.",
    color: "#C4873A",
  },
  "3 Day Tour": {
    emoji: "🧵",
    badge: "3-Day Soul of Mewar Journey",
    hook: "History, wilderness, devotion, and the art of indigo — the full Mewar experience.",
    color: "#A0522D",
  },
};

function formatDate(dateStr) {
  if (!dateStr) return 'Your trip date';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export async function POST(request) {
  try {
    const { name, email, date, interest, itinerary } = await request.json();

    if (!name || !email || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json({ message: 'Server misconfigured', success: false }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const theme = ITINERARY_THEMES[interest] || ITINERARY_THEMES["1 Day Tour"];
    const formattedDate = formatDate(date);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism-five.vercel.app';
    const year = new Date().getFullYear();

    // Build schedule rows HTML
    const scheduleHTML = itinerary.schedule.map((item, i) => `
          <tr>
            <td style="padding: 0 0 28px 0; vertical-align:top;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="20" style="vertical-align:top; padding-top:3px;">
                    <div style="width:10px; height:10px; background:${theme.color}; border-radius:50%; border:2px solid rgba(255,255,255,0.2);"></div>
                    ${i < itinerary.schedule.length - 1 ? `<div style="width:2px; background:rgba(212,175,55,0.2); margin: 4px auto 0; height:calc(100% + 16px);"></div>` : ''}
                  </td>
                  <td style="padding-left:16px;">
                    <div style="font-size:11px; color:${theme.color}; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:4px;">${item.time}</div>
                    <div style="font-size:15px; color:#fff; font-family:Georgia,'Times New Roman',serif; font-weight:500; margin-bottom:6px;">${item.title}</div>
                    <div style="font-size:13px; color:rgba(255,255,255,0.6); line-height:1.7;">${item.activity}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `).join('');

    // Build highlights badges
    const highlightsHTML = itinerary.highlights.map(h => `
          <span style="display:inline-block; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); color:#D4AF37; padding:5px 14px; border-radius:50px; font-size:11px; font-weight:600; letter-spacing:1px; margin:4px;">${h}</span>
        `).join('');

    const mailOptions = {
      from: `"Chittorgarh Tourism" <${emailUser}>`,
      to: email,
      subject: `${theme.emoji} Your ${interest} Chittorgarh Itinerary for ${formattedDate}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Chittorgarh Itinerary</title>
</head>
<body style="margin:0; padding:0; background-color:#0F0A06; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0F0A06; padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; border:1px solid rgba(212,175,55,0.3); border-radius:12px; overflow:hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.9);">

          <!-- TOP BAR -->
          <tr>
            <td style="background:linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding:10px 30px; text-align:center;">
              <p style="margin:0; color:#0F0A06; font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase;">Chittorgarh Tourism · Your Royal Itinerary</p>
            </td>
          </tr>

          <!-- HERO HEADER -->
          <tr>
            <td style="background:linear-gradient(160deg, #1C150F 0%, #0F0A06 60%, #0F0A06 100%); padding:50px 40px 40px; text-align:center; border-bottom:1px solid rgba(212,175,55,0.15);">
              <div style="font-size:56px; line-height:1; margin-bottom:16px;">${theme.emoji}</div>
              <div style="display:inline-block; background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); color:#D4AF37; padding:5px 18px; border-radius:50px; font-size:10px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-bottom:20px;">${theme.badge}</div>
              <h1 style="margin:0 0 10px; font-family:Georgia,'Times New Roman',serif; font-size:32px; font-weight:500; color:#fff; letter-spacing:1px; line-height:1.2;">
                Namaste, <span style="color:#D4AF37;">${name}</span> 🙏
              </h1>
              <p style="margin:0 0 20px; font-size:13px; color:rgba(255,255,255,0.5); letter-spacing:0.5px; font-style:italic; max-width:420px; margin:0 auto 20px; line-height:1.7;">"${theme.hook}"</p>
              <div style="width:80px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37, transparent); margin:0 auto;"></div>
            </td>
          </tr>

          <!-- TRIP DETAILS BAND -->
          <tr>
            <td style="background:rgba(212,175,55,0.06); border-top:1px solid rgba(212,175,55,0.12); border-bottom:1px solid rgba(212,175,55,0.12); padding:20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="33%" style="text-align:center; padding:4px;">
                    <div style="font-size:18px;">📅</div>
                    <div style="font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; margin:4px 0 2px;">Travel Date</div>
                    <div style="font-size:12px; color:#D4AF37; font-weight:700;">${formattedDate}</div>
                  </td>
                  <td width="33%" style="text-align:center; padding:4px; border-left:1px solid rgba(255,255,255,0.05); border-right:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:18px;">⏱</div>
                    <div style="font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; margin:4px 0 2px;">Duration</div>
                    <div style="font-size:12px; color:#D4AF37; font-weight:700;">${interest}</div>
                  </td>
                  <td width="33%" style="text-align:center; padding:4px;">
                    <div style="font-size:18px;">📍</div>
                    <div style="font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; margin:4px 0 2px;">Destination</div>
                    <div style="font-size:12px; color:#D4AF37; font-weight:700;">Chittorgarh, Rajasthan</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ITINERARY TITLE + DESC -->
          <tr>
            <td style="background:#1C150F; padding:36px 40px 24px;">
              <h2 style="margin:0 0 12px; font-family:Georgia,'Times New Roman',serif; font-size:22px; color:#D4AF37; font-weight:500;">${itinerary.title}</h2>
              <p style="margin:0 0 24px; font-size:13px; color:rgba(255,255,255,0.6); line-height:1.8; font-style:italic;">"${itinerary.desc}"</p>

              <!-- HIGHLIGHTS -->
              <div style="font-size:9px; color:rgba(255,255,255,0.35); letter-spacing:3px; text-transform:uppercase; font-weight:700; margin-bottom:12px;">✦ Trip Highlights</div>
              <div style="margin-bottom:28px;">${highlightsHTML}</div>

              <!-- DIVIDER -->
              <div style="width:100%; height:1px; background:linear-gradient(90deg, rgba(212,175,55,0.3), transparent); margin:4px 0 28px;"></div>

              <!-- SCHEDULE HEADING -->
              <div style="font-size:9px; color:rgba(255,255,255,0.35); letter-spacing:3px; text-transform:uppercase; font-weight:700; margin-bottom:24px;">✦ Full Day Schedule</div>

              <!-- SCHEDULE TIMELINE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${scheduleHTML}
              </table>
            </td>
          </tr>

          <!-- GUIDE CTA -->
          <tr>
            <td style="background:linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%); border:1px solid rgba(212,175,55,0.2); margin:0 40px; padding:24px 40px; text-align:center; border-left:none; border-right:none;">
              <div style="font-size:24px; margin-bottom:10px;">🏇</div>
              <p style="margin:0 0 6px; font-size:15px; color:#fff; font-family:Georgia,'Times New Roman',serif;">Need a Private Guide or Cab?</p>
              <p style="margin:0 0 16px; font-size:12px; color:rgba(255,255,255,0.45); line-height:1.6;">We can arrange expert heritage guides and comfortable transportation for your entire trip. Simply reply to this email for exclusive quotes.</p>
              <a href="mailto:${emailUser}?subject=Guide Request for ${interest} - ${formattedDate}" style="display:inline-block; border:1px solid rgba(212,175,55,0.5); color:#D4AF37; padding:10px 28px; text-decoration:none; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">Request a Guide &rarr;</a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0F0A06; padding:30px 40px; text-align:center; border-top:1px solid rgba(212,175,55,0.1);">
              <p style="margin:0 0 4px; font-family:Georgia,'Times New Roman',serif; font-size:22px; color:#D4AF37; letter-spacing:2px;">Chittorgarh <span style="color:rgba(255,255,255,0.4); font-size:18px;">Tourism</span></p>
              <p style="margin:8px 0 20px; font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:3px; text-transform:uppercase;">Est. 7th Century · Rajasthan, India</p>
              <a href="${siteUrl}/explore" style="display:inline-block; background:linear-gradient(135deg,#D4AF37,#B8860B); color:#0F0A06; padding:12px 28px; text-decoration:none; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:24px;">View All Attractions &rarr;</a>
              <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px;">
                <p style="margin:0; font-size:10px; color:rgba(255,255,255,0.2);">&copy; ${year} Chittorgarh Tourism. All rights reserved. &nbsp;·&nbsp; Rajasthan, India</p>
                <p style="margin:4px 0 0; font-size:10px; color:rgba(255,255,255,0.2); font-style:italic;">Designed with ❤️ by Kush Sharma</p>
                <p style="margin:6px 0 0; font-size:10px; color:rgba(255,255,255,0.12);">You received this because you requested your itinerary from our website.</p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Itinerary email sent:", info.messageId);

    return NextResponse.json({ message: 'Email sent successfully', success: true });
  } catch (error) {
    console.error('❌ Error sending itinerary email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
