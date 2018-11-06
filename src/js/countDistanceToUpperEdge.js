export default {
  countDistanceToDocumentUpperEdge(el) {

    if(el == undefined) {
      return
    }

    let distanceToBody = 0

    while(el != document.body) {
      distanceToBody = distanceToBody + el.offsetTop
      el = el.offsetParent
    }

    return distanceToBody
  },
  countDistanceToClientUpperEdge(el) {

    if(el == undefined) {
      return
    }

    let distanceToBody = 0

    while(el != document.body) {
      distanceToBody = distanceToBody + el.offsetTop
      el = el.offsetParent
    }

    let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop

    return distanceToBody - bodyScrollTop
  }
}
