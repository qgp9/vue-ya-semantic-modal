/**
* Global key handler for single actions
* @param {object} config
* @param {object} config.keydown event name
* @param {array} config.keydown.keys List of key code or key name
* @param {function} callback callback function for each event. (keyname, keycode, event, canceler) are given
* @return {function} for remove all listener. Same as canceler of callback
* @example
*           const exampleConfig = {
*             keydown: {
*               keys: [27],
*               callback: () => console.log('test')
*             }
*           }
*/
export default function globalSingleKeyHandler (config) {
  const handlers = []
  const canceler = () => handlers.forEach(v => document.removeEventListener(v[0], v[1]))
  Object.keys(config).forEach(eventName => {
    let keys = {}
    config[eventName].keys.forEach(key => { keys[key] = true })
    const keyEventHandler = event => {
      if (event.keyCode in keys || event.keyName in keys) {
        document.removeEventListener('keydown', keyEventHandler)
        config[eventName].callback(event.keyName, event.keyCode, event, canceler)
      }
    }
    handlers.push([eventName, keyEventHandler])
    document.addEventListener(eventName, keyEventHandler)
  })
  return canceler
}

export function escKeydownEscapeHandler (callback) {
  return globalSingleKeyHandler({
    keydown: {
      keys: [27],
      callback: (k, n, e, canceler) => { canceler(); callback() }
    }
  })
}
