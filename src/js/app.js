document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // HEIGHT HEADER
    let header = document.querySelector('.header'); // header
    let headerh = header ? header.getBoundingClientRect().height : 0; // height header
    document.documentElement.style.setProperty('--headerh', `${headerh}px`);

    // HEIGHT MAIN
    let main = document.querySelector('.main'); // header
    let mainh = main ? main.getBoundingClientRect().height : 0; // height main
    document.documentElement.style.setProperty('--mainh', `${mainh}px`);

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        let headerh = header ? header.getBoundingClientRect().height : 0; // height header
        let mainh = main ? main.getBoundingClientRect().height : 0; // height main
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerh', `${headerh}px`);
        document.documentElement.style.setProperty('--mainh', `${mainh}px`);
    });

    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }

    // INPUT GROUP
    const allInput = document.querySelectorAll('.input-group__input')

    if (allInput) {
        allInput.forEach(item => {
            const inputControl = item.closest('.input-group__control')
            const inputLabel = inputControl.querySelector('.input-group__label')

            item.addEventListener('focus', () => {
                inputLabel.classList.add('input-group__label--active')
            })
            item.addEventListener('blur', () => {
                if (item.value.length < 1) {
                    inputLabel.classList.remove('input-group__label--active')
                }
            })
        })
    }

    // FORM VALIDATE
    const formValidate = document.querySelectorAll('.feedback-form');

    if (formValidate) {
        formValidate.forEach(item => {
            item.addEventListener('submit', (event) => {
                const formInput = item.querySelectorAll('.input-group__input');
                let validateCounter = formInput.length
        
                for (let input of formInput) {
                    if (input.validity.valid === false) {
                        input.classList.add('is--error')
                    } else {
                        input.classList.remove('is--error')
                        validateCounter -= 1
                    }
                }
        
                if (validateCounter >= 1) {
                    event.preventDefault()
                }
            });
        })
    }
    
    // SWITCH
    const switchInput = document.querySelectorAll('.switch__input')
    const switchContent = document.querySelectorAll('.switch-content')

    if (switchInput) {
        switchInput.forEach(item => {
            item.addEventListener('click', () => {
                if (item.checked) {
                    item.parentNode.classList.remove('switch--no-checked')

                    switchContent.forEach(item => {
                        item.classList.remove('switch-content--active')

                        if (item.dataset.switch === 'online') {
                            item.classList.add('switch-content--active')

                            document.querySelectorAll('.about__item, .programm__item').forEach(item => { item.classList.remove('aos-animate') })
                            AOS.refresh()
                        }
                    })
                } else {
                    item.parentNode.classList.add('switch--no-checked')

                    switchContent.forEach(item => {
                        item.classList.remove('switch-content--active')
                        
                        if (item.dataset.switch === 'offline') {
                            item.classList.add('switch-content--active')

                            document.querySelectorAll('.about__item, .programm__item').forEach(item => { item.classList.remove('aos-animate') })
                            AOS.refresh();
                        }
                    })
                }
            })
        })
    }

    // PROGRAMM MORE
    const programmMore = document.querySelectorAll('.programm__more')

    if (programmMore) {
        programmMore.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
    
                if (!item.classList.contains('programm__more--hidden') && item.previousElementSibling.classList.contains('programm__wrapper--hidden')) {
                    item.previousElementSibling.classList.remove('programm__wrapper--hidden')
                    item.innerHTML = 'Скрыть'
                } else {
                    item.previousElementSibling.classList.add('programm__wrapper--hidden')
                    item.innerHTML = 'Показать полностью'
                }
            })
        })
    }
    
    // VIDEO PROMO
    const videoPromo = document.querySelectorAll('.video__promo')

    if (videoPromo) {
        videoPromo.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
                
                if (item.nextElementSibling.classList.contains('video__iframe')) {
                    var videoSrc = item.getAttribute('href');
                    var videoId = videoSrc.substr(videoSrc.length - 11) + '?rel=0&autoplay=1';
                    
                    item.nextElementSibling.querySelector('iframe').setAttribute('src', 'https://www.youtube.com/embed/' + videoId)
                    item.nextElementSibling.querySelector('iframe').setAttribute('autoplay', '')
                    item.nextElementSibling.querySelector('iframe').setAttribute('playsinline', '')

                    item.classList.add('video__promo--hidden')
                    item.nextElementSibling.classList.add('video__iframe--visible')
                }
            })
        })
    }

    // MOBILE MENU
    const hamburgerToggle = document.getElementById('hamburger-toggle')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileMenuClose = document.querySelector('.mobile-menu__close')
    
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', (event) => {
            event.preventDefault();

            if (!modalOverlay.classList.contains('modal-overlay--active')) {
                modalOverlay.classList.add('modal-overlay--active')
            }
            document.body.classList.add('scroll-disabled')
            mobileMenu.classList.add('mobile-menu--active')
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (event) => {
            event.preventDefault();

            if (modalOverlay.classList.contains('modal-overlay--active')) {
                modalOverlay.classList.remove('modal-overlay--active')
            }
            document.body.classList.remove('scroll-disabled')
            mobileMenu.classList.remove('mobile-menu--active')
        });
    }

    // CONTACTS MENU
    const contactsMenuToggle = document.querySelectorAll('.contacts-btn')
    const contactsMenu = document.getElementById('contacts-menu')
    const contactsMenuClose = document.querySelector('.contacts-menu__close')
    const contactsMenuBack = document.querySelector('.contacts-menu__back')
    
    if (contactsMenuToggle) {
        contactsMenuToggle.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
    
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')
                contactsMenu.classList.add('contacts-menu--active')
            });
        })
    }

    if (contactsMenuClose) {
        contactsMenuClose.addEventListener('click', (event) => {
            event.preventDefault();

            if (modalOverlay.classList.contains('modal-overlay--active')) {
                modalOverlay.classList.remove('modal-overlay--active')
            }
            document.body.classList.remove('scroll-disabled')
            contactsMenu.classList.remove('contacts-menu--active')

            if (mobileMenu.classList.contains('mobile-menu--active')) {
                mobileMenu.classList.remove('mobile-menu--active')
            }
        });
    }

    if (contactsMenuBack) {
        contactsMenuBack.addEventListener('click', (event) => {
            event.preventDefault();

            contactsMenu.classList.remove('contacts-menu--active')
        });
    }

    // SWIPER
    const reviewsSlider = document.querySelector('.reviews__slider .swiper-container')
    const mediaContentSlider = document.querySelector('.media-content__slider .swiper-container')
    const gallerySlider = document.querySelector('.gallery__slider .swiper-container')
    const miniCoursesSlider = document.querySelector('.mini-courses__slider .swiper-container')

    if (reviewsSlider) {
        const myReviewsSlider = new Swiper(reviewsSlider, {
            slidesPerView: '3',
            speed: 800,
            spaceBetween: 20,
            navigation: {
                prevEl: reviewsSlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-prev'),
                nextEl: reviewsSlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-next'),
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: '1'
                },
                768: {
                    slidesPerView: 'auto'
                },
                1200: {
                    slidesPerView: '3'
                }
            }
        })
    }

    if (mediaContentSlider) {
        const myMediaContentSlider = new Swiper(mediaContentSlider, {
            slidesPerView: '4',
            speed: 800,
            spaceBetween: 20,
            navigation: {
                prevEl: mediaContentSlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-prev'),
                nextEl: mediaContentSlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-next'),
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: '1'
                },
                768: {
                    slidesPerView: 'auto'
                },
                1200: {
                    slidesPerView: '4'
                }
            }
        })
    }

    if (gallerySlider) {
        const myGallerySlider = new Swiper(gallerySlider, {
            slidesPerView: '3',
            speed: 800,
            spaceBetween: 20,
            navigation: {
                prevEl: gallerySlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-prev'),
                nextEl: gallerySlider.nextElementSibling.querySelector('.swiper-navigation > .swiper-button-next'),
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: '1'
                },
                768: {
                    slidesPerView: 'auto'
                },
                1200: {
                    slidesPerView: '3'
                }
            }
        })
    }

    if (miniCoursesSlider) {
        const miniCoursesSlides = [...document.querySelectorAll('.mini-courses__slide')]

        function getMaxElementsHeight(elements) {

            const heights = elements.map(elements => {
                return elements.getBoundingClientRect().height;
            });              
            
            return Math.max.apply(null, heights);
        }

        setTimeout(() => {
            let maxCellHeight = getMaxElementsHeight(miniCoursesSlides)

            miniCoursesSlides.forEach(item => {
                item.style.minHeight = maxCellHeight + 'px'
            })
        }, 100)

        if (window.innerWidth < 1024) {
            const myMiniCoursesSlider = new Swiper(miniCoursesSlider, {
                slidesPerView: 'auto',
                speed: 800,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: '1'
                    },
                    768: {
                        slidesPerView: 'auto'
                    },
                }
            })
        }
    }

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')
    const modalOverlay = document.querySelector('.modal-overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')

                const modalID = item.dataset.id
                document.getElementById(modalID).classList.add('modal--active')
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (key == 27 && modalOverlay) {
            modalOverlay.classList.remove('modal-overlay--active')
            document.body.classList.remove('scroll-disabled')

            if (modal) {
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
            }
            if (mobileMenu.classList.contains('mobile-menu--active')) {
                mobileMenu.classList.remove('mobile-menu--active')
            }
            if (contactsMenu.classList.contains('contacts-menu--active')) {
                contactsMenu.classList.remove('contacts-menu--active')
            }
        };
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            modalOverlay.classList.remove('modal-overlay--active')
            document.body.classList.remove('scroll-disabled')

            if (modal) {
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
            }
            if (mobileMenu.classList.contains('mobile-menu--active')) {
                mobileMenu.classList.remove('mobile-menu--active')
            }
            if (contactsMenu.classList.contains('contacts-menu--active')) {
                contactsMenu.classList.remove('contacts-menu--active')
            }
        });
    }

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                modalOverlay.classList.remove('modal-overlay--active')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
            });
        });
    }
    
    // FANCYBOX
    if (window.innerWidth >= 1200) {
        Fancybox.bind('[data-fancybox="gallery"]', {
            animated: false,
            showClass: false,
            hideClass: false,
            
            dragToClose: false,
            
            closeButton: "top",
            
            Thumbs: false,
            Toolbar: false,
            
            Carousel: {
                // Enable dots
                Dots: true,
            },
            
            Image: {
                zoom: false,
                click: false,
                wheel: false,
            },
        });
    } else {
        Fancybox.bind('[data-fancybox="gallery"]', {
            animated: false,
            showClass: false,
            hideClass: false,
            
            dragToClose: false,
            
            closeButton: "top",
            
            Thumbs: false,
            Toolbar: false,
            
            Carousel: {
                // Enable dots
                Dots: true,
            },
            
            Image: {
                zoom: false,
                click: false,
                wheel: false,
                fit: "contain-w",
            },

            on: {
                init: (fancybox) => (fancybox.prevScrollTop = 0),
                done: (fancybox, slide) => (slide.$el.scrollTop = fancybox.prevScrollTop),
                "Carousel.change": (fancybox, carousel, to, from) => {
                    fancybox.prevScrollTop = carousel.slides[from].$el.scrollTop || 0;
            
                    if (carousel.slides[to].$el) {
                        carousel.slides[to].$el.scrollTop = fancybox.prevScrollTop;
                    }
                },
            },
        });
    }

    // ANIMATIONS
    AOS.init({
        duration: 700,
        once: true,
    })
});