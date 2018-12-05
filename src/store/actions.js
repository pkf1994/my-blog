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
  },
  triggerFlagRefreshHome(context) {
    context.commit('triggerFlagRefreshHome')
  },
  appointNavbarSearchString(context,searchString) {
    context.commit('appointNavbarSearchString', searchString)
  },
  appointScrollTopOfDocumentEl(context,scrollTop) {
    context.commit('appointScrollTopOfDocumentEl', scrollTop)
  },
  triggerLoginStatus(context) {
    context.commit('triggerLoginStatus')
  },
  appointNoticeMsg(context, noticeMsg) {
    context.commit('appointNoticeMsg', noticeMsg)
  },
  triggerNotice(context) {
    context.commit('triggerNotice')
  },
  appointWidthOfWindow(context, widthOfWindow) {
    context.commit('appointWidthOfWindow', widthOfWindow)
  }
}

