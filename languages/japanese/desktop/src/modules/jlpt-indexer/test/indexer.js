const fs = require('fs');
const path = require('path');

const corpus = [
  {
    "title": "Placeholder title",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
  },
  {
    "title": "Placeholder title",
    "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    "title": "Placeholder title",
    "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    "title": "Placeholder title",
    "text": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
];

// Initialise JLPT index
const jlpt = {
  "N1": [{}, {}],
  "N2": [{}, {}]
}

// Read in corpus
const corpusFilepath = path.join(__dirname, "corpus.json");

const levels = ["n1", "n2", "n3", "n4", "n5"];
const jlpt = {};

levels.forEach(level => {
  const vocabFilepath = path.join(__dirname, "jlpt", level, "vocab.json");
  const vocabFile = fs.readFileSync(vocabFilepath);
  // TODO: check if vocabFile is falsey
  const vocabJSON = JSON.parse(vocabFile);
  jlpt[level] = vocabJSON;
});

// Perform index construction
Object.keys(jlpt).forEach(level => {

  jlpt[level] = {};

  Object.keys(jlpt[level]).forEach(word => {

    let hiragana = word.hiragana;
    let kanji = word.kanji;

    for (let docID in corpus) {

      let doc = corpus[docID];

      let searchTerms = [hiragana, kanji];

      searchTerms.forEach(term => {
        if (doc.text.includes(term)) {
          if (!Object.keys(jlpt[level]).includes(term)) {
            jlpt[level][term] = [];
          }
          jlpt[level][term].push(docID);
        }
      });

    }

  });
});

// Save file
// ...
