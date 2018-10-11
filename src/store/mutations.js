export default {
  appointIdOfCommentBeingRefering(state, comment_id){
    state.idOfCommentBeingRefering = comment_id
  },
  appointIdOfArticleBeingReading(state, article_id){
    state.idOfArticleBeingReading = article_id
  },
  changeArticlePageRouterStatus(state){
    state.articlePageRouterStatus++
  },
  appointOffsetTopOfCommentTitle(state, offsetTop){
    state.offsetTopOfCommentTitle = offsetTop
  },
  appointOffsetHeightOfNavbar(state, offsetHeight){
    state.offsetHeightOfNavbar = offsetHeight
  }
}