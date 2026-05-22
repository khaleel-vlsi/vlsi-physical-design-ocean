
import os

path = r'c:\Users\priya\vlsi-physical-design-ocean\module_unzipped\MOSFETCMOS.html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

search_term = 'Overdrive'
idx = content.find(search_term)
if idx != -1:
    print(f"Found '{search_term}' at index {idx}")
    print(content[idx-100:idx+500])
else:
    print(f"'{search_term}' not found")
