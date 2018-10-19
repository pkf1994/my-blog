export default {
  scrollbarWidth:function () {
    var H = $('html');

    // H.addClass('fancybox-lock-test');
    H.css('overflow-y','auto');
    const w1 = $(window).width();
    // H.removeClass('fancybox-lock-test');
    H.css('overflow-y','hidden');
    const w2 = $(window).width();

    return w2 - w1;
  }
}
