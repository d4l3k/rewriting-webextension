let patterns = []

function save () {
  browser.storage.local.set({
    patterns: patterns
  })
}

const patternBody = document.querySelector('#patterns')
function render () {
  while (patternBody.firstChild) {
    patternBody.removeChild(patternBody.firstChild)
  }

  patterns.forEach(({pattern, replace}, i) => {
    const tr = document.createElement('tr')

    const patternTD = document.createElement('td')
    patternTD.innerText = pattern
    tr.appendChild(patternTD)

    const replaceTD = document.createElement('td')
    replaceTD.innerText = replace
    tr.appendChild(replaceTD)

    const buttonTD = document.createElement('td')
    const button = document.createElement('button')
    button.dataset.index = i
    button.innerText = 'Remove'
    buttonTD.appendChild(button)

    tr.appendChild(buttonTD)

    patternBody.appendChild(tr)
  })
}
patternBody.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'BUTTON') {
    return
  }
  const i = parseInt(e.target.dataset.index)
  patterns.splice(i, 1)
  render()
  save()
})

function restoreOptions () {
  browser.storage.local.get('patterns').then(result => {
    patterns = result.patterns || []

    render()
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions);
const addPattern = document.querySelector('#addPattern')
const pattern = document.querySelector('#pattern')
const replace = document.querySelector('#replace')
addPattern.addEventListener('click', (e) => {
  patterns.push({
    pattern: pattern.value,
    replace: replace.value
  })
  pattern.value = ''
  replace.value = ''

  render()
  save()
})
