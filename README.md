# vue-ya-semantic-modal
[![npm](https://img.shields.io/npm/v/vue-ya-semantic-modal.svg)](https://www.npmjs.com/package/vue-ya-semantic-elements)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Yet another semantic-ui modal component for Vue2 without Jquery but with pure Vue transition

This component only provide a frame and transitions for modal. Configurations of an inner modal is on your own, and it should be almost identical with usual way of semantic-ui. If your are not sure of how configure it, follow [official examples](https://semantic-ui.com/modules/modal.html#/examples) 

[demo](http://vue-ya-semantic.netlify.com/#/modal) [source](https://github.com/qgp9/vue-ya-semantic-demo/blob/master/src/components/Modal.vue)

## Set Up
* Global set up
```js
import YaModal from 'vue-ya-semantic-modal'

Vue.use(YaModal)
```
* Local set up for each component
```js
import YaModal from `vue-ya-semantic-modal'

export default {
  name: 'MyComponent',
  props: ['myProp'],
  ...
  components: {
    YaModal: Yamodal() // It's important to use as function
  }
```

## Usage
* Basic usage
```html
<button class="ui primary button" @click="activeModal=true">Show Modal</button>

<ya-modal verticla flip inverted v-model="activeModal">
  <div class="ui header">Title</div>
  <div class="content">
    <p>Any content for your modal</p>
  </div>
  <div class="actions">
    <div class="ui red basic cancel inverted button" @click="activeModal=false">
      <i class="remove icon> No
    </div>
    <div class="ui green ok inverted button @click="activeModal="false">
      <i class="checkmark icon></i> yes
    </div>
  </div>
</ya-modal>
```
![BOOYAH](http://i.imgur.com/JoeKDOC.png)

* When you want modal without transition, use `:transition="false"`
* `inverted` attribute will be applied dimmer container
* A transition of dimmer container is always `fade`
* Possible class words for a inner modal are
```
bounce browser drop fade flash flip fly jiggle scale slide swing tada
vertical horizontal left right up down
basic mini tiny small medium big large
```
## props
* `clickAway` : When `true`, modal will be turned off with outer click. default is `true`
* `escEscape` : When `true`, modal will be turned off with `esc` key down. default is `true`
* `leaveDelay` : Dealy time of transition of dimmer class after transition of a modal start while leaving. default is 300ms
* `modalClass` : Additional classes for an inner modal. Values should be an object like binded class
* `transition`: Turn on and off transition effect. default is   true`


## :scroll: Changelog

## Acknowledge

## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
