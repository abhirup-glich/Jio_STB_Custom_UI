import os
import urllib.request

os.makedirs('assets/wallpapers', exist_ok=True)
os.makedirs('assets/logos', exist_ok=True)
os.makedirs('assets/posters', exist_ok=True)
os.makedirs('assets/backdrops', exist_ok=True)
os.makedirs('assets/characters', exist_ok=True)

# 1. Generate 8 clean white transparent SVG logos
logos = {
    'jiotv.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <text x="80" y="34" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Jio<tspan font-weight="900" fill="#ffffff">TV+</tspan></text>
</svg>""",
    'hotstar.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" width="170" height="50">
  <path d="M22 10 L25.5 20 L36 20.5 L28 27 L31 37 L22 31 L13 37 L16 27 L8 20.5 L18.5 20 Z" fill="#ffffff"/>
  <text x="42" y="33" font-family="'Outfit', sans-serif" font-size="26" font-weight="700" fill="#ffffff" letter-spacing="-0.5">hotstar</text>
</svg>""",
    'youtube.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" width="170" height="50">
  <rect x="10" y="11" width="40" height="28" rx="8" fill="#ffffff"/>
  <polygon points="26,19 36,25 26,31" fill="#000000"/>
  <text x="58" y="33" font-family="'Outfit', sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">YouTube</text>
</svg>""",
    'prime.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" width="170" height="50">
  <text x="85" y="29" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="25" font-weight="800" fill="#ffffff" letter-spacing="-0.5">prime video</text>
  <path d="M30 35 Q 85 45 140 35 Q 115 43 60 39 Z" fill="#ffffff"/>
  <polygon points="140,35 134,31 136,38" fill="#ffffff"/>
</svg>""",
    'hoichoi.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <text x="80" y="33" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">hoichoi</text>
</svg>""",
    'sonyliv.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <text x="80" y="33" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="0">SONY <tspan font-weight="900" font-style="italic">liv</tspan></text>
</svg>""",
    'zee5.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <circle cx="36" cy="25" r="16" stroke="#ffffff" stroke-width="2.5" fill="none"/>
  <text x="36" y="31" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="16" font-weight="900" fill="#ffffff">Z5</text>
  <text x="64" y="33" font-family="'Outfit', sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="1">ZEE5</text>
</svg>""",
    'lionsgate.svg': """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" width="170" height="50">
  <text x="85" y="24" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="1">LIONSGATE</text>
  <text x="85" y="39" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="12" font-weight="700" fill="#ffffff" letter-spacing="4">PLAY</text>
</svg>"""
}

for fname, content in logos.items():
    path = os.path.join('assets', 'logos', fname)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Wrote {path}')

# 2. Download or create wallpapers, character stills, and poster artwork
# Use reliable direct URLs with fallbacks
headers = {'User-Agent': 'Mozilla/5.0'}

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000:
        return
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            with open(target_path, 'wb') as f:
                f.write(content)
            print(f'Downloaded {target_path} ({len(content)} bytes)')
    except Exception as e:
        print(f'Failed to download {target_path}: {e}')

# Main 16:9 cinematic dark wallpaper (Doctor Doom style / dark cinematic 1080p composition)
download_file('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=85', 'assets/wallpapers/wallpaper.jpg')
download_file('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=85', 'assets/wallpapers/wallpaper_alt.jpg')

# Mood backdrops (16:9 dark text-free scenes)
backdrops = {
    'comfort.jpg': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&q=80',
    'action.jpg': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80',
    'thriller.jpg': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=80',
    'bengali.jpg': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80',
    'mindgames.jpg': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80',
    'anything.jpg': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80',
    'cbi_bullpen.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    'desert_rv.jpg': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=80',
    'apt_4a.jpg': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80',
    'nyc_rooftop.jpg': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
    'metro_station.jpg': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80',
    'cricket_stadium.jpg': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80'
}
for fname, url in backdrops.items():
    download_file(url, f'assets/backdrops/{fname}')

# Character portraits / cutouts for Favourites Lineup
characters = {
    'patrick_jane.png': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
    'walter_white.png': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85',
    'spiderman.png': 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&q=85',
    'sheldon.png': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=85',
    'master_jd.png': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=85',
    'the_flash.png': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=85'
}
for fname, url in characters.items():
    download_file(url, f'assets/characters/{fname}')

# Show Posters (2:3 aspect ratio)
posters = {
    'tbbt.jpg': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
    'office.jpg': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    'friends.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    'panchayat.jpg': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80',
    'gullak.jpg': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
    'john_wick.jpg': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
    'family_man.jpg': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
    'special_ops.jpg': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    'avengers.jpg': 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&q=80',
    'mirzapur.jpg': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
    'scam1992.jpg': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    'sacred_games.jpg': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    'paatal_lok.jpg': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80',
    'byomkesh.jpg': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    'eken_babu.jpg': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    'feluda.jpg': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
    'ballabhpurer.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    'mentalist.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    'sherlock.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    'severance.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    'breaking_bad.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    'master.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    'jiotv_epg.jpg': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    'cricket_live.jpg': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80'
}
for fname, url in posters.items():
    download_file(url, f'assets/posters/{fname}')

print('Asset builder completed successfully.')
