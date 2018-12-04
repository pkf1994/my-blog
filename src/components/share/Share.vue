<template>
    <i class="fa fa-send share"><span class="cursorp" @click="triggerShowShareMenuFlag">&nbsp;分享</span>
      <transition name="fade">
        <div class="share-dropdown" v-show="showShareMenuFlag">
          <span class="share-dropdown-arrow"></span>
          <div class="share-dropdown-menu font-ss">
            <div class="share-dropdown-item"><i class="fa fa-link share-dropdown-icon"></i>复制链接</div>
            <div class="share-dropdown-item"><i class="fa fa-weibo share-dropdown-icon"></i>新浪微博</div>
            <div class="share-dropdown-item"><i class="fa fa-renren share-dropdown-icon"></i>人人网&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="share-dropdown-item"><i class="fa fa-weixin share-dropdown-icon"></i>微信扫一扫</div>
            <div class="share-dropdown-item flex-row-center"><div id="qrcode" ref="qrcode"></div></div>
          </div>
        </div>
      </transition>
    </i>
</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
      props: {

      },
      data() {
        return {
          showShareMenuFlag: false
        }
      },
      mounted() {
        this.initQRcode()
      },
      methods: {
        triggerShowShareMenuFlag() {
          this.showShareMenuFlag = !this.showShareMenuFlag
        },
        initQRcode() {
          let qrcode = new QRCode('qrcode', {
            width: 150, //图像宽度
            height: 150, //图像高度
            colorDark : "#000000", //前景色
            colorLight : "#ffffff", //背景色
            typeNumber:4,
            correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
          })
          qrcode.clear() //清除二维码
          qrcode.makeCode('https://www.zhihu.com/') //生成另一个新的二维码
        }
      }
  }
</script>

<style scoped lang="stylus">
.share
  position relative

.share-dropdown
  padding-top 15px
  width 150px
  position absolute
  top -25px
  left 70px
  background white
  border 1px solid #ebebeb
  border-radius 4px
  box-shadow 0 5px 20px rgba(26,26,26,.1)

.share-dropdown-arrow
  position: absolute
  overflow: hidden
  pointer-events: none
  height 32px
  width 16px
  left -16px
  top 15px

.share-dropdown-arrow:after
  content: ''
  position: absolute
  top: 50%
  right: -8px
  box-sizing: border-box
  width: 24px
  height: 24px
  margin: -12px
  border: 1px solid #ebebeb
  background: #fff
  -webkit-transform: rotate(45deg)
  transform: rotate(45deg)
  pointer-events: auto

.share-dropdown-menu
  background white

.share-dropdown-item
  width 100%
  padding 0px 20px
  display flex
  margin-bottom 20px
  background white

.share-dropdown-icon
  width 30px

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

</style>
