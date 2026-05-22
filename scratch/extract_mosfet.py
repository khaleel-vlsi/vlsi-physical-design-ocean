
from bs4 import BeautifulSoup
import re
import os

def clean_text(text):
    # Remove excessive whitespace and newlines
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

file_path = r'c:\Users\priya\vlsi-physical-design-ocean\temp_MOSFETCMOS\MOSFETCMOS.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
body = soup.find('body')

content = []
current_section = None

# We'll iterate through all direct children of the body or main div
# In this specific HTML, it's often a div containing p tags.
container = body.find('div') if body.find('div') else body

for element in container.find_all(recursive=False):
    if element.name in ['h1', 'h2', 'h3', 'h4']:
        tag = element.name
        text = clean_text(element.get_text())
        id_val = element.get('id', '')
        content.append({'type': 'heading', 'tag': tag, 'text': text, 'id': id_val})
    
    elif element.name == 'p':
        # Check for images inside p
        imgs = element.find_all('img')
        if imgs:
            for img in imgs:
                src = img.get('src', '')
                if src:
                    # Map src to public path
                    src = src.replace('images/', '/assets/modules/mosfetcmos/')
                    content.append({'type': 'image', 'src': src, 'alt': img.get('alt', '')})
        
        text = clean_text(element.get_text())
        if text:
            content.append({'type': 'text', 'text': text})
            
    elif element.name == 'ul' or element.name == 'ol':
        items = [clean_text(li.get_text()) for li in element.find_all('li')]
        content.append({'type': 'list', 'tag': element.name, 'items': items})
    
    elif element.name == 'hr':
        content.append({'type': 'hr'})

# Output as a JSON-like format to a file so I can read it and convert to JSX
import json
output_path = r'c:\Users\priya\vlsi-physical-design-ocean\scratch\mosfet_extracted.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2)

print(f"Extracted {len(content)} elements to {output_path}")
