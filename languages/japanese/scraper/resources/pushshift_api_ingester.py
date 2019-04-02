import argparse
import requests
import json
import time
import nhk_news_extracter

def months_to_seconds(months):
    return months * 30 * 24 * 60 * 60

def pushshift_api_endpoint():
    return PUSHSHIFT_API_BASE_URL + f"?size={EXTRACT_BATCH_SIZE}&subreddit={SUBREDDIT_NAME}&before={EPOCH_TIME_INTERVAL_END}&after={EPOCH_TIME_INTERVAL_START}"

def pushshift_api_make_request():
    response = requests.get(pushshift_api_endpoint())
    return json.loads(response.text)

# See Pushshift documentation last accessed 29/01/2019 @ https://pushshift.io/api-parameters/ 
PUSHSHIFT_API_BASE_URL = "https://api.pushshift.io/reddit/search/submission"
SUBREDDIT_NAME = "NHKEasyNews"
EXTRACT_BATCH_SIZE = 250
CURRENT_EPOCH_TIME = int(time.time())
EPOCH_TIME_INTERVAL = months_to_seconds(months=1)
EPOCH_TIME_INTERVAL_END = CURRENT_EPOCH_TIME 
EPOCH_TIME_INTERVAL_START = EPOCH_TIME_INTERVAL_END - EPOCH_TIME_INTERVAL # Going back in time, so subtract interval

# Initial batch extraction
data = pushshift_api_make_request()

# Subsequent batch extraction until no more to extract
while data['data']:

    EPOCH_TIME_INTERVAL_END = EPOCH_TIME_INTERVAL_START
    EPOCH_TIME_INTERVAL_START -= EPOCH_TIME_INTERVAL

    data = pushshift_api_make_request()

print("Extraction complete")