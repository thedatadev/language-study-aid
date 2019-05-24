/*

File I/O to read a corpus

TODO: Fix CSV parsing exceptions for anomaly data

*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let docID = 0;


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
    if (docID === 45) {
      console.log(`Before split: ${row}`);
    }
    const delimiter = ",";
    return row.split(delimiter);
  }

  function extract(row) {
    if (docID === 45) {
      console.log(`Before extract: ${row}`);
    }
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
  let corpus = [];

  // Once the readline.Interface instance is created,
  // the most common case is to listen for the 'line' event:

  function strip(str) {
      return str.replace(/^\s+|\s+$/g, '');
  }

  rl.on('line', function(doc) {
      if (header) {
        // Skip header
        header = false;
      } else {
        // Add next document to corpus
        // if (strip(doc).length > 0) {
        //
        // }
        corpus.push(process(doc));
        docID++;
        // if (docID === 44) {
        //   console.log(doc);
        // }
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
