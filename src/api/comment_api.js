import apiInfo from './apiInfo.js'
import axios from 'axios'

export default {
  getCommentListByArticleId(article_id, currentPage, pageScale) {
    var config = {
      params: {
        article_id: article_id,
        currentPage: currentPage,
        pageScale: pageScale
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'comment/comment_list.do', config).then(function (res) {
        resolve(res)
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  getCommentById(comment_id) {
    var config = {
      params: {
        comment_id: comment_id
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'comment/comment.do', config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  submitComment(visitor_name, comment_referComment, comment_content, comment_hostId, visitor_email, visitor_siteAddress){

    let commentData = {
      visitor_name: visitor_name,
      comment_referComment: comment_referComment,
      comment_content: comment_content,
      comment_hostId: comment_hostId,
      visitor_email: visitor_email,
      visitor_siteAddress: visitor_siteAddress
    }


    return new Promise((resolve, reject) => {
      axios.post(apiInfo.server + 'comment/submit_comment.do', commentData).then((res) => {
        resolve(res)
      }).then((err) => {
        reject(err)
      })
    })
  }
}
