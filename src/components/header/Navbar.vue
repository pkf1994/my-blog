<template>
    <div class="navbar"
         ref="navbar"
         :class="{'flex-row-space-between': distanceToClientUpperEdge < 10 && isMobile, 'flex-row-end': distanceToClientUpperEdge > 10 || !isMobile}">
      <router-link v-if="!isMobile" to="/home.html" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark"  >杂谈</router-link>
      <span v-if="!isMobile" class="navbar-item cursorp flex-row-column-center font-l font-dark" >关于</span>
      <router-link v-if="!isMobile" to="/article_edit/0" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark" >创造</router-link>
      <router-link v-if="!isMobile" to="/article_manage" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark" >管理</router-link>
      <span v-if="isMobile" class="navbar-logo-mobile flex-row-column-center font-l" v-show="distanceToClientUpperEdge < 10">Pengblog</span>
      <a v-if="isMobile" class="menu-buttom" @click="triggerMenu"></a>
      <div class="navbar-itemlist-cover" ref="menuCover" @click="triggerMenu"></div>
      <div class="navbar-itemlist-mobile-background" ref="menuBackground"></div>
      <div class="navbar-itemlist-mobile" ref="menu" v-show="showMenuFlag">
        <div class="navbar-item-mobile cursorp flex-row-column-center font-l font-dark" @click="() => {goTo('/home.html');}">杂谈</div>
        <div class="navbar-item-mobile cursorp flex-row-column-center font-l font-dark" @click="() => {goTo('/article_edit/0');}">创造</div>
        <div class="navbar-item-mobile cursorp flex-row-column-center font-l font-dark" @click="() => {goTo('/article_manage');}">管理</div>
      </div>
      <SearchBar ref="searchBar" :class="{ 'navbar-search-bar-onright': distanceToClientUpperEdge > 10, 'navbar-search-bar-onleft': distanceToClientUpperEdge <= 10 }" is-mobile="no" submit-slogan="Search" class="navbar-search-bar" width="240" @submitSearchWords="receiveSearchWords"></SearchBar>
    </div>
</template>

<script>
  import CountDTDUE from '../../js/countDistanceToUpperEdge.js'
  import SearchBar from '../searchBar/SearchBar.vue'
  export default {
    data() {
      return {
        distanceToClientUpperEdge: 10,
        isMobile: false,
        showMenuBackgroundFlag: false,
        showMenuFlag: false,
        heightOfMenu: 0
      }
    },
    components: {
      SearchBar
    },
    mounted() {
      this.bindScrollEvent()
      this.judgeIfMobile()
      this.$nextTick(() => {
        this.getHeightOfMenu()
      })
      this.initDistanceToClientUpperEdge()
    },
    watch: {
      navbarSearchString() {

      }
    },
    methods: {
      getHeightOfMenu() {
          this.showMenuFlag = true
          window.addEventListener('load',() => {
            this.heightOfMenu = parseInt(getComputedStyle(this.$refs.menu).height)
            this.showMenuFlag = false
          })
      },
      judgeIfMobile() {
        let bodyOffsetWidth = document.documentElement.offsetWidth || document.body.offsetWidth
        if(bodyOffsetWidth <= 750) {
          this.isMobile = true
        }
      },
      bindScrollEvent() {
        window.addEventListener('scroll', () => {
          let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop
          this.distanceToClientUpperEdge = CountDTDUE.countDistanceToDocumentUpperEdge(this.$refs.navbar) - bodyScrollTop
        })
      },
      initDistanceToClientUpperEdge() {
        this.distanceToClientUpperEdge = CountDTDUE.countDistanceToClientUpperEdge(this.$refs.navbar)
      },
      triggerMenu() {
        this.showMenuBackgroundFlag = !this.showMenuBackgroundFlag
        let bodyEl = document.documentElement || document.body
        if(this.showMenuBackgroundFlag) {
          this.$refs.navbar.style.background = '#f7f7f7'
          this.$refs.menuBackground.style.height = this.heightOfMenu + 'px'
          bodyEl.style.overflow = 'hidden'
          this.$refs.menuCover.style.height = window.innerHeight - parseInt(getComputedStyle(this.$refs.navbar).height) + 'px'
          this.$refs.menuCover.style.background = 'rgba(0,0,0,0.2)'
          setTimeout(() => {
            if(this.$refs.menuCover.style.background == 'rgba(0, 0, 0, 0.2)') {
              this.showMenuFlag = true
            }
          }, 500)
        }else{
          bodyEl.style.overflow = 'auto'
          this.$refs.navbar.style.background = ''
          this.$refs.menuCover.style.background = 'rgba(0,0,0,0)'
          setTimeout(() => {
            if(this.$refs.navbar.style.background == '') {
              this.$refs.menuCover.style.height = '0px'
            }
          },500)
          this.showMenuFlag = false
          this.$refs.menuBackground.style.height = '0px'
        }
      },
      goTo(target) {
        this.triggerMenu()
        setTimeout(() => {
          this.$router.push(target)
        },500)
      },
      receiveSearchWords(searchString) {
        this.$router.push({path:'/article_manage',query:{search_string:searchString}})
      }
    }
  }
</script>

<style scoped lang="stylus">
.navbar
  /*background #F7F7F7*/
  position relative
  width 750px
  height 50px
  padding-bottom 0
  transition all 0.5s ease
  .navbar-logo
    padding 5px 25px
    height 100%
  .navbar-item
    padding 5px 25px
    height 100%

@media (min-width: 750px) {
  .navbar{

  }
}

.navbar-item:hover
  color black

.router-link-active
  color black

.navbar-logo-mobile
  height 100%
  padding 5px 25px



.menu-buttom
  height 100%
  width 36px
  margin-right 10px
  background url("../../assets/imaga/icon/menu.png") center center no-repeat
  background-size 36px

.navbar-itemlist-mobile
  position absolute
  top 100%
  width 100%

.navbar-itemlist-cover
  position absolute
  top 100%
  width 100%
  height 0px
  background white
  transition background 0.5s ease

.navbar-itemlist-mobile-background
  position absolute
  top 100%
  width 100%
  background #f7f7f7
  transition all 0.5s ease
  height 0px

.navbar-item-mobile
  padding 10px 0px
  margin 0px 15px
  border-top 1px solid rgb(235, 235, 235)

.navbar-search-bar
  position absolute

.navbar-search-bar-onright
  top -110px
  right 20px

.navbar-search-bar-onleft
  top 8px
  left 25px
</style>

