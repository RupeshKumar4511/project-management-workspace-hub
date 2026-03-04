import { index, uuid } from 'drizzle-orm/gel-core';
import { pgTable, varchar, uuid, timestamp, text } from 'drizzle-orm/pg-core'
const otpModel = pgTable("otps", {
    id: uuid("id").primaryKey().defaultRandom(),
    emailId: varchar("email_Id", { length: 255 }).notNull(),
    otp: text("otp").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiredAt: timestamp("expired_at").notNull()
}, (otpModel) => [
    index('email_Id_index').on(otpModel.emailId)
])

export default otpModel; 