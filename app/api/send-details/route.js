import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: `"Chittorgarh Tourism" <${emailUser}>`,
            to: email,
            subject: `Discover the Majesty of ${placeName} - Chittorgarh Tourism`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdfbf7; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <div style="background-color: #1a1510; padding: 40px 20px; text-align: center; border-bottom: 3px solid #d4af37;">
                        <h1 style="color: #d4af37; margin: 0; font-family: 'Times New Roman', serif; letter-spacing: 2px; font-size: 28px; text-transform: uppercase;">Chittorgarh Tourism</h1>
                        <p style="color: #a08d75; margin: 10px 0 0; font-size: 12px; letter-spacing: 4px; text-transform: uppercase;">The Pride of Rajasthan</p>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px 30px; background-color: #fff;">
                        <h2 style="color: #8b4513; margin-top: 0; font-family: 'Times New Roman', serif; font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 15px;">${placeName}</h2>
                        
                        <p style="color: #555; line-height: 1.8; font-size: 16px; margin-top: 20px;">
                            ${description}
                        </p>

                        <!-- Key Details Box -->
                        <div style="background-color: #fcf9f2; border: 1px solid #eaddcf; border-radius: 6px; padding: 20px; margin: 30px 0;">
                            <h3 style="color: #5c4033; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Key Travel Information</h3>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 14px; width: 40%;">Best Time to Visit:</td>
                                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${time || 'October - March'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 14px;">Distance from City:</td>
                                    <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${dist || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 35px 0 10px;">
                            <a href="${link}" style="background-color: #d4af37; color: #1a1510; padding: 14px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 14px; letter-spacing: 1px; transition: background 0.3s;">READ MORE ON WIKIPEDIA</a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f4f1ea; padding: 20px; text-align: center; border-top: 1px solid #eaddcf;">
                        <p style="margin: 0; color: #5c4033; font-weight: bold; font-size: 16px;">Plan your royal journey today.</p>
                        <p style="margin: 5px 0 0; font-size: 13px; color: #888;">Experience the legacy of bravery and sacrifice.</p>
                        <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 11px; color: #999;">
                            &copy; ${new Date().getFullYear()} Chittorgarh Tourism. All rights reserved.
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully', success: true });
    } catch (error) {
        console.error('Error sending details email:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
