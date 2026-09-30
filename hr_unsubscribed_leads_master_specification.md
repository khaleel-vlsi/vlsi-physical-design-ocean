# Master Architecture Specification: HR Unsubscribed Leads Automation
**VLSI Physical Design Ocean Platform**

---

## 1. System Overview & Purpose

The **HR Unsubscribed Leads Automation** system tracks **ALL UNIQUE students who register an account on the VLSI Physical Design Ocean platform up to the current hour but have not yet taken a paid subscription** (`profile.course_active !== true`).

### Key Guarantees:
1. **Strict Unique User Guarantee**: Google Apps Script checks Column C (`Email`). If an email already exists in the sheet, duplicate rows are **automatically blocked and skipped**.
2. **Auto-Filled Columns A-H**: Registration Date, Student Name, Email, Dial Code, Phone, Full Contact Phone, Country, and Subscription Status are filled automatically.
3. **Empty HR Columns I & J**: Column I (`HR_Outreach_Status`) and Column J (`HR_Notes`) are intentionally **LEFT BLANK** for your HR outreach team to type call updates and notes.

```
+-----------------------------------------------------------------------+
|                 TRIGGER 1: ON REGISTRATION IMMEDIATE SYNC             |
|  - Student fills Full Name, Email, Country & Phone Number             |
|  - Register.jsx (Supabase Auth SignUp)                                |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                 TRIGGER 2: 2-HOUR AUTOMATED SCHEDULER LOOP            |
|  - startTwoHourLeadScheduler(supabase) in AuthContext.jsx             |
|  - Runs every 2 hours (2 * 60 * 60 * 1000 ms)                         |
|  - Queries Supabase for ALL registered profiles where                 |
|    course_active === false OR course_active IS NULL                   |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                    UNSUBSCRIBED LEAD TRACKER                          |
|  - src/services/leadService.js (syncAllUnsubscribedLeads)             |
|  - Captures Full Contact Phone (+91-XXXXXXXXXX)                       |
|  - Flags Subscription Status: "Unsubscribed (Free User)"              |
|  - HR_Outreach_Status: "" (BLANK FOR HR TYPING)                        |
|  - HR_Notes: "" (BLANK FOR HR TYPING)                                  |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                HR GOOGLE SHEET WEBHOOK (DEDUPLICATED)                 |
|  - Checks Column C (Email) before appending                           |
|  - If Email already exists: SKIPS APPEND (Prevents Duplicates)        |
|  - If Email is new: Appends Unique Student Row                        |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                       HR TEAM OUTREACH WORKFLOW                       |
|  - HR opens Google Sheet                                              |
|  - Calls / WhatsApps student to explain platform features              |
|  - Types status directly into Column I (Outreach Status) & Column J   |
+-----------------------------------------------------------------------+
```

---

## 2. HR Leads Google Sheet Schema

Create a Google Sheet for HR Leads with these 10 Column Headers in **Row 1**:

| Column | Header Name | Example Value | Unique Key & Inputs |
| :--- | :--- | :--- | :--- |
| **A** | `Registration_Date_Time` | `2026-08-09 17:30` | Auto-filled by System |
| **B** | `Student_Name` | `Aditya Sharma` | Auto-filled by System |
| **C** | `Email` | `aditya.sharma@gmail.com` | **UNIQUE KEY (Used for Deduplication)** |
| **D** | `Country_Code` | `+91` | Auto-filled by System |
| **E** | `Phone_Number` | `9876543210` | Auto-filled by System |
| **F** | `Full_Contact_Phone` | `+91-9876543210` | Auto-filled by System |
| **G** | `Country` | `India` | Auto-filled by System |
| **H** | `Subscription_Status` | `Unsubscribed (Free User)` | Auto-filled by System |
| **I** | `HR_Outreach_Status` | *(BLANK)* | **Left Empty for HR Team to Type** |
| **J** | `HR_Notes` | *(BLANK)* | **Left Empty for HR Team to Type** |

---

## 3. Deduplicated Google Apps Script Webhook Code

Paste this code into **Extensions ➔ Apps Script** inside your HR Google Sheet:

```javascript
function doPost(e) {
  try {
    var data = e.parameter || {};
    if (e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        data = Object.assign({}, data, parsed);
      } catch (err) {}
    }
    
    var email = (data.Email || '').trim().toLowerCase();
    if (!email) {
      return ContentService.createTextOutput("Error: Missing Email");
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    // 🛡️ DEDUPLICATION GUARD: Check if Email already exists in Column C
    if (lastRow > 1) {
      var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (emails[i][0].toString().trim().toLowerCase() === email) {
          return ContentService.createTextOutput("Skipped: Duplicate Email");
        }
      }
    }
    
    // Append unique student lead row
    sheet.appendRow([
      data.Registration_Date_Time || new Date().toLocaleString(),
      data.Student_Name || 'Student',
      email,
      data.Country_Code || '+91',
      data.Phone_Number || '',
      data.Full_Contact_Phone || '',
      data.Country || 'India',
      data.Subscription_Status || 'Unsubscribed (Free User)',
      data.HR_Outreach_Status || '',
      data.HR_Notes || ''
    ]);
    return ContentService.createTextOutput("Success: Unique Lead Appended");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
```

---

## 4. Code Implementation Architecture

- [src/services/leadService.js](file:///c:/Users/priya/vlsi-physical-design-ocean/src/services/leadService.js):
  - `syncUnsubscribedLead()`: Syncs a single student lead with Columns I & J left empty.
  - `syncAllUnsubscribedLeads(supabase)`: Queries database for all unsubscribed registered student profiles up to the current hour and batch syncs them to the HR sheet.
  - `startTwoHourLeadScheduler(supabase)`: Automated timer running every 2 hours continuously in the background (`2 * 60 * 60 * 1000 ms`).
- [src/context/AuthContext.jsx](file:///c:/Users/priya/vlsi-physical-design-ocean/src/context/AuthContext.jsx): Initializes `startTwoHourLeadScheduler(supabase)` on application boot.
- [src/pages/Register.jsx](file:///c:/Users/priya/vlsi-physical-design-ocean/src/pages/Register.jsx): Triggers `syncUnsubscribedLead()` immediately upon successful registration.
