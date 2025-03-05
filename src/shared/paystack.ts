
import axios from "axios";
import config from "../config";


const PAYSTACK_SECRET_KEY = config.paystack.secretKey
const PAYSTACK_BASE_URL = config.paystack.PAYSTACK_BASE_URL;


export const createPaystackProduct = async (name: string, description: string, price: number) => {
    try {
        const res = await axios.post(
            `${PAYSTACK_BASE_URL}/product`,
            {
                name,
                description,
                price,
                currency: "NGN",
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        );
        return res.data;
    } catch (error) {
        throw new Error("Failed to create Paystack product");
    }
};





/**
 * Generate a payment link in Paystack
 * */
export const generatePaystackPaymentLink = async (amount: number, email: string) => {
    try {
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            {
                email,
                amount: amount * 100,
                currency: "NGN",
                reference: `pkg_${Date.now()}`,
                callback_url: "https://yourdomain.com/payment-success",
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response?.data?.data?.authorization_url;
    } catch (error) {
        throw new Error("Failed to generate Paystack payment link");
    }
};




// 


export const handlePaymentProcess = async (
    productName: string,
    productDescription: string,
    price: number,
    customerEmail: string
) => {
    try {
        const productDetails = {
            name: productName,
            description: productDescription,
            price: price,
        };

        const paymentDetails = {
            amount: price,
            email: customerEmail,
        };

        // Wait for both product creation and payment link generation to complete
        const [product, paymentLink] = await Promise.all([
            createPaystackProduct(productDetails.name, productDetails.description, productDetails.price),
            generatePaystackPaymentLink(paymentDetails.amount, paymentDetails.email),
        ]);

        console.log("✅ Product Created:", product);
        console.log("💳 Paystack Payment Link:", paymentLink);

        return { product, paymentLink };
    } catch (error: any) {
        console.error("❌ Error processing payment:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    }
};
