import MeCab

sentences_filepath = "../wiki-dump-data/jawiki-sentences"
tokenized_sentences_filepath = "../wiki-dump-data/jawiki-sentences-tokenized"

# instantiate the tagger and specify which dictionary to use
tagger = MeCab.Tagger('-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd')

def tokenize(sentence):

    parsed = tagger.parse(sentence)
    *parsed, EOS = parsed.splitlines() # NOTE: last item is always a EOS token
    tokens = [ chunk.split('\t')[0] for chunk in parsed ]
    return tokens


def tokenize_sentences():

    with open(sentences_filepath) as sentences:
        with open(tokenized_sentences_filepath, "w+") as out:
            for idx, sentence in enumerate(sentences):

                tokens = tokenize(sentence)

                out.write(' '.join(tokens))

                if (idx + 1) % 10_000 == 0 and idx != 0:
                    print(f"{idx+1} sentences reached")


if __name__ == "__main__":

    tokenize_sentences()