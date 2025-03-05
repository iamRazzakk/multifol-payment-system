import { handlePaymentProcess } from "../shared/paystack";
const paystackPaymentMethod = async () => {
    try {
        const result = await handlePaymentProcess(
            "Premium Plan",          // Product Name
            "Full access for 1 year", // Product Description
            5000,                    // Price in the smallest currency unit (NGN kobo in this case)
            "user@example.com"       // Customer Email
        );
        if (result) {
            const { product, paymentLink } = result;
            console.log("✅ Created Product:", product);
            console.log("💳 Paystack Payment Link:", paymentLink);
        } else {
            console.log("Failed to process payment: No result returned");
        }
    } catch (error) {
        console.log("Failed to process payment:", error);

    }
};
paystackPaymentMethod()