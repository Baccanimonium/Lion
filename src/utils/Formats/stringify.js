export default function stringify (iterable, appendKey) {
  let str = ''
  iterable.forEach((val, key) => {
    const normalizeVal = typeof val === 'string' ? val : stringify(val)
    str = `${str} ${appendKey ? `${key}: {${normalizeVal}}={}` : `${normalizeVal}=0`},`
  })
  return str
}

export function stringifyFunctionBody (iterable) {
  // const a = iterable.reduce((acc, arg, i) => `${acc}${i % 2 === 0 ? `Number(${arg})` : arg}`, '')
  return `return Math.ceil(${iterable.reduce((acc, arg, i) => `${acc}${i % 2 === 0 ? `Number(${arg})` : arg}`, '')})`
  // return `console.log(vat, quantity, price, arguments,${a});return ${a}`
}
