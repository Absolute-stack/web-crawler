const { crawlPage } = require('./crawl.js');
const { printPages } = require('./report.js');

async function main() {
  if (process.argv.length < 3) {
    console.log('No website provided');
    process.exit(1);
  }
  if (process.argv > 3) {
    console.log('Too many command line inputs');
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`Starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printPages(pages);
}

main();
