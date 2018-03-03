let patterns = []

function save () {
  browser.storage.local.set({
    patterns: patterns
  })
}

const patternBody = document.querySelector('#patterns')
function render () {
  patternBody.innerHTML = patterns.map(
    ({pattern, replace}, i) => `<tr>
      <td>${pattern}</td>
      <td>${replace}</td>
      <td>
        <button data-index=${i}>Remove</button>
      </td>
    </tr>`
  ).join('')
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
