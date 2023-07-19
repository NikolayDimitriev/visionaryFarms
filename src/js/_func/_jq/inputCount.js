export const inputCount = () => {
    $('.js-count-btn').click(function (){
        var curInput = $(this).parent().find('.count-input');
        if($(this).attr('data-type') == 'dec'){
            if(parseInt(curInput.val()) <= 1){
                curInput.val(1);
            }
            else{
                curInput.val(parseInt(curInput.val()) - 1);
            }
        }
        else{
            curInput.val(parseInt(curInput.val()) + 1);
        }
        curInput.trigger('change');
    })
}