const sumVars = (x, y) => {
  return Number(x) + Number(y)
}

;(document.getElementById('aButton') as HTMLButtonElement).addEventListener('click', () => {
  const a = { b: 1, c: 2 }
  const d = sumVars(a.b, a['c']) // d is unused and should give a warning
})
