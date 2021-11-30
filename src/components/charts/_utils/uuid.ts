const uuid = (length = 5) => {
  let id = ''
  Array.from({length}).some(() => {
    id += Math.random().toString(36).slice(2)
    return id.length >= length
  })
  return id.slice(0, length)
}
export { uuid }