<template>
    <div class="login-page flex-column-center" ref="loginPage">
      <Header></Header>
      <div class="login-page-form common-padding flex-column-center" v-if="!logined">

        <div class="login-page-headline flex-column-center">
          <div class="font-ll">登&nbsp;录</div>
        </div>

        <div class="login-page-input-outer">
          <span class="login-page-input-title">用户名</span>
          <input class="login-page-input" type="text" v-model="username">
          <span class="login-page-input-msg"></span>
        </div>

        <div class="login-page-input-outer">
          <span class="login-page-input-title">密码</span>
          <input class="login-page-input" type="password"  @keydown="checkKeyNumber" v-model="password">
          <span class="login-page-input-msg"></span>
        </div>

        <div class="login-page-button-outer">
          <button class="login-page-button font-m" @click="submitLoginInfo">Log in</button>
        </div>

      </div>


      <div class="login-page-logout flex-column-center" v-if="logined">
        <div class="login-page-headline flex-column-center">
          <div class="font-ll">已登录</div>
        </div>

        <div class="login-page-button-outer">
          <button class="login-page-button font-m" @click="logOut">Log out</button>
        </div>
      </div>

      <Footer class="login-page-footer"></Footer>

      <ModalWithConfirm
        :modalHeaderProp="loginModal.modalHeader"
        :modalBodyProp="loginModal.modalBody"
        :btnValueOfYesProp="loginModal.btnValueOfYes"
        :btnValueOfNoProp="loginModal.btnValueOfNo"
        :isLoading="loginModal.isLoading"
        :onlyNorify="loginModal.onlyNorify"
        :show="loginModal.show"
        :error="loginModal.happenError"
        @clickYesEventOfParent='()=>{loginModal.show=false;goToHomePage();}'
        @clickYesAfterError='()=>{loginModal.show=false}'
      ></ModalWithConfirm>

      <ModalWithConfirm
        :modalHeaderProp="logoutModal.modalHeader"
        :modalBodyProp="logoutModal.modalBody"
        :btnValueOfYesProp="logoutModal.btnValueOfYes"
        :btnValueOfNoProp="logoutModal.btnValueOfNo"
        :isLoading="logoutModal.isLoading"
        :onlyNorify="logoutModal.onlyNorify"
        :show="logoutModal.show"
        :error="logoutModal.happenError"
        @clickYesEventOfParent='()=>{logoutModal.show=false;refreshPage();}'
        @clickYesAfterError='()=>{logoutModal.show=false}'
      ></ModalWithConfirm>
    </div>
</template>

<script>
  import Header from '../header/Header.vue'
  import Footer from '../footer/Footer.vue'
  import LoginApi from '../../api/login_api.js'
  import ModalWithConfirm from '../modal/ModalWithConfirm.vue'
  import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        username:'',
        password:'',
        loginModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          btnValueOfNo:'',
          happenError:false,
          isLoading:false,
          onlyNorify:true,
          show:false
        },
        logoutModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          btnValueOfNo:'',
          happenError:false,
          isLoading:false,
          onlyNorify:true,
          show:false
        }
      }
    },
    computed: {
      ...mapState([
        'logined'
      ])
    },
     components:{
       Header,
       Footer,
       ModalWithConfirm
     },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions([
        'triggerLoginStatus'
      ]),
       init() {
         this.$refs.loginPage.style.height = window.innerHeight + 'px'
       },
      checkKeyNumber(e) {
        if(e.keyCode == 108 || e.keyCode == 13 ) {
          this.submitLoginInfo()
        }
      },
      submitLoginInfo() {
        this.loginModal.show = true
        this.loginModal.isLoading = true
        LoginApi.submitLoginInfo(this.username, this.password).then((res) => {
         if(res.status == 200) {
           if(res.data.loginStatus == 1) {
             var validTime = res.data.validTimeMillis
             var expTime = new Date().getTime() + validTime
             localStorage.setItem('token', JSON.stringify({token: res.data.token, expTime: expTime}))
             setTimeout(() => {
               this.loginModal.happenError = false
               this.loginModal.modalHeader = '提示'
               this.loginModal.modalBody = '登陆成功'
               this.loginModal.btnValueOfYes = '好'
               this.loginModal.isLoading = false
               this.triggerLoginStatus()
             },1000)
           }
           if(res.data.loginStatus != 1){
             setTimeout(() => {
               this.loginModal.happenError = true
               this.loginModal.modalHeader = '提示'
               this.loginModal.modalBody = '登陆失败: ' + res.data.loginMsg
               this.loginModal.btnValueOfYes = '好'
               this.loginModal.isLoading = false
             },1000)
           }


         }
        }).catch((err) => {
         console.log(err)
          setTimeout(() => {
            this.loginModal.happenError = true
            this.loginModal.modalHeader = '提示'
            this.loginModal.modalBody = '登陆失败：' + err
            this.loginModal.btnValueOfYes = '关闭'
            this.loginModal.isLoading = false
          },1000)
        })
      },
      goToHomePage() {
        setTimeout(() => {
          this.$router.push('/routine/home')
        },500)
      },
      logOut() {
        this.logoutModal.modalHeader = '提示'
        this.logoutModal.modalBody = '登出成功'
        this.logoutModal.btnValueOfYes = '好'
        this.logoutModal.isLoading = false
        this.logoutModal.show = true
        this.logoutModal.isLoading = true
        localStorage.removeItem('token')
        setTimeout(() => {
          this.logoutModal.isLoading = false
        },250)
      },
      refreshPage(){
        location.reload()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login-page
    background #f7f7f7

  .login-page-headline
    padding-bottom 10px
    width 100%
    border-bottom 1px solid rgb(204, 204, 204)

  .login-page-form
  .login-page-logout
    height 350px
    width 750px

  .login-page-input
    width 200px
    margin-left 10px
    padding-left 5px

  .login-page-input-outer
    margin-left 50px
    margin-top 20px
    display flex
    flex-wrap wrap

  .login-page-input-title
    width 50px
    text-align right

  .login-page-button-outer
    margin-top 20px

  @media (max-width: 750px) {
    .login-page-form{
      width 100%
    }
    .login-page-input-outer{
      width 100%
      margin-left 0px
    }
    .login-page-input{
      width 100%
      height 2rem
      margin-left 0px
      margin-top 5px
    }
    .login-page-input-title{
      text-align left
    }
    .login-page-button-outer{
      margin-top 40px
      width 100%
    }
    .login-page-button{
      width 100%
      height 2.5rem
    }
  }

  .login-page-input-msg
    width 100px

  .login-page-footer
    position absolute
    bottom 0px
</style>
