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

$("#header").load("header.html", function () {
  fixedHeader();
  if ($(window).outerWidth() <= 990) {
    var MobileMenu = new MobileNav({
      initElem: "nav",
      menuTitle: "Menu",
    });
  }
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    const hasDropdowns = item.querySelector(".dropdown") !== null;
    if (hasDropdowns) {
      item.classList.add("dr-icon");
    }
  });
});

$("#footer").load("footer.html");

/* common tab start */
$(".tabgroup > div").hide();
$(".tabgroup > div:first-of-type").show();
$(".tabs a").click(function (e) {
  e.preventDefault();
  var $this = $(this),
    tabgroup = "#" + $this.parents(".tabs").data("tabgroup"),
    others = $this.closest("li").siblings().children("a"),
    target = $this.attr("href");
  others.removeClass("active");
  $this.addClass("active");
  $(tabgroup).children("div").hide();
  $(target).show();
});
/* common tab end */

/* Form Feild Functionality */
$(document).on("input", ".form-field", function () {
  if ($(this).val().length > 0) {
    $(this).addClass("field--not-empty");
  } else {
    $(this).removeClass("field--not-empty");
  }
});
/* Form Feild Functionality ends */

/* Password View */
$(document).on("click", ".view-pass", function () {
  inp = $(this).parents(".form-grp").find("input");
  type = inp.attr("type");

  if (type == "password") {
    inp.attr("type", "text");
    $(this).removeClass("ph-eye-slash").addClass("ph-eye");
  } else {
    inp.attr("type", "password");
    $(this).removeClass("ph-eye").addClass("ph-eye-slash");
  }
});
/* // Password View */

AOS.init();

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
