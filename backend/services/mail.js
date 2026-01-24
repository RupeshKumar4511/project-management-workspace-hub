import otpModel from '../models/otp.model.js'
import { db } from '../config/db.js'
import bcrypt from 'bcrypt'
import { config } from 'dotenv';
import nodemailer from 'nodemailer'
config()


// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendOtp = async (body) => {
    const { email } = body;


    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP Code is ${otp}`,
        html: `<div>
            <h2>Welcome to PMS. </h2>
            <h2>Your OTP Code is ${otp}</h2>
        </div>`

    }

    // const response = await sgMail.send(mailOptions);
    const response = await transporter.sendMail(mailOptions);
    console.log(response);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10)
    const expiresAt = new Date(Date.now() + 1000 * 60 * 5);// 5 minute
    await db.insert(otpModel).values({ emailId: email, otp: hashedOtp, expiredAt: expiresAt })


}
export default sendOtp;