import axios from 'axios'
import apiInfo from './apiInfo.js'

export default {
  submitLoginInfo: function (username, password) {
    var loginInfo = {
        username: username,
        password: password
    }
    return new Promise((resolve, reject) => {
      axios.post(apiInfo.server + 'login/login.do', loginInfo).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
