/* search bar start */
$(document).on('click', '#searchIcon', function () {
    $('.inputSearch').addClass('inputSearch-in');
});

$(document).on('click', '.searchCross', function () {
    $('.inputSearch').removeClass('inputSearch-in');
});
/* search bar end */

/* gotoTop start */
$(window).scroll(function (e) {
    gotoTop();
});
gotoTop();

var vHeight = $(window).height() * 0.8;

function gotoTop() {
    var onScroll = $(window).scrollTop();
    // console.log(vHeight, onScroll);

    var gotoTop = $('.gotoTop');
    if (onScroll >= vHeight) {
        gotoTop.addClass('active');
    } else {
        gotoTop.removeClass('active');
    }
}


/* scroll to top start */
$('.gotoTop').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
});
/* scroll to top end */
/* gotoTop end */


/* menu sidebar start */
$(document).on('click', '.sideMenu', function () {
    var sideMenuData = $(this).attr("data-name");
    // console.log(sideMenuData);
    $('#' + sideMenuData).addClass('mainSubLink-in');
    $('.menuMed').addClass('menuMed-in');
});

$(document).on('click', '.sideMenuClose', function () {
    $('.mainSubLink').removeClass('mainSubLink-in');
    $('.menuMed').removeClass('menuMed-in');
});
/* menu sidebar end */


$(document).on('click', '.headMenu', function () {
    menuTimeline.play();
    // console.log(1);
});
$(document).on('click', '.menuCross', function () {
    menuTimeline.reverse();
    // console.log(2);
});

let menuTimeline = new TimelineMax({
    paused: true,
    onComplete: function () {
        // console.log("animation complete");
    }
    // repeat: -1,
    // repeatDelay: 5
});
// menuTimeline.timeScale(5);
menuTimeline
    .to(".menuBox", 0.2, {
        // autoAlpha: 1,
        css: {
            "height": "100vh",
            // "height": "100%",
            "opacity": "1",
            "visibility": "visible"
        },
    }, 0)
    .staggerTo(".menuLine", 0.2, {
        // autoAlpha: 1,
        css: {
            "height": "100%",
        },
    }, 0.1)
    .staggerTo(".menuHid", 0.5, {
        autoAlpha: 1,
        css: {
            "transform": "translateX(0)"
        },
    }, "<0.5")
    // .to(".menuLef .menuHid", {
    //     duration: 0.5,
    //     css: {
    //         "transform": "translateX(0)"
    //     },
    // }, "<0.6")
    // .to(".menuMed .menuHid", {
    //     duration: 0.5,
    //     css: {
    //         "transform": "translateX(0)"
    //     },
    // }, "<0.2")
    // .to(".menuRig .menuHid", {
    //     duration: 0.5,
    //     css: {
    //         "transform": "translateX(0)"
    //     },
    // }, "<0.2")
    .to(".menuLogo", {
        duration: 0.5,
        css: {
            "opacity": "1",
            "transform": "translateX(0)"
        },
    }, "<0.1")
    .to(".menuCross", {
        duration: 0.5,
        css: {
            "opacity": "1",
            "transform": "translateX(0) rotate(0deg)"
        },
    }, "<0.1")