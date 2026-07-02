/**
 * send_test.js
 * Sends a real test email to khaleelmk143@gmail.com
 * Usage:
 *   $env:RESEND_API_KEY="re_..."
 *   node scratch/send_test.js
 *   
 *   OR SMTP:
 *   $env:SMTP_HOST="smtp.gmail.com"
 *   $env:SMTP_PORT="587"
 *   $env:SMTP_USER="your-email@gmail.com"
 *   $env:SMTP_PASS="your-app-password"
 *   node scratch/send_test.js
 */

import nodemailer from 'nodemailer';

const FROM_EMAIL = process.env.FROM_EMAIL || "VLSI Physical Design Ocean <noreply@vlsiphysicaldesignocean.com>";
const SITE_URL = "https://vlsiphysicaldesignocean.com";
const TEST_TO_EMAIL = "khaleelmk143@gmail.com";

function getEmailHtml(title, greeting, paragraphs, buttonText, buttonUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #0b0f19;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #e1e3e4;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(89, 218, 209, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .header {
          background: linear-gradient(135deg, #1a2a6c 0%, #0d1535 100%);
          padding: 30px;
          text-align: center;
          border-bottom: 2px solid #59dad1;
        }
        .header h1 {
          margin: 0;
          color: #59dad1;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
        }
        .greeting {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .text {
          font-size: 16px;
          margin-bottom: 24px;
          color: #c6c5d2;
        }
        .benefits-list {
          margin: 25px 0;
          padding-left: 20px;
        }
        .benefits-list li {
          margin-bottom: 12px;
          font-size: 15px;
          color: #e1e3e4;
          list-style: none;
          position: relative;
        }
        .benefits-list li::before {
          content: "✔";
          color: #59dad1;
          font-weight: bold;
          position: absolute;
          left: -20px;
        }
        .callout-box {
          background: rgba(89, 218, 209, 0.05);
          border: 1px dashed #59dad1;
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
        }
        .callout-title {
          font-size: 17px;
          font-weight: bold;
          color: #59dad1;
          margin-top: 0;
          margin-bottom: 10px;
        }
        .callout-text {
          font-size: 14.5px;
          color: #e1e3e4;
          margin: 0;
          line-height: 1.5;
        }
        .cta-container {
          text-align: center;
          margin: 35px 0 15px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #ff7f50;
          color: #ffffff !important;
          text-decoration: none;
          padding: 14px 30px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(255, 127, 80, 0.4);
          transition: all 0.3s ease;
        }
        .footer {
          background-color: #070a10;
          padding: 20px 30px;
          text-align: center;
          font-size: 12px;
          color: #8f909b;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer a {
          color: #59dad1;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌊 VLSI PHYSICAL DESIGN OCEAN</h1>
        </div>
        <div class="content">
          <div class="greeting">Hi Shaik Mahammad Khaleel,</div>
          <p class="text">Thank you for registering on VLSI Physical Design Ocean! We noticed you haven't unlocked the premium modules yet.</p>
          <p class="text">This course is designed to take you from digital design basics all the way to advanced physical design methodologies used by top semiconductor giants.</p>
          <p class="text">Here is a summary of what you get when you unlock the full course:</p>
          
          <ul class="benefits-list">
            <li><strong>57 Comprehensive Modules:</strong> Full learning path from basics to advanced physical design concepts.</li>
            <li><strong>Advanced STA, CTS, PnR:</strong> Practical, industry-standard knowledge of floorplanning, placement, clock tree synthesis, and timing.</li>
            <li><strong>Production-Level Scripts & Flows:</strong> Hands-on Tcl and Shell scripts designed for real EDA environments.</li>
            <li><strong>Commercial Tool Tutorials:</strong> Learn standard physical design flows using tools like Synopsys ICC2, Cadence Innovus, and PrimeTime.</li>
            <li><strong>Technical Interview Preparation:</strong> Curated interview Q&As and technical questions solved step-by-step.</li>
            <li><strong>Professional Certificate:</strong> Showcase your physical design credentials directly on your LinkedIn profile.</li>
          </ul>

          <div class="callout-box">
            <h4 class="callout-title">🌟 Locked-in Lifetime Updates & Added Benefits!</h4>
            <p class="callout-text">
              By joining our paid course today, you don't just unlock Modules 9 to 57. You also get <strong>all future course updates, new modules, scripting labs, and upcoming features absolutely free</strong>! The price will increase as more content is uploaded, but your price is locked forever once you purchase. Don't miss this opportunity to claim all future benefits!
            </p>
          </div>

          <p class="text" style="font-weight: bold; text-align: center; color: #59dad1; margin-top: 30px;">
            Get Full 6-Month Premium Access for just ₹449 (India) / $20 (International)!
          </p>

          <div class="cta-container">
            <a href="${SITE_URL}/login" target="_blank" class="cta-button">Unlock Premium Course Access Now</a>
          </div>
        </div>
        <div class="footer">
          <p>You received this email because you registered on our platform.</p>
          <p>&copy; 2026 VLSI Physical Design Ocean. All rights reserved.</p>
          <p><a href="${SITE_URL}/privacy">Privacy Policy</a> &bull; <a href="${SITE_URL}/contact">Support Desk</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmail() {
  const isRenewal = process.env.TEST_TYPE === 'renewal';
  const subject = isRenewal 
    ? "Renew your premium access to VLSI Physical Design Ocean!"
    : "Unlock Advanced VLSI Physical Design: Don't miss these premium benefits!";
    
  const paragraphs = isRenewal 
    ? [
        "We hope you enjoyed your 6 months (180 days) of premium access to the Advanced VLSI Physical Design Ocean course.",
        "Your premium access has now expired, but your learning journey doesn't have to stop here! By renewing your subscription today, you will restore full access to all 57 modules, STA/CTS/PnR scripting labs, commercial tool tutorials, and mock interviews.",
        "Remember: when you renew, you secure free access to all future updates, new modules, and advanced scripting flows at no extra cost. Keep your access active so you don't miss any of these benefits!"
      ]
    : [
        "Thank you for registering on VLSI Physical Design Ocean! We noticed you haven't unlocked the premium modules yet.",
        "This course is designed to take you from digital design basics all the way to advanced physical design methodologies used by top semiconductor giants.",
        "Here is a summary of what you get when you unlock the full course:"
      ];

  const buttonText = isRenewal ? "Renew Premium Course Access" : "Unlock Premium Course Access Now";

  const html = getEmailHtml(
    subject,
    "Hi Shaik Mahammad Khaleel,",
    paragraphs,
    buttonText,
    `${SITE_URL}/login`
  );

  if (process.env.RESEND_API_KEY) {
    console.log(`Sending via Resend API to ${TEST_TO_EMAIL}...`);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TEST_TO_EMAIL,
        subject,
        html
      })
    });
    if (!res.ok) {
      throw new Error(`Resend API error: ${await res.text()}`);
    }
    console.log(`Success! Real test email sent via Resend API to ${TEST_TO_EMAIL}.`);
  } else if (process.env.SMTP_HOST) {
    console.log(`Sending via SMTP to ${TEST_TO_EMAIL}...`);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TEST_TO_EMAIL,
      subject,
      html
    });
    console.log(`Success! Real test email sent via SMTP to ${TEST_TO_EMAIL}.`);
  } else {
    // If no credentials, use nodemailer test account (Ethereal) to generate a preview link!
    console.log("No credentials found. Generating Ethereal fake SMTP preview link...");
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from: '"VLSI Physical Design Ocean" <noreply@vlsiphysicaldesignocean.com>',
      to: TEST_TO_EMAIL,
      subject,
      html
    });

    console.log("==================================================");
    console.log(`Mock Email sent to: ${TEST_TO_EMAIL}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log("==================================================");
  }
}

sendEmail().catch(err => console.error("Error sending test email:", err));
