/*!
 * vue-ya-semantic-modal v0.0.3 
 * (c) 2017 qgp9
 * Released under the MIT License.
 */
'use strict';

// eslint-disable-next-line no-unused-vars
// import utils from '../utils'

/**
* define boolean property and make that as className
* Thanks to @comfuture
*/
function PropClass (name) {
  var props = [], len = arguments.length - 1;
  while ( len-- > 0 ) props[ len ] = arguments[ len + 1 ];

  var Name = name[0].toUpperCase() + name.slice(1);
  var propClassName = 'propClass' + Name;
  var properties = {};
  props.forEach(function (prop) { properties[prop] = Boolean; });

  var obj;
  return {
    props: properties,
    computed: ( obj = {}, obj[propClassName] = function () {
        var this$1 = this;

        var ret = {};
        props.forEach(function (prop) {
          ret[prop] = properties.hasOwnProperty(prop) && !!this$1[prop];
        });
        return ret
      }, obj )
  }
}

function EasyProps () {
  return {
    beforeCreate: function beforeCreate () {
      var this$1 = this;

      var props = this.$options.props;
      if (!props || Object.keys(props).length === 0) { return }
      Object.keys(props).forEach(function (v) {
        var opts = props[v].type;
        if (!Array.isArray(opts)) { return }
        var type = opts[0];
        var defa = opts[1]; // default
        if (type) { props[v].type = type; }
        if (defa !== undefined) {
          if (defa === 'empty' || defa === '') {
            if (type === Object) { defa = function () { return ({}); }; }
            if (type === Array) { defa = function () { return ([]); }; }
          }
          props[v].default = defa;
        }
        if (opts[2] === 'sync') {
          if (!this$1.$options.methods) { this$1.$options.methods = {}; }
          var methods = this$1.$options.methods;
          var Name = v[0].toUpperCase() + v.slice(1);
          var setName = 'set' + Name;
          var toggleName = 'toggle' + Name;
          var updateName = 'update:' + v;
          // console.warn(`${n} exists in methods already`)
          if (!(setName in methods)) {
            methods[setName] = function (val) { this.$emit(updateName, val); };
          }
          if (opts[0] === Boolean && !(setName in methods)) {
            methods[toggleName] = function () { this[v] ? this[setName](false) : this[setName](true); };
          }
        }
      });
    }
  }
}

function merge () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if (Array.isArray(args[0])) {
    return args.reduce(function (p, c) { return p.concat(c); }, [])
  } else if (typeof args[0] === 'object') {
    return args.reduce(function (p, c) { return Object.assign(p, c); }, {})
  } else {
    return args
  }
}

function getClassString () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var m = merge.apply(void 0, [ {} ].concat( args ));
  return Object.keys(m).filter(function (k) { return m[k]; }).join(' ')
}

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
function globalSingleKeyHandler (config) {
  var handlers = [];
  var canceler = function () { return handlers.forEach(function (v) { return document.removeEventListener(v[0], v[1]); }); };
  Object.keys(config).forEach(function (eventName) {
    var keys = {};
    config[eventName].keys.forEach(function (key) { keys[key] = true; });
    var keyEventHandler = function (event) {
      if (event.keyCode in keys || event.keyName in keys) {
        document.removeEventListener('keydown', keyEventHandler);
        config[eventName].callback(event.keyName, event.keyCode, event, canceler);
      }
    };
    handlers.push([eventName, keyEventHandler]);
    document.addEventListener(eventName, keyEventHandler);
  });
  return canceler
}

function escKeydownEscapeHandler (callback) {
  return globalSingleKeyHandler({
    keydown: {
      keys: [27],
      callback: function (k, n, e, canceler) { canceler(); callback(); }
    }
  })
}

var enterActiveClass = {
  in: true,
  animating: true,
  visible: true
};
var leaveActiveClass = {
  out: true,
  animating: true,
  visible: true
};

var YaModal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.enterDimmer,"leave-active-class":_vm.leaveDimmer},on:{"enter":function($event){_vm.activeModal=true;},"after-enter":function($event){_vm.update++;}}},[(_vm.active)?_c('div',{staticClass:"ui modals page dimmer active",class:_vm.dimmerMergedClass,staticStyle:{"position":"absolute","display":"table !important"},on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.onClickAway();}}},[_c('div',{staticStyle:{"display":"table-cell","text-align":"center","vertical-align":"middle"},on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.onClickAway();}}},[_c('transition',{attrs:{"enter-active-class":_vm.enterModal,"leave-active-class":_vm.leaveModal},on:{"after-enter":function($event){_vm.update++;}}},[(_vm.activeModal)?_c('div',{staticClass:"ui modal active",class:_vm.modalMergedClass,staticStyle:{"display":"inline-block !important","margin":"0","position":"relative","left":"0px !important"}},[_vm._t("default")],2):_vm._e()])],1)]):_vm._e()])},staticRenderFns: [],
  name: 'YaModal',
  mixins: [
    EasyProps(),
    PropClass('dimmer', 'inverted'),
    PropClass('transition',
      'bounce', 'browser', 'drop', 'fade', 'flash', 'flip',
      'fly', 'jiggle', 'scale', 'slide', 'swing', 'tada',
      'vertical', 'horizontal', 'left', 'right', 'up', 'down'),
    PropClass('modal', 'transition', 'basic', 'mini', 'tiny', 'small', 'medium', 'big', 'large')
  ],
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    active: [Boolean, false, 'sync'],
    clickAway: [Boolean, true],
    escEscape: [Boolean, true],
    leaveDealy: [Number, 300],
    modalClass: [Object, ''],
    transition: [Boolean, true]
  },
  data: function data () {
    return {
      update: 1,
      activeModal: false
    }
  },
  computed: {
    enterDimmer: function enterDimmer () {
      return getClassString(
        enterActiveClass,
        this.propClassDimmer,
        {fade: true},
        {transition: this.transition}
      )
    },
    leaveDimmer: function leaveDimmer () {
      return getClassString(
        leaveActiveClass,
        this.propClassDimmer,
        {fade: true},
        {transition: this.transition}
      )
    },
    enterModal: function enterModal () {
      return getClassString(
        enterActiveClass,
        this.propClassTransition
      )
    },
    leaveModal: function leaveModal () {
      return getClassString(
        leaveActiveClass,
        this.propClassTransition
      )
    },
    modalMergedClass: function modalMergedClass () {
      return merge(
        this.propClassModal,
        this.modalClass,
        {visible: this.update} // trick to update
      )
    },
    dimmerMergedClass: function dimmerMergedClass () {
      return merge(
        this.propClassDimmer,
        {visible: this.update} // trick to udpate
      )
    }
  },
  mounted: function mounted () {
    if (this.active) { this.open(); }
  },
  watch: {
    active: function active (val) {
      if (val) { this.open(); }
      else { this.close(); }
    }
  },
  methods: {
    merge: merge,
    open: function open () {
      this.activeDimmer = true;
    },
    close: function close () {
      var this$1 = this;

      if (this.activeModal) { this.activeModal = false; }
      if (this.active) {
        setTimeout(function () { return this$1.setActive(false); }, this.dimmerDelay);
      }
    },
    onClickAway: function onClickAway () {
      if (this.clickAway) { this.close(); }
    },
    keyEscapeHandler: function keyEscapeHandler () {
      // FIXME How to clear listeners if modal is closed with other triggers?
      if (this.escEscape) { escKeydownEscapeHandler(this.close); }
    }
  }
};

var plugin = function () {
  return YaModal
};

plugin.version = '0.0.2';

plugin.install = function (Vue) {
  Vue.component('YaModal', YaModal);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
