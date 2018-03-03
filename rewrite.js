console.log('loaded', document.body)

let patterns = []
const patternsLoaded = browser.storage.local.get('patterns').then(result => {
  patterns = (result.patterns || []).map(({pattern, replace}) => {
    return {
      pattern: new RegExp(pattern, 'g'),
      replace
    }
  })
})

const rewrite = () => {
  patternsLoaded.then(() => {
    console.log('rewriting')
    rewriteNode(document.body)
  })
}

const rewriteNode = (elem) => {
  if (elem.nodeName === '#text') {
    let text = elem.nodeValue
    for (const pattern of patterns) {
      text = text.replace(pattern.pattern, pattern.replace)
    }
    if (text !== elem.nodeValue) {
      elem.nodeValue = text
    }
  }

  for (const child of elem.childNodes) {
    rewriteNode(child)
  }
}

window.addEventListener('WebComponentsReady', rewrite)
document.addEventListener('DOMContentLoaded', rewrite)

rewrite()
