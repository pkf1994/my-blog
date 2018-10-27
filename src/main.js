// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

import './assets/stylus/index.styl'
import 'font-awesome/css/font-awesome.css'
import 'animate.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


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
