import pandas as pd
import os

def load_NHK_dataset():
    # Load NHK dataset
    easy_path = os.path.abspath("../resources/nhk_news/easy_articles.csv")
    hard_path = os.path.abspath("../resources/nhk_news/hard_articles.csv")
    easy_news = pd.read_csv(easy_path)
    hard_news = pd.read_csv(hard_path)

    # Extract the article text
    easy_texts = easy_news['texts']
    hard_texts = hard_news['texts']
    easy_texts_size = len(easy_texts)
    hard_texts_size = len(hard_texts)

    # Label each as easy (0) or hard (1)
    EASY = 0
    HARD = 1
    easy_targets = pd.Series(easy_texts_size * [EASY])
    hard_targets = pd.Series(hard_texts_size * [HARD])

    # Merge the dataset
    # NOTE: ignore_index is used to allow index continuity 
    X = pd.concat([easy_texts,   hard_texts],   ignore_index=True)
    y = pd.concat([easy_targets, hard_targets], ignore_index=True)

    return X, y
