export default {
  scrollbarWidth:function () {
    var odiv = document.createElement('div')//创建一个div
    let  styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll'//让他有滚动条
      }

    Object.keys(styles).forEach((key) => {
      odiv.style[key] = styles[key];
    })


    document.body.appendChild(odiv);//把div添加到body中

    let scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
    odiv.remove();//移除创建的div
    return scrollbarWidth;//返回滚动条宽度
  }
}
