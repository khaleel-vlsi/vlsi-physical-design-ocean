/**
 * send-drip-emails.js
 * Automated email campaign for users who registered but did not purchase.
 * Run via GitHub Actions cron or manual command.
 */



// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "https://ygcvcyoynmyrplwrpisd.supabase.co";
// Must use the SERVICE ROLE key to bypass RLS in the background script
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FROM_EMAIL = process.env.FROM_EMAIL || "VLSI Physical Design Ocean <noreply@vlsiphysicaldesignocean.com>";
const SITE_URL = process.env.SITE_URL || "https://vlsiphysicaldesignocean.com";

// HTML Email Layout Wrapper (Oceanic Design Theme)
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
          <div class="greeting">${greeting}</div>
          ${paragraphs.map(p => `<p class="text">${p}</p>`).join('')}
          
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
            <a href="${buttonUrl}" target="_blank" class="cta-button">${buttonText}</a>
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

// Send Email via Resend API or Nodemailer SMTP
async function sendEmail({ to, subject, html }) {
  if (process.env.RESEND_API_KEY) {
    console.log(`[Email] Sending via Resend API...`);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html
      })
    });
    if (!res.ok) {
      throw new Error(`Resend API error: ${await res.text()}`);
    }
    console.log(`[Email] Successfully sent to ${to} via Resend.`);
  } else if (process.env.SMTP_HOST) {
    console.log(`[Email] Sending via SMTP (${process.env.SMTP_HOST})...`);
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      html
    });
    console.log(`[Email] Successfully sent to ${to} via SMTP.`);
  } else {
    console.log(`[Email] [MOCK MODE - NO EMAIL CREDENTIALS] Would send to ${to}:\nSubject: ${subject}`);
  }
}

