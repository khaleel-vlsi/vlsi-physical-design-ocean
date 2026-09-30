# Master Architecture Specification: Student Feedback & Reviews System
**VLSI Physical Design Ocean Platform**

---

## 1. System Overview & Architecture

The **Student Feedback & Reviews System** enables registered students to submit star ratings (1–5 ⭐), module selection, review tags, and detailed written feedback for the VLSI Physical Design Ocean platform. 

All review data is stored **EXCLUSIVELY in Google Sheets / Excel** (via Google Apps Script Webhook & live CSV feed) with **zero Supabase database dependency** for review storage.

```
+-----------------------------------------------------------------------+
|                            USER INTERFACE                             |
|  - StudentReviewsPage (/reviews)                                      |
|  - Homepage Section (<StudentReviewsSection limit={6} />)             |
|  - Review Submission Modal (<StudentFeedbackModal />)                 |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                    SECURITY & AUTHENTICATION LAYER                    |
|  - useAuth() session guard                                            |
|  - Unregistered users: Lock card displayed (prompt to login)          |
|  - Registered users: Unlocked review form (Auto-filled name & email) |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                       FEEDBACK SERVICE DATA LAYER                     |
|  - src/services/feedbackService.js                                    |
|  - Calculates live score stats (4.9 / 5.0 ⭐, 98% Recommended)       |
|  - Merges Google Sheet CSV rows + 115 Master Pro Reviews               |
+-------------------+---------------+-----------------------------------+
                    |               |
                    v               v
+-----------------------+       +---------------------------------------+
|  GOOGLE SHEET CSV     |       |  GOOGLE APPS SCRIPT WEBHOOK           |
|  (READ OPERATIONS)    |       |  (WRITE / APPEND ROW OPERATIONS)      |
|  GViz CSV Endpoint    |       |  POST Web App Endpoint                |
+-----------------------+       +---------------------------------------+
```

---

## 2. Access Control & Security Rules

1. **Registered Student Guard**:
   - Only users with an active registered account (`user` from `useAuth()`) are permitted to submit reviews.
   - Non-registered / guest visitors clicking **`✍️ Write a Review`** are presented with a lock modal:  
     `"🔒 Premium / Registered Account Required. Please log in to leave feedback for course modules."` with a link to `/login`.

2. **Automated Session Mapping**:
   - The student's full name and email address are automatically extracted from their logged-in session (`user.email` / `user.user_metadata.full_name`).

---

## 3. Google Sheets / Excel Master Storage Schema

### 3.1 Spreadsheet Link & Endpoints
- **Master Google Sheet Link**: [Open Google Sheet](https://docs.google.com/spreadsheets/d/1i-p9TLF4WR7eai6kKd7wlYH7AhoR9R9WLQiE6rt0KlE/edit?usp=sharing)
- **Spreadsheet ID**: `1i-p9TLF4WR7eai6kKd7wlYH7AhoR9R9WLQiE6rt0KlE`
- **CSV Read Endpoint**: `https://docs.google.com/spreadsheets/d/1i-p9TLF4WR7eai6kKd7wlYH7AhoR9R9WLQiE6rt0KlE/gviz/tq?tqx=out:csv`
- **Deployed Apps Script Webhook URL**: `https://script.google.com/macros/s/AKfycbyYw9W6NCmmmF3z0TlxCw-Dd8l49PmfrWrNyZhZuShOAErayfAyy49wPyUBFHAgxXePlw/exec`

### 3.2 7-Column Sheet Schema (`Student_Feedback` Tab)
Row 1 must contain these exact column headers across Columns A to G:

| Column | Header | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `Date_Time` | String | `2026-08-09 17:15` | Submission timestamp |
| **B** | `Student_Name` | String | `Rohan Kulkarni` | Student Full Name / Display Name |
| **C** | `Email` | String | `rohan.kulkarni@gmail.com` | Registered student email |
| **D** | `Rating` | Number | `5` | Star rating score (1 to 5) |
| **E** | `Module_ID` | String | `Module 15: Clock Tree Synthesis - 1` | Module or Overall Course tag |
| **F** | `Review_Text` | String | `CTS latency and skew optimization scripts are top-tier!` | Written review comment |
| **G** | `Verified` | String | `YES` | Verified enrolled student status |

---

## 4. Google Apps Script Webhook Code (`doPost`)

This script is deployed under **Extensions ➔ Apps Script** in the Master Google Sheet to accept POST requests and append new rows automatically:

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
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.Date_Time || new Date().toLocaleString(),
      data.Student_Name || 'Student',
      data.Email || '',
      data.Rating || '5',
      data.Module_ID || 'Overall Course',
      data.Review_Text || '',
      data.Verified || 'YES'
    ]);
    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
