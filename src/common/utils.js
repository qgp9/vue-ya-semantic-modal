export function merge (...args) {
  if (Array.isArray(args[0])) {
    return args.reduce((p, c) => p.concat(c), [])
  } else if (typeof args[0] === 'object') {
    return args.reduce((p, c) => Object.assign(p, c), {})
  } else {
    return args
  }
}

export function getClassString (...args) {
  const m = merge({}, ...args)
  return Object.keys(m).filter(k => m[k]).join(' ')
}

export default {
  getClassString,
  merge
}
