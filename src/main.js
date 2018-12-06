// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

import './assets/stylus/index.styl'
import 'font-awesome/css/font-awesome.css'
import 'animate.css'


Vue.directive('arrow-left', {
  inserted(el, binding) {
    let arrow = document.createElement('span')
    arrow.setAttribute('class', 'vue-arrow-left')
    arrow.style.position = 'absolute'
    arrow.style.overflow = 'hidden'
    arrow.style.height = '32px'
    arrow.style.width = '16px'
    arrow.style.left = '-16px'
    arrow.style.top = binding.value + 'px'

    var style = document.createElement("style")
    style.setAttribute('type','text/css')
    style.innerHTML = ".vue-arrow-left::after{content: \'\';\n" +
      "position: absolute;\n" +
      "top: 50%;\n" +
      "  right: -8px;\n" +
      "  box-sizing: border-box;\n" +
      "  width: 24px;\n" +
      "  height: 24px;\n" +
      "  margin: -12px;\n" +
      "  border: 1px solid #ebebeb;\n" +
      "  background: black;\n" +
      "  -webkit-transform: rotate(45deg);\n" +
      "  transform: rotate(45deg);}";
    document.head.appendChild(style);
  /*  document.head.appendChild(style)
    let sheet = document.styleSheets[document.styleSheets.length - 1]
    sheet.insertRule(".vue-arrow-left{ content: \'\'\n;}", 0)*/

    el.appendChild(arrow)
  }
})

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
