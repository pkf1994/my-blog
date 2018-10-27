<template>
  <div class="pagination flex-row-center" v-model="currentPage">
    <div class="inner">
      <div class="item go-to-first" @click="goToFirstPage"><i class="fa fa-angle-double-left"></i></div>
      <div class="item go-to-previous" @click="goToPreviousPage"><i class="fa fa-angle-left"></i></div>
      <!-- v-bind:class="{active:currentPage==label1}"  为所有页号按钮绑定激活样式-->
      <!--计算属性{{label1}}根据当前页号currentPage生成，用于展示页号按钮标号-->
      <!--v-if="label2<=maxPage && label5>=1" 为页号按钮设置展示扳机，因为在maxPage(最大页号)足够小时，一些页号按钮需要被隐藏，如当maxPage等于3时，将需要隐藏原本用于显示页号4、5的页号按钮-->
      <div class="item i-1" v-bind:class="{active:currentPage==label1}" @click="changeCurrentPage">{{label1}}</div>
      <div class="item i-2" v-if="label2<=maxPage && label2>1" v-bind:class="{active:currentPage==label2}" @click="changeCurrentPage">{{label2}}</div>
      <div class="item i-3" v-if="label3<=maxPage && label3>2" v-bind:class="{active:currentPage==label3}" @click="changeCurrentPage">{{label3}}</div>
      <div class="item i-4" v-if="label4<=maxPage && label4>3" v-bind:class="{active:currentPage==label4}" @click="changeCurrentPage">{{label4}}</div>
      <div class="item i-5" v-if="(label5<=maxPage && label5>4 )|| label5 == '...'" v-bind:class="{active:currentPage==label5}" @click="changeCurrentPage">{{label5}}</div>
      <div class="item go-to-next" @click="goToNextPage"><i class="fa fa-angle-right"></i></div>
      <div class="item go-to-last" @click="goToLastPage"><i class="fa fa-angle-double-right"></i></div>
    </div>

  </div>
</template>

<script>
  export default {
    props:{
      maxPage:{
        type: Number,
        required: true
      }
    },
    data(){
      return{
        currentPage:1,
      }
    },
    computed:{
      origin:function () {
        /*首先判断元素i-5是否已经显示最大标号maxPage，若否，则进一步判断当前页号是否小于4，若也成立，则i-1将显示页码1，若第二个判断不成立，则i-1将显示当前页号减去2所得标号*/
        /*其他逻辑太复杂，我懒得写了*/
        var origin = this.currentPage < (this.maxPage - 2) ?　(this.currentPage < 4 ? 1 : this.currentPage - 2) : (this.maxPage - 4);
        return origin > 0 ? origin : 1;
      },
      label1:function(){
        var label1 = this.currentPage < 4 ? this.origin : '...' ;
        return this.maxPage > 5 ? label1 : 1;
      },
      label2:function(){
        return this.origin + 1;
      },
      label3:function(){
        return this.origin + 2;
      },
      label4:function(){
        return this.origin + 3;
      },
      label5:function(){
        return (this.origin + 4) >= this.maxPage ? this.maxPage : '...';
      },
    },
    methods:{
      changeCurrentPage(e){
        if(e.currentTarget.innerText != '...'){
          this.currentPage = parseInt(e.currentTarget.innerText);
        }
      },
      goToFirstPage(){
        this.currentPage = 1;
      },
      goToPreviousPage(){
        if(this.currentPage > 1)
          this.currentPage = this.currentPage - 1;
      },
      goToLastPage(){
        this.currentPage = this.maxPage;
      },
      goToNextPage(){
        if(this.currentPage < this.maxPage)
          this.currentPage = this.currentPage + 1;
      }
    },
    watch:{
      currentPage:function () {
        this.$emit('changeCurrentPage',this.currentPage)
      }
    }
  }
</script>

<style scoped>
  .pagination .inner .item{
    height: 2em;
    width: 2em;
    border: 1px solid #dee2e6;
    border-bottom: 0px;
    border-left: 0px;
    border-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  @media(max-width: 450px){
    .pagination .item {
      height: 2.5em;
      width: 2.5em;
    }
  }
  @media(max-width: 390px){
    .pagination .item {
      height: 2em;
      width: 2em;
    }
  }
  .pagination .item:hover{
    background: #dee2e6;
  }
  .pagination .go-to-previous{
    border-left: 1px solid #dee2e6;
  }
  .inner{
    padding: 0px;
    display: flex;
    border: 1px solid #dee2e6;
    border-radius: 5px;
  }
  .pagination .go-to-first,
  .pagination .go-to-last{
    border-left: 0px solid #dee2e6;
    border-right: 0px solid #dee2e6;
  }
  .active{
    background: #dee2e6;
  }
  i{
    color: black;
  }
</style>
