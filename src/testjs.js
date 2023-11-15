let a = 0

const advance = (x) => {
  return x++
}

document.getElementById('abutton').addEventListener('click', () => {
  a = advance(a)
})
