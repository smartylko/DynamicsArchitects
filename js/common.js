/*================================= Sticky Header Starts =================================*/

function fixedHeader() {
    var sticky = $("#header"),
        scroll = $(window).scrollTop();
    if (scroll >= 10) sticky.addClass("fixHeader");
    else sticky.removeClass("fixHeader");
}

$(window).scroll(function (e) {
    fixedHeader();
});
fixedHeader();
/* Sticky Header Ends */

$(window).on("load", function () {
    /* uncomment to start locomotive */

    var scroll = new LocomotiveScroll({
        el: document.querySelector("#js-scroll"),
        // smooth: true,
        getSpeed: true,
        getDirection: true,
    });
    // scroll.stop();

    // scroll.start();
    // scroll.update();
});

/* common tab start */
$(".tabgroup > div").hide();
$(".tabgroup > div:first-of-type").show();
$(".tabgroup > div:first-of-type").addClass("active"); // added extra
$(".tabs a").click(function (e) {
    e.preventDefault();
    var $this = $(this),
        tabgroup = "#" + $this.parents(".tabs").data("tabgroup"),
        others = $this.closest("li").siblings().children("a"),
        target = $this.attr("href");
    others.removeClass("active");
    $this.addClass("active");
    $(tabgroup).children("div").hide();
    $(tabgroup).children("div").removeClass("active"); // added extra
    $(target).show();
    $(target).addClass("active"); // added extra
});
/* common tab end */

/* locomotive animation */
$(".has-animation").each(function () {
    $(this).attr("data-scroll", "true");

    var haDelay = $(this).data("delay") + "s";
    var haDuration = $(this).data("duration") + "s";

    $(this).css({
        transitionDelay: haDelay,
        transitionDuration: haDuration,
    });
});
/* locomotive animation end */

// $(document).on('click', '.headLogo', function () {
// const target = document.querySelector('#js-target');
// scroll.scrollTo(target);
// });

/* Form Feild Functionality */
$(document).on("input", ".form-field", function () {
    if ($(this).val().length > 0) {
        $(this).addClass("field--not-empty");
    } else {
        $(this).removeClass("field--not-empty");
    }
});
/* // Form Feild Functionality */

/* work modal start */
$(document).on("click", ".procKsm", function () {
    var sideMenuData = $(this).attr("data-name");
    // console.log(sideMenuData);
    $("#" + sideMenuData).addClass("mainSubLink-in");
});

$(document).on("click", ".workModal-cross", function () {
    $(".mainSubLink").removeClass("mainSubLink-in");
});
/* work modal end */