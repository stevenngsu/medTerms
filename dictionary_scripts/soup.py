import string
import requests
from bs4 import BeautifulSoup

for i in ["a"]:
    page = requests.get(f"https://openmd.com/dictionary/word-parts/{i}")
    soup = BeautifulSoup(page.content, "html.parser")
    print(soup)
