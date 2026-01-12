let mm = gsap.matchMedia();
lenis.stop();

gsap.defaults({
  ease: "power2.inOut",
  duration: 0.8,
});

/* Loading Animation Starts */

function getElementOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    bottom: rect.bottom + window.scrollY,
  };
}

function onLoadAnimationComplete() {
  document.querySelector(".home-page-body");
  setTimeout(() => {
    lenis.start();
  }, 1000);
}

function loaderAnimation() {

  // GSAP animation timeline 
  const tlLoadingAnimation = gsap
    .timeline({
      onComplete: () => {
        onLoadAnimationComplete();
      },
    })
    .to(
      ".logo-anim-box img",
      {
        y: 0,
        duration: 0.8,
        // stagger: 0.2,
      },
      0.2
    )
    .to(".logo-anim-box", { duration: 0.8, y: "-270%",opacity:0 }, 1)
    .to(".banner-box", { duration: 0.8, clipPath: "inset(0% 0 0 0)", }, 1)
    .to(".home-page-body #header", { duration: 0.8, y: 0, }, 1.5)
    .to(
      ".banner-hdn",
      {
        duration: 0.8,
        y: "0%",
        opacity: 1,
      },
      1.5
    )
    .to(
      ".take-to-wrap",
      {
        duration: 0.8,
        bottom: "5%",
      },
      1.5
    );

  tlLoadingAnimation.play();
}

setTimeout(() => {
  loaderAnimation();
}, 1000);

/* Text Animation Starts */

/* Text Animation Ends */

/* Create Section Enters */

const tlCreateAnimation = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".create-section",
      start: screen.width > 1200 ? "1% 0%" : "0% 90%",
      end: screen.width > 1200 ? "1% 0%" : "0% 90%",
      toggleActions: "play none none reverse",
      onEnter: () => {
        $("#header").removeClass("dark");
        $(".take-to-wrap").addClass("hide");
      },
      onEnterBack: () => {
        $("#header").addClass("dark");
        $(".take-to-wrap").removeClass("hide");
      },
      immediateRender: false,
      // markers: true,
    },
  })
  .to(
    ".loader-box",
    {
      yPercent: () => (screen.width > 1200 ? -150 : 0),
      scale: () => (screen.width > 1200 ? 0.7 : 1),
      duration: 1,
    },
    0
  )
  .to(
    [
      ".create-wrap .comm-top-elem",
      ".create-wrap .sec-hdn",
      ".create-num-wrap",
      ".create-bg",
    ],
    { duration: 1, y: 0, opacity: 1 },
    0
  )
  .to(".global-box", { duration: 1, opacity: 1 }, 0);

if (screen.width > 990) {
  const tlGlobeAnimtion = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".create-trigger-1",
        start: "0% 40%",
        end: "0% -10%",
        scrub: 2,
        // markers: true,
      },
    })
    .to(".create-info", { yPercent: screen.width > 1600 ? -30 : -45 }, 0)
    .to(".global-box", { yPercent: screen.width > 1600 ? -33 : -26 }, 0)
    .to(".global-hdn", { scale: 0.8 }, 0)
    .to(".animation-globe", { yPercent: screen.width > 1600 ? -50 : -35 }, 0);
}

/* Create Section Ends */

/* Map Starts */
let mapImg = document.querySelector(".map-img");
let mapImgWidth = mapImg.offsetWidth;

if (screen.width > 990) {
  const tlMapAnimtion = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".map-section",
        start: "10% 100%",
        end: "10% 20%",
        scrub: 1,
        // markers: true,
      },
    })
    .to(".animation-globe", {
      top: () => $(".map-img").position().top,
      left: () => $(".map-img").position().left,
      transform: "translate(0,0)",
      width: mapImgWidth,
      height: mapImgWidth,
    });
} else {
  gsap.to(".animation-globe", {
    top: () => $(".map-img").position().top,
    left: () => $(".map-img").position().left,
    transform: "translate(0,0)",
    width: mapImgWidth,
    height: mapImgWidth,
    opacity: 1,
  });
}

