<<template>
  <div class="cover flex-row-column-center" ref="cover" v-if="showCover">
    <transition name="slide-fade">
      <div class="modal" v-show="showModal">

        <div class="modal-header" v-if="isLoading">
          {{modalHeader}}
        </div>

        <div class="modal-header" v-if="!isLoading">
          {{modalHeaderProp}}
        </div>

        <div class="modal-body flex-row-center" ref="modalBody">
          <i class="fa fa-spinner fa-pulse fa-2x" v-if="isLoading"></i>
          <div v-if="!isLoading">{{modalBodyProp}}</div>
        </div>

        <transition name="fade">
          <div class="modal-footer flex-row-center"  v-if="!isLoading">
            <button class="button" @click="clickYes" v-if="!error">{{btnValueOfYesProp}}</button>
            <button class="button" @click="clickNo" v-if="!onlyNorify && !error">{{btnValueOfNoProp}}</button>
            <button class="button" @click="clickYesAfterError" v-if="error">关闭</button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import scrollbarWidth from '../../js/getScrollbarWidth.js';
  export default {
    props:{
      modalHeaderProp:'',
      modalBodyProp:'',
      btnValueOfYesProp:'',
      btnValueOfNoProp:'',
      show:{
        type:Boolean,
        default: false
      },
      isLoading:{
        type:Boolean
      },
      error:false,
      onlyNorify:false
    },
    data(){
      return{
        showCover: false,
        showModal: false,
        modalHeader:'正在处理...',
      }
    },
    computed: {
      bodyEl() {
        return document.documentElement || document.body
      }
    },
    created() {
    },
    mounted(){
    },
    watch: {
      show(newShowModal, oldShowModal) {
        if(newShowModal == true) {
          this.init()
        }else{
          this.shutdown()
        }
      }
    },
    methods:{
      init() {
        this.showCover = true
        this.$nextTick(() => {
          this.$refs.cover.style.height = this.bodyEl.clientHeight + 'px';
          this.$refs.cover.style.top = this.bodyEl.scrollTop + 'px';
          this.$refs.cover.style.background = 'rgba(0,0,0,0.2)';
          this.bodyEl.style.overflowY = 'hidden';
          this.bodyEl.style.marginRight = scrollbarWidth.scrollbarWidth() + 'px';

          setTimeout(() => {
            this.showModal = true;
          },200)
        })
      },
      shutdown(){
          this.showModal = false;
          this.$refs.cover.style.background = 'rgba(0,0,0,0)'
          setTimeout(() => {
            this.bodyEl.style.marginRight = 0
            this.bodyEl.style.overflowY='auto'
            this.showCover = false
          },200)
      },

      clickYes(){
          this.$emit('clickYesEventOfParent')
      },

      clickNo(){
          this.$emit('clickNoEventOfParent')
      },

      clickYesAfterError(){
        this.$emit('clickYesAfterError')
      }
    }

  }
</script>

<style scoped lang="stylus">
  .cover
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    background: rgba(0,0,0,0);
    z-index 999
    transition background 0.2s ease
    .modal
      box-shadow 0 5px 15px rgba(0,0,0,.5)
      border 1px solid rgba(0,0,0,.2)
      background #fff
      border-radius 5px
      width 600px
      height auto
      .modal-header
      .modal-body
        border-bottom 1px solid #e5e5e5
        padding 1.2rem 1rem



    @media(max-width: 1000px){
      .modal{
        box-shadow: 0 5px 10px rgba(0,0,0,.5);
        width: 70%;
      }
    }

    @media(max-width: 750px){
      .modal{
        box-shadow: 0 5px 10px rgba(0,0,0,.5);
        width: 80%;
      }
    }

    .modal-header{
      font-size: 1.2rem;
    }

    .modal-body{
      color:#666666;
    }

    .modal-footer{
      padding: 0.5rem 1rem;
    }

    .button{
      margin: 0rem 0.2rem;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }


    .slide-fade-enter-active {
      transition: all .2s ease;
    }
    .slide-fade-leave-active {
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter{
      transform: translateY(-100px);
      opacity: 0;
    }
    .slide-fade-leave-to {
      transform: translateY(100px);
      opacity: 0;
    }

</style>
