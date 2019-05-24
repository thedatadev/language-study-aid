let start = new Date();

const fs = require('fs');
const path = require('path');

function read(filepath) {
  const file = fs.readFileSync(filepath);
  return JSON.parse(file.toString())
}

const corpusFilepath = path.join(__dirname, "jlpt", "corpus.json");
const corpus = read(corpusFilepath);

const levels = ["n1", "n2", "n3", "n4", "n5"];
const jlpt = {};
levels.forEach(level => {

  jlpt[level] = {};
  const vocabFilepath = path.join(__dirname, "jlpt", level, "vocab.json");
  const vocab = read(vocabFilepath);

  if (vocab) {
    // TODO: handle falsey vocab better

    vocab.forEach(entry => {

      for (let docID in corpus) {
        let doc = corpus[docID];
        let searchTerms = [entry.hiragana, entry.kanji];
        searchTerms.forEach(term => {
          // if (doc.text === undefined) {
          //   console.log(`Level: ${level} Entry: ${Object.keys(entry)} Doc: ${docID} Content: ${Object.keys(corpus[docID])}`);
          // }
          if (doc.text !== undefined && doc.text.includes(term)) {
            if (!Object.keys(jlpt[level]).includes(term)) {
              jlpt[level][term] = [];
            }
            jlpt[level][term].push(docID);
          }
        });
      }

    });

  }

});

// Save the JLPT index
const saveFilepath = path.join(__dirname, "save", "jlpt-index.json");
fs.writeFileSync(saveFilepath, JSON.stringify(jlpt));


let end = new Date();

console.log(`Runtime: ${end.getSeconds() - start.getSeconds()} seconds`);
