from urllib.request import urlopen
from bs4 import BeautifulSoup
from sys import exit
import json


def get_grammar(level):
    # Fetch the page
    url = f"http://www.tanos.co.uk/jlpt/jlpt{level}/grammar/"
    html_doc = urlopen(url)
    if not html_doc:
        exit(f"Unable to fetch grammarulary page for level {level}")

    # Parse the HTML
    soup = BeautifulSoup(html_doc, 'html.parser')

    # Extract the grammar table
    grammar_table = soup.find(id='contentright').find_all('table')[1].find_all('tr')[1:]

    # Extract the data from each row
    grammar = [row.find('td').text for row in grammar_table]
    return grammar

if __name__ == "__main__":

    # Range of JLPT proficiency levels
    JLPT_levels = [1, 2, 3, 4, 5]

    # Download grammar page for each level (N1-N5)
    for level in JLPT_levels:
        grammar = get_grammar(level)

        # Save grammar to file
        filepath = f"../jlpt/n{level}/grammar.json"
        with open(filepath, "w+") as f:
            f.write(json.dumps(grammar))
        print(f"Finished downloading page for JLPT N{level}")

