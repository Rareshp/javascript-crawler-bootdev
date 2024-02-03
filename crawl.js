const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function normalizeURL(url) {
  const thisURL = new URL(url);
  // we need to remove trailing slash
  let pathname = thisURL.pathname.replace(/\/+$/, '')
  return `${thisURL.host}${pathname}`
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const as = dom.window.document.querySelectorAll('a')
  
  for (const a of as) {
    if (a.href.slice(0,1) === "/") {
      try {
        urls.push(new URL(a.href, baseURL).href)
      } catch (err) {
        console.log(`${err.message}: ${a.href}`)
      }
    } else {
      try {
        urls.push(new URL(a.href).href)
      } catch (err){
        console.log(`${err.message}: ${a.href}`)
      }
    }
  }

  return urls
}

async function crawlPage(baseURL, currentURL, pages) {
  // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }

  ncURL = normalizeURL(currentURL)

  if (pages[ncURL] > 0 ) {
    pages[ncURL]++
    return pages
  } 

  // check if currentURL is on domain of baseURL 
  (currentURL == baseURL) ? pages[ncURL] = 0 : pages[ncURL] = 1
  
  console.info(`------ crawling ${currentURL}  -------`)
  // console.log(pages)

  const response = await fetch(currentURL, {
    method: 'GET',
    mode: 'cors',
  })
  .then(async (response) => {
    if (response.status >= 400) {
      console.error('Received bad status: ${response.status}')
      return pages
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    html = await response.text()
    return html
  })
  .then(async (html) => {
    console.info('Fetching URLs from HTML')
    const urls = getURLsFromHTML(html, baseURL)

    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages)
    }
  })

  return pages
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}
