// slider
import Swiper, {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    EffectCreative,
} from 'swiper'
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
                    `drop-shadow(${percentOfCenter * 0.15}px 15px 15px #4e4e4e)`
                )
            }, 50)
        )

        var ignisreadySlider = new Swiper('#ignis-ready-slider', {
            modules: [EffectFade, Autoplay],
            lazy: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
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
            fadeEffect: {
                crossFade: true,
            },
            allowTouchMove: false,
            speed: 800,

            slidesPerView: 1,
            spaceBetween: 0,

            breakpoints: {
                // when window width is >= 320px
                320: {
                    autoHeight: true,
                },
                1580: {
                    autoHeight: false,
                },
            },
        })

        $('.preview-spectra__content .nav-link').click(function () {
            var curSlide = $(this).attr('data-slide')
            $('.preview-spectra__content .nav-link').removeClass('active')
            $(this).addClass('active')
            ignisspectraSlider.slideTo(curSlide - 1)
        })

        var ignismountingSlider = new Swiper('#ignis-mounting-slider', {
            modules: [EffectCreative, Autoplay],
            lazy: true,
            effect: 'creative',
            allowTouchMove: false,
            speed: 300,
            slidesPerView: 1,
            spaceBetween: 0,
            creativeEffect: {
                prev: {
                    rotate: [180, 0, 0],
                },
                next: {
                    rotate: [-180, 0, 0],
                },
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            on: {
                init: function () {
                    this.slideTo(1)
                    this.autoplay.stop()
                    $('.preview-mounting__wrapper').removeClass(
                        'preview-mounting__wrapper_hang'
                    )
                },
            },
        })

        ignismountingSlider.on('slideChange', function () {
            $('.preview-mounting__content .nav-link').removeClass('active')
            const index = ignismountingSlider.activeIndex
            const arr = [...$('.preview-mounting__content .nav-link')]
            arr[index].classList.add('active')
            $('.preview-mounting__wrapper').toggleClass(
                'preview-mounting__wrapper_hang'
            )
        })

        if ($('.preview-mounting').length > 0) {
            $(window).scroll(function () {
                var wt = $(window).scrollTop()

                var et = $('.preview-mounting').offset().top
                var eh = $('.preview-mounting').outerHeight()

                if (wt <= et + eh && wt >= et) {
                    ignismountingSlider.slideTo(0)
                    $('.preview-mounting__wrapper').addClass(
                        'preview-mounting__wrapper_hang'
                    )
                    ignismountingSlider.autoplay.start()
                } else {
                    ignismountingSlider.autoplay.stop()
                }
            })
        }

        $('.preview-mounting__content .nav-link').click(function () {
            ignismountingSlider.autoplay.stop()
            ignismountingSlider.autoplay.start()
            var curSlide = $(this).attr('data-slide')
            $('.preview-mounting__content .nav-link').removeClass('active')
            $(this).addClass('active')
            ignismountingSlider.slideTo(curSlide - 1)
        })

        /* ignis install animation */
        if ($('.preview-module').length > 0) {
            $(window).scroll(function () {
                var wt = $(window).scrollTop()

                var et = $('.preview-module').offset().top
                var eh = $('.preview-module').outerHeight()

                if (wt <= et + eh && wt >= et - eh / 3) {
                    // Код анимации
                    $('.preview-module').addClass('animated')
                } else {
                    $('.preview-module').removeClass('animated')
                }
            })
        }

        $('.preview-module').hover(onIn, onOut)

        function onIn() {
            $('.preview-module').addClass('animated')
        }

        function onOut() {
            $('.preview-module').removeClass('animated')
        }

        // ! Ignis Configurator

        var ignisConfiguratorSlider = new Swiper('#ignis-configurator-slider', {
            modules: [EffectFade, Autoplay],
            lazy: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            allowTouchMove: false,
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
        })

        const condition = {
            length: 1,
            config: 1,
            mounting: 1,
            controls: 3,
        }

        function updateSlide() {
            if (condition['config'] === 1) {
                if (condition['mounting'] === 1) {
                    if (condition['controls'] === 1) {
                        ignisConfiguratorSlider.slideTo(6)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                'Ignis 600mm, 15W, 50 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                'Ignis 900mm, 22W, 73 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                'Ignis 1200mm, 28W, 92 PPF, hang mounting, Universal spectrum'
                            )
                        }
                    }

                    if (condition['controls'] === 2) {
                        ignisConfiguratorSlider.slideTo(12)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 600mm, 15W, 50 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 900mm, 22W, 73 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 1200mm, 28W, 92 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }
                    }

                    if (condition['controls'] === 3) {
                        ignisConfiguratorSlider.slideTo(0)

                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 600mm, 15W, 50 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 900mm, 22W, 73 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                'Ignis Control 1200mm, 28W, 92 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }
                    }
                }

                if (condition['mounting'] === 2) {
                    if (condition['controls'] === 1) {
                        if (condition['length'] === 1) {
                            ignisConfiguratorSlider.slideTo(7)
                            $('.ignis-summary__text').text(
                                'Ignis 600mm, 15W, 50 PPF, stand mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 2) {
                            ignisConfiguratorSlider.slideTo(8)
                            $('.ignis-summary__text').text(
                                'Ignis 900mm, 22W, 73 PPF, stand mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 3) {
                            ignisConfiguratorSlider.slideTo(9)
                            $('.ignis-summary__text').text(
                                'Ignis 1200mm, 28W, 92 PPF, stand mounting, Universal spectrum'
                            )
                        }
                    }

                    if (condition['controls'] === 2) {
                        if (condition['length'] === 1) {
                            ignisConfiguratorSlider.slideTo(13)
                            $('.ignis-summary__text').text(
                                'Ignis Control 600mm, 15W, 50 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            ignisConfiguratorSlider.slideTo(14)
                            $('.ignis-summary__text').text(
                                'Ignis Control 900mm, 22W, 73 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            ignisConfiguratorSlider.slideTo(15)
                            $('.ignis-summary__text').text(
                                'Ignis Control 1200mm, 28W, 92 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }
                    }

                    if (condition['controls'] === 3) {
                        if (condition['length'] === 1) {
                            ignisConfiguratorSlider.slideTo(1)
                            $('.ignis-summary__text').text(
                                'Ignis Control 600mm, 15W, 50 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            ignisConfiguratorSlider.slideTo(2)
                            $('.ignis-summary__text').text(
                                'Ignis Control 900mm, 22W, 73 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            ignisConfiguratorSlider.slideTo(3)
                            $('.ignis-summary__text').text(
                                'Ignis Control 1200mm, 28W, 92 PPF, stand mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }
                    }
                }
            }

            if (condition['config'] === 2) {
                if (condition['mounting'] === 1) {
                    if (condition['controls'] === 1) {
                        ignisConfiguratorSlider.slideTo(10)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '2-Ignis 600mm (2-luminaire holder system), 15Wx2, 100 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '2-Ignis 900mm (2-luminaire holder system), 22Wx2, 146 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '2-Ignis 1200mm (2-luminaire holder system), 28Wx2, 184 PPF, hang mounting, Universal spectrum'
                            )
                        }
                    }

                    if (condition['controls'] === 2) {
                        ignisConfiguratorSlider.slideTo(16)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 600mm (2-luminaire holder system), 15Wx2, 100 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 900mm (2-luminaire holder system), 22Wx2, 146 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 1200mm (2-luminaire holder system), 28Wx2, 184 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }
                    }

                    if (condition['controls'] === 3) {
                        ignisConfiguratorSlider.slideTo(4)

                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 600mm (2-luminaire holder system), 15Wx2, 100 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 900mm (2-luminaire holder system), 22Wx2, 146 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '2-Ignis Control 1200mm (2-luminaire holder system), 28Wx2, 184 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }
                    }
                }

                if (condition['mounting'] === 2) {
                    condition['mounting'] = 1
                    updateSlide()
                }
            }

            if (condition['config'] === 3) {
                if (condition['mounting'] === 1) {
                    if (condition['controls'] === 1) {
                        ignisConfiguratorSlider.slideTo(11)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '3-Ignis 600mm (3-luminaire holder system), 15Wx3, 150 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '3-Ignis 900mm (3-luminaire holder system), 22Wx3, 219 PPF, hang mounting, Universal spectrum'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '3-Ignis 1200mm (3-luminaire holder system), 28Wx3, 276 PPF, hang mounting, Universal spectrum'
                            )
                        }
                    }

                    if (condition['controls'] === 2) {
                        ignisConfiguratorSlider.slideTo(17)
                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 600mm (3-luminaire holder system), 15Wx3, 150 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 900mm (3-luminaire holder system), 22Wx3, 219 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 1200mm (3-luminaire holder system), 28Wx3, 276 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion disabled'
                            )
                        }
                    }

                    if (condition['controls'] === 3) {
                        ignisConfiguratorSlider.slideTo(5)

                        if (condition['length'] === 1) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 600mm (3-luminaire holder system), 15Wx3, 150 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 2) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 900mm (3-luminaire holder system), 22Wx3, 219 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }

                        if (condition['length'] === 3) {
                            $('.ignis-summary__text').text(
                                '3-Ignis Control 1200mm (3-luminaire holder system), 28Wx3, 276 PPF, hang mounting, 3-channel adjustable spectrum. Cloud subscriprion enabled'
                            )
                        }
                    }
                }

                if (condition['mounting'] === 2) {
                    condition['mounting'] = 1
                    updateSlide()
                }
            }
        }

        $('.ignis-configurator__button').click(function () {
            const length = $(this).data('length')
            const config = $(this).data('config')

            if (length) {
                condition['length'] = length
            }

            if (config) {
                condition['config'] = config
            }

            $(this).siblings().removeClass('ignis-configurator__button_active')
            $(this).addClass('ignis-configurator__button_active')

            if (condition['config'] > 1) {
                $('.ignis-configurator__btn')[1].disabled = true
                $('.ignis-configurator__btn')[1].classList.remove(
                    'ignis-configurator__btn_active'
                )
                $('.ignis-configurator__btn')[0].classList.add(
                    'ignis-configurator__btn_active'
                )
            } else {
                $('.ignis-configurator__btn')[1].disabled = false
            }

            updateSlide()
        })

        $('.ignis-configurator__btn').click(function () {
            const mounting = $(this).data('mounting')

            condition['mounting'] = mounting

            $(this).siblings().removeClass('ignis-configurator__btn_active')
            $(this).addClass('ignis-configurator__btn_active')

            updateSlide()
        })

        $('.ignis-configurator__tab').click(function () {
            const controls = $(this).data('controls')

            condition['controls'] = controls

            $(this).siblings().removeClass('ignis-configurator__tab_active')
            $(this).addClass('ignis-configurator__tab_active')

            updateSlide()
        })

        $('.ignis-configurator__bottom .img-wrapper img').click(function () {
            const image = $(this).clone()

            $(
                '.swiper-slide-active .ignis-configurator__top .img-wrapper img'
            ).replaceWith(image)
        })

        // !Ignis Configurator End

        $('.ignis-specification__toggle').click(function (e) {
            e.stopPropagation()
            $('.ignis-specification__dropdown').toggleClass(
                'ignis-specification__dropdown_active'
            )
        })

        $(document).click(function () {
            $('.ignis-specification__dropdown').removeClass(
                'ignis-specification__dropdown_active'
            )
        })

        $('.ignis-specification__dropdown').click(function (e) {
            e.stopPropagation()
        })

        $('.ignis-specification__option').click(function (e) {
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
        loop: true,
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
        var scroll = $(this).scrollTop()
        if (scroll > scrollPos) {
            $('#toTop').fadeIn(300)
        } else {
            $('#toTop').fadeOut(300)
        }
        scrollPos = scroll
    })
})
