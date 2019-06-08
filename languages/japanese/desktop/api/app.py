from flask import Flask, jsonify, request
from flask_cors import CORS
from functools import reduce
import json
import os

app = Flask(__name__)
CORS(app)


# Global state
levels = ["n1", "n2", "n3", "n4", "n5"]



def load_postings():

    postings_filepath = os.path.join("..", "src", "modules", "jlpt-indexer", "save", "jlpt-index.json")
    
    with open(postings_filepath, "r") as f:

        postings = json.load(f)

        return postings



def find_postings(postings, query_terms):

    query_postings = list()

    for level in levels:

        for term in query_terms:

            if term in postings[level]:

                query_postings.append(postings[level][term])

    return query_postings



def merge_postings(query_postings):

    if len(query_postings) == 1:

        return query_postings[0]

    first_posting, *query_postings = query_postings

    merge = set(first_posting)

    for posting in query_postings:

        merge = merge.intersection(set(posting))

    return merge



def load_docs():

    docs_filepath = os.path.join("..", "src", "modules", "corpus-builder", "corpus.json")
    
    with open(docs_filepath, "r") as f:
        
        docs = json.load(f)

        return docs



def find_entries(merge, docs):

    entries = list()

    for docID in merge:

        docID = int(docID)

        if 0 <= docID < len(docs):

            entries.append(docs[docID])

    return entries



@app.route("/api", methods=['POST'])
def api():

    postings = load_postings()

    query_terms = request.json['query']

    query_postings = find_postings(postings, query_terms)

    merge = merge_postings(query_postings)

    docs = load_docs()

    entries = find_entries(merge, docs)

    return jsonify(entries=entries), 200


if __name__ == "__main__":
    app.run(port=3300)

    '''
    Demo request body:

    {
        "query": [ "世界", "日本" ]
    }
    
    '''

            

            

                



