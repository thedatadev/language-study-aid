import pandas as pd
import pickle
import json
import os

from pprint import pprint
import time

JLPT_levels = [1, 2, 3, 4, 5]

def load_vocabulary():
    vocab = []
    for level in JLPT_levels:
        vocab_filepath = f"../jlpt/n{level}/vocab.json"
        with open(vocab_filepath) as f:
            level_vocab = json.load(f)
            for word in level_vocab:
                word['level'] = level
                vocab.append(word)
    return vocab

def load_corpus():
    easy = pd.read_csv("../resources/nhk_news/easy_articles.csv")
    hard = pd.read_csv("../resources/nhk_news/hard_articles.csv")
    corpus = pd.concat([easy, hard], ignore_index=True)
    return corpus

if __name__ == "__main__":

    vocab = load_vocabulary()
    corpus = load_corpus()
    postings_lists = [ list() for _ in range(len(vocab)) ] 

    start = time.time()

    # postings lists
    for _, row in corpus.iterrows():
        text = row['texts']
        doc_id = row['reddit_ids']
        
        for idx, word in enumerate(vocab):

            if (len(word['kanji']) and word['kanji'] in text) or \
                (len(word['hiragana']) and word['hiragana'] in text):

                postings_lists[idx].append(doc_id)

    # word to index
    word_to_idx = dict()
    for idx, word in enumerate(vocab):
        # map kanji->idx
        if len(word['kanji']):
            if not word['kanji'] in word_to_idx:
                word_to_idx[word['kanji']] = []
            word_to_idx[word['kanji']].append(idx)
        # map hiragana->idx
        if len(word['hiragana']):
            if not word['hiragana'] in word_to_idx:
                word_to_idx[word['hiragana']] = []
            word_to_idx[word['hiragana']].append(idx)


        
    end = time.time()

    print(f"Runtime: {end - start} seconds")

