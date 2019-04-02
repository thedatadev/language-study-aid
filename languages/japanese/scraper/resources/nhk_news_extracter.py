import re
import pandas as pd
from collections import deque

NHK_URL_PATTERN = r"https?://www3\.nhk\.or\.jp/news/easy/.+\.html"
BOT_SRC_PATTERN = r"\s\*I am a bot\* \| \[Source\]\(https://github\.com/babofitos/nhkeasynewsbot\.git\)"

def get_nhk_id(url):
    pattern = r"(https?://www3\.nhk\.or\.jp/news/easy/)([a-z]+[0-9]+)/([a-z]+[0-9]+)(\.html)"
    _, nhk_id, *_ = re.match(pattern, url).groups()
    return nhk_id

def is_valid_article_structure(opening_sentence, end_sentence):
    return re.match(NHK_URL_PATTERN, end_sentence) and \
           re.match(BOT_SRC_PATTERN, opening_sentence)

def extract_submissions(data):
    submissions = []
    for submission in data['data']:
        if "selftext" in submission:
            opening_sentence, *body, end_sentence = re.split(r"\n\n\&.+\n\n", submission['selftext'])
            if is_valid_article_structure(opening_sentence, end_sentence):
                submissions.append((submission['id'], submission['title'], body, opening_sentence), 
                                    get_nhk_id(opening_sentence), submission['created_utc'])
    return submissions

def serialize_submissions(submissions, nhk_level):

    reddit_ids, titles, texts, urls, nhk_ids, dates = zip(*submissions)

    submissions_df = pd.DataFrame({
        "reddit_ids": reddit_ids,
        "titles": titles,
        "texts": texts,
        "urls": urls,
        "nhk_ids": nhk_ids,
        "dates": dates
    })

    submissions_df.to_csv(f"nhk_{nhk_level}_submissions.csv")

