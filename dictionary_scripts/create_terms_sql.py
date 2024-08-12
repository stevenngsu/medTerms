import sqlite3
import os.path

database = sqlite3.connect("terms.db")
prefixes=[]
suffixes=[]

with open(json_file_path, 'r') as j:
     contents = json.load(j)


for i in range(0, len(contents)):
    word = contents[i]["word"]
    definition = contents[i]["definition"]
    
    # Set prefixes
    if contents[i]["affix"] == "prefix":
        if "(" in word and "/" in word and ")" in word:
            step1 = word.replace('(', '/')
            step2 = step1.replace(')', '')
            wordArray = step2.split('/')
            
            for i in range(step2.count('/')):
                prefix = wordArray[0] + wordArray[i + 1]
                prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                    })
                
                prefix = wordArray[0]
                prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                    })

        elif "/" in word:
            wordArray = word.split('/')
            for i in range(word.count('/')):
                prefix = wordArray[0] + wordArray[i + 1]
                prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                    })

                prefix = wordArray[0]
                prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                    })

        elif "-" in word and "(" in word and ")" in word:
            step1 = word.replace('(', '')
            step2 = step1.replace(')', '')
            newWord = step2.replace('-', '')

            prefix = newWord
            prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                })
            prefix = newWord[:-1]
            prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                })

        elif "-" in word:
            prefix = word[:-1]
            prefixes.append({
                    'prefix': prefix,
                    'definition': definition
                })
        else:
            print(f"{word} prefix not inserted")

    elif contents[i]["affix"] == "suffix":
        if "(" in word and ")" in word:
            step1 = word.replace(')', '')
            newWord = step1.replace('-', '')
            wordArray = newWord.split('(')
            
            suffix = wordArray[0] + wordArray[1]
            suffixes.append({
                    'suffix': suffix,
                    'definition': definition
                })

            suffix = wordArray[0]
            suffixes.append({
                    'suffix': suffix,
                    'definition': definition
                })
        
        elif "-" in word:
            suffix = word.replace('-', '')
            suffixes.append({
                    'suffix': suffix,
                    'definition': definition
                })

        else:
            print(f"{word} suffix not inserted")
    else:
        print(f"{word} general word not inserted")

# create json of prefixes
if not os.path.exists("side_dictionaries/prefix_dictionary.json"):
    with open("side_dictionaries/prefix_dictionary.json", "w") as f:
        json.dump(prefixes, f, indent=4)

# create json of suffixes
if not os.path.exists("side_dictionaries/suffix_dictionary.json"):
    with open("side_dictionaries/suffix_dictionary.json", "w") as f:
        json.dump(suffixes, f, indent=4)


with open('side_dictionaries/dictionary.json') as o:
    ojson = json.load(o)
alpha = 'abcdefghijklmnopqrstuvwxyz'

if not os.path.exists("main_dictionaries/ppsmedTerms_dictionary.json"):
    combined = []
    dupecheck = []

    for pre in prefixes:
        for p in prefixes:
            for suf in suffixes:
                word = pre["prefix"] + p["prefix"] + suf["suffix"]
                index = alpha.index(word[0])
                subdict = ojson[index]
                if word in subdict and word not in dupecheck:
                    definition = subdict[word]
                    dupecheck.append(word)
                    combined.append({
                        "word": word,
                        "definition": definition,
                        "prefix": pre["prefix"],
                        "prefix_definition": pre["definition"],
                        "root": p["prefix"],
                        "root_definition": p["definition"],
                        "suffix": suf["suffix"],
                        "suffix_definition": suf["definition"],
                    })

    # create prefix + root + suffix medical terms
    with open("main_dictionaries/ppsmedTerms_dictionary.json", "w") as f:
        json.dump(combined, f, indent=4)


if not os.path.exists("main_dictionaries/psmedTerms_dictionary.json"):
    combined = []
    dupecheck = []

    for pre in prefixes:
        for suf in suffixes:
            word = pre["prefix"] + suf["suffix"]
            index = alpha.index(word[0])
            subdict = ojson[index]
            if word in subdict and word not in dupecheck:
                definition = subdict[word]
                dupecheck.append(word)
                combined.append({
                    "word": word,
                    "definition": definition,
                    "prefix": pre["prefix"],
                    "prefix_definition": pre["definition"],
                    "suffix": suf["suffix"],
                    "suffix_definition": suf["definition"],
                    })

    # create prefix + suffix medical terms
    with open("main_dictionaries/psmedTerms_dictionary.json", "w") as f:
        json.dump(combined, f, indent=4)