// Call Supabase REST API
async function callSupabase(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const headers = {
    'apikey': SUPABASE_SERVICE_ROLE_KEY || '',
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY || ''}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase API error on ${path}: Status ${response.status} - ${errorText}`);
  }
  return response;
}

// Main execution logic
async function run() {
  console.log('==================================================');
  console.log(`[Drip Campaign] Starting cron job run: ${new Date().toISOString()}`);
  console.log('==================================================');

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[Warning] SUPABASE_SERVICE_ROLE_KEY is not defined. Script will run in DRY-RUN mode for database updates.');
  }

  try {
    // 1. Fetch profiles
    console.log('[DB] Fetching profiles to scan for unpaid or expired users...');
    let profiles = [];
    
    if (SUPABASE_SERVICE_ROLE_KEY) {
      // Query all user profiles to process both unpaid registrations and expired renewals
      const res = await callSupabase('profiles');
      profiles = await res.json();
    } else {
      console.log('[DB] [DRY RUN] Simulating profiles fetch (generating mock profiles)...');
      profiles = [
        {
          id: 'mock-user-123',
          email: 'test-student@example.com',
          full_name: 'Test Student',
          course_active: false,
          created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
          drip_1hour_sent: false,
          drip_4day_last_sent: null,
          course_expiry: null,
          renewal_email_sent: false
        },
        {
          id: 'mock-user-456',
          email: 'test-student-2@example.com',
          full_name: 'Test Student 2',
          course_active: false,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          drip_1hour_sent: true,
          drip_4day_last_sent: null,
          course_expiry: null,
          renewal_email_sent: false
        },
        {
          id: 'mock-user-789',
          email: 'test-student-3@example.com',
          full_name: 'Test Student 3',
          course_active: true,
          created_at: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000).toISOString(), // 190 days ago
          drip_1hour_sent: true,
          drip_4day_last_sent: null,
          course_expiry: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // expired 10 days ago
          renewal_email_sent: false
        }
      ];
    }

    console.log(`[DB] Found ${profiles.length} user profile(s) to process.`);
    const now = new Date();

    for (const profile of profiles) {
      const email = profile.email;
      const name = profile.full_name || 'VLSI Aspirant';
      const createdAt = new Date(profile.created_at);
      
      if (!email) {
        console.log(`[Skip] Profile ID ${profile.id} has no email address.`);
        continue;
      }

      const nowTime = now.getTime();

      // Check 1: Renewal for Expired Users (course access has expired)
      const hasExpiry = !!profile.course_expiry;
      const expiryTime = hasExpiry ? new Date(profile.course_expiry).getTime() : null;
      const isExpired = hasExpiry && expiryTime <= nowTime;

      if (isExpired && !profile.renewal_email_sent) {
        console.log(`[Action Required] Sending renewal invitation email to expired user ${email}...`);
        
        const subject = "Renew your premium access to VLSI Physical Design Ocean!";
        const greeting = `Hi ${name},`;
        const paragraphs = [
          "We hope you enjoyed your 6 months (180 days) of premium access to the Advanced VLSI Physical Design Ocean course.",
          "Your premium access has now expired, but your learning journey doesn't have to stop here! By renewing your subscription today, you will restore full access to all 57 modules, STA/CTS/PnR scripting labs, commercial tool tutorials, and mock interviews.",
          "Remember: when you renew, you secure free access to all future updates, new modules, and advanced scripting flows at no extra cost. Keep your access active so you don't miss any of these benefits!"
        ];
        const buttonText = "Renew Premium Course Access";
        const buttonUrl = `${SITE_URL}/login`;

        const html = getEmailHtml(subject, greeting, paragraphs, buttonText, buttonUrl);

        try {
          await sendEmail({ to: email, subject, html });

          // Update database
          if (SUPABASE_SERVICE_ROLE_KEY) {
            await callSupabase(`profiles?id=eq.${profile.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                renewal_email_sent: true
              })
            });
            console.log(`[DB] Updated renewal_email_sent to true for ${email}.`);
          } else {
            console.log(`[DB] [DRY RUN] Would update renewal_email_sent to true for ${email}.`);
          }
        } catch (err) {
          console.error(`[Error] Failed to process renewal email for ${email}:`, err);
        }
        continue; // Skip further checks if they are expired
      }

      // Check 2: Unpaid Registered Users (never purchased, course_active is false/null)
      const isPaid = profile.course_active === true;
      if (!isPaid && !isExpired) {
        const elapsedHours = (now - createdAt) / (1000 * 60 * 60);
        const elapsedDays = (now - createdAt) / (1000 * 60 * 60 * 24);

        console.log(`[User Check] ${email}: Created ${elapsedHours.toFixed(2)} hours ago. 1-hour sent: ${profile.drip_1hour_sent}, 4-day last sent: ${profile.drip_4day_last_sent}`);

        // Case A: User registered > 1 hour ago and 1-hour drip hasn't been sent yet
        if (elapsedHours >= 1.0 && !profile.drip_1hour_sent) {
          console.log(`[Action Required] Sending 1-hour benefits email to ${email}...`);
          
          const subject = "Unlock Advanced VLSI Physical Design: Don't miss these premium benefits!";
          const greeting = `Hi ${name},`;
          const paragraphs = [
            "Thank you for registering on VLSI Physical Design Ocean! We noticed you haven't unlocked the premium modules yet.",
            "This course is designed to take you from digital design basics all the way to advanced physical design methodologies used by top semiconductor giants.",
            "Here is a summary of what you get when you unlock the full course:"
          ];
          const buttonText = "Unlock Premium Course Access Now";
          const buttonUrl = `${SITE_URL}/login`;

          const html = getEmailHtml(subject, greeting, paragraphs, buttonText, buttonUrl);

          try {
            await sendEmail({ to: email, subject, html });

            // Update database
            if (SUPABASE_SERVICE_ROLE_KEY) {
              await callSupabase(`profiles?id=eq.${profile.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                  drip_1hour_sent: true,
                  drip_4day_last_sent: now.toISOString()
                })
              });
              console.log(`[DB] Updated drip_1hour_sent to true for ${email}.`);
            } else {
              console.log(`[DB] [DRY RUN] Would update drip_1hour_sent to true for ${email}.`);
            }
          } catch (err) {
            console.error(`[Error] Failed to process 1-hour email for ${email}:`, err);
          }
        }
        
        // Case B: User has received the 1-hour email, remains unpaid, and needs 4-day reminders
        else if (profile.drip_1hour_sent) {
          let shouldSend4Day = false;
          
          if (profile.drip_4day_last_sent) {
            const lastSentDate = new Date(profile.drip_4day_last_sent);
            const daysSinceLastDrip = (now - lastSentDate) / (1000 * 60 * 60 * 24);
            if (daysSinceLastDrip >= 4.0) {
              shouldSend4Day = true;
              console.log(`[Action Required] Sending 4-day reminder. Last email was sent ${daysSinceLastDrip.toFixed(2)} days ago.`);
            }
          } else {
            // If drip_4day_last_sent is not set, use created_at + 4 days as the benchmark
            if (elapsedDays >= 4.04) {
              shouldSend4Day = true;
              console.log(`[Action Required] Sending 4-day reminder. User registered ${elapsedDays.toFixed(2)} days ago and hasn't received a 4-day reminder yet.`);
            }
          }

          if (shouldSend4Day) {
            console.log(`[Action Required] Sending 4-day reminder email to ${email}...`);
            
            const subject = "Still thinking about VLSI Physical Design? Don't fall behind!";
            const greeting = `Hello ${name},`;
            const paragraphs = [
              "Just a quick reminder that your premium access to the Advanced VLSI Physical Design Ocean course is still waiting for you.",
              "In physical design, precision and practical scripts are everything. That's why we've prepared 57 high-fidelity modules and real-world scripting labs to help you stand out in the semiconductor industry.",
              "Don't miss out on these premium course benefits:"
            ];
            const buttonText = "Continue Learning & Unlock Access";
            const buttonUrl = `${SITE_URL}/login`;

            const html = getEmailHtml(subject, greeting, paragraphs, buttonText, buttonUrl);

            try {
              await sendEmail({ to: email, subject, html });

              // Update database
              if (SUPABASE_SERVICE_ROLE_KEY) {
                await callSupabase(`profiles?id=eq.${profile.id}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                    drip_4day_last_sent: now.toISOString()
                  })
                });
                console.log(`[DB] Updated drip_4day_last_sent to now for ${email}.`);
              } else {
                console.log(`[DB] [DRY RUN] Would update drip_4day_last_sent to now for ${email}.`);
              }
            } catch (err) {
              console.error(`[Error] Failed to process 4-day email for ${email}:`, err);
            }
          } else {
            console.log(`[Status] ${email} is not yet eligible for a 4-day reminder.`);
          }
        }
      }
    }

    console.log('==================================================');
    console.log('[Drip Campaign] Cron job run completed successfully.');
    console.log('==================================================');

  } catch (error) {
    console.error('[Error] Critical failure in drip campaign job:', error);
    process.exit(1);
  }
}

run();
