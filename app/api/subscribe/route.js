import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required', success: false }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Email credentials missing in environment variables');
      return NextResponse.json({ message: 'Server configuration error', success: false }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const year = new Date().getFullYear();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism-five.vercel.app';

    // V2: CINEMATIC WELCOME EMAIL TEMPLATE
    const welcomeMailOptions = {
      from: `"Chittorgarh Tourism" <${emailUser}>`,
      to: email,
      subject: "Welcome to the Inner Circle — Chittorgarh Tourism",
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;700&display=swap');
    
    body { margin: 0; padding: 0; background-color: #0c0805; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #ffffff; }
    .main-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #140f0b; border: 1px solid #231912; }
    
    .header { padding: 50px 0; text-align: center; background: #0c0805; }
    .cinematic-hero { width: 100%; height: 400px; position: relative; overflow: hidden; }
    .hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    
    .body-content { padding: 60px 50px; text-align: center; }
    .eyebrow { letter-spacing: 6px; font-size: 10px; text-transform: uppercase; color: #d4af37; font-weight: 700; margin-bottom: 20px; }
    .h1 { font-family: 'Playfair Display', serif; font-size: 42px; line-height: 1.1; color: #ffffff; margin: 0 0 30px; font-weight: 400; }
    .divider { width: 60px; height: 1px; background-color: #d4af37; margin: 0 auto 30px; }
    .p { font-size: 16px; line-height: 1.9; color: rgba(255,255,255,0.6); margin-bottom: 40px; font-weight: 300; }
    
    .features-grid { padding: 0 50px 60px; }
    .feature-item { text-align: left; margin-bottom: 30px; border-left: 2px solid #d4af37; padding-left: 20px; }
    .feature-title { font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .feature-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5; }
    
    .cta-button { display: inline-block; padding: 22px 50px; background-color: #d4af37; color: #000000; text-decoration: none; border-radius: 2px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; box-shadow: 0 15px 35px rgba(212, 175, 55, 0.2); }
    
    .footer { padding: 60px 40px; text-align: center; background-color: #0c0805; border-top: 1px solid #1a140f; }
    .footer-text { font-size: 11px; color: rgba(255,255,255,0.2); line-height: 1.8; letter-spacing: 1px; }
  </style>
</head>
<body>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" class="main-container">
          <!-- Header -->
          <tr>
            <td class="header">
              <span style="letter-spacing: 8px; font-size: 12px; text-transform: uppercase; color: #d4af37; border-bottom: 1px solid #231912; padding-bottom: 10px;">Chittorgarh</span>
            </td>
          </tr>
          
          <!-- Cinematic Hero -->
          <tr>
            <td class="cinematic-hero">
              <img src="${siteUrl}/hero_bg.jpg" alt="The Victory Tower of Chittorgarh" class="hero-img" />
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(to top, #140f0b, transparent);"></div>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td class="body-content">
              <div class="eyebrow">The Heritage Circle</div>
              <h1 class="h1">A Royal Welcome <br/> to the Inner Circle</h1>
              <div class="divider"></div>
              <p class="p">
                You have been successfully initiated into the <strong>Heritage Circle</strong>. From this moment on, you will receive more than just news; you will receive the true essence of Mewar—stories of sacrifice, guides to hidden bastions, and first-access to our upcoming heritage expeditions.
              </p>
              
              <a href="${siteUrl}/chronicles" class="cta-button">Begin Your Journey</a>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td class="features-grid">
              <div class="feature-item">
                <div class="feature-title">Monthly Chronicles</div>
                <div class="feature-desc">Deep-dives into specific historical events and architectural marvels.</div>
              </div>
              <div class="feature-item">
                <div class="feature-title">Elite Access</div>
                <div class="feature-desc">First alerts on curated stay experiences and guided heritage trails.</div>
              </div>
              <div class="feature-item" style="margin-bottom: 0;">
                <div class="feature-title">Preservation News</div>
                <div class="feature-desc">Updates on local conservation efforts within the fort city.</div>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="font-family: 'Playfair Display', serif; font-size: 24px; color: #d4af37; margin: 0 0 10px;">Chittorgarh Tourism</p>
              <p style="font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 40px;">THE SAGA OF BRAVERY & SACRIFICE</p>
              
              <div class="footer-text">
                &copy; ${year} Chittorgarh Tourism. All rights reserved.<br/>
                Rajasthan, India. You are part of our heritage mission.
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

    const adminMailOptions = {
      from: `"Newsletter System" <${emailUser}>`,
      to: emailUser,
      subject: "New Newsletter Subscriber!",
      text: `New subscription from: ${email}`,
    };

    await Promise.all([
      transporter.sendMail(welcomeMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json({ message: 'Subscribed successfully', success: true });

  } catch (error) {
    console.error('Newsletter Subscription Error:', error);
    return NextResponse.json({ message: 'Failed to subscribe', success: false }, { status: 500 });
  }
}
