import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Printing first 2000 chars of HTML body ---');
const bodyHtml = $('body').html();
if (bodyHtml) {
  console.log(bodyHtml.substring(0, 2000));
} else {
  console.log(html.substring(0, 2000));
}
