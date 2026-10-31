import os
import time
from playwright.sync_api import sync_playwright

os.makedirs('screenshots', exist_ok=True)
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
html_path = 'file:///' + os.path.abspath('index.html').replace('\\', '/')

print('Starting Playwright test with Chrome at:', chrome_path)
print('Testing URL:', html_path)

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=chrome_path,
        headless=True,
        args=['--no-sandbox', '--disable-gpu']
    )
    context = browser.new_context(
        viewport={'width': 1920, 'height': 1080},
        device_scale_factor=1
    )
    page = context.new_page()

    # 1. Main cinematic home screen
    page.goto(html_path)
    page.wait_for_timeout(1500)
    page.screenshot(path='screenshots/01_home_screen.png')
    print('Captured 01_home_screen.png')

    # 2. App dock with 4th logo focused (Prime Video)
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(250)
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(250)
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(500)
    page.screenshot(path='screenshots/02_dock_fourth_app.png')
    print('Captured 02_dock_fourth_app.png')

    # 3. My Favourites selection
    page.keyboard.press('ArrowDown')
    page.wait_for_timeout(600)
    page.screenshot(path='screenshots/03_favourites_selection.png')
    print('Captured 03_favourites_selection.png')

    # 4. Mood card deck
    page.keyboard.press('ArrowDown')
    page.wait_for_timeout(600)
    page.screenshot(path='screenshots/04_mood_deck.png')
    print('Captured 04_mood_deck.png')

    # 5. Card flying left (Nope discard)
    page.keyboard.press('ArrowLeft')
    page.wait_for_timeout(160) # capture mid-flight
    page.screenshot(path='screenshots/05_card_flying_left.png')
    print('Captured 05_card_flying_left.png')
    page.wait_for_timeout(400) # wait for landing

    # 6. Poster reel mid-shuffle
    page.keyboard.press('ArrowRight') # Yes / Shuffle
    page.wait_for_timeout(1000) # capture mid-spin
    page.screenshot(path='screenshots/06_reel_mid_shuffle.png')
    print('Captured 06_reel_mid_shuffle.png')

    # 7. Final poster selected & 8. Three-second countdown
    page.wait_for_timeout(2000) # wait for settle and countdown
    page.screenshot(path='screenshots/07_final_poster_selected.png')
    print('Captured 07_final_poster_selected.png')
    page.screenshot(path='screenshots/08_countdown.png')
    print('Captured 08_countdown.png')

    # Cancel back to mood deck
    page.keyboard.press('Backspace')
    page.wait_for_timeout(500)

    # 9. Poster carousel at first index
    page.keyboard.press('ArrowDown')
    page.wait_for_timeout(600)
    page.screenshot(path='screenshots/09_poster_carousel_first.png')
    print('Captured 09_poster_carousel_first.png')

    # 10. Poster carousel after moving right
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(300)
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(500)
    page.screenshot(path='screenshots/10_poster_carousel_moved_right.png')
    print('Captured 10_poster_carousel_moved_right.png')

    browser.close()
    print('All 10 test screenshots captured successfully!')
