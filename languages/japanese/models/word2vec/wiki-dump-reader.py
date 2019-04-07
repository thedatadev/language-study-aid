from wiki_dump_reader import Cleaner, iterate
import xml.etree.ElementTree as etree
from html import unescape
from decorators import measure_runtime

wiki_filepath = "../wiki-dump-data/jawiki-latest-pages-articles.xml"
# wiki_filepath = "../wiki-dump-data/test.xml"
out_filepath = "../wiki-dump-data/jawiki-articles"

def clean_text(text):
    cleaner = Cleaner()
    text = unescape(text)
    text = cleaner.clean_text(text)
    text, _ = cleaner.build_links(text)
    text = unescape(text)
    return text

def log_file_count(count):
    if count % 10_000 == 0:
        print(f"{count} files have been parsed")

@measure_runtime
def read_files():

    file_count = 0

    with open(out_filepath, "w+") as out:

        for _, elem in etree.iterparse(wiki_filepath, events=['end']):

            if elem.tag.endswith("text"):

                text = elem.text

                if text:

                    out.write(clean_text(text))

                    file_count += 1
                    log_file_count(file_count)



    
if __name__ == "__main__":
    read_files()
