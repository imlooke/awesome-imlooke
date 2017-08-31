
$(document).ready(function() {
    // moment init
    moment.locale('zh-cn');
    $('.published-at').each(function(i, date) {
        var $date = $(date);
        $date.html(moment($date.attr('datetime')).calendar());
    });

    // 查看图片
    $('#showcaseModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var title = button.data('title');
        var src = button.data('src');

        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('.img-fluid').attr('src', src);
    });

    // 开启\关闭订阅窗口
    $('#subscribeOpen').click(function () {
        $('#subscribeModel').removeClass('hide');
    });

    $('#subscribeClose').click(function () {
        $('#subscribeModel').addClass('hide');
    });

    // 回顶部
    $(window).scroll(function(){
        //当window的scrolltop距离大于600时
        if($(this).scrollTop() > 600){
            $('#backToTopBtn').fadeIn(300);
        }else{
            $('#backToTopBtn').fadeOut(300);
        }
    });
    // 点击回顶部
    $('#backToTopBtn').click(function(){
        $('html ,body').animate({scrollTop: 0}, 700);
        return false;
    });

    // 开启分享列表
    $('#shareBtn').click(function () {
        if($('#socialShareContent').hasClass('is-actived')) {
            $('#socialShareContent').removeClass('is-actived');
            var shareSvg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 32"><title>ion-android-share</title><path d="M24 15.5l-10 9.188v-5.5c-6.688 0-10.688 2.125-14 6.813 1.313-6.688 4.688-13.375 14-14.688v-5.313z"/></svg>';
            $(this).html(shareSvg);
        } else {
            $('#socialShareContent').addClass('is-actived');
            var closeIcon = '<i class="material-icons">close</i>';
            $(this).html(closeIcon);
        }
    });
});