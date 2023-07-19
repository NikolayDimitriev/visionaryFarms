export const scrollTo = (selector, offset) => {
    $("body").on('click', selector, function(e){
        $('html,body').stop().animate({ scrollTop: $('#' + $(this).attr('data-section')).offset().top - offset }, 1000);
        e.preventDefault();
    });
}
export const topScroll = (id) => {
    $("body").on('click', id, function(e){
        $('html,body').stop().animate({ scrollTop: 0 }, 1000);
        e.preventDefault();
    });
}