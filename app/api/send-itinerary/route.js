import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, date, interest, itinerary } = await request.json();

        // 1. Validate Input
        if (!name || !email || !date) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // 2. Get Credentials from Environment
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        console.log("Attempting to send email from:", emailUser);

        if (!emailUser || !emailPass) {
            console.error("⚠️  Email credentials not found in environment variables.");
            return NextResponse.json({ message: 'Server misconfigured: Missing email credentials', success: false }, { status: 500 });
        }

        // 3. Configure Transporter (Gmail) - Simplified to match working Explore page logic
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        console.log("Attempting to send itinerary mail to:", email);

        // 4. Construct Email Content
        const mailOptions = {
            from: `"Chittorgarh Tourism" <${emailUser}>`,
            to: email, // Send to the user
            subject: `Your ${interest} Itinerary for Chittorgarh`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdfbf7; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #2c1a0e; padding: 25px; text-align: center;">
                        <h1 style="color: #d4af37; margin: 0; font-family: 'Times New Roman', serif; letter-spacing: 2px;">Chittorgarh Tourism</h1>
                        <p style="color: #a08d75; margin: 5px 0 0; font-size: 14px; text-transform: uppercase;">The Land of Sacrifice & Valor</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <p style="font-size: 18px; color: #333;">Namaste <strong>${name}</strong>,</p>
                        <p style="color: #555; line-height: 1.6;">
                            Thank you for planning your journey to the fort city. We are delighted to share the <strong>${interest}</strong> details for your trip on <strong>${date}</strong>.
                        </p>

                        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #d4af37; margin: 25px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                            <h3 style="color: #8b4513; margin-top: 0;">${itinerary.title}</h3>
                            <p style="font-style: italic; color: #666;">"${itinerary.desc}"</p>
                            
                            <h4 style="color: #333; margin-top: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Highlights:</h4>
                            <ul style="color: #444; padding-left: 20px; margin-bottom: 25px;">
                                ${itinerary.highlights.map(h => `<li>${h}</li>`).join('')}
                            </ul>

                            <h4 style="color: #333; margin-top: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Full Schedule:</h4>
                            <div style="margin-top: 15px;">
                                ${itinerary.schedule.map(item => `
                                    <div style="margin-bottom: 15px; border-left: 3px solid #d4af37; padding-left: 15px;">
                                        <div style="color: #c5a059; font-weight: bold; font-size: 14px;">${item.time}</div>
                                        <div style="color: #444; font-weight: bold; margin-bottom: 3px;">${item.title}</div>
                                        <div style="color: #666; font-size: 13px; line-height: 1.5;">${item.activity}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div style="background-color: #f0ead6; padding: 15px; border-radius: 4px; text-align: center; margin-top: 30px;">
                            <p style="margin: 0; color: #5c4033; font-weight: bold;">Need a Private Guide or Cab?</p>
                            <p style="margin: 5px 0 0; fontSize: 14px; color: #666;">Reply to this email for exclusive quotes.</p>
                        </div>
                    </div>

                    <div style="background-color: #2c1a0e; padding: 15px; text-align: center; color: #555; font-size: 12px;">
                        <p style="color: #888; margin: 0;">&copy; ${new Date().getFullYear()} Chittorgarh Tourism. All rights reserved.</p>
                    </div>
                </div>
            `,
        };

        // 5. Send Email
        console.log("Sending mail...");
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Message sent: %s", info.messageId);

        return NextResponse.json({ message: 'Email sent successfully', success: true });
    } catch (error) {
        console.error('❌ Error sending itinerary email:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
