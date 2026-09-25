/**
 * Google Apps Script for Smart Attendance System
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Save
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL into the Arduino code
 */

function doGet(e) {
  try {
    var name = e.parameter.name || "Unknown";
    var date = e.parameter.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yy");
    var time = e.parameter.time || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:mm");

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Optional: prevent exact duplicate entries within the last 1 minute
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var lastData = sheet.getRange(lastRow, 1, 1, 3).getValues()[0];
      if (lastData[0] == name && lastData[1] == date && lastData[2] == time) {
        return ContentService.createTextOutput("Duplicate ignored");
      }
    }

    sheet.appendRow([name, date, time]);
    
    return ContentService.createTextOutput("OK: " + name + " logged");
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}
