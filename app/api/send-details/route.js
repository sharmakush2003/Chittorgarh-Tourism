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
      subject: `A Taste of Rajasthan: ${placeName} — Your Culinary Guide`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>A Taste of Rajasthan: ${placeName}</title>
</head>
<body style="margin:0; padding:0; background-color:#140F0B; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#140F0B; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- OUTER CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#1C150F; border:1px solid rgba(212,175,55,0.2); border-radius:24px; overflow:hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.9);">
          
          <!-- TOP GLOW BAR -->
          <tr>
            <td height="2" style="background:linear-gradient(90deg, transparent, #D4AF37, transparent); opacity:0.8;"></td>
          </tr>

          <!-- HEADER / BRANDING -->
          <tr>
            <td style="padding: 30px 40px 20px; text-align:center;">
              <p style="margin:0; color:#D4AF37; font-size:10px; font-weight:700; letter-spacing:5px; text-transform:uppercase;">Chittorgarh Tourism</p>
            </td>
          </tr>

          ${image ? `
          <!-- HERO IMAGE SECTION -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="width:100%; height:320px; border-radius:16px; overflow:hidden; position:relative; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1);">
                <img src="${siteUrl}${image}" alt="${placeName}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                <!-- Overlay Gradient -->
                <div style="position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, rgba(28,21,15,0.95), transparent);"></div>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- MAIN CONTENT -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin:0 0 16px; font-family: 'Playfair Display', Georgia, serif; font-size:42px; font-weight:400; color:#FFFFFF; line-height:1.1; text-align:center;">${placeName}</h1>
              
              <!-- CATEGORY TAG -->
              <div style="text-align:center; margin-bottom:24px;">
                <span style="display:inline-block; padding: 6px 16px; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); border-radius:50px; color:#D4AF37; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">${time || 'Traditional Cuisine'}</span>
              </div>

              <div style="width:120px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 0 auto 30px;"></div>
              
              <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.75); line-height:1.8; text-align:center; font-weight:300;">${description}</p>
            </td>
          </tr>

          <!-- QUICK DETAILS PANEL -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding: 25px;">
                <tr>
                  <td width="50%" align="center" style="border-right:1px solid rgba(255,255,255,0.1);">
                    <div style="font-size:24px; margin-bottom:8px;">🔥</div>
                    <p style="margin:0 0 4px; font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; font-weight:700;">Spice Level</p>
                    <p style="margin:0; font-size:15px; color:#FFF; font-weight:500;">${dist || 'Authentic'}</p>
                  </td>
                  <td width="50%" align="center">
                    <div style="font-size:24px; margin-bottom:8px;">🍽</div>
                    <p style="margin:0 0 4px; font-size:9px; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; font-weight:700;">Serving Style</p>
                    <p style="margin:0; font-size:15px; color:#FFF; font-weight:500;">Royal Platter</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ORNAMENTAL DIVIDER -->
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <div style="display:flex; align-items:center; opacity:0.2;">
                <div style="flex:1; height:1px; background:linear-gradient(90deg, transparent, #D4AF37);"></div>
                <div style="margin: 0 15px; color:#D4AF37; font-size:10px;">◆</div>
                <div style="flex:1; height:1px; background:linear-gradient(90deg, #D4AF37, transparent);"></div>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0F0A06; padding: 40px; text-align:center;">
              <p style="margin:0 0 6px; font-family: 'Playfair Display', Georgia, serif; font-size:24px; font-weight:500; color:#D4AF37; letter-spacing:2px;">Chittorgarh <span style="color:rgba(255,255,255,0.5); font-weight:300;">Tourism</span></p>
              <p style="margin:0 0 25px; font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:4px; text-transform:uppercase;">The Saga of Bravery &amp; Sacrifice</p>

              <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:25px;">
                <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.4); letter-spacing:0.5px;">
                  &copy; ${year} Chittorgarh Tourism. All rights reserved.
                </p>
                <p style="margin:8px 0 0; font-size:12px; color:#D4AF37; font-weight:600; letter-spacing:0.5px;">
                  Made with ❤️ by Kush Sharma
                </p>
                <p style="margin:16px 0 0; font-size:11px; color:rgba(255,255,255,0.2); line-height:1.5; font-style:italic;">
                  This culinary guide was shared with you to celebrate the flavours of Rajasthan.
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
