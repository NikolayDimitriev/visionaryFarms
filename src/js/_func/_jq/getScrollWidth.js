export const getScrollWidth = () => {
    $('html').css('--scroll-width', $(window).outerWidth() - $(document).width() + 'px');
}