import numpy as np
import matplotlib.pyplot as plt


articles_filepath = "../wiki-dump-data/jawiki-articles"
sentences_filepath = "../wiki-dump-data/jawiki-sentences"

article_length_lower_bound = 50
article_length_upper_bound = 700

def measure_lengths(filepath):
    lengths = []
    try:
        with open(filepath, "r") as wiki:
            for idx, article in enumerate(wiki):
                lengths.append(len(article))
                if (idx + 1) % 10000 == 0 and idx != 0:
                    print(f"{idx + 1} lengths reached")
            print("Statistics:")
            print(f"Min value: {min(lengths)}")
            print(f"Max value: {max(lengths)}")
    except:
        print("ERROR: Could not measure lengths")

    return lengths

def plot_lengths(filepath):

    x = measure_lengths(filepath)

    if len(x):
        try:

            n, bins, patches = plt.hist(x, bins=range(0, 200, 10), range=(0, 200))

            plt.xlabel('Sentence Lengths')
            plt.ylabel('Sentence Count')
            plt.title('Histogram of Sentence Lengths in the Japanese Wiki (jawiki)')
            plt.show()
            
        except:
            print("ERROR: Could not display plot of lengths")

    else:
        print("No plot displayed")

def segment_into_sentences(input_filepath, output_filepath):

    jawiki_sentence_delimiter = "。"

    with open(input_filepath) as input_file:
        with open(output_filepath, "w+") as output_file:
            for idx, article in enumerate(input_file):
                if article_length_lower_bound < len(article) < article_length_upper_bound:

                    sentences = article.split(jawiki_sentence_delimiter)

                    for sentence in sentences:
                        output_file.write(sentence + "\n")

                    if (idx + 1) % 100 == 0 and idx != 0:
                        print(f"{idx + 1} articles reached")


if __name__ == "__main__":

    # plot_lengths(articles_filepath)

    # segment_into_sentences(articles_filepath, sentences_filepath)

    plot_lengths(sentences_filepath)