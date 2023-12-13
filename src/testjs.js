const multiplyVars = (x, y) => {
  return Number(x) * Number(y)
}

const aButton2 = document.getElementById('aButton')
if (aButton2 instanceof HTMLButtonElement) {
  aButton2.addEventListener('click', () => {
    const a = { b: 1, c: 2 }
    const d = multiplyVars(a.b, a['c']) // d is unused and should give a warning
  })
}
