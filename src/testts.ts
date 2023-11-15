let currentTrial = 0
let currentTrial2 = 0

const responseElements = [
  document.getElementById('rangeSlider') as HTMLInputElement,
  document.getElementById('freeRespField') as HTMLInputElement,
]

const advance = () => {
  for (const elem of responseElements) {
    if (elem.type === 'range') {
      elem.value = '50'
    }
    if (elem.type === 'text') {
      elem.value = ''
    }
  }
}

responseElements[0].addEventListener('click', (event) => {
  advance()
})
