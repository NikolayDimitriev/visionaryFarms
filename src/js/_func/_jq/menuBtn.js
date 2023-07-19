export const menuBtn = () => {
    // open menu
    $('#hamburger').on('click', function (){
        $('body').toggleClass('overflow menu-show');
        $(this).toggleClass('is-active');
        $('#main-menu').toggleClass('show');
    });
    // close menu
    $(document).click(function (e) {
        if($('#main-menu').has(e.target).length === 0 && $('#hamburger').has(e.target).length === 0 && $('#main-menu').hasClass('show') && !e.target.classList.contains('hamburger')){
            $('body').removeClass('overflow menu-show');
            $('#hamburger').removeClass('is-active');
            $('#main-menu').removeClass('show');
        }
    });
}