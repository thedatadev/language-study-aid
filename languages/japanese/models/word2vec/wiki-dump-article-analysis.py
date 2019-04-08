import numpy as np
import matplotlib.pyplot as plt


articles_filepath = "../wiki-dump-data/jawiki-articles"

article_length_lower_bound = 50
article_length_upper_bound = 700

def measure_article_lengths():
    lengths = []
    try:
        with open(articles_filepath, "r") as wiki:
            for idx, article in enumerate(wiki):
                lengths.append(len(article))
                if (idx + 1) % 10000 == 0 and idx != 0:
                    print(f"{idx + 1} articles reached")
            print("Statistics:")
            print(f"Min value: {min(lengths)}")
            print(f"Max value: {max(lengths)}")
    except:
        print("ERROR: Could not measure lengths of articles")

    return lengths

def plot_article_lengths():

    x = measure_article_lengths()
    
    if len(x):
        try:

            n, bins, patches = plt.hist(x, bins=range(0, 500, 10), range=(0, 500))

            plt.xlabel('Article Lengths')
            plt.ylabel('Article Count')
            plt.title('Histogram of Article Lengths in the Japanese Wiki (jawiki)')
            plt.axis([article_length_lower_bound, article_length_upper_bound, 0.0, float(3_000_000)])
            plt.show()
            
        except:
            print("ERROR: Could not display plot of article lengths")
            print("This is what the lengths look like:")
            print(x)

    else:
        print("No plot displayed")

def segment_into_sentences():

    jawiki_sentence_delimiter = "。"
    sentences_filepath = "../wiki-dump-data/jawiki-sentences"

    with open(articles_filepath) as articles:
        with open(sentences_filepath, "w+") as out:
            for idx, article in enumerate(articles):
                if article_length_lower_bound < len(article) < article_length_upper_bound:

                    sentences = article.split(jawiki_sentence_delimiter)

                    for sentence in sentences:
                        out.write(sentence + "\n")

                    if (idx + 1) % 100 == 0 and idx != 0:
                        print(f"{idx + 1} articles reached")


if __name__ == "__main__":

    # plot_article_lengths()

    segment_into_sentences()