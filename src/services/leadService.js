// HR Lead Tracking & Unsubscribed Registered Student Sync Service
// Destination: Dedicated Google Sheet for HR Outreach

const HR_LEAD_WEBHOOK_URL_KEY = 'vlsi_ocean_hr_lead_webhook_url';
let HR_LEAD_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec';

/**
 * Set the Webhook URL for HR Leads Google Sheet
 */
export function setHrLeadWebhookUrl(url) {
  if (url) {
    HR_LEAD_WEBHOOK_URL = url;
    localStorage.setItem(HR_LEAD_WEBHOOK_URL_KEY, url);
  }
}

/**
 * Sync a single registered unsubscribed student lead to HR Google Sheet
 */
export async function syncUnsubscribedLead({ fullName, email, country, countryCode, phoneNumber }) {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const cleanPhone = (phoneNumber || '').replace(/\s+/g, '');
  const code = (countryCode || '+91').replace(/\+/g, '');
  const fullContact = `+${code}-${cleanPhone}`;

  const leadPayload = {
    Registration_Date_Time: formattedDate,
    Student_Name: fullName || email.split('@')[0],
    Email: email,
    Country_Code: countryCode || '+91',
    Phone_Number: cleanPhone,
    Full_Contact_Phone: fullContact,
    Country: country || 'India',
    Subscription_Status: 'Unsubscribed (Free User)',
    HR_Outreach_Status: '',
    HR_Notes: ''
  };

  console.log('Syncing Unsubscribed Student Lead for HR:', leadPayload);

  // Send to HR Google Sheet Webhook if configured
  const activeWebhook = HR_LEAD_WEBHOOK_URL || localStorage.getItem(HR_LEAD_WEBHOOK_URL_KEY);
  if (activeWebhook && !activeWebhook.includes('demo')) {
    try {
      const formData = new URLSearchParams();
      formData.append('Registration_Date_Time', formattedDate);
      formData.append('Student_Name', leadPayload.Student_Name);
      formData.append('Email', email);
      formData.append('Country_Code', countryCode || '+91');
      formData.append('Phone_Number', cleanPhone);
      formData.append('Full_Contact_Phone', fullContact);
      formData.append('Country', country || 'India');
      formData.append('Subscription_Status', leadPayload.Subscription_Status);
      formData.append('HR_Outreach_Status', '');
      formData.append('HR_Notes', '');

      await fetch(activeWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      console.log('Successfully synced lead to HR Google Sheet!');
    } catch (err) {
      console.warn('HR Lead Webhook post failed:', err);
    }
  }

  return leadPayload;
}

/**
 * Query all registered students up to current hour who have NOT taken a paid course subscription
 * and sync them into the HR Google Sheet
 */
export async function syncAllUnsubscribedLeads(supabase) {
  if (!supabase) return;
  try {
    console.log('[HR Leads] Fetching all unsubscribed students up to current hour...');
    
    // Query all profiles where course_active is false or null
    const { data: leads, error } = await supabase
      .from('profiles')
      .select('*')
      .or('course_active.eq.false,course_active.is.null');

    if (error) {
      console.warn('[HR Leads] Error querying profiles for HR sync:', error.message);
      return;
    }

    if (!leads || leads.length === 0) {
      console.log('[HR Leads] No unsubscribed student leads found.');
      return;
    }

    console.log(`[HR Leads] Found ${leads.length} unsubscribed students. Syncing to HR Sheet...`);

    for (const lead of leads) {
      if (!lead.email) continue;
      await syncUnsubscribedLead({
        fullName: lead.full_name,
        email: lead.email,
        country: lead.country,
        countryCode: lead.country_code,
        phoneNumber: lead.phone_number
      });
    }

    console.log('[HR Leads] 2-Hour Batch HR Lead Sync Completed Successfully!');
  } catch (err) {
    console.error('[HR Leads] Batch sync error:', err);
  }
}

let leadSchedulerStarted = false;

/**
 * Start 2-Hour Automated Scheduler Loop for syncing all unsubscribed leads to HR Google Sheet
 */
export function startTwoHourLeadScheduler(supabase) {
  if (leadSchedulerStarted || !supabase) return;
  leadSchedulerStarted = true;

  // Run initial sync on load
  syncAllUnsubscribedLeads(supabase);

  // Run automatically every 2 hours (2 * 60 * 60 * 1000 = 7,200,000 ms)
  setInterval(() => {
    console.log('[HR Leads] ⏰ 2-Hour Automated Timer Fired: Syncing unsubscribed students...');
    syncAllUnsubscribedLeads(supabase);
  }, 2 * 60 * 60 * 1000);
}
