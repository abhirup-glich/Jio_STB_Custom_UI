# Jio_STB_Custom_UI

A cinematic, TV-first custom launcher and content discovery dashboard designed for **Jio Set-Top Box (JMSD200Av2)** running **JioOS 25.1.9** via the built-in **JioSphere** browser.

Inspired by the "Your TV, Your Way" design aesthetic: minimal, dark cinematic backdrop, floating dock, mood card decks, and slot-machine style show shuffle.

---

## 8 Apps Floating Dock (No Netflix)

The main dock contains the exact 8 requested applications with floating logos, custom app glow, and dynamic quotes/taglines:

1. **JioTV+** (`jiotvplus://` native scheme)
2. **JioHotstar** (`in.startv.hotstar` direct intent)
3. **YouTube** (`com.google.android.youtube.tv` leanback intent)
4. **Prime Video** (`app.primevideo.com` P10 deep link intent)
5. **Hoichoi** (`com.viewlift.hoichoi` Android TV launcher)
6. **SonyLIV** (`com.sonyliv` Android TV launcher)
7. **ZEE5** (`com.graymatrix.did` Android TV launcher)
8. **Lionsgate Play** (`com.lionsgateplay.videoapp` Android TV launcher)

*(Netflix is strictly omitted throughout the UI and codebase).*

---

## Key Features

1. **Cinematic Hero Header**:
   - Real-time digital clock in the Outfit typeface.
   - Live temperature and weather icon.
   - System badge (`JMSD200Av2 · JioOS 25.1.9`).
   - Clean top-right quick controls for Search & Settings.

2. **Floating App Dock**:
   - Single horizontal row of 8 brand logos with visual weight balancing.
   - Dynamic tagline and app description updating smoothly as you scroll across apps.
   - Ambient backlight glow changing to match each app's brand color.

3. **Card Shuffle Shows ("Don't Know What to Watch?")**:
   - 3D fanned mood deck cards (`Bengali Favourites`, `Trending Now`, `Action Night`, `Live TV & Sports`).
   - Slot-machine style rolling poster reel with spinning transitions.
   - Random title recommendation landing screen with genre, rating, synopsis, and instant launch button.
   - 4-second auto-launch progress bar with cancel/respin controls.

4. **Cinematic Poster Carousel**:
   - Horizontal poster browsing strip featuring top movies and series across Indian OTT platforms.
   - Smooth focus zoom, lighting elevation, and direct OTT app deep linking on click.

5. **Jio Remote Spatial Navigation**:
   - Full 2D geometric navigation with D-pad (`Up`, `Down`, `Left`, `Right`).
   - `OK / Select` triggers actions without double-tap repeat glitches.
   - `Back` safely returns focus to the main dock.
   - Web cursor is suppressed (`cursor: none`) for a pure native TV feel.

---

## How to Run on Jio STB
1. Host `index.html` via GitHub Pages or local HTTPS server.
2. Open the URL in the **JioSphere** browser on your Jio STB.
3. Control the entire launcher using only your Jio remote control.
