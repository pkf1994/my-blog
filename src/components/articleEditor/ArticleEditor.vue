<template>
    <div class="article-editor">

      <div class="label font-m font-bold">文章标题
        &nbsp;&nbsp;<span class="format-warn font-s" v-show="titleIsWrong&&!titleInputIsFocus">{{titleWrongMsg}}</span>
      </div>
      <input class="_input font-m" type="text"
             v-model="editingTitle"
             @focus="triggerTitleInputFocus"
             @blur="triggerTitleInputFocus"><br>

      <div class="label font-m font-bold">作者
        &nbsp;&nbsp;<span class="format-warn font-s" v-show="authorIsWrong&&!authorInputIsFocus">{{authorWrongMsg}}</span>
      </div>
      <input class="_input font-m" type="text"
             v-model="editingAuthor"
             @focus="triggerAuthorInputFocus"
             @blur="triggerAuthorInputFocus"><br>

      <div class="label font-m font-bold" >标签
        &nbsp;&nbsp;<span class="format-warn font-s" v-show="labelIsWrong&&!labelInputIsFocus">{{labelWrongMsg}}</span>
      </div>
      <input class="_input font-m" type="text" v-model="editingLabel"
             @focus="triggerLabelInputFocus"
             @blur="triggerLabelInputFocus"><br>

      <div class="label font-m font-bold">正文
        &nbsp;&nbsp;<span class="format-warn" v-show="contentIsWrong&&!contentInputIsFocus">{{contentWrongMsg}}</span>
      </div>
      <div class="editor">
        <quill-editor ref="myTextEditor"
                      v-model="editingContent"
                      :options="editorOption"
                      @focus="triggerContentInputFocus"
                      @blur="triggerContentInputFocus"
        >
        </quill-editor>
      </div>

      <button class="submit-button font-m" @click="submitArticle">提交</button>
      <button class="submit-button font-m" @click="submitDraft">存为草稿</button>

      <modalWithConfirm
        :modalHeaderProp="submitArticleModal.modalHeader"
        :modalBodyProp="submitArticleModal.modalBody"
        :btnValueOfYesProp="submitArticleModal.btnValueOfYes"
        :btnValueOfNoProp="submitArticleModal.btnValueOfNo"
        :isLoading="submitArticleModal.isLoading"
        :onlyNorify="submitArticleModal.onlyNorify"
        :show="submitArticleModal.isOpening"
        :error="submitArticleModal.happenError"
        @clickYesEventOfParent='()=>{submitArticleModal.isOpening=false;goToArticlesPage()}'
        @clickNoEventOfParent='()=>{submitArticleModal.isOpening=false;initializeArticleEditPane()}'
        @clickYesAfterError='()=>{submitArticleModal.isOpening=false}'
      />

      <modalWithConfirm
        :modalHeaderProp="submitDraftModal.modalHeader"
        :modalBodyProp="submitDraftModal.modalBody"
        :btnValueOfYesProp="submitDraftModal.btnValueOfYes"
        :isLoading="submitDraftModal.isLoading"
        :onlyNorify="submitDraftModal.onlyNorify"
        :show="submitDraftModal.isOpening"
        :error="submitDraftModal.happenError"
        @clickYesEventOfParent='()=>{submitDraftModal.isOpening=false}'
        @clickYesAfterError='()=>{submitDraftModal.isOpening=false}'
      />

    </div>
</template>

