const uuid = (prefix: string = '', length: number = 5) => {
    let id = ''
    Array.from({length}).some(() => {
        id += Math.random().toString(36).slice(2)
        return id.length >= length
    })
    return prefix + id.slice(0, length)
}
export {uuid}
