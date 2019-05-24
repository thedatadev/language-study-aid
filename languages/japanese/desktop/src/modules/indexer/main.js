/*

File I/O to read a corpus

*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function pipeline(input, ...fns) {
  /*

    Thread a single input through multiple
    single-arity functions

   */
  let out = input;
  let fn;
  for (idx in fns) {
    fn = fns[idx];
    out = fn(out);
  }
  return out;
}

function process(row) {
  /*

    Split a row by delimiter,
    then extract the desired
    column values

  */

  function split(row) {
    const delimiter = ",";
    return row.split(delimiter);
  }

  function extract(row) {
    //id,reddit_ids,titles,texts,urls,nhk_ids,dates
    const titles = 2;
    const texts = 3;
    const data = {
      title: row[titles],
      text: row[texts]
    }
    return data;
  }

  return pipeline(row,
                  split,
                  extract)
}

function buildCorpus() {
  /*

    Build an Array holding all documents in a corpus;
    Array indices also serve as docIDs

  */

  const filepath = path.join(__dirname, "corpus", "nhk", "easy_articles.csv");

  let rl = readline.createInterface({
      input: fs.createReadStream(filepath, 'utf8')
  });

  let header = true;
  let docID = 0;
  let corpus = [];

  // Once the readline.Interface instance is created,
  // the most common case is to listen for the 'line' event:
  rl.on('line', function(doc) {
      if (header) {
        // Skip header
        header = false;
      } else {
        // Add next document to corpus
        corpus.push(process(doc));
        docID++;
      }
  });

  rl.on('close', function() {
    // Write corpus to disk
    const corpusFilepath = path.join(__dirname, "corpus.json");
    fs.writeFileSync(corpusFilepath, JSON.stringify(corpus));
  });

}


(function main() {

  buildCorpus();

})();
