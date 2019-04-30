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

def retrieve(query=[]):

    postings_lists = load_postings_lists()
    word_to_idx = load_word_to_idx()
    results = []

    # retrieve postings lists for each word in query
    for word in query:
        if word in word_to_idx:
            indices = word_to_idx[word]
            for idx in indices:
                results.append(postings_lists[idx])

    # tally doc_id's
    doc_id_counts = {}
    for postings_list in results:
        for doc_id in postings_list:
            if not doc_id in doc_id_counts:
                doc_id_counts[doc_id] = 0
            doc_id_counts[doc_id] += 1

    # order doc_id's in desc. order of frequency
    sorted_doc_id_freqs = sorted([(doc_id, doc_id_counts[doc_id]) \
                                    for doc_id in doc_id_counts], \
                                        reverse=True, key=lambda x: x[1])

    # retrieve the documents for the top k most frequent doc_id's
    top_k = 10
    documents = [ get_document(doc_id=doc_id) for doc_id, _ in sorted_doc_id_freqs ]
    documents = documents[:top_k]

    return documents

def load_postings_lists():
    return []

def load_word_to_idx():
    return []

def get_document():
    return []

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

    # save to file w/ pickle
    with open(os.path.join(os.getcwd(), "postings-lists.pkl"), "wb+") as f:
        pickle.dump(postings_lists, f)

    with open(os.path.join(os.getcwd(), "word-to-idx.pkl"), "wb+") as f:
        pickle.dump(word_to_idx, f)
        
    end = time.time()

    print(f"Runtime: {end - start} seconds")

