const multiplyVars = (x, y) => {
  return Number(x) * Number(y)
}

document.getElementById('aButton').addEventListener('click', () => {
  const a = { b: 1, c: 2 }
  const d = multiplyVars(a.b, a['c']) // d is unused and should give a warning
})
