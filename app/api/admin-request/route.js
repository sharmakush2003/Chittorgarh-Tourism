import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
    try {
        const { name, email, purpose } = await request.json();

        if (!name || !email || !purpose) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (!emailUser || !emailPass) {
            return NextResponse.json({ message: 'Server email configuration missing' }, { status: 500 });
        }

        // 1. Save to Firestore for Admin Management
        if (db) {
            try {
                await addDoc(collection(db, "admin_requests"), {
                    name,
                    email,
                    purpose,
                    status: "pending",
                    createdAt: serverTimestamp()
                });
            } catch (dbError) {
                console.error("Database Error:", dbError);
                // Continue so email is still sent even if DB fails
            }
        }

        // 2. Transporter setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // 3. Email Options
        const mailOptions = {
            from: `"Chittorgarh Tourism" <${emailUser}>`,
            to: "kushsharma.cor@gmail.com, lavsharma.cor@gmail.com",
            subject: `🏰 New Admin Access Request - ${name}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D4AF37; background-color: #0F0A06; color: #fff;">
                    <h2 style="color: #D4AF37; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Guardian Access Request</h2>
                    <p style="font-size: 16px; line-height: 1.6;">A new request for administrative access has been submitted for review by the team.</p>
                    
                    <div style="background-color: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Purpose:</strong> ${purpose}</p>
                    </div>

                    <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
                        Manage this request in the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/users" style="color: #D4AF37;">Admin Center</a>.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Request sent successfully', success: true });
    } catch (error) {
        console.error('Error in admin-request API:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
