const sumVars = (x, y) => {
  return Number(x) + Number(y)
}

;(document.getElementById('aButton') as HTMLButtonElement).addEventListener('click', () => {
  const a = { c: 1, d: 2 }
  const e = sumVars(a.c, a['d']) // e is unused and should give a warning
})
