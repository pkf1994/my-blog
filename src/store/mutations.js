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
  },
  triggerFlagRefreshHome(state) {
    state.flagRefreshHome = !state.flagRefreshHome
  },
  appointNavbarSearchString(state, searchString) {
    state.navbarSearchString = searchString
  },
  appointScrollTopOfDocumentEl(state, scrollTop) {
    state.scrollTopOfDocumentEl = scrollTop
  }
}
