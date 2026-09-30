// scratch/simulate_webhook.js
import crypto from "crypto";

const WEBHOOK_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co/functions/v1/razorpay-webhook";
const WEBHOOK_SECRET = "ocean_web_secret_2026";

// Payload representing the order.paid event from your successful payment
const payload = {
  entity: "event",
  account_id: "acc_TFLhE",
  event: "order.paid",
  contains: ["order"],
  payload: {
    order: {
      entity: {
        id: "order_TFRnceJhRh6zek",
        entity: "order",
        amount: 49900,
        amount_paid: 49900,
        amount_due: 0,
        currency: "INR",
        receipt: "receipt_1784371814",
        status: "paid",
        attempts: 1,
        notes: {
          plan: "PLAN_499",
          user_id: "744f57e5-a6b8-475f-b006-7221a50a5b03"
        },
        created_at: 1784371814
      }
    }
  },
  created_at: 1784371814
};

const bodyString = JSON.stringify(payload);

// Generate the HMAC SHA256 signature using the secret
const signature = crypto
  .createHmac("sha256", WEBHOOK_SECRET)
  .update(bodyString)
  .digest("hex");

console.log("Generated Signature:", signature);

async function run() {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Razorpay-Signature": signature
      },
      body: bodyString
    });
    
    const text = await res.text();
    console.log("Response Status:", res.status);
    console.log("Response Body:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

run();
