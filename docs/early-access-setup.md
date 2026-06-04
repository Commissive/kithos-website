# Early-access form backend

The "Get early access" form posts to `POST /api/early-access`
(`src/app/api/early-access/route.ts`). That route validates the submission and
forwards it to a **Google Apps Script web app** bound to a Google Sheet. The
script appends a row to the sheet **and** emails a notification — covering both
storage and alerting with no extra services or secrets in the app.

## 1. Create the Sheet

1. Create a new Google Sheet (e.g. "Kithos — Early Access").
2. In row 1, add headers:
   `Submitted At | Full name | Email | Company website | Role | Team size | Notes`

## 2. Add the Apps Script

In the Sheet: **Extensions → Apps Script**, replace `Code.gs` with:

```javascript
const NOTIFY_EMAIL = "hello@kithos.ai";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const expected = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (expected && body.secret !== expected) {
      return json_({ ok: false, error: "Unauthorized" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.fullName || "",
      body.email || "",
      body.companyWebsite || "",
      body.role || "",
      body.teamSize || "",
      body.helpWith || "",
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New early-access request: " + (body.fullName || "Unknown"),
      body:
        "Name: " + body.fullName + "\n" +
        "Email: " + body.email + "\n" +
        "Company: " + body.companyWebsite + "\n" +
        "Role: " + body.role + "\n" +
        "Team size: " + body.teamSize + "\n\n" +
        "Notes:\n" + body.helpWith,
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## 3. Set the shared secret

In Apps Script: **Project Settings → Script Properties → Add property**

- Name: `SHARED_SECRET`
- Value: a long random string (keep it for the next step)

## 4. Deploy as a web app

1. **Deploy → New deployment → Web app**.
2. Description: `early-access`.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. **Deploy**, authorize, and copy the **Web app URL** (ends in `/exec`).

## 5. Configure environment variables

Locally, copy `.env.example` to `.env.local` and fill in:

```
GOOGLE_SHEETS_WEBHOOK_URL=<the /exec URL from step 4>
EARLY_ACCESS_SHARED_SECRET=<the same SHARED_SECRET from step 3>
```

In production (Vercel): add the same two variables under
**Project → Settings → Environment Variables**, then redeploy.

## Notes

- If `GOOGLE_SHEETS_WEBHOOK_URL` is unset, the API returns `503` and the form
  shows a friendly error instead of silently dropping the submission.
- The route includes a honeypot field (`company_url`) to drop obvious bots.
- Whenever you change the Apps Script, create a **new deployment** (or "Manage
  deployments → edit → new version") for the change to take effect.
