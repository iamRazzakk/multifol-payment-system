import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });





export default {
    // paystack
    paystack: {
        secretKey: process.env.PAYSTACK_SECRET_KEY,
        paymentSuccess: process.env.paymentSuccess,
        PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL
    }
};