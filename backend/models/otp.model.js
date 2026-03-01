import { index } from 'drizzle-orm/gel-core';
import { pgTable, varchar, serial, timestamp, text } from 'drizzle-orm/pg-core'
const otpModel = pgTable("otps", {
    id: serial("id").primaryKey(),
    emailId: varchar("email_Id", { length: 255 }).notNull(),
    otp: text("otp").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiredAt: timestamp("expired_at").notNull()
}, (otpModel) => [
    index('email_Id_index').on(otpModel.emailId)
])

export default otpModel; 