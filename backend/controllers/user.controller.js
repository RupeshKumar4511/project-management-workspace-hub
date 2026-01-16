import { db } from '../config/db.js';
import { users,tokens } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { or } from 'drizzle-orm';
import {config} from 'dotenv'
config()

// generate accessToken and refresh Tokens
export const generateAccessToken = async (user) => {
    return jwt.sign({
        username: user.usename,
        email:user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })

}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email:user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}


//  signup controller 
export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await db.select().from(users).where(or(eq(users.username, username), eq(email, users.email)))

        if (user) {
            return res.status(409).send({ message: "User already exists." })
        }

        await db.insert(users).values({ username, email, password })

        return res.status(201).send({ success: true, message: "SignUp Successfully" })
    } catch (error) {
        return res.status(500).send({ success: false, message: "internal server error" })
    }

}

// login controller
export const login = async (req, res) => {
    const { username, password } = req.body;
    const errorMsg = { success: false, message: "Username or Password is Wrong" };

    try {
        const user = await db.select().from(users).where(or(eq(users.username, username), eq(users.email, username)))

        if (!user) {
            return res.status(404).send(errorMsg)
        }

        const isPasswordMatch = bcrypt.compare(password, users.password)

        if (!isPasswordMatch) {
            return res.status(401).send(errorMsg)
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        await db.insert('tokens').values({ id: user.id, accessToken, refreshToken, expiredAt: expiresAt })

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)

        return res.status(200).send({ success: true, message: "Login Successfully" })

    } catch (error) {
        return res.status(500).send({ success: false, message: "internal server error" })
    }



}


// generate New refreshToken
export const generateNewRefreshToken = async (req, res) => {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized Request" })
    }

    try {

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        const dbToken = await db.select().from(tokens).where(eq(tokens.id, users.userId))

        if (!dbToken) {
            return res.status(403).send({ message: "Invalid Refresh token" })
        }

        if (dbToken?.refreshToken !== token) {
            return res.status(403).send({ message: "your refresh token is expired or used" })
        }

        const accessToken = generateAccessToken(decodedData)
        const newRefreshToken = generateRefreshToken(decodedData)

        await db.update(tokens).set({ refreshToken: newRefreshToken }).where(eq(token, dbToken.refreshToken))

        res.cookie("access_token", accessToken)
        res.cookie("refreshToken", newRefreshToken)
        res.status(204)

    } catch (error) {

    }
}