const tlMapAnimtion1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".map-section",
    start: "50% 80%",
    end: "50% 0%",
    toggleActions: "play none none reverse",
    onEnter: () => mapEnterFunction(),
    onLeave: () => mapLeaveBackFunction(),
    onEnterBack: () => mapEnterFunction(),
    onLeaveBack: () => mapLeaveBackFunction(),
    // markers: true,
  },
});

function mapEnterFunction() {
  $("#header").addClass("dark");
  gsap.to([".fixed-left-line", ".fixed-right-line"], {
    duration: 0.4,
    background: "#3b3b3b",
  });
}

function mapLeaveBackFunction() {
  $("#header").removeClass("dark");
  gsap.to([".fixed-left-line", ".fixed-right-line"], {
    duration: 0.4,
    background: "#DCDCDC",
  });
}
/* Map Ends */

if (screen.width > 990) {
  const tlMapUp = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".transform-section",
        start: "0% 100%",
        end: "0% 44%",
        scrub: 1,
        // markers: true,
      },
    })
    .to(".animation-globe", {
      top: 0,
      y: "-100%",
    });
}

/* Transform Starts */

var transformingSwiper = new Swiper(".transformingSwiper", {
  slidesPerView: 1,
  spaceBetween: 14,
  speed: 5000,
  direction: "horizontal",
  breakpoints: {
    991: {
      direction: "vertical",
      spaceBetween: 0,
      speed: 1200,
    },
  },
});

if (screen.width < 991) {
  var transformingBoxSwiper = new Swiper(".transformingBoxSwiper", {
    slidesPerView: 1,
    spaceBetween: 14,
    speed: 5000,
    autoplay: {
      delay: 1100,
      disableOnInteraction: false,
    },
    breakpoints: {
      641: {
        slidesPerView: 1.6,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.3,
      },
    },
  });

  transformingSwiper.controller.control = transformingBoxSwiper;
  transformingBoxSwiper.controller.control = transformingSwiper;
}

if (screen.width > 990) {
  const transformTrigger = document.querySelectorAll(".transform-trigger");

  transformTrigger.forEach((section, i) => {
    const tlTransformTrigger = gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "0% 80%",
          end: "0% 0%",
          scrub: 1,
          onEnter: () => commScrollEnter(i),
          onEnterBack: () => commScrollEnterBack(i),
          // markers: true,
        },
      })
      .to(".transforming-box" + i, { y: 0, opacity: 1 }, 0)
      .to(
        ".transforming-acc" + i,
        { y: "0", autoAlpha: 1 },
        0
      )
      .to(
        ".transforming-acc" + (i - 1),
        { autoAlpha: 0, y: "-20%" },
        0
      )
      .to(
        ".transforming-box" + i + " .transform-hdn",
        { yPercent: -50, autoAlpha: 0 },
        1
      )
      .to(".transforming-box" + i, { height: "74px" }, 1)


  });

  function commScrollEnter(i) {
    transformingSwiper.slideTo(i);
  }

  function commScrollEnterBack(i) {
    transformingSwiper.slideTo(i - 1);
  }
}
/* Transform Ends */

/* Team Section Starts */
const tlTeamAnimtion = gsap.timeline({
  scrollTrigger: {
    trigger: ".team-section",
    start: "0% 60%",
    end: "100% 60%",
    toggleActions: "play none none reverse",
    onEnter: () => mapEnterFunction(),
    onLeave: () => mapLeaveBackFunction(),
    onEnterBack: () => mapEnterFunction(),
    onLeaveBack: () => mapLeaveBackFunction(),
    // markers: true,
  },
});
function mapEnterFunction() {
  $("#header").addClass("dark");
  gsap.to([".fixed-left-line", ".fixed-right-line"], {
    duration: 0.4,
    background: "#3b3b3b",
  });
}

function mapLeaveBackFunction() {
  $("#header").removeClass("dark");
  gsap.to([".fixed-left-line", ".fixed-right-line"], {
    duration: 0.4,
    background: "#DCDCDC",
  });
}
/* Team Section Ends */

/* Hiding nav Starts */
const hidingNav = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".home-footer",
      start: "0% 90%",
      end: "0% 90%",
      toggleActions: "play none none reverse",
      // markers: true,
    },
  })
  .to(".take-to-wrap", {
    bottom: "-50%",
  });
/* Hiding nav Ends */
