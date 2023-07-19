export const videoModal = () => {
    $('.js-video-modal').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        tClose: 'Закрыть',
        tLoading: 'Загрузка',
        fixedContentPos: false,
        removalDelay: 160,
        preloader: false,
        callbacks: {
            open: () => {
                $('body').addClass('overflow');
            },
            close: () => {
                $('body').removeClass('overflow');
            }
        }
    });
};
export const simpleModal = () => {
    $('.js-simple-modal').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        tClose: 'Закрыть',
        tLoading: 'Загрузка',
        removalDelay: 160,
        closeBtnInside: true,
        fixedContentPos: true,
        preloader: false,
        callbacks: {
            open: () => {
                $('body').addClass('overflow');
            },
            close: () => {
                $('body').removeClass('overflow');
            }
        }
    });
};
export const galleryModal = (galleryBlock) => {
    $(galleryBlock).magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade',
        tClose: 'Закрыть',
        tLoading: 'Загрузка',
        gallery: {
            enabled: true,
            tPrev: 'Назад',
            tNext: 'Вперед',
            tCounter: '<span class="mfp-counter"><span class="active">%curr%</span> / <span>%total%</span></span>'
        },
        image: {
            tError: 'Ошибка загрузки',
        }
    });
};