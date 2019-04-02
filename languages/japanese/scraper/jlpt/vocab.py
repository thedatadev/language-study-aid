from urllib.request import urlopen
from bs4 import BeautifulSoup
from sys import exit
import json

def get_vocab(level):
    # Fetch the page
    url = f"http://www.tanos.co.uk/jlpt/jlpt{level}/vocab/"
    html_doc = urlopen(url)
    if not html_doc:
        exit(f"Unable to fetch vocabulary page for level {level}")

    # Parse the HTML
    soup = BeautifulSoup(html_doc, 'html.parser')

    # Store all vocab entries
    vocab = []

    # Extract the vocab table
    vocab_table = soup.find(id='contentright').find_all('table')[1].find_all('tr')[1:]

    # Extract the data from each row
    for row in vocab_table:
        kanji, hiragana, english = row.find_all('td')
        new_entry = {
            "kanji": kanji.text,
            "hiragana": hiragana.text,
            "english": english.text
        }
        vocab.append(new_entry)

    return vocab

if __name__ == "__main__":

    # Range of JLPT proficiency levels
    JLPT_levels = [1, 2, 3, 4, 5]

    # Download vocab page for each level (N1-N5)
    for level in JLPT_levels:
        vocab = get_vocab(level)

        # Save vocab to file
        filepath = f"../../jlpt/n{level}/vocab.json"
        with open(filepath, "w+") as f:
            f.write(json.dumps(vocab))
        print(f"Finished downloading page for JLPT N{level}")

