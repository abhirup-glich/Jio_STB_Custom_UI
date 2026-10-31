# Jio_STB_Custom_UI

A specialized, lightweight custom application launcher and intent resolver designed specifically for **Jio Set-Top Box (JMSD200Av2)** running **JioOS 25.1.9** via the built-in **JioSphere** browser.

## Verified Applications Status (100% Working)

All 4 primary applications have been tested and verified on the actual Jio STB hardware with zero page reloads, zero system modifications, and without requiring root or ADB access:

| Application | Target Package | Verified Working Mechanism | Status |
| :--- | :--- | :--- | :--- |
| **YouTube** | `com.google.android.youtube.tv` | `intent://www.youtube.com/#Intent;scheme=https;package=com.google.android.youtube.tv;action=android.intent.action.VIEW;end` | ✅ **Working** |
| **JioHotstar** | `in.startv.hotstar` | `intent://www.hotstar.com/#Intent;scheme=https;package=in.startv.hotstar;action=android.intent.action.VIEW;end` | ✅ **Working** |
| **Prime Video** | `com.amazon.amazonvideo.livingroom` | `intent://app.primevideo.com/#Intent;scheme=https;package=com.amazon.amazonvideo.livingroom;action=android.intent.action.VIEW;end` (**P10 Alt Deep Link**) | ✅ **Working** |
| **Live TV+ / JioTV+** | `com.jio.media.jiotvplus` | `jiotvplus://` (**J10 Custom Scheme**) | ✅ **Working** |

---

## Technical Findings on JioOS 25.1.9

1. **Prime Video Launch Discovery**:
   - The generic web URL `www.primevideo.com` failed because Android TV builds do not register web intent filters for `www.primevideo.com`.
   - **Fix**: The deep link host `app.primevideo.com` (`P10`) successfully matches the internal intent filter of `com.amazon.amazonvideo.livingroom` and launches the native Android TV app.

2. **Live TV+ Launch Discovery**:
   - Web-based intents targeting `www.jio.com` failed and caused page reload fallbacks.
   - **Fix**: The custom URI scheme `jiotvplus://` (`J10`) triggers the Android package `com.jio.media.jiotvplus` directly and cleanly switches to live TV without browser reload.

---

## Features

- **Primary Dashboard**: 4 high-contrast tiles for instant remote launching.
- **Anti-Reload Dispatch**: Uses safe, non-destructive anchor triggers to prevent browser page reload/replacement.
- **Full Jio Remote Navigation**:
  - Spatial 2D direction engine for D-pad navigation.
  - Supports Up, Down, Left, Right, OK/Select (`13`/`23`/`66`), and Back (`4`/`8`/`27`/`461`/`10009`).
  - Pressing **Back** in sub-sections safely returns focus to the primary grid.
- **Diagnostics & Testing Suite**: Retains the complete matrix of 11 Prime Video methods and 17 Live TV+ methods with local storage verdict tracking for ongoing diagnostics.
- **100% Client-Side**: No server dependencies, no external libraries, and runs offline or over local networks.

---

## Usage
1. Host `index.html` via GitHub Pages or local HTTPS server.
2. Open the URL in the **JioSphere** browser on your Jio STB (JMSD200Av2).
3. Use the remote control arrow keys to select any app tile and press **OK** to launch.
