export const getAppHeight = () => {
    function getHeight (){
        $('html').css('--app-height', $(window).innerHeight() + 'px');
    }
    getHeight();
    window.addEventListener('resize', function (){
        getHeight();
    });
}