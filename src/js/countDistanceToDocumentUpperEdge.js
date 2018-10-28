export default {
  countDistanceToClientUpperEdge(el) {
    let distanceToBody = 0

    while(el != document.body) {
      distanceToBody = distanceToBody + el.offsetTop
      el = el.offsetParent
    }

    return distanceToBody
  }
}
