import otpModel from '../models/otp.model.js'
import { db } from '../config/db.js'
import bcrypt, { hash } from 'bcrypt'
import { config } from 'dotenv';
config()
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOtp = async (req, res, next) => {
    const { email } = req.body;

    try {
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

        const response = await sgMail.send(mailOptions);
        console.log(response)

        const hashedOtp = await bcrypt.hash(otp.toString(), 10)
        const expiresAt = 1000 * 60 * 5; // 5 minute
        await db.insert(otpModel).values({ emailId: email, otp: hashedOtp, expiredAt: expiresAt })

        return next()
    } catch (error) {
        res.status(500).send({success:false,messsage:"Internal Server Error"})
    }
}
export default sendOtp;