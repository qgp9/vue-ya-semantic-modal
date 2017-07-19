import YaModal from './YaModal.vue'

const plugin = function () {
  return YaModal
}

plugin.version = '__VERSION__'

plugin.install = function (Vue) {
  Vue.component('YaModal', YaModal)
}

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
