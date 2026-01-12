// const { delay } = require("lodash");

window.addEventListener("beforeunload", function () {
    document.body.style.display = "none";
    window.scrollTo(0, 0);
});

document.getElementById("header").classList.add("dark");

/* Banner Swiper Starts */
const bannerSwiper = new Swiper(".bannerSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 6000,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

document.addEventListener("DOMContentLoaded", function () {
    // document.querySelector(".home-container").classList.add("container");
    var bannerPagi = document.querySelector(".banner-box .comm-pagination");
    var bannerPL = document.querySelector(".banner-box .container");
    var rect = bannerPL.getBoundingClientRect();
    var bannerLeft = rect.left;

    bannerPagi.style.left = bannerLeft + 15 + "px";
    bannerPagi.style.opacity = 1;
});
/* Banner Swiper Ends */

/* Numbers Counter Starts */
var a = 0;
$(window).scroll(function () {
    var oTop = $(".create-num-wrap").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
        $(".create-num span").each(function () {
            var $this = $(this),
                countTo = $this.attr("data-count");
            $({
                countNum: $this.text(),
            }).animate(
                {
                    countNum: countTo,
                },
                {
                    duration: 1200,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    },
                }
            );
        });
        a = 1;
    }
});
/* Numbers Counter Ends */

/* Fixed Navigator Starts */
$(".take-to-wrap a").click(function (e) {
    $(".take-to-wrap a").removeClass("active");
    $(this).addClass("active");
});

/* Fixed Navigator Ends */

/* Articale Starts */
const articaleSwiper = new Swiper(".articaleSwiper", {
    slidesPerView: 1.05,
    spaceBetween: 14,
    speed: 800,
    navigation: {
        nextEl: ".articale-next",
        prevEl: ".articale-prev",
    },
    breakpoints: {
        641: {
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        991: {
            slidesPerView: 1.9,
        },
        1201: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    },
});
/* Articale Ends */

/* Flawless Starts */
const flawSwiper = new Swiper(".flawSwiper", {
    slidesPerView: 1,
    spaceBetween: 14,
    speed: 800,
    navigation: {
        nextEl: ".flaw-next",
        prevEl: ".flaw-prev",
    },
    breakpoints: {
        481: {
            slidesPerView: 1.3,
        },
        641: {
            slidesPerView: 1.1,
        },
        991: {
            slidesPerView: 1.6,
            spaceBetween: 20,
        },
        1201: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    },
});
/* Flawless Ends */

/* Blog Image Animation Starts */

gsap.utils.toArray(".specialise-img img").forEach((blogImg) => {
    const scaleImg = gsap
        .timeline({
            scrollTrigger: {
                trigger: blogImg,
                start: "0% 95%",
                end: "100% 95%",
                scrub: 3,
                // markers: true,
            },
        })
        .to(blogImg, {
            scale: 1.05,
        });
});

gsap.utils.toArray(".specialise-img img").forEach((blogImg) => {
    const scaleImg = gsap
        .timeline({
            scrollTrigger: {
                trigger: blogImg,
                start: "0% 95%",
                end: "100% 95%",
                toggleActions: "play none none reverse",
                // markers: true,
            },
        })
        .to(blogImg, {
            clipPath: "inset(0 0 0% 0)",
        });
});

/* Blog Image Animation Ends */

$(document).ready(function () {
    $(".play-btn").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });
});

/* nav bar starts */

// Select the <p> tag and all anchor links
const displayText = document.querySelector(".take-to-wrap p");
const anchors = document.querySelectorAll(".take-to-wrap a");

// Function to remove 'active' class from all anchors and update the <p> tag text
function updateActiveLink(activeAnchor) {
    anchors.forEach((anchor) => anchor.classList.remove("active"));
    activeAnchor.classList.add("active");
    var activeAnchorwidth = activeAnchor.offsetWidth;
    displayText.style.width = activeAnchorwidth + "px";
    displayText.textContent = activeAnchor.textContent; // Set the <p> tag text to the active anchor's text
}

// Apply ScrollTrigger to each section
anchors.forEach((anchor) => {
    const targetID = anchor.getAttribute("href");
    const targetSection = document.querySelector(targetID);

    ScrollTrigger.create({
        trigger: targetSection,
        start: "top 50%", // Trigger when the top of the section hits the middle of the viewport
        end: "bottom 50%", // End when the bottom of the section hits the middle of the viewport
        onEnter: () => updateActiveLink(anchor),
        onEnterBack: () => updateActiveLink(anchor),
        onLeave: () => anchor.classList.remove("active"),
        onLeaveBack: () => anchor.classList.remove("active"),
    });
});

/* nav bar ends */

/* Service Accordian Starts */
document
    .querySelectorAll(".transforming-acc-container")
    .forEach((accContainer) => {
        const firstItem = accContainer.querySelector(".acc-item:first-child");
        $(firstItem).addClass("active");
        $(firstItem).find(".panel").slideDown();

        // Add click event to items in this container
        const accItems = accContainer.querySelectorAll(".acc-item");
        accItems.forEach((el) => {
            el.addEventListener("click", () => {
                if (el.classList.contains("active")) {
                    $(el).find(".panel").slideUp();
                    $(el).removeClass("active");
                } else {
                    $(accContainer).find(".panel").slideUp();
                    $(accContainer).find(".acc-item").removeClass("active");
                    $(el).find(".panel").slideDown();
                    $(el).addClass("active");
                }
            });
        });
    });

/* Service Accordian Ends */
