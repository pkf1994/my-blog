export default {
  appointIdOfCommentBeingRefering(context, comment_id){
    context.commit('appointIdOfCommentBeingRefering', comment_id)
  },
  appointIdOfArticleBeingReading(context, article_id){
    context.commit('appointIdOfArticleBeingReading', article_id)
  },
  changeArticlePageRouterStatus(context) {
    context.commit('changeArticlePageRouterStatus')
  },
  appointOffsetTopOfCommentTitle(context, offsetTop) {
    context.commit('appointOffsetTopOfCommentTitle', offsetTop)
  },
  appointOffsetHeightOfNavbar(context, offsetHeight) {
    context.commit('appointOffsetHeightOfNavbar', offsetHeight)
  }
}