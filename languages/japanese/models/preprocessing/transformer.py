import torch
import MeCab
import gensim
import numpy as np
import pandas as pd

def tokenize(X):
    ''' Tokenize all articles in X '''
    tagger = MeCab.Tagger("-Owakati")
    return X.apply(lambda article: tagger.parse(article).split())

def embed(X):
    ''' Embed all articles in X '''
    model_path = "./word2vec/pretrained/word2vec.model.bin"
    model = gensim.models.Word2Vec.load(model_path)
    return X.apply(lambda article: np.array([model.wv[token] for token in article if token in model.wv]))

def filter_empty(X, y):
    ''' Filter out all empty articles '''
    non_empty_indices = [idx for idx, article in enumerate(X) if len(article) > 0]
    X = pd.Series([X[idx] for idx in non_empty_indices])
    y = pd.Series([y[idx] for idx in non_empty_indices])
    return X, y, non_empty_indices

def tensorize(X, y):
    X = [ torch.tensor(article) for article in X ]
    y = [ torch.tensor([category], dtype=torch.long) for category in y ]
    return X, y


def transform_dataset(X, y):

    # NOTE: required for RNN visual project
    tracker = {
        "tokenized": {
            "X": [],
            "y": []
        }
    }
    # 1. Tokenize each article
    X_tok = tokenize(X)

    # 2. Embed articles
    X_em = embed(X_tok)

    # 3. Filter empty articles
    X_fil, y_fil, non_empty_indices = filter_empty(X_em, y)

    # 4. Tensorize the data
    X_ten, y_ten = tensorize(X_fil, y_fil)

    tracker["tokenized"]["X"] = pd.Series([X_tok[idx] for idx in non_empty_indices])
    tracker["tokenized"]["y"] = pd.Series([y[idx] for idx in non_empty_indices])

    return X_ten, y_ten, tracker
