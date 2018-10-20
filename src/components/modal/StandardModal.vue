<<template>
  <div class="cover flex-row-column-center" ref="cover">
    <transition name="slide-fade">
      <div class="modal" v-if="showModal">

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
      isLoading:{
        type:Boolean
      },
      error:false,
      onlyNorify:false
    },
    data(){
      return{
        modalHeader:'正在处理...',
        showModal:false,
      }
    },
    mounted(){
      this.init()
    },

    methods:{
      init() {
        const _this = this;
        let bodyEl = document.documentElement || document.body
        this.$refs.cover.style.height = bodyEl.clientHeight;
        this.$refs.cover.style.top = document.documentElement.scrollTop + 'px';
        this.$refs.cover.style.background = 'rgba(0,0,0,0.1)';
        bodyEl.style.overflowY = 'hidden';
        bodyEl.style.marginRight = scrollbarWidth.scrollbarWidth() + 'px';

        setTimeout(function () {
          _this.showModal = true;
        },500)
      },

      clickYes(){
        this.showModal = false;
        this.$refs.cover.style.background = 'rgba(0,0,0,0)';

        setTimeout(function () {
          document.body.style.marginRight = 0;
          document.body.style.overflowY='auto';
        }.bind(this),500)

        setTimeout(function () {
          this.$emit('clickYesEventOfParent');
        }.bind(this),500)

      },

      clickNo(){
        this.showModal = false;
        this.$refs.cover.style.background = 'rgba(0,0,0,0)';

        setTimeout(function () {
          document.body.style.marginRight = 0;
          document.body.style.overflowY='auto';
        }.bind(this),500)

        setTimeout(function () {
          this.$emit('clickNoEventOfParent');
        }.bind(this),500)
      },

      clickYesAfterError(){
        this.$emit('clickYesAfterError');
      }
    },

    /*    watch:{
          isLoading(){
            if(this.isLoading == false){
              console.log(' this.$refs.modalBody:'+ this.$refs.modalBody);
              this.$refs.modalBody.innerHTML = this.modalBodyProp;
              this.modalHeader = this.modalHeaderProp;

              console.log('standardModal: isLoading: ' + this.isLoading)
            }
          }
        }*/
  }
</script>

<style scoped lang="stylus">
.cover
  position absolute
  top 0px
  left 0px
  width 100%
  height 100%
  /*  background: rgba(0,0,0,0.1);*/
  z-index 999
  transition background 0.5s ease
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
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter{
    transform: translateY(-300px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateY(300px);
    opacity: 0;
  }

</style>
