<template>
    <i class="fa fa-send share"><span class="cursorp" @click="triggerShowShareMenuFlag" ref="shareBtn">&nbsp;分享</span>
      <transition name="fade">
        <div class="share-dropdown" v-show="showShareMenuFlag" v-arrow-left="15">
          <span class="share-dropdown-arrow" v-if="!isMobile"></span>
          <span class="share-dropdown-arrow-mobile" v-if="isMobile"></span>
          <div class="share-dropdown-menu font-ss">
            <div class="share-dropdown-item hoverable cursorp" @click="initLinkClipBoard"><i class="fa fa-link share-dropdown-icon"></i>复制链接</div>
            <div class="share-dropdown-item hoverable cursorp" @click="shareToXinLangWeibo"><i class="fa fa-weibo share-dropdown-icon"></i>新浪微博</div>
            <div class="share-dropdown-item"><i class="fa fa-weixin share-dropdown-icon"></i>微信扫一扫</div>
            <div class="share-dropdown-qrcode flex-row-center"><div id="qrcode" ref="qrcode"></div></div>
          </div>
        </div>
      </transition>
    </i>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import { mapActions } from 'vuex'
  export default {
      props: {
        picUrl:'',
        shareTitle: ''
      },
      data() {
        return {
          showShareMenuFlag: false
        }
      },
      inject:['isMobile'],
      mounted() {
        this.initQRcode()
      },
      methods: {
        ...mapActions([
          'triggerNotice',
          'appointNoticeMsg'
        ]),
        triggerShowShareMenuFlag() {
          if(this.showShareMenuFlag == true) {
            this.showShareMenuFlag = false
            return
          }
          this.showShareMenuFlag = !this.showShareMenuFlag
          setTimeout(() => {
            //this.$refs.shareBtn.removeEventListener('click', this.triggerShowShareMenuFlag)
            window.addEventListener('click', this.handleShareClickEvent, {once: true})
          },1)
        },
        handleShareClickEvent() {
          if(this.showShareMenuFlag == true) {
            this.showShareMenuFlag = false
            //window.removeEventListener('click', this.handleShareClickEvent)
            //this.$refs.shareBtn.addEventListener('click', this.triggerShowShareMenuFlag)
          }
        },
        initLinkClipBoard() {
          const input = document.createElement('input')
          document.body.appendChild(input)
          input.setAttribute('value', window.location.href)
          input.select()
          if (document.execCommand('copy')) {
            document.execCommand('copy')
            console.log('复制成功')
            this.appointNoticeMsg('已复制链接到剪切板')
            this.triggerNotice()
          }
          document.body.removeChild(input)
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
          qrcode.makeCode(window.location.href) //生成另一个新的二维码
        },
        shareToXinLangWeibo() {

          let shareToXinLangWeiboUrl = 'http://v.t.sina.com.cn/share/share.php?'
              shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + 'title='+this.shareTitle
              shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&url='+window.location.href
              shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&content=utf-8&sourceUrl='+window.location.href
              if(this.picUrl != undefined)
              shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&pic='+this.picUrl

          window.open(shareToXinLangWeiboUrl,'newwindow','height=400,width=400,top=100,left=100');
        }
      }
  }
</script>

<style scoped lang="stylus">
.share
  position relative

.share-dropdown
  width 150px
  position absolute
  top -25px
  right -200px
  background white
  border 1px solid #ebebeb
  border-radius 4px
  box-shadow 0 5px 20px rgba(26,26,26,.1)

@media (max-width: 750px) {
  .share-dropdown{
    right 65px
  }
}

.share-dropdown-arrow
  position: absolute
  overflow: hidden
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

.share-dropdown-arrow-mobile
  position: absolute
  overflow: hidden
  pointer-events: none
  height 32px
  width 16px
  right  -16px
  top 15px

.share-dropdown-arrow-mobile:after
  content: ''
  position: absolute
  top: 50%
  left: -8px
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
  padding 15px 20px
  display flex

.share-dropdown-qrcode
  width 100%
  padding 15px 20px
  padding-top 0px

.share-dropdown-icon
  width 30px

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

</style>
