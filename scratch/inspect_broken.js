import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

// Find elements by text
console.log('--- Inspecting Digital Electronics Question 100 ---');
$('h3').each((i, el) => {
  const text = $(el).text();
  if (text.includes('100. Final') || text.includes('takeaway')) {
    console.log('H3 tag:', $.html(el));
    let next = $(el).next();
    for (let j = 0; j < 5; j++) {
      if (next.length) {
        console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next));
        next = next.next();
      }
    }
  }
});

console.log('\n--- Inspecting Linux Question 9 ("Your job is slow only on one machine") ---');
$('h3').each((i, el) => {
  const text = $(el).text();
  if (text.includes('Your job is slow only on one machine')) {
    console.log('H3 tag:', $.html(el));
    let next = $(el).next();
    for (let j = 0; j < 5; j++) {
      if (next.length) {
        console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next));
        next = next.next();
      }
    }
  }
});

console.log('\n--- Inspecting Linux Question 29 ("logged into server") ---');
$('h3').each((i, el) => {
  const text = $(el).text();
  if (text.includes('logged into server')) {
    console.log('H3 tag:', $.html(el));
    let next = $(el).next();
    for (let j = 0; j < 5; j++) {
      if (next.length) {
        console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next));
        next = next.next();
      }
    }
  }
});
