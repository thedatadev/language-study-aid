const fs = require('fs');
const path = require('path');

const jlptIndexFilepath = path.join(__dirname, "save", "jlpt-index.json");
const jlptIndexFile = fs.readFileSync(jlptIndexFilepath);
const jlptIndex = JSON.parse(jlptIndexFile.toString());

console.log(Object.keys(jlptIndex).length);
// console.log(Object.keys(jlptIndex["n1"]).length);
// console.log(jlptIndex["n1"]["相"]);
