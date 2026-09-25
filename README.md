# Smart Attendance System (ESP32 + RFID + DS1302 + LCD + Google Sheets)

A complete smart attendance system using **ESP32**, **MFRC522 RFID**, **DS1302 RTC** (Rtc by Makuna library), **16x2 I2C LCD**, **buzzer**, and **tactile buttons** for user registration. Attendance logs are automatically sent to **Google Sheets**.

## Features
- RFID card scanning for attendance
- Card registration with name input via buttons
- Real-time clock (DS1302) with NTP sync on boot
- LCD shows **Name + Date + Time** only (no welcome messages)
- Success / Error buzzer tones
- Idle screen shows big **"LEETA"**
- Data logged to Google Sheets (Name, Date, Time)
- Local storage of registered users in LittleFS

## Hardware Required
| Component              | Quantity | Notes                          |
|------------------------|----------|--------------------------------|
| ESP32 Dev Board        | 1        | DOIT DevKit or similar         |
| MFRC522 RFID Reader    | 1        | + RFID cards/tags              |
| DS1302 RTC Module      | 1        | With battery recommended       |
| 16x2 I2C LCD           | 1        | Address usually 0x27           |
| Buzzer                 | 1        | Active or passive              |
| Tactile Buttons        | 3        | Mode, Up, Down                 |
| Jumper wires + Breadboard | -     |                                |

## Wiring Diagram

### MFRC522 RFID
| RFID Pin | ESP32 GPIO |
|----------|------------|
| SDA/SS   | 5          |
| SCK      | 18         |
| MOSI     | 23         |
| MISO     | 19         |
| RST      | 17         |
| 3.3V     | 3.3V       |
| GND      | GND        |

### DS1302 RTC
| RTC Pin  | ESP32 GPIO |
|----------|------------|
| CLK/SCLK | 25         |
| DAT/IO   | 26         |
| RST/CE   | 27         |
| VCC      | 3.3V       |
| GND      | GND        |

### I2C LCD (16x2)
| LCD Pin  | ESP32 GPIO |
|----------|------------|
| SDA      | 21         |
| SCL      | 22         |
| VCC      | 5V         |
| GND      | GND        |

### Buzzer
| Buzzer   | ESP32 GPIO |
|----------|------------|
| +        | 32         |
| -        | GND        |

### Buttons (with INPUT_PULLUP)
| Button   | ESP32 GPIO |
|----------|------------|
| Mode/Select | 33      |
| Up       | 34         |
| Down     | 35         |

> Connect one side of each button to the GPIO and the other side to GND.

## Google Sheets Setup (Very Important)

1. Create a new Google Sheet.
2. In **Row 1** put these headers:  
   `Name` | `Date` | `Time`
3. Go to **Extensions → Apps Script**.
4. Delete any existing code and paste the content from `google_apps_script.js`.
5. Click **Deploy → New deployment**.
6. Select type: **Web app**.
7. Execute as: **Me**.
8. Who has access: **Anyone**.
9. Click **Deploy** and **copy the Web App URL**.
10. Paste that URL into the Arduino code (`GOOGLE_SCRIPT_URL`).

## Arduino IDE Setup

1. Install **Arduino IDE**.
2. Add ESP32 board support:  
   File → Preferences → Additional Boards Manager URLs:  
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
3. Tools → Board → Boards Manager → search **esp32** → Install.
4. Install these libraries (Library Manager):
   - **MFRC522** by Miguel Balboa
   - **Rtc by Makuna**
   - **LiquidCrystal_I2C** by Frank de Brabander
5. Select board: **ESP32 Dev Module**.

## How to Use

### Normal Mode
- Scan a registered card → LCD shows Name + Date + Time + success beep → data sent to Google Sheets.
- Scan unknown card → "Unknown Card" + error beep.

### Registration Mode
1. Press **Mode** button → LCD shows "Reg Mode: Scan Card".
2. Scan the new RFID card.
3. Use **Up / Down** to change the current character.
4. Press **Mode** to confirm the character and move to the next.
5. After finishing the name, press **Mode** again to save.
6. Press **Mode** once more to exit registration mode.

### Idle Screen
After 10 seconds of inactivity the LCD shows:

```
LEETA
```

## File Structure
```
Smart_Attendance_System/
├── README.md
├── Smart_Attendance_System.ino
└── google_apps_script.js
```

## Future Ideas
- Add relay for door lock
- Anti-duplicate scan (ignore same card within 1 minute)
- Web interface for registration instead of buttons
- OLED display upgrade
- Battery backup indicator

---

**Author:** LEETA00  
**License:** MIT
