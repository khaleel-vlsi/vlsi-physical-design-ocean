
from bs4 import BeautifulSoup

file_path = r'c:\Users\priya\vlsi-physical-design-ocean\src\pages\modules\module1_raw.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- IMAGES ---")
for img in soup.find_all('img'):
    src = img.get('src')
    # Find preceding text to identify location
    prev_text = ""
    prev = img.find_previous(['p', 'h1', 'h2', 'h3'])
    if prev:
        prev_text = prev.get_text().strip()
    print(f"src: {src}, after: {prev_text[:50]}")
