import axios from 'axios'
import apiInfo from './apiInfo.js'



export default {

  getArticleSummaryListByCurrentPageAndPageScale: function (currentPage, pageScale) {
    var config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_summary.do', config).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getDraftListByCurrentPageAndPageScale: function (currentPage, pageScale) {
    if(localStorage.getItem('token') != undefined){
      var tokenObj = JSON.parse(localStorage.getItem('token'))
      var token = tokenObj.token
    }
    var config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale
      },
      headers: {
        Authorization: token
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/draft_list.do', config).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleById: function (article_id) {
    var config = {
      params: {
        article_id: article_id
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article.do', config).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  uploadArticle: function (article_id, article_title, article_author, article_label, article_content, article_type) {
    if(localStorage.getItem('token') != undefined){
      var tokenObj = JSON.parse(localStorage.getItem('token'))
      var token = tokenObj.token
    }

    let headers = {
      Authorization: token
    }

    let articleData = {
      article_id: article_id,
      article_title: article_title,
      article_author: article_author,
      article_label: article_label,
      article_content: article_content,
      article_type: article_type
    }
   /* let config = {
      headers: {
        Authorization: token
      },
      data: {
        articleData: {
          article_id: article_id,
          article_title: article_title,
          article_author: article_author,
          article_label: article_label,
          article_content: article_content,
          article_type: article_type
        }
      }
    }*/

    return new Promise((resolve, reject) => {
      axios.post(apiInfo.server + 'article/upload_article.do', articleData, { headers: headers}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteArticle: function(article_id) {
    if(localStorage.getItem('token') != undefined){
      var tokenObj = JSON.parse(localStorage.getItem('token'))
      var token = tokenObj.token
    }

    let config = {
      params: {
        article_id: article_id
      },
      headers: {
        Authorization: token
      }
    }

    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/delete_article.do', config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleFilingData(flashBackIndex) {
    let config = {
      params: {
        flashBackIndex: flashBackIndex
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_filing.do', config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleLabelData() {
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_label.do').then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleItemListBySearchWords(currentPage, pageScale, searchString) {
    let config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale,
        searchString: searchString
      }
    }

    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_bysearch.do',config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleItemListByFilingDate(currentPage, pageScale, selectedYear, selectedMonth) {
    let config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_byfiling.do',config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleItemListByLabel(currentPage, pageScale, label) {
    let config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale,
        article_label: label
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_bylabel.do',config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
