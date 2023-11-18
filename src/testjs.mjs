const multiplyVars = (x, y) => {
  return Number(x) * Number(y)
}

document.getElementById('aButton').addEventListener('click', () => {
  const a = { c: 1, d: 2 }
  const e = multiplyVars(a.c, a['d']) // e is unused and should give a warning
})
