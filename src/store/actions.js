export default {
  appointIdOfCommentBeingRefering(context, comment_id){
    context.commit('appointIdOfCommentBeingRefering', comment_id)
  },
  appointIdOfArticleBeingReading(context, article_id){
    context.commit('appointIdOfArticleBeingReading', article_id)
  }
}
