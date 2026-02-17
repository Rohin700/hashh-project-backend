const SibApiV3Sdk = require('@getbrevo/brevo');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

let doMail = async (req, resp) => {
    const { name, contact, address, orderDetails } = req.body;
    
    if (!name || !contact || !address || !orderDetails) {
        return resp.json({status: false, message: "All fields are required" });
    }

    const sendSmtpEmail = {
        sender: {
            email: process.env.SENDER_EMAIL,
            name: "Order Website"
        },
        to: [
            {
                email: process.env.ADMIN_EMAIL,   // YOUR email
                name: "Admin"
            }
        ],
        subject: "🛒 New Order Received",
        htmlContent: `
            <h2>New Order Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Order:</strong> ${orderDetails}</p>
            <br/>
            <p>Please process this order.</p>
        `
    };

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        resp.json({status:true, message: "Order sent successfully ✅"});
    } catch (error) {
        console.error("Brevo Error:", error);
        resp.json({status:false, message: "Failed to send order ❌"});
    }
}

module.exports = {doMail};