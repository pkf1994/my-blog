// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

import './assets/stylus/index.styl'
import 'font-awesome/css/font-awesome.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

var head = document.head

var linkTagOfAnimate = document.createElement('link')
linkTagOfAnimate.setAttribute('rel', 'stylesheet')
linkTagOfAnimate.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css')
head.appendChild(linkTagOfAnimate)

String.prototype.getLength = function() {
  var len = 0;
  for (var i=0; i<this.length; i++) {
    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
      len += 2;
    } else {
      len ++;
    }
  }
  return len;
}
