const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

let currentH1 = 'Unknown';
let questionCounts = {};

$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const text = $(el).text().trim();
  
  if (tagName === 'h1') {
    if (text.length > 0) {
      currentH1 = text;
      questionCounts[currentH1] = 0;
    }
  } else if (tagName === 'h3') {
    if (currentH1 && questionCounts[currentH1] !== undefined) {
      questionCounts[currentH1]++;
    }
  }
});

console.log('Question Counts per Section:');
console.log(JSON.stringify(questionCounts, null, 2));
