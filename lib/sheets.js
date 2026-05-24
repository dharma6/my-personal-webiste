import { google } from 'googleapis';

// Lazily initialise the Sheets client — only runs once per server lifecycle
let sheetsClient = null;

function getClient() {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

/**
 * Appends one conversation turn to the monitoring sheet.
 * Columns: Timestamp | User message | Lilly response | Page
 */
export async function logConversation(userMessage, lillyResponse, page = '/') {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return; // silently skip if not configured

  const sheets = getClient();
  const timestamp = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamp, userMessage, lillyResponse, page]],
    },
  });
}
