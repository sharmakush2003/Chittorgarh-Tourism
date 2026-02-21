import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Dynamic subject lines per place
const PLACE_DATA = {
  "Chittorgarh Fort": {
    subject: "The Mightiest Fort in Asia Awaits — Your Chittorgarh Itinerary",
    tagline: "700 acres of living history, bravery, and architectural marvel.",
    emoji: "🏰",
  },
  "Vijay Stambh (Victory Tower)": {
    subject: "9 Floors of Rajput Glory — Vijay Stambh, Chittorgarh",
    tagline: "Built to celebrate Rana Kumbha's greatest triumph over Mahmud Khilji.",
    emoji: "🗼",
  },
  "Padmini Palace": {
    subject: "Grace Reflected in Water — Rani Padmini's Legendary Palace",
    tagline: "A masterpiece of architecture, surrounded by a serene lotus pool.",
    emoji: "🪷",
  },
  "Kirti Stambha (Tower of Fame)": {
    subject: "A 12th-Century Jain Marvel Awaits You in Chittorgarh",
    tagline: "The finest example of Solanki architecture, dedicated to Adinath.",
    emoji: "🕌",
  },
  "Meera Bai Temple": {
    subject: "Walk the Path of Meera Bai — Devotion in Stone",
    tagline: "Where the mystic poet-saint sang her boundless love for Lord Krishna.",
    emoji: "🎵",
  },
  "Rana Kumbha Palace": {
    subject: "The Oldest Palace in the Fort — A Royal Chittorgarh Secret",
    tagline: "Witness the site of Rani Padmini's legendary Jauhar.",
    emoji: "👑",
  },
  "Kalika Mata Temple": {
    subject: "An 8th-Century Sun Temple Reborn — Kalika Mata, Chittorgarh",
    tagline: "From sun worship to goddess devotion — a temple that spans eras.",
    emoji: "🌅",
  },
  "Bassi Wildlife Sanctuary": {
    subject: "Panthers, Birds & Wilderness — Bassi Sanctuary Awaits",
    tagline: "A hidden natural paradise just 25 km from the fort city.",
    emoji: "🐆",
  },
  "Sanwariaji Temple": {
    subject: "Lord Krishna's Divine Abode — Sanwariaji Temple, Chittorgarh",
    tagline: "One of Rajasthan's most revered pilgrimage sites, 40 km away.",
    emoji: "🙏",
  },
  "Gaumukh Reservoir": {
    subject: "The Sacred Spring of Chittorgarh — Gaumukh Reservoir",
    tagline: "Ancient spring waters that fed the fort for centuries.",
    emoji: "💧",
  },
  "Fateh Prakash Palace": {
    subject: "Royal Artifacts & History Inside Fateh Prakash Palace",
    tagline: "A magnificent palace now home to a museum of Mewar's golden era.",
    emoji: "🏛️",
  },
  "Ratan Singh Palace": {
    subject: "Overlooking the Royal Lake — Ratan Singh Palace, Chittorgarh",
    tagline: "A glimpse into the regal lifestyle of the Mewar rulers.",
    emoji: "🌊",
  },
  "Kumbha Shyam Temple": {
    subject: "Indo-Aryan Splendour — Kumbha Shyam Temple, Chittorgarh",
    tagline: "Built by Rana Kumbha, dedicated to Lord Vishnu's eternal grace.",
    emoji: "🪔",
  },
  "Sattavis Jain Temples": {
    subject: "27 Jain Temples, Infinite Serenity — Chittorgarh",
    tagline: "Intricate carvings and centuries of spiritual devotion await.",
    emoji: "✨",
  },
  "Menal Waterfall & Temple": {
    subject: "The Mini Khajuraho of Rajasthan — Menal, Chittorgarh",
    tagline: "Stunning 11th-century temples beside a magnificent waterfall.",
    emoji: "🌊",
  },
  "Light & Sound Show": {
    subject: "Chittorgarh After Dark — The Light & Sound Show",
    tagline: "The entire saga of the fort narrated under the stars.",
    emoji: "🌟",
  },
};

