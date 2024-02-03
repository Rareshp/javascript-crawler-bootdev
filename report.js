
function sortPages(pages) { 
  const entries = Object.entries(pages);
  const sorted = entries.sort(function(a, b) {
    return b[1] - a[1];
  });
  return sorted
}
function printReport(pages) { 
  console.log('Report is starting...')
  console.log()
  console.log(`---- Final report -----`)

  const sorted = sortPages(pages)
  for (s of sorted) {
    const url = s[0]
    const count = s[1]
    console.log(`Found ${count} internal links to ${url}`)
  }

}

module.exports = {
  printReport,
  sortPages
}
