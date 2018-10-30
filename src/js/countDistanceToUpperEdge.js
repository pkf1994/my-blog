export default {
  countDistanceToDocumentUpperEdge(el) {
    let distanceToBody = 0

    while(el != document.body) {
      distanceToBody = distanceToBody + el.offsetTop
      el = el.offsetParent
    }

    return distanceToBody
  },
  countDistanceToClientUpperEdge(el) {
    let distanceToBody = 0

    while(el != document.body) {
      distanceToBody = distanceToBody + el.offsetTop
      el = el.offsetParent
    }

    let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop

    return distanceToBody - bodyScrollTop
  }
}
