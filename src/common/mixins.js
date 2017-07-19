// eslint-disable-next-line no-unused-vars
// import utils from '../utils'

/**
* define boolean property and make that as className
* Thanks to @comfuture
*/
export function PropClass (name, ...props) {
  const Name = name[0].toUpperCase() + name.slice(1)
  const propClassName = 'propClass' + Name
  let properties = {}
  props.forEach(prop => { properties[prop] = Boolean })

  return {
    props: properties,
    computed: {
      [propClassName] () {
        let ret = {}
        props.forEach(prop => {
          ret[prop] = properties.hasOwnProperty(prop) && !!this[prop]
        })
        return ret
      }
    }
  }
}

export function EasyProps () {
  return {
    beforeCreate () {
      let props = this.$options.props
      if (!props || Object.keys(props).length === 0) return
      Object.keys(props).forEach(v => {
        const opts = props[v].type
        if (!Array.isArray(opts)) return
        const type = opts[0]
        let defa = opts[1] // default
        if (type) props[v].type = type
        if (defa !== undefined) {
          if (defa === 'empty' || defa === '') {
            if (type === Object) defa = () => ({})
            if (type === Array) defa = () => ([])
          }
          props[v].default = defa
        }
        if (opts[2] === 'sync') {
          if (!this.$options.methods) this.$options.methods = {}
          const methods = this.$options.methods
          const Name = v[0].toUpperCase() + v.slice(1)
          const setName = 'set' + Name
          const toggleName = 'toggle' + Name
          const updateName = 'update:' + v
          // console.warn(`${n} exists in methods already`)
          if (!(setName in methods)) {
            methods[setName] = function (val) { this.$emit(updateName, val) }
          }
          if (opts[0] === Boolean && !(setName in methods)) {
            methods[toggleName] = function () { this[v] ? this[setName](false) : this[setName](true) }
          }
        }
      })
    }
  }
}
