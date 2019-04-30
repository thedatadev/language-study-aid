import pandas as pd
import pickle
import json
import os

from pprint import pprint

JLPT_levels = [1, 2, 3, 4, 5]

###############  Loading files  ###############
def load_vocabulary():
    vocab = {}
    for level in JLPT_levels:
        vocab_filepath = f"../jlpt/n{level}/vocab.json"
        with open(vocab_filepath) as f:
            vocab[f"n{level}"] = json.load(f)
    return vocab

def load_corpus():
    root_dir = "../resources"
    # TODO: easy articles for now
    #       implement hard articles later and merge ontp easy articles
    df = load_file(root_dir, filename="/nhk_news/easy_articles.csv")
    return df

def load_file(root_dir, filename):
    filepath = os.path.join(root_dir, filename)
    df = pd.read_csv(filepath)
    return df


###############  Data structures  ###############

class TrieNode:
    def __init__(self):
        # each vocab must have a terminal node that stores a postings list
        self.postings_list = []
        self.next_characters = {}

    def insert_posting(self):
        # a postings list is an ordered linked list of document IDs e.g. nhk IDs
        pass

class Trie:
    def __init__(self):
        self.root = TrieNode()
        self.size = 0

    def __dict__(self):
        ''' Required for serialization '''
        pass

    def construct(self, dictionary):
        ''' Constructs the Trie index given a dictionary '''
        pass

    def insert_words_from_text(self, text, id):
        pass

    def insert_word(self):
        pass

    def lookup_word(self):
        '''
            1. Given a word, look it up in the Trie
            2. If it exists, return the node
            3. Call the 'insert_posting' method on the node to insert the document's ID
        '''
        pass


if __name__ == "__main__":

    # import all vocab (TODO: do grammar as well) file from jlpt n1-n5 folders
    vocab = load_vocabulary()

    # iterate over the nhk corpus, and scan each word in each article
    # corpus = load_corpus()
    # for _, row in corpus.iterrows():
    #     nhk_id = row['nhk_ids']
    #     text = row['texts']
    #     # if the word appears in the dictionary, record the article's nhk ID in its postings list
    #     index.insert_words_from_text(text, nhk_id)

    # create a trie index to store each vocab and its postings list
    # index = Trie()
    # index.construct(vocab)
        
    # create methods to serialize the trie into JSON
    # create methods to retrieve entries from the trie
    # create methods to perform postings list intersection
    # create method to preprocess/standardize words into dictionary form etc.


