import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations.js'
import actions from './actions.js'
import state from './state.js'

export default new Vuex.Store({
  state,
  actions,
  mutations
})

window.onload = () => {

  if(localStorage.getItem('token') != undefined){

    var tokenObj = JSON.parse(localStorage.getItem('token'))
    var expTime = tokenObj.expTime
    var nowTime = new Date().getTime()

    if(nowTime < expTime) {
      actions.triggerLoginStatus(this.a)
    }
  }

}



