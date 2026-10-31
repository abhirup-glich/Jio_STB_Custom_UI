# Jio_STB_Custom_UI

A lightweight custom UI test tool designed for Jio Set-Top Box (JMSD200Av2) to run in the built-in **JioSphere** browser and test launching installed Android TV applications via Android intent URIs.

## Features
- **Remote Navigation**: Optimized for D-pad / STB remote arrow key navigation.
- **Intent Launch Testing**: Tests intent URI schemes (`android.intent.action.VIEW`) for:
  - **YouTube** (`com.google.android.youtube.tv`)
  - **Prime Video** (`com.amazon.amazonvideo.livingroom`)
  - **JioHotstar** (`in.startv.hotstar`)
  - **Live TV+ / JioTV+** (`com.jio.media.jiotvplus`)
- **Status & Diagnostics**: Live log reporting launch attempts and browser responses.
- **Website Fallback**: Option to test opening standard HTTPS URLs for each service.
- **Zero Installation**: Runs directly as an HTTPS web page without modifying device system files or requiring root access.

## Usage
1. Host `jiosphere_app_launch_test.html` on an HTTPS web server (e.g. GitHub Pages).
2. Open the URL in the JioSphere browser on your Jio STB.
3. Use the remote control arrow keys to navigate the tiles and press **OK** to test launching each app.
