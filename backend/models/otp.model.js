import { timestamp } from 'drizzle-orm/gel-core'
import {pgTable,varchar} from 'drizzle-orm/pg-core'
const otpModel = pgTable("otps",{
    id:serial("id").primaryKey(),
    emailId: varchar("email_Id",{length:255}).notNull(),
    otp:varchar("otp",{length:6}).notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    expiredAt:timestamp("expired_at").notNull()
})

export default otpModel; 