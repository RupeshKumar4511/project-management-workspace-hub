import { desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import otpModel from "../models/otp.model.js";
import bcrypt from 'bcrypt'

const verifyEmail = async (req, res, next) => {
    const { email, otp } = req.body;

    const [data] = await db.select({ email: otpModel.emailId, otp: otpModel.otp,expiredAt:otpModel.expiredAt }).from(otpModel).where(eq(otpModel.emailId, email)).orderBy(desc(otpModel.createdAt)).limit(1);


    if (!data) {
        return res.status(400).send({ success: false, message: "Incorrect Email" })
    }

    if (!data.otp) {
        return res.status(400).send({ success: false, message: "Your OTP has not sent." })
    }

    
    const isExpired = Date.now() > new Date(data.expiredAt).getTime();

    if (isExpired) {
        return res.status(400).send({
            success: false,
            message: "Your OTP is expired",
        });
    }


    const isMatch = await bcrypt.compare(otp.toString(), data.otp);

    if (!isMatch) {
        return res.status(400).send({ success: false, message: "Incorrect OTP" })
    }

    await db.delete(otpModel).where(eq(otpModel.emailId, email));

    return next()


}

export default verifyEmail