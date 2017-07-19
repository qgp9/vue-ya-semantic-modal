<template>
<transition :enter-active-class="enterDimmer" :leave-active-class="leaveDimmer" v-on:enter="activeModal=true" v-on:after-enter="update++">
  <div class="ui modals page dimmer active" v-if="active" :class="dimmerMergedClass" style="position:absolute;display:table !important;" @click.self="onClickAway()">
    <div style="display:table-cell;text-align:center;vertical-align:middle;" @click.self="onClickAway()">
      <transition :enter-active-class="enterModal" :leave-active-class="leaveModal" v-on:after-enter="update++">
        <div class="ui modal active" v-if="activeModal" :class="modalMergedClass" style="display:inline-block !important;margin:0;position:relative;left:0px !important;">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</transition>
</template>

<script>
import {EasyProps, PropClass} from './common/mixins'
import {merge, getClassString} from './common/utils'
import {escKeydownEscapeHandler} from './common/globalSingleKeyHandler'
import {enterActiveClass, leaveActiveClass} from './common/common'

export default {
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
  data () {
    return {
      update: 1,
      activeModal: false
    }
  },
  computed: {
    enterDimmer () {
      return getClassString(
        enterActiveClass,
        this.propClassDimmer,
        {fade: true},
        {transition: this.transition}
      )
    },
    leaveDimmer () {
      return getClassString(
        leaveActiveClass,
        this.propClassDimmer,
        {fade: true},
        {transition: this.transition}
      )
    },
    enterModal () {
      return getClassString(
        enterActiveClass,
        this.propClassTransition
      )
    },
    leaveModal () {
      return getClassString(
        leaveActiveClass,
        this.propClassTransition
      )
    },
    modalMergedClass () {
      return merge(
        this.propClassModal,
        this.modalClass,
        {visible: this.update} // trick to update
      )
    },
    dimmerMergedClass () {
      return merge(
        this.propClassDimmer,
        {visible: this.update} // trick to udpate
      )
    }
  },
  mounted () {
    if (this.active) this.open()
  },
  watch: {
    active (val) {
      if (val) this.open()
      else this.close()
    }
  },
  methods: {
    merge,
    open () {
      this.activeDimmer = true
    },
    close () {
      if (this.activeModal) this.activeModal = false
      if (this.active) {
        setTimeout(() => this.setActive(false), this.dimmerDelay)
      }
    },
    onClickAway () {
      if (this.clickAway) this.close()
    },
    keyEscapeHandler () {
      // FIXME How to clear listeners if modal is closed with other triggers?
      if (this.escEscape) escKeydownEscapeHandler(this.close)
    }
  }
}
</script>