function getPlaceInfo(placeName) {
  return PLACE_DATA[placeName] || {
    subject: `Discover ${placeName} — A Heritage Gem of Chittorgarh`,
    tagline: "A timeless wonder in the heart of Rajasthan.",
    emoji: "🏯",
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, placeName, description, link, image, time, dist } = body;

    if (!email || !placeName) {
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

    const { subject, tagline, emoji } = getPlaceInfo(placeName);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism-five.vercel.app';
    const year = new Date().getFullYear();

    const mailOptions = {
      from: `"Chittorgarh Tourism" <${emailUser}>`,
      to: email,
      subject,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${placeName} — Chittorgarh Tourism</title>
</head>
<body style="margin:0; padding:0; background-color:#0F0A06; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0F0A06; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; border:1px solid rgba(212,175,55,0.3); border-radius:12px; overflow:hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.8);">

          <!-- TOP BAR -->
          <tr>
            <td style="background:linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 10px 30px; text-align:center;">
              <p style="margin:0; color:#0F0A06; font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase;">Chittorgarh Tourism · The Saga of Bravery &amp; Sacrifice</p>
            </td>
          </tr>

          <!-- HERO HEADER -->
          <tr>
            <td style="background: linear-gradient(160deg, #1C150F 0%, #0F0A06 100%); padding: 50px 40px 40px; text-align:center; border-bottom: 1px solid rgba(212,175,55,0.2);">
              <div style="font-size:52px; margin-bottom:16px; line-height:1;">${emoji}</div>
              <h1 style="margin:0 0 12px; font-family:Georgia,'Times New Roman',serif; font-size:34px; font-weight:500; color:#D4AF37; letter-spacing:1px; line-height:1.2;">${placeName}</h1>
              <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.55); letter-spacing:1px; line-height:1.6; max-width:400px; margin:0 auto;">${tagline}</p>
              <div style="width:80px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 24px auto 0;"></div>
            </td>
          </tr>

          <!-- DESCRIPTION -->
          <tr>
            <td style="background:#1C150F; padding: 36px 40px;">
              <p style="margin:0 0 28px; font-size:15px; color:rgba(255,255,255,0.8); line-height:1.8; text-align:center;">${description}</p>

              <!-- INFO PILLS -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="padding: 4px;">
                    <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.25); border-radius:8px; padding: 18px 20px; text-align:center;">
                      <div style="font-size:22px; margin-bottom:8px;">🗓</div>
                      <p style="margin:0 0 4px; font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; font-weight:600;">Best Time to Visit</p>
                      <p style="margin:0; font-size:14px; color:#D4AF37; font-weight:700;">${time || 'Oct – Mar'}</p>
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding: 4px;">
                    <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.25); border-radius:8px; padding: 18px 20px; text-align:center;">
                      <div style="font-size:22px; margin-bottom:8px;">📍</div>
                      <p style="margin:0 0 4px; font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; font-weight:600;">Distance from Rly Stn</p>
                      <p style="margin:0; font-size:14px; color:#D4AF37; font-weight:700;">${dist || 'N/A'}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA BUTTON -->
              <div style="text-align:center; margin-top:36px;">
                <a href="${link}" style="display:inline-block; background:linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color:#0F0A06; padding: 16px 38px; text-decoration:none; border-radius:6px; font-weight:700; font-size:13px; letter-spacing:2px; text-transform:uppercase;">
                  Explore ${placeName} &rarr;
                </a>
              </div>

              <!-- DIVIDER -->
              <div style="width:100%; height:1px; background:linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent); margin: 36px 0 0;"></div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0F0A06; padding: 30px 40px; text-align:center; border-top: 1px solid rgba(212,175,55,0.12);">
              <p style="margin:0 0 4px; font-family:Georgia,'Times New Roman',serif; font-size:22px; color:#D4AF37; letter-spacing:2px;">Chittorgarh <span style="color:rgba(255,255,255,0.5); font-size:18px;">Tourism</span></p>
              <p style="margin: 8px 0 20px; font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:3px; text-transform:uppercase;">The Pride of Rajasthan</p>

              <a href="${siteUrl}" style="display:inline-block; border:1px solid rgba(212,175,55,0.4); color:#D4AF37; padding: 10px 24px; text-decoration:none; border-radius:4px; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin-bottom:24px;">
                Plan Your Royal Journey
              </a>

              <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px;">
                <p style="margin:0; font-size:10px; color:rgba(255,255,255,0.2); letter-spacing:0.5px;">
                  &copy; ${year} Chittorgarh Tourism. All rights reserved. &nbsp;·&nbsp; Rajasthan, India
                </p>
                <p style="margin:6px 0 0; font-size:10px; color:rgba(255,255,255,0.15);">
                  You received this because someone shared this heritage site with you.
                </p>
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

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully', success: true });

  } catch (error) {
    console.error('Error sending details email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
