export const headerScrollChange = () => {
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        if(scroll > 0) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    });
}
