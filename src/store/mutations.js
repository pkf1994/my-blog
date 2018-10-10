export default {
  appointIdOfCommentBeingRefering(state, comment_id){
    state.idOfCommentBeingRefering = comment_id
  },
  appointIdOfArticleBeingReading(state, article_id){
    state.idOfArticleBeingReading = article_id
  }
}
