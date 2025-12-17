const axios = require("axios");
require("dotenv").config();

async function sendWhatsAppMessage({ to, templateName, params }) {
  const token = process.env.META_WA_TOKEN;
  const phoneNumberId = process.env.META_WA_PHONE_NUMBER_ID;
  const apiVersion = process.env.META_WA_API_VERSION || "v19.0";

  if (!token || !phoneNumberId) {
    throw new Error("Missing WhatsApp API credentials in env");
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: Object.values(params).map((value) => ({
            type: "text",
            text: String(value),
          })),
        },
      ],
    },
  };

  console.log("WA payload:", JSON.stringify(body, null, 2));

  try {
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("WhatsApp message sent:", res.data);
    return res.data;
  } catch (err) {
    console.error("WhatsApp API Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { sendWhatsAppMessage };