<script>
  import


    hljs from 'highlight.js'
  import 'highlight.js/styles/rainbow.css'
  import ApiInfo from '../../api/apiInfo.js'
  import ArticleApi from '../../api/article_api.js'
  import StandardModal from '../modal/StandardModal.vue'
  import ModalWithConfirm from '../modal/ModalWithConfirm.vue'
  import { mapActions } from 'vuex'
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {quillEditor, Quill} from 'vue-quill-editor'
  import { ImageDrop } from 'quill-image-drop-module';
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/ImageExtend', ImageExtend)
  // use resize module
  Quill.register('modules/ImageResize', ImageResize)
  export default {
    props:{
      idOfEditingArticle: {
      }
    },
    data: function () {
      return {

        editingTitle: '',
        editingAuthor: '',
        editingLabel: '',
        editingContent: '',

        titleIsWrong: false,
        authorIsWrong: false,
        labelIsWrong: false,
        contentIsWrong: false,

        titleWrongMsg: '标题有误',
        authorWrongMsg: '作者有误',
        labelWrongMsg: '标签',
        contentWrongMsg: '尚未填写正文',

        titleInputIsFocus: false,
        authorInputIsFocus: false,
        labelInputIsFocus: false,
        contentInputIsFocus: false,

        token:'',

        idOfSubmitedArticle:0,
        isLoading: true,

        /*提交文章模态框*/
        submitArticleModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          btnValueOfNo:'',
          happenError:false,
          isLoading:false,
          isOpening:false,
          onlyNorify:false
        },

        /*提交草稿模态框*/
        submitDraftModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          happenError:false,
          isLoading:false,
          isOpening:false,
          onlyNorify:true
        },


        editorOption: {
          modules: {
            imageDrop: true,
            ImageResize: {

            },
            ImageExtend: {
              loading: true,  // 可选参数 是否显示上传进度和提示语
              name: 'img',  // 图片参数名
              size: 10,  // 可选参数 图片大小，单位为M，1M = 1024kb
              action: ApiInfo.server + "image/image_upload.do?",  // 服务器地址, 如果action为空，则采用base64插入图片
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
              // 则 return res.data.url
              response: (res) => {
                console.log(res)
                return res.imgUrl
              },
              headers: (xhr) => {
                xhr.setRequestHeader('Authorization', this.token);
              },  // 可选参数 设置请求头部
              start: () => {},  // 可选参数 自定义开始上传触发事件
              end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: (res) => {alert(res)},  // 可选参数 自定义网络错误触发的事件
              change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            /*ImageResize: {
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },*/
            toolbar: {
              container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
              handlers: {
                'image': function () {  // 劫持原来的图片点击按钮事件
                  QuillWatch.emit(this.quill.id)
                }
              }
            },
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        return hljs.highlightAuto(this.editingContent).value
      },
      currentRoutePath(){
        return this.$route.path;
      }
    },
    components:{
      quillEditor,
      StandardModal,
      ModalWithConfirm
    },
    created(){
      this.loadDraftData()
    },
    mounted(){
      this.initContent()
      this.initToken()
    },
    watch: {
      titleInputIsFocus() {
        this.checkTitle()
      },
      authorInputIsFocus() {
        this.checkAuthor()
      },
      labelInputIsFocus() {
        this.checkLabel()
      },
      contentInputIsFocus() {
        this.checkContent()
      },
      idOfEditingArticle() {
        this.loadDraftData()
        this.labelIsWrong = false
        this.authorIsWrong = false
      }
    },
    methods:{
      ...mapActions([
        'triggerFlagRefreshHome'
      ]),
      initContent() {
          document.getElementsByClassName('ql-container')[0].style.height = '300px'
      },
      submitArticle() {

        this.checkTitle()
        this.checkAuthor()
        this.checkLabel()
        this.checkContent()

        if(this.titleIsWrong || this.authorIsWrong || this.labelIsWrong || this.contentIsWrong) {
          return
        }

        this.submitArticleModal.isOpening = true;
        this.submitArticleModal.isLoading = true;


        ArticleApi.uploadArticle(this.idOfEditingArticle,
                                  this.editingTitle,
                                  this.editingAuthor,
                                  this.editingLabel,
                                  this.editingContent,
                                  'article').then((res) => {
          if(res.status === 200) {

            this.submitArticleModal.modalHeader = '提示'
            this.submitArticleModal.modalBody = '文章提交成功！请选择后续操作'
            this.submitArticleModal.btnValueOfYes = '去首页'
            this.submitArticleModal.btnValueOfNo = '继续'
            this.submitArticleModal.happenError = false;

            setTimeout(() => {
              this.submitArticleModal.isLoading = false;
            },1500)

          }
        }).catch((err) => {

          this.submitArticleModal.modalHeader = '警告';
          this.submitArticleModal.modalBody = '文章提交失败! 发生错误: ' + err.message;
          this.submitArticleModal.happenError = true;
          this.submitArticleModal.isLoading = false;

          if (err.response.status == 400) {
            this.submitArticleModal.modalBody = '文章提交失败! 发生错误: ' + err.response.data.msg;
          }

        })
      },
      submitDraft() {
        this.authorIsWrong = false
        this.labelIsWrong = false
        this.checkTitle()
        this.checkContent()

        if(this.titleIsWrong || this.contentIsWrong) {
          return
        }

        this.submitDraftModal.isOpening = true;
        this.submitDraftModal.isLoading = true;

        ArticleApi.uploadArticle(this.idOfEditingArticle == 0 ? this.idOfSubmitedArticle : this.idOfEditingArticle,
                                  this.editingTitle,
                                  this.editingAuthor,
                                  this.editingLabel,
                                  this.editingContent,
                                  'draft').then((res) => {
          if(res.status === 200) {

            this.idOfSubmitedArticle = res.data

            this.submitDraftModal.modalHeader = '提示'
            this.submitDraftModal.modalBody = '草稿保存成功'
            this.submitDraftModal.btnValueOfYes = '确定'
            this.submitDraftModal.happenError = false

            setTimeout(() => {
              this.submitDraftModal.isLoading = false
              this.$emit('refreshDrafts')
            },1500)

          }
        }).catch((err) => {

          this.submitDraftModal.modalHeader = '警告'
          this.submitDraftModal.modalBody = '草稿保存失败! 发生错误: ' + err.message
          this.submitDraftModal.happenError = true
          if (err.response.status == 400) {
            this.submitDraftModal.modalBody = '草稿保存失败! 发生错误: ' + err.response.data.msg
            console.log()
          }
          this.submitDraftModal.isLoading = false
        })
      },
      triggerTitleInputFocus() {
        this.titleInputIsFocus = !this.titleInputIsFocus
      },
      triggerAuthorInputFocus() {
        this.authorInputIsFocus = !this.authorInputIsFocus
      },
      triggerLabelInputFocus() {
        this.labelInputIsFocus = !this.labelInputIsFocus
      },
      triggerContentInputFocus() {
        this.contentInputIsFocus = !this.contentInputIsFocus
      },
      checkTitle() {
        this.titleIsWrong = false
        if(this.editingTitle.trim() === '') {
          this.titleIsWrong = true
          this.titleWrongMsg = '标题不能为空'
          return
        }
        if(this.editingTitle.getLength()>100){
          this.titleIsWrong = true
          this.titleWrongMsg = '标题长度过大'
        }
      },
      checkAuthor() {
        this.authorIsWrong = false
        if(this.editingAuthor.trim() === '') {
          this.authorIsWrong = true
          this.authorWrongMsg = '作者不能为空'
          return
        }
        if(this.editingAuthor.getLength()>26){
          this.authorIsWrong = true
          this.authorWrongMsg = '作者名称长度过大'
        }
      },
      checkLabel() {
        this.labelIsWrong = false
        if(this.editingLabel.trim() === '') {
          this.labelIsWrong = true
          this.labelWrongMsg = '标签不能为空'
          return
        }
        if(this.editingLabel.getLength()>12){
          this.labelIsWrong = true
          this.labelWrongMsg = '作者名称长度过大'
        }
      },
      checkContent() {
        this.contentIsWrong = false
        if(this.editingContent.trim() === '') {
          this.contentIsWrong = true
        }
      },
      goToArticlesPage() {
        this.$router.push({path: '/routine/home'})
        this.triggerFlagRefreshHome()
      },
      goToDraftEditPage() {
        this.$router.push('/routine/article_edit/' + this.idOfSubmitedArticle)
      },
      initializeArticleEditPane() {
        location.reload(true)
      },
      redirectToInitialEditor() {
        if(this.idOfEditingArticle != 0) {
          this.$router.push('/routine/article_edit/0')
        }
      },
      loadDraftData() {
        this.initToken()
        if(this.token == '') {
          this.$router.push('/routine/article_edit/0')
        }
        if(this.idOfEditingArticle != 0){
          ArticleApi.getArticleById(this.idOfEditingArticle).then((res) => {
            if(res.status === 200){
              this.editingTitle = res.data.article_title
              this.editingAuthor = res.data.article_author
              this.editingLabel = res.data.article_label
              this.editingContent = res.data.article_content
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      initToken() {
        if(localStorage.getItem('token') != undefined){
          var tokenObj = JSON.parse(localStorage.getItem('token'))
          this.token = tokenObj.token
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
._input
  width 100%
  margin-top 5px
  margin-bottom 15px



.editor
  margin-top 5px


.submit-button
  margin 10px 0px
  margin-right 10px

.format-warn
  color red
  font-weight normal
</style>
