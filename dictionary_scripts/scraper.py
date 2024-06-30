from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import json

path = '/Users/slice/Downloads/chromedriver-win64/chromedriver.exe'
service = Service(executable_path=path)
driver = webdriver.Chrome(service=service)

alphabet = 'abcdefghijklmnopqrstuvwxyz'
affixes = []


for letter in alphabet:
    site = f"https://openmd.com/dictionary/word-parts/{letter}"
    driver.get(site)
    td = driver.find_elements(by="xpath", value="//td")


    for i in range(0, len(td), 2):
        word = td[i].text
        definition = td[i+1].text

        if word.startswith("-") and '[suffix]' in definition:
            definition = definition.removesuffix(' [suffix]')
            affixes.append({
                'word': word,
                'definition': definition,
                'affix': 'suffix'
            })

        elif word.endswith("-"):
            if '[prefix]' in definition:
                definition = definition.removesuffix(' [prefix]')
            affixes.append({
                'word': word,
                'definition': definition,
                'affix': 'prefix'
            })

        elif '/' in word:
            affixes.append({
                'word': word,
                'definition': definition,
                'affix': 'prefix'
            })

        else:
            affixes.append({
                'word': word,
                'definition': definition,
                'affix': 'unknown'
            })

with open("dictionary/affixes.json", "w") as f:
    json.dump(affixes, f, indent=4)

driver.quit()
