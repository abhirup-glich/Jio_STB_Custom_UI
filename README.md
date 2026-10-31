# Jio_STB_Custom_UI

A specialized, lightweight application launch tester designed specifically for **Jio Set-Top Box (JMSD200Av2)** running **JioOS 25.1.9** via the built-in **JioSphere** browser.

## Current Baseline Status
| Application | Package ID | Current Status | Launch Mechanism |
| :--- | :--- | :--- | :--- |
| **YouTube** | `com.google.android.youtube.tv` | ✅ **Working** | Intent Scheme (`action.VIEW`, `scheme=https`) |
| **JioHotstar** | `in.startv.hotstar` | ✅ **Working** | Intent Scheme (`action.VIEW`, `scheme=https`) |
| **Prime Video** | `com.amazon.amazonvideo.livingroom` | ⚠️ **Investigating** | Testing 11 Dedicated Methods (Leanback, Component, Custom URI) |
| **Live TV+ / JioTV+** | `com.jio.media.jiotvplus` / STB | ⚠️ **Investigating** | Testing 17 Dedicated Methods (STB LiveTV, Leanback, Custom URI) |

---

## Key Updates & Features

### 1. Working Apps Maintained Unchanged
- **YouTube** and **JioHotstar** retain their exact verified intent parameters without any modification.

### 2. Multi-Method Matrices for Prime Video & JioTV+
- **Prime Video (11 Methods)**:
  - **P1**: Android TV Leanback Launcher Intent (`category=LEANBACK_LAUNCHER`)
  - **P2**: Explicit Component Intent (`com.amazon.ignition.IgnitionActivity`)
  - **P3**: Standard Launcher Intent (`category=LAUNCHER`)
  - **P4**: Package Action MAIN (Implicit)
  - **P5 - P7**: Custom URI Schemes (`primevideo://`, `aiv://`)
  - **P8**: Android App URI (`android-app://com.amazon.amazonvideo.livingroom`)
  - **P9**: Alternative Client Package (`com.amazon.avod.thirdpartyclient`)
  - **P10 - P11**: Deep Link Intent variants
- **Live TV+ / JioTV+ (17 Methods)**:
  - **J1 - J3**: JioTV+ (`com.jio.media.jiotvplus`) Leanback, Standard Launcher, and MAIN Action
  - **J4 - J6**: STB Live TV (`com.jio.media.stb.jiotv`) Leanback, Standard Launcher, and MAIN Action
  - **J7 - J9**: Alternative Jio packages (`com.jio.media.jiotv`, `com.jio.jioplay.tv`, `com.jio.media.stb.ondemand`)
  - **J10 - J14**: Custom URI schemes (`jiotvplus://`, `jiotv://`, `jioplay://`)
  - **J15 - J16**: Android App URIs (`android-app://`)
  - **J17**: Original test method comparison

### 3. Anti-Reload Intent Dispatch
- Prevents page reloads caused by unhandled HTTPS web fallbacks by using non-destructive anchor triggers and eliminating unnecessary fallback URL parameters.

### 4. Diagnostics & STB Verification Panel
- **Live Details**: Displays attempted package, exact intent URI, dispatch mechanism, and browser foreground/background state.
- **TV Feedback Recorder**: Buttons for `[✅ Native App Opened]`, `[⚠️ Partial / Webpage]`, and `[❌ Failed / Reload]`. Verdicts are saved in `localStorage` and indicated on each button tag.
- **Real-Time Event Stream**: Timestamped logging of remote key inputs, launch dispatches, and browser visibility transitions.

### 5. Full Jio Remote Navigation
- **2D Spatial Direction Engine**: Smooth navigation across grids and panels using standard directional geometry.
- **Key Support**: Handles D-pad Up (`19`/`38`), Down (`20`/`40`), Left (`21`/`37`), Right (`22`/`39`), OK (`13`/`23`/`66`), and Back (`8`/`27`/`4`/`461`/`10009`).
- **Smart Back Key**: Returns focus to the top quick launch grid when navigating sub-panels.

### 6. Zero Modifications Required
- 100% client-side web application.
- No root, no ADB commands, and no system APK modifications needed.

---

## How to Test
1. Host `index.html` via GitHub Pages or any HTTPS web server.
2. Open the URL in the **JioSphere** browser on your Jio STB (JMSD200Av2).
3. Test the methods individually using the remote D-pad and record which one successfully opens the native Android TV application.
