// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/stylus/index.styl'
import 'font-awesome/css/font-awesome.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

var head = document.head
var linkTag = document.createElement('link')
linkTag.setAttribute('rel', 'stylesheet')
linkTag.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css')
head.appendChild(linkTag)
