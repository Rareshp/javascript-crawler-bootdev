const { argv } = require('node:process');

const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
  // argv.forEach((val, index) => {
  //   console.log(`${index}: ${val}`);
  // });
  // returns:
  // 0: /usr/local/bin/node
  // 1: /home/node/app/main.js
  // 2: one
  if (argv.length <= 2) {
    console.log("No baseURL argument provided")
    return
  }
  if (argv.length > 3) {
    console.log("Too many arguments")
    return
  }
 
  // we got passed returns, no if needed
  const baseURL = argv[2]
  console.log(`Starting crawling for URL: '${baseURL}'`)
 
  const pages = await crawlPage(baseURL, baseURL, {})
  printReport(pages)
}

main()
