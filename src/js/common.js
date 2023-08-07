// slider
import Swiper, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper'
// functions
import { headerScrollChange } from './_func/_jq/headerScrollChange'
import { getAppHeight } from './_func/_jq/getAppHeight'
import { getScrollWidth } from './_func/_jq/getScrollWidth'
import { menuBtn } from './_func/_jq/menuBtn'
import { scrollTo, topScroll } from './_func/_jq/scrollTo'

/* ------------------- */

document.addEventListener('DOMContentLoaded', () => {
    var scrollPos = 0
    // app height
    getAppHeight()
    // scroll width
    getScrollWidth()
    // scroll header change
    headerScrollChange()
    // mobile menu
    menuBtn()

    /* main page */
    if ($('.main-page').length > 0) {
        // main animation
        var mainRightAnimation = bodymovin.loadAnimation({
            container: document.getElementById('main_right_animation'),
            path: VSN_JSON_PATH + 'main_animation.json',
            renderer: 'svg',
            loop: false,
            autoplay: true,
            name: 'main_left',
        })
        var mainLeftAnimation = bodymovin.loadAnimation({
            container: document.getElementById('main_left_animation'),
            path: VSN_JSON_PATH + 'main_animation.json',
            renderer: 'svg',
            loop: false,
            autoplay: true,
            name: 'main_right',
        })
    }
    if ($('.air-descr').length > 0) {
        var adjustAnimation = bodymovin.loadAnimation({
            container: document.getElementById('adjust_animation'),
            path: VSN_JSON_PATH + 'air_adjustment.json',
            renderer: 'svg',
            loop: true,
            autoplay: true,
            name: 'adjust',
        })
    }
    // black image function
    $('.js-switch-link').click(function () {
        $(this).toggleClass('black')
        $(this).parents('.ignis-block').toggleClass('black')
        if ($(this).parents('.ignis-block').hasClass('black')) {
            $(this).parents('.ignis-block').find('.black-image').fadeIn()
            $(this).parents('.ignis-block').find('.white-image').hide()
        } else {
            $(this).parents('.ignis-block').find('.black-image').hide()
            $(this).parents('.ignis-block').find('.white-image').fadeIn()
        }
    })

    /* preview page */
    var previewSlider = new Swiper('#preview-slider', {
        lazy: true,
        speed: 800,
        slidesPerView: 'auto',
        spaceBetween: 0,
        breakpoints: {
            1201: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            641: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    })

    function throttle(func, ms) {
        let isThrottled = false,
            savedArgs,
            savedThis

        function wrapper() {
            if (isThrottled) {
                // (2)
                savedArgs = arguments
                savedThis = this
                return
            }

            func.apply(this, arguments) // (1)

            isThrottled = true

            setTimeout(function () {
                isThrottled = false // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs)
                    savedArgs = savedThis = null
                }
            }, ms)
        }

        return wrapper
    }

    if ($('.ignis-page').length > 0) {
        // spectra shadow animation
        $('.preview-spectra__spline').on(
            'mousemove',
            throttle(function (event) {
                const width = $(this).width()
                const center = Math.floor(width / 2)
                const xCoordMouse = event.offsetX
                const percentOfCenter =
                    100 - Math.abs(xCoordMouse / center) * 100

                $(this).css(
                    'filter',
                    `drop-shadow(${percentOfCenter * 0.15}px 15px 15px #a0a0a0)`
                )
            }, 50)
        )

        var ignisreadySlider = new Swiper('#ignis-ready-slider', {
            modules: [EffectFade, Autoplay],
            lazy: true,
            effect: 'fade',
            allowTouchMove: false,
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
        })

        ignisreadySlider.on('slideChange', function () {
            $('.ignis-ready__content .nav-link').removeClass('active')
            const index = ignisreadySlider.activeIndex
            const arr = [...$('.ignis-ready__content .nav-link')]
            arr[index].classList.add('active')
        })

        $('.ignis-ready__content .nav-link').click(function () {
            var curSlide = $(this).attr('data-slide')
            $('.ignis-ready__content .nav-link').removeClass('active')
            $(this).addClass('active')
            ignisreadySlider.slideTo(curSlide - 1)
        })

        var ignisspectraSlider = new Swiper('#ignis-spectra-slider', {
            modules: [EffectFade],
            lazy: true,
            effect: 'fade',
            crossFade: true,
            allowTouchMove: false,
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 20,
        })

        $('.preview-spectra__content .nav-link').click(function () {
            var curSlide = $(this).attr('data-slide')
            $('.preview-spectra__content .nav-link').removeClass('active')
            $(this).addClass('active')
            ignisspectraSlider.slideTo(curSlide - 1)
        })

        var ignismountingSlider = new Swiper('#ignis-mounting-slider', {
            modules: [EffectFade, Autoplay],
            lazy: true,
            effect: 'fade',
            allowTouchMove: false,
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        })

        ignismountingSlider.on('slideChange', function () {
            $('.preview-mounting__content .nav-link').removeClass('active')
            const index = ignismountingSlider.activeIndex
            const arr = [...$('.preview-mounting__content .nav-link')]
            arr[index].classList.add('active')
        })

        $('.preview-mounting__content .nav-link').click(function () {
            var curSlide = $(this).attr('data-slide')
            $('.preview-mounting__content .nav-link').removeClass('active')
            $(this).addClass('active')
            ignismountingSlider.slideTo(curSlide - 1)
        })

        /* ignis install animation */
        if ($('.preview-module').length > 0) {
            $(window).scroll(function () {
                var wt = $(window).scrollTop()
                var wh = $(window).height()
                var et = $('.preview-module').offset().top
                var eh = $('.preview-module').outerHeight()
                var dh = $(document).height()

                if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
                    // Код анимации
                    $('.preview-module').addClass('animated')
                }
            })
        }

        $('.ignis-specification__toggle').click(function () {
            $('.ignis-specification__dropdown').toggleClass(
                'ignis-specification__dropdown_active'
            )
        })

        $('.ignis-specification__option').click(function () {
            $(this).siblings().removeClass('ignis-specification__option_active')
            $(this).addClass('ignis-specification__option_active')

            $('.ignis-specification__toggle span').text($(this).text())

            $('.ignis-specification__content')
                .removeClass(
                    'ignis-specification__content_one ignis-specification__content_two ignis-specification__content_three'
                )
                .addClass(
                    `ignis-specification__content_${$(this).attr('data-value')}`
                )

            $('.ignis-specification__dropdown').toggleClass(
                'ignis-specification__dropdown_active'
            )
        })
    }

    var aquamixerSlider = new Swiper('#aquamixer-slider', {
        modules: [EffectFade],
        lazy: true,
        effect: 'fade',
        allowTouchMove: false,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 20,
    })
    $('.aqmixer-content .nav-link').click(function () {
        var curSlide = $(this).attr('data-slide')
        $('.aqmixer-content .nav-link').removeClass('active')
        $(this).addClass('active')
        aquamixerSlider.slideTo(curSlide - 1)
    })

    var previewHowSlider = new Swiper('#preview-how-slider', {
        modules: [Navigation, Pagination, EffectFade],
        lazy: true,
        effect: 'fade',
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        breakpoints: {
            576: {
                autoHeight: false,
            },
        },
        navigation: {
            prevEl: '.preview-how-slider .slider-navigation .nav-btn.prev-btn',
            nextEl: '.preview-how-slider .slider-navigation .nav-btn.next-btn',
        },
        pagination: {
            clickable: true,
            el: '.preview-how-slider .slider-pagination',
        },
    })

    /* vision page */
    var visionSlider = new Swiper('#vision-design-slider', {
        modules: [Autoplay],
        loop: true,
        speed: 5000,
        slidesPerView: 1.35,
        spaceBetween: 20,
        autoplay: {
            delay: 0,
        },
    })

    /* air install animation */
    if ($('.js-install-animation').length > 0) {
        $(window).scroll(function () {
            var scroll = $(this).scrollTop(),
                installTop = $('.js-install-animation').offset().top
            if (scroll > installTop - 240) {
                if (
                    !$('.js-install-animation .image-wrapper').hasClass(
                        'animated'
                    )
                ) {
                    $('.js-install-animation .image-wrapper').addClass(
                        'animated'
                    )
                    setTimeout(function () {
                        $('.js-install-animation .image-wrapper').removeClass(
                            'animated'
                        )
                    }, 15000)
                }
            }
        })
        $('.js-install-animation .image-wrapper').hover(function () {
            if (!$(this).hasClass('animated')) {
                $('.js-install-animation')
                    .find('.image-wrapper')
                    .addClass('animated')
                setTimeout(function () {
                    $('.js-install-animation')
                        .find('.image-wrapper')
                        .removeClass('animated')
                }, 15000)
            }
        }),
            function () {}
    }

    if ($('.message-section__form').length > 0) {
        const $fileInput = $('.message-section__form .file-input')
        const $droparea = $('.message-section__form .file-drop-area')
        const $delete = $('.message-section__form .item-delete')

        $fileInput.on('dragenter focus click', function () {
            $droparea.addClass('is-active')
        })
        $fileInput.on('dragleave blur drop', function () {
            $droparea.removeClass('is-active')
        })
        $fileInput.on('change', function () {
            let filesCount = $(this)[0].files.length
            let $textContainer = $(this).prev()

            if (filesCount === 1) {
                let fileName = $(this).val().split('\\').pop()
                $textContainer.text(fileName)
                $('.message-section__form .item-delete').css(
                    'display',
                    'inline-block'
                )
            } else if (filesCount === 0) {
                $('.message-section__form .item-delete').css('display', 'none')
            } else {
                $textContainer.text('Файлов выбрано: ' + filesCount)
                $('.message-section__form .item-delete').css(
                    'display',
                    'inline-block'
                )
            }
        })
        $delete.on('click', function () {
            $('.message-section__form .file-drop-area').removeClass('is-active')
            $('.message-section__form .file-input').val(null)
            $('.message-section__form .item-delete').css('display', 'none')
            $('.message-section__form .file-msg').text('')
        })

        $('.js-file-attach').click(function () {
            $(this).parent().find('input[type="file"]').click()
        })
    }

    /* scroll */
    scrollTo('.js-scroll-link', 100)
    topScroll('#toTop')
    $(window).scroll(function () {
        var scroll = $(this).scrollTop(),
            viewportHeight = $(window).height(),
            footerTop = $('.footer').offset().top
        if (scroll > scrollPos) {
            if (scroll + viewportHeight > footerTop) {
                $('#toTop').fadeOut(300)
            } else {
                $('#toTop').fadeIn(300)
            }
        } else {
            $('#toTop').fadeOut(300)
        }
        scrollPos = scroll
    })
})
