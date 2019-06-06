const fs = require('fs');
const path = require('path');

const corpusFilepath = path.join(__dirname, "corpus.json");

const corpusFile = fs.readFileSync(corpusFilepath);
const corpus = JSON.parse(corpusFile.toString());

let article = corpus[0];
let title = article.title;
let text = article.text;

console.log(text);

// let idx = 45;
// console.log(corpus[idx]);

// let query = prompt(">> ");
// let idx;
// let msg = ""
//
// while (query !== "q") {
//
//   idx = query.toInt();
//   if (idx >= 0 && idx < corpus.length) {
//     msg = corpus[idx];
//   } else {
//     msg = `${idx} is out of range!`;
//   }
//
//   console.log(msg);
//
//   query = prompt(">> ")
//}
