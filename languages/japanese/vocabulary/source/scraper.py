from bs4 import BeautifulSoup
from urllib.request import urlopen

def get_url(level):
    return f"http://www.tanos.co.uk/jlpt/jlpt{level}/vocab/"

urls = [ get_url(level) for level in range(1, 6) ]

url = urls[0]

html_doc = urlopen(url)

soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.prettify())

