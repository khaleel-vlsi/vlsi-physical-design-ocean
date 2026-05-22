from html.parser import HTMLParser

class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.count = 0
    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            attrs_dict = dict(attrs)
            print(f"{self.count}: src={attrs_dict.get('src')}, alt={attrs_dict.get('alt')}")
            self.count += 1
            if self.count > 10:
                # We can't easily stop the parser without raising an exception
                pass

parser = ImageParser()
with open('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())
