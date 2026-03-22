/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sidebar Navmenu Js
03. magnific Popupu Js
04. Add Attribute For Bg Image Js
05. about scroll rotate Js
06. odometer counter Js
07. Search Bar Js
08. Sticky Js
09. Offcanvas Sidebar js
10. Floating Progress js
11. knob progress js
12. Pricing js
13. interactive gallery imgae change js
14. Mouse Custom Cursor  js
****************************************************/


(function ($) {
    "use strict";


        ////////////////////////////////////////////////////
        // 01. PreLoader Js
        document.addEventListener("DOMContentLoaded", () => {
            const svg = document.getElementById("preloaderSvg");
            const svgText = document.querySelector("svg text");
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
            tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
                delay: 1,
                y: -80,
                opacity: 0,
                duration: 0.6
            });
            tl.to(svg, {
                duration: 0.6,
                attr: {
                    d: curve
                },
                ease: "power2.inOut"
            });
            tl.to(svg, {
                duration: 0.6,
                attr: {
                    d: flat
                },
                ease: "power2.inOut"
            });
            tl.to(".preloader", {
                y: "-130%",
                duration: 0.8,
                ease: "power4.inOut"
            });
            tl.set(".preloader", {
                display: "none",
                zIndex: -1
            });
        });




	////////////////////////////////////////////////////
	// 02. Sidebar Navmenu Js
    $(document).ready(function () {
        function toggleSubMenu() {
            if ($(".sidebar-navmenu").length) {
                $(".has-submenu")
                    .off("click")
                    .on("click", function () {
                        $(this)
                            .toggleClass("active")
                            .siblings(".has-submenu")
                            .removeClass("active")
                            .find(".nav-submenu")
                            .slideUp(300);
                        $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
                    });
            } else {
                if ($(window).width() <= 991) {
                    $(".has-submenu")
                        .off("click")
                        .on("click", function () {
                            $(this)
                                .toggleClass("active")
                                .siblings(".has-submenu")
                                .removeClass("active")
                                .find(".nav-submenu")
                                .slideUp(300);
                            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
                        });
                } else {
                    $(".has-submenu").off("click");
                }
            }
        }
        toggleSubMenu();
        $(window).resize(function () {
            if (!$(".sidebar-navmenu").length) {
                toggleSubMenu();
            }
        });



        // ============== sidebar navmenu toggle button Js Start =======================
        $(".sidebar-navmenu-toggle-button").on("click", function () {
            $(".sidebar-navmenu").toggleClass("active");
            $(".body-overlay").addClass("apply");
        });

        $(".sidebar-navmenu-close-button, .body-overlay").on("click", function () {
            $(".sidebar-navmenu").removeClass("active");
            $(".body-overlay").removeClass("apply");
        });

        // ============== sidebar navmenu toggle button Js End =======================





        // ===================== Scroll Back to Top Js Start ======================
        function back_to_top() {
            var btn = $('#back_to_top');
            var btn_wrapper = $('.back-to-top-wrapper');
            // Detect scroll
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 300) {
                    btn_wrapper.addClass('back-to-top-btn-show');
                } else {
                    btn_wrapper.removeClass('back-to-top-btn-show');
                }
            });
            // Smooth scroll to top
            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, 300);
            });
        }
        // Init
        back_to_top();

        // ===================== Scroll Back to Top Js End ======================

        // ========================== add active class to navbar menu current page Js Start =====================
        function dynamicActiveMenuClass(selector) {
            let FileName = window.location.pathname.split("/").reverse()[0];

            // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
            if (FileName === "" || FileName === "index.html") {
                // Keep the activePage class on the Home link
                selector
                    .find("li.nav-menu__item.has-submenu")
                    .eq(0)
                    .addClass("activePage");
            } else {
                // Remove activePage class from all items first
                selector.find("li").removeClass("activePage");

                // Add activePage class to the correct li based on the current URL
                selector.find("li").each(function () {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("activePage");
                    }
                });

                // If any li has activePage element, add class to its parent li
                selector.children("li").each(function () {
                    if ($(this).find(".activePage").length) {
                        $(this).addClass("activePage");
                    }
                });
            }
        }

        if ($("ul").length) {
            dynamicActiveMenuClass($("ul"));
        }
        // ========================== add active class to navbar menu current page Js End =====================

        // ========================== Settings Panel Js Start =====================
        $(".settings-button").on("click", function () {
            $(".settings-panel").toggleClass("active");
            $(this).toggleClass("active");
        });

        $(document).on(
            "click",
            ".settings-panel__buttons .settings-panel__button",
            function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
        );

        // Cursor start
        $(".cursor-animate").on("click", function () {
            $("body").removeClass("remove-animate-cursor");
        });

        $(".cursor-default").on("click", function () {
            $("body").addClass("remove-animate-cursor");
        });
        // Cursor end

        // Direction start
        $(".direction-ltr").on("click", function () {
            $("html").attr("dir", "ltr");
        });

        $(".direction-rtl").on("click", function () {
            $("html").attr("dir", "rtl");
        });
        // Direction end
        // ========================== Settings Panel Js End =====================

        // ********************* Toast Notification Js start *********************
        function toastMessage(messageType, messageTitle, messageText, messageIcon) {
            let $toastContainer = $("#toast-container");

            let $toast = $("<div>", {
                class: `toast-message ${messageType}`,
                html: `
                <div class="toast-message__content">
                    <span class="toast-message__icon">
                    <i class="${messageIcon}"></i>
                    </span>
                    <div class="flex-grow-1">
                    <div class="d-flex align-items-start justify-content-between mb-1">
                        <h6 class="toast-message__title">${messageTitle}</h6>
                        <button type="button" class="toast-message__close">
                        <i class="ph-bold ph-x"></i>
                        </button>
                    </div>
                    <span class="toast-message__text">${messageText}</span>
                    </div>
                </div>
                <div class="progress__bar"></div>
                `,
            });

            $toastContainer.append($toast);

            setTimeout(() => {
                $toast.addClass("active");
            }, 50);

            let totalDuration = 3500;
            let startTime = Date.now();
            let remainingTime = totalDuration;
            let toastTimeout = setTimeout(hideToast, remainingTime);

            function hideToast() {
                $toast.removeClass("active");
                setTimeout(() => {
                    $toast.remove();
                }, 500);
            }

            // Remove Toast on Close Button Click
            $toast.find(".toast-message__close").on("click", function () {
                $toast.removeClass("active");
                setTimeout(() => {
                    $toast.remove();
                }, 500);
            });

            // Pause Timeout on Hover
            $toast.on("mouseenter", function () {
                remainingTime -= Date.now() - startTime;
                clearTimeout(toastTimeout);
            });

            // Resume Timeout on Mouse Leave
            $toast.on("mouseleave", function () {
                startTime = Date.now();
                toastTimeout = setTimeout(hideToast, remainingTime);
            });
        }
        // ********************* Toast Notification Js End *********************


        // ========================= Delete Item Js start ===================
        $(document).on("click", ".delete-button", function () {
            $(this).closest(".delete-item").addClass("d-none");

            toastMessage(
                "danger",
                "Deleted",
                "You deleted successfully!",
                "ph-bold ph-trash"
            );
        });
        // ========================= Delete Item Js End ===================

        // ========================= Form Submit Js Start ===================
        $(document).on("submit", ".form-submit", function (e) {
            e.preventDefault();

            $("input").val("");

            $("textarea").val("");

            toastMessage(
                "success",
                "Success",
                "Form submitted successfully!",
                "ph-fill ph-check-circle"
            );
        });
        // ========================= Form Submit Js End ===================

        // ================== Password Show Hide Js Start ==========
        $(".toggle-password").on("click", function () {
            $(this).toggleClass("active");
            var input = $($(this).attr("id"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
                $(this).removeClass("ph-bold ph-eye-closed");
                $(this).addClass("ph-bold ph-eye");
            } else {
                input.attr("type", "password");
                $(this).addClass("ph-bold ph-eye-closed");
            }
        });
        // ========================= Password Show Hide Js End ===========================

        // ========================= AOS Js Start ===========================
        AOS.init({
            once: true,
        });
        // ========================= AOS Js End ===========================

    });



    ////////////////////////////////////////////////////
	// 03. magnific Popupu Js
    $('.open-popup').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade',
    });



    ////////////////////////////////////////////////////
	// 04. Add Attribute For Bg Image Js
    $(".bg-img").each(function () {
        var img = $(this).data("background-image");
        if (img) {
            $(this).css("background-image", "url('" + img + "')");
        }
    });


    ////////////////////////////////////////////////////
	// 05. about scroll rotate Js
    let reloadClassName = document.getElementById("reload");
    if (reloadClassName !== null) {
        window.onscroll = function () {
            scrollRotate();
        };
        function scrollRotate() {
            reloadClassName.style.transform = "rotate(" + window.pageYOffset / 6 + "deg)";
        }
    }


    ////////////////////////////////////////////////////
	// 06. odometer counter Js
    if ($(".odometer").length > 0) {
        $(".odometer").waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true,
            }
        );
    }


    ////////////////////////////////////////////////////
	// 07. Search Bar Js
    $(".open-search").on("click", function () {
        $(".search_popup").addClass("search-opened");
        $(".search-popup-overlay").addClass("search-popup-overlay-open");
    });
    $(".search_close_btn").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(".search-popup-overlay").removeClass("search-popup-overlay-open");
    });
    $(".search-popup-overlay").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(this).removeClass("search-popup-overlay-open");
    });



    ////////////////////////////////////////////////////
	// 08. Sticky Js
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 260) {
            $(".header").addClass("fixed-header");
        } else {
            $(".header").removeClass("fixed-header");
        }
    });


    ////////////////////////////////////////////////////
	// 09. Offcanvas Sidebar js
    $(".tw-menu-bar").on("click", function () {
        $(".twoffcanvas").addClass("opened");
        $(".body-overlay").addClass("apply");
    });
    $(".close-btn").on("click", function () {
        $(".twoffcanvas").removeClass("opened");
        $(".body-overlay").removeClass("apply");
    });
    $(".body-overlay").on("click", function () {
        $(".twoffcanvas").removeClass("opened");
        $(".body-overlay").removeClass("apply");
    });



    ////////////////////////////////////////////////////
	// 10. Floating Progress js
    const progressContainers = document.querySelectorAll('.progress-container');
    function setPercentage(progressContainer) {
        const percentage = progressContainer.getAttribute('data-percentage') + '%';
        const progressEl = progressContainer.querySelector('.progress');
        const percentageEl = progressContainer.querySelector('.percentage');
        progressEl.style.width = percentage;
        percentageEl.innerText = percentage;
        percentageEl.style.insetInlineStart = percentage;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressContainer = entry.target;
                setPercentage(progressContainer);
                progressContainer.querySelector('.progress').classList.remove('active');
                progressContainer.querySelector('.percentage').classList.remove('active');
                observer.unobserve(progressContainer);
            }
        });
    }, {
        threshold: 0.5
    });
    progressContainers.forEach(progressContainer => {
        observer.observe(progressContainer);
    });



    ////////////////////////////////////////////////////
	// 11. knob progress js
    if (typeof ($.fn.knob) !== 'undefined') {
        $('.knob').each(function () {
            var $this = $(this);
            var knobVal = $this.attr('data-rel');

            $this.knob({
                'draw': function () {
                    $(this.i).val(this.cv + '%');
                }
            });
            gsap.fromTo($({
                val: 0
            }), {
                val: 0
            }, {
                val: knobVal,
                duration: 2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: $this,
                    start: "top 80%",
                    once: true,
                },
                onUpdate: function () {
                    $this.val(Math.ceil(this.targets()[0].val)).trigger('change');
                }
            });
        });
    }


    ////////////////////////////////////////////////////
	// 12. Pricing js
    function tabtable_active() {
        var e = document.getElementById("filt-monthly"),
            d = document.getElementById("filt-yearly"),
            t = document.getElementById("switcher"),
            m = document.getElementById("monthly"),
            y = document.getElementById("hourly");

        e.addEventListener("click", function () {
            t.checked = false;
            e.classList.add("pricing-ip-active");
            d.classList.remove("pricing-ip-active");
            m.classList.remove("hide");
            y.classList.add("hide");
        });
        d.addEventListener("click", function () {
            t.checked = true;
            d.classList.add("pricing-ip-active");
            e.classList.remove("pricing-ip-active");
            m.classList.add("hide");
            y.classList.remove("hide");
        });
        t.addEventListener("click", function () {
            d.classList.toggle("pricing-ip-active");
            e.classList.toggle("pricing-ip-active");
            m.classList.toggle("hide");
            y.classList.toggle("hide");
        })
    }
    if ($('#filt-monthly').length > 0) {
        tabtable_active();
    }



    ////////////////////////////////////////////////////
	// 13. interactive gallery imgae change js
    $('.interactive-gallery-list-wrap .interactive-gallery-list-item').on("mouseenter", function () {
        $('#interactive-gallery-thumb').removeClass().addClass($(this).attr('rel'));
        $(this).addClass('active').siblings().removeClass('active');
    });





    ////////////////////////////////////////////////////
	// 14. Mouse Custom Cursor  js
    function itCursor() {
        var myCursor = jQuery(".mouseCursor");
        if (myCursor.length) {
            if ($("body")) {
                const e = document.querySelector(".cursor-inner"),
                    t = document.querySelector(".cursor-outer");
                let n,
                    i = 0,
                    o = !1;
                (window.onmousemove = function (s) {
                    o ||
                        (t.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (e.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (n = s.clientY),
                        (i = s.clientX);
                }),
                $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
                        e.classList.add("active"), t.classList.add("active");
                    }),
                    $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
                        ($(this).is("a", "button") &&
                            $(this).closest(".cursor-pointer").length) ||
                        (e.classList.remove("active"),
                            t.classList.remove("active"));
                    }),
                    (e.style.visibility = "visible"),
                    (t.style.visibility = "visible");
            }
        }
    }
    itCursor();
    $(".tw-cursor-point-area").on("mouseenter", function () {
        $(".mouseCursor").addClass("cursor-big");
    });
    $(".tw-cursor-point-area").on("mouseleave", function () {
        $(".mouseCursor").removeClass("cursor-big");
    });

})(jQuery);