
from bs4 import BeautifulSoup

file_path = r'c:\Users\priya\vlsi-physical-design-ocean\src\pages\modules\module1_raw.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- HEADERS ---")
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    print(f"{h.name}: {h.get_text().strip()}")

print("\n--- IMAGES ---")
for img in soup.find_all('img'):
    print(f"src: {img.get('src')}, alt: {img.get('alt')}")
