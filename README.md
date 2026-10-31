# Jio_STB_Custom_UI — Master Rebuild

A cinematic, TV-first custom launcher and content discovery dashboard designed for **Jio Set-Top Box (JMSD200Av2)** running **JioOS 25.1.9** via the built-in **JioSphere** browser.

Built strictly according to the **"Your TV, Your Way"** reference: minimal, dark cinematic backdrop, floating dock, favourites character lineup, 3D stacked mood card deck with slot-machine reel, and trending OTT carousel.

---

## 8 Apps Floating Dock (Strictly No Netflix)

The main dock contains the exact 8 specified applications with floating logos, custom app glow, and dynamic quotes/taglines:

1. **JioTV+** (`jiotvplus://` native scheme — verified)
2. **JioHotstar** (`in.startv.hotstar` direct intent — verified)
3. **YouTube** (`com.google.android.youtube.tv` leanback intent — verified)
4. **Prime Video** (`app.primevideo.com` P10 deep link intent — verified)
5. **Hoichoi** (`com.viewlift.hoichoi` Android TV launcher)
6. **SonyLIV** (`com.sonyliv` Android TV launcher)
7. **ZEE5** (`com.graymatrix.did` Android TV launcher)
8. **Lionsgate Play** (`com.lionsgateplay.videoapp` Android TV launcher)

*(Netflix is strictly omitted throughout the UI, codebase, and sample content).*

---

## Key TV Sections

1. **Cinematic Hero Header**:
   - Real-time digital clock in the Outfit typeface (200 weight, 42sp).
   - Live temperature and weather icon from Open-Meteo (cached, offline safe).
   - System badge (`JMSD200Av2 · JioOS 25.1.9`).
   - Clean top-right quick controls for Search & Settings/Diagnostics.

2. **Floating App Dock**:
   - Single horizontal row of 8 brand logos sized by visual weight.
   - Dynamic rotating tagline above the dock for the active app.
   - Ambient backlight glow changing smoothly to match each app's brand color.

3. **My Favourites (Cinematic Character Lineup)**:
   - Front and back row character cut-outs (Patrick Jane, Walter White, Spider-Man, Sheldon Cooper, Master JD, The Flash).
   - Black-and-white / desaturated by default; the active selection turns to vibrant color, scales up, steps in front, and triggers an ambient backlight.
   - Background crossfades to that show's iconic scene (CBI bullpen, desert RV, NYC rooftop, Apartment 4A, metro station).

4. **Mood Card Deck ("Don't Have Time to Browse?")**:
   - 6 premium categories: *Comfort & Comedy* (`#F2B84B`), *Action & Adventure* (`#E5484D`), *Dark & Thriller* (`#9b51e0`), *Bengali Favourites* (`#00A896`), *Mind Games* (`#3B8E88`), and *Anything at All* (`#B8C0CC`).
   - 3D card deck with fanned posters (-9°, 0°, +9°) and peeking background cards.
   - **LEFT / Nope**: Card flies 42% screen left, tilts -16°, fades in 320ms, and the next card advances.
   - **RIGHT / OK / Yes**: Expands into the horizontal reel!

5. **Slot-Machine Poster Reel & Countdown**:
   - Horizontal poster strip spinning across 6 laps over 2.6 seconds with power deceleration.
   - Settles on the chosen title with a landing scale bounce and glowing border.
   - 3-second countdown progress bar with instant play (`OK`), spin again (`›`), or cancel (`‹ / Back`).

6. **Trending OTT Poster Carousel**:
   - Controlled `translate3d` horizontal track movement.
   - 2:3 high-res posters with gradient overlay, app badge, genre, and year.
   - Document body remains strictly fixed (`overflow: hidden; 100vw; 100vh;`) — zero page scroll drift.

7. **Dual-Mode Remote Input Controller**:
   - **Mode A (Hardware D-pad)**: Up, Down, Left, Right, OK, Back with default browser scrolling completely prevented.
   - **Mode B (Pointer Snapping)**: Invisible hit pad expansion (`.nav-item::before`), hover bridging, proximity focus snapping (within 80px), and on-screen `< nope` / `yes >` buttons.

8. **Developer Diagnostics Overlay**:
   - Hidden by default; toggled with the `D` key or the header settings button.
   - Telemetry monitoring: input mode, arrow detection, focus target, key/mouse logs, and intent dispatch status.

---

## Project Structure

```text
Jio_STB_Custom_UI/
├── assets/
│   ├── wallpapers/     # 1920x1080 cinematic dark backdrops
│   ├── logos/          # White transparent SVG brand logos (8 apps)
│   ├── characters/     # Favourites character portraits
│   ├── backdrops/      # Show scenes for background crossfades
│   ├── posters/        # 2:3 show posters for mood decks & carousel
│   └── reference/      # Extracted PDF reference breakdowns
├── css/
│   ├── styles.css      # Core TV shell, fixed viewport, layout
│   └── animations.css  # Discard, reel deceleration, glow pulses
├── js/
│   ├── media-data.js          # App registry, favourites, 6 moods, titles
│   ├── app-launcher.js        # Intent dispatch & anti-reload anchor click
│   ├── input-controller.js    # D-pad capture & pointer proximity snapping
│   ├── focus-manager.js       # Section transitions & stage translation
│   ├── mood-controller.js     # 3D stacked deck & nope/yes transitions
│   ├── shuffle-engine.js      # Slot-machine poster reel & 3s countdown
│   ├── carousel-controller.js # Horizontal poster strip translate3d
│   └── diagnostics.js         # Real-time event monitor HUD
├── index.html          # Main HTML5 TV shell
└── README.md
```

---

## How to Run on Jio STB

1. Deploy via **GitHub Pages** (or a local web server on your home network).
2. Open the URL in the **JioSphere** browser on your Jio STB (JMSD200Av2).
3. Navigate entirely using the Jio remote control.