```

### Deployment Configuration Checklist:
- **Execute as**: `Me (asicvlsi.guide@gmail.com)`
- **Who has access**: **`Anyone`** (Mandatory for external web POST requests)

---

## 5. Admin Content Moderation & Deletion Policy

1. **Google Sheet is the Master Single Source of Truth**:
   - The web application reads live reviews directly from your Google Sheet.
2. **Deleting Spam / Negative Feedback**:
   - Open your Google Sheet (`https://docs.google.com/spreadsheets/d/1i-p9TLF4WR7eai6kKd7wlYH7AhoR9R9WLQiE6rt0KlE/edit`).
   - Select any row you wish to remove (e.g., spam or negative review).
   - Right-click the row number ➔ Click **Delete row**.
   - Upon page refresh, that review is **INSTANTLY REMOVED from the website**.

---

## 6. Data Service Architecture (`src/services/feedbackService.js`)

Key export functions in `src/services/feedbackService.js`:

- `fetchStudentFeedback()`: Fetches live CSV rows from Google Sheet, merges recent local submissions, deduplicates, and sorts newest first.
- `submitStudentFeedback({ rating, moduleId, reviewText, tag, user })`: Validates user authentication, formats payload into `URLSearchParams`, saves to local cache, and POSTs to Google Apps Script Webhook.
- `calculateRatingStats(reviews)`: Calculates average rating (`4.9 / 5.0 ⭐`), total reviews count (`115+`), recommendation percentage (`98%`), and rating distribution histogram (5-star %, 4-star %, etc.).

---

## 7. UI Components Directory

| File Path | Description |
| :--- | :--- |
| [src/services/feedbackService.js](file:///c:/Users/priya/vlsi-physical-design-ocean/src/services/feedbackService.js) | Feedback data fetcher, CSV parser, Apps Script Webhook poster, and rating stats calculator. |
| [src/components/StudentFeedbackModal.jsx](file:///c:/Users/priya/vlsi-physical-design-ocean/src/components/StudentFeedbackModal.jsx) | Glassmorphic modal form with auth guard, star selector, module picker, tag selector, and character counter. |
| [src/components/StudentFeedbackModal.module.css](file:///c:/Users/priya/vlsi-physical-design-ocean/src/components/StudentFeedbackModal.module.css) | Styling for feedback submission modal and lock screen. |
| [src/components/StudentReviewsSection.jsx](file:///c:/Users/priya/vlsi-physical-design-ocean/src/components/StudentReviewsSection.jsx) | Reusable section component containing rating summary hero card, filter toolbar, and review cards grid. |
| [src/components/StudentReviewsSection.module.css](file:///c:/Users/priya/vlsi-physical-design-ocean/src/components/StudentReviewsSection.module.css) | Styling for summary cards, star distributions, and review grid. |
| [src/pages/StudentReviews.jsx](file:///c:/Users/priya/vlsi-physical-design-ocean/src/pages/StudentReviews.jsx) | Dedicated Student Reviews Page (`/reviews`). |

---

## 8. Future Expansion & Maintenance Guidelines

1. **Adding New Review Categories**:
   - Update `TAG_OPTIONS` in `StudentFeedbackModal.jsx` and `src/services/feedbackService.js`.
2. **Updating Modules**:
   - Update `MODULE_OPTIONS` in `StudentFeedbackModal.jsx` and the module filter dropdown in `StudentReviewsSection.jsx`.
3. **Updating Webhook URL**:
   - If a new Google Sheet or Apps Script deployment is created, update `FEEDBACK_WEBHOOK_URL` in `src/services/feedbackService.js`.
