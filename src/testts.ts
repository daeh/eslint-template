const sumVars = (x: number, y: number) => {
  return x + y
}

const aButton1 = document.getElementById('aButton')
if (aButton1 instanceof HTMLButtonElement) {
  aButton1.addEventListener('click', () => {
    const a: Record<string, number> = { b: 1, c: 2 }
    const d = sumVars(a.b, a['c']) // d is unused and should give a warning
  })
}
