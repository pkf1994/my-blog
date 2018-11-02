<template>
    <div class="comment-last">
        <div class="comment-last-headline font-bold">最近评论</div>
        <div class="comment-last-list">
          <!--<div v-for="comment in commentList" class="comment-last-list-item">
            <span class="cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostId, comment.comment_id);
            }">{{comment.comment_author.visitor_name}}</span>&nbsp;:&nbsp;
            <span class="overRowHandle cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostArticle.article_id, comment.comment_id);
            }">{{comment.comment_content}}</span>
            <div class="comment-last-host-article"><div class="cursorp overRowHandle" @click="() => {
              goToTheArticlePage(comment.comment_hostArticle.article_id, comment.comment_id);
            }">[{{comment.comment_hostArticle.article_label}}]&nbsp;{{comment.comment_hostArticle.article_title}}</div>
            </div>
          </div>-->
          <transition-group name="list-complete" tag="div">
            <CommentLastItem v-for="comment in commentList"
                             :comment="comment"
                             class="list-complete-item"
                             @goToTheArticlePage="goToTheArticlePage" v-bind:key="comment.comment_id">

            </CommentLastItem>
          </transition-group>

          <div class="division"></div>
          <Loading v-show="isLoading"></Loading>
          <ClickForMore v-show="!(maxPage==currentPage)&&!isLoading" @click="reload"></ClickForMore>
          <Nomore v-show="maxPage==currentPage">没有更多内容</Nomore>
        </div>
    </div>
</template>

<script>
  import CommentApi from '../../api/comment_api.js'
  import Loading from '../loading/Loading.vue'
  import Nomore from '../loading/Nomore.vue'
  import ClickForMore from '../loading/ClickForMore.vue'
  import CommentLastItem from './CommentLastItem.vue'
  export default {
    data() {
      return {
        maxPage: 1,
        currentPage: 0,
        pageScale: 3,
        commentList: [],
        isLoading: false
      }
    },
    components: {
      Loading,
      Nomore,
      ClickForMore,
      CommentLastItem
    },
    created() {
      this.loadCommentListData()
    },
    methods: {
      loadCommentListData() {
        if(this.currentPage == this.maxPage){
          return
        }
        this.currentPage ++
        CommentApi.getCommentLastListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
          if(res.status === 200) {
            this.maxPage = res.data.maxPage
            this.commentList = this.commentList.concat(res.data.commentList)
            this.isLoading = false
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      reload() {
        if (!(this.maxPage === this.currentPage)) {
          this.isLoading = true
        }
        setTimeout(() => {
          this.loadCommentListData()
        }, 2000)
      },
      goToTheArticlePage(comment_hostId, comment_id) {
        this.$router.push({path: '/article/' + comment_hostId, query: {id_of_comment_scroll_to: comment_id}})
        window.addEventListener('road', () => {
          let theCommentEl = document.getElementById('comment_' + this.$route.query.idOfCommentScrollTo)
          window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(theCommentEl) - 50)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .comment-last-headline
    line-height 2rem
    border-top 1px solid  rgb(222, 226, 230)
    padding-top 15px

  .comment-last-list
    height 330px
    overflow auto

  .comment-last-list::-webkit-scrollbar
    width 10px
    height 1px

  .comment-last-list::-webkit-scrollbar-thumb
    border-radius 10px
    -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
    background rgb(128, 128, 128)

  .comment-last-list::-webkit-scrollbar-track
    box-shadow inset 0 0 5px rgba(0,0,0,0.2)
    border-radius 10px
    background #EDEDED


  .comment-last-list-item
    margin-bottom 10px
    margin-left 5px
    color rgb(23, 81, 153)
    border 1px solid rgb(222, 226, 230)
    border-radius 5px
    padding 5px 5px

  .comment-last-list-item:hover
    color black

  .comment-last-host-article
    position relative
    background rgb(222, 226, 230)
    line-height 2rem
    border-radius 5px
    padding-left 5px
    margin-top 10px
  .comment-last-host-article:before
      content ''
      width 0
      height 0
      border 7px solid transparent
      border-bottom-color rgb(222, 226, 230)
      position absolute
      left 15px
      top -14px
      margin-top -20p

  .list-complete-item
    transition all 0.5s
    margin-right 5px

  .list-complete-enter
  .list-complete-leave-to
    opacity 0
    transform translateY(10px)

  .list-complete-leave-active
    position absolute
</style>
