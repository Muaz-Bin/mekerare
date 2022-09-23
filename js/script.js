(function ($) {
  "use strict";

  $(window).scroll(function () {
    var $scrolling = $(this).scrollTop();
    var stickyMenu = $(".sticky-menu");
    if ($scrolling >= 400) {
      stickyMenu.addClass("sticky");
    } else {
      stickyMenu.removeClass("sticky");
    }
  });

  $(".slider-area").slick({
    autoplay: true,
    infinite: true,
    slidesToShow: 13,
    slidesToScroll: 1,
    dots: false,
    speed: 2500,
    pauseOnHover: false,
    cssEase: "linear",
    rtl: true,
    autoplaySpeed: 10,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  });

  //initialize wow js
  new WOW({}).init();

  var cerchio = document.querySelectorAll(".magnet_cursor");

  cerchio.forEach(function (elem) {
    $(document).on("mousemove touch", function (e) {
      magnetize(elem, e);
    });
  });

  function magnetize(el, e) {
    var mX = e.pageX,
      mY = e.pageY;
    const item = $(el);

    const customDist = item.data("dist") * 10 || 170;
    const centerX = item.offset().left + item.width() / 2;
    const centerY = item.offset().top + item.height() / 2;

    var deltaX = Math.floor(centerX - mX) * -0.35;
    var deltaY = Math.floor(centerY - mY) * -0.35;

    var distance = calculateDistance(item, mX, mY);

    if (distance < customDist) {
      TweenMax.to(item, 0.5, {
        y: deltaY,
        x: deltaX,
        scale: 1,
      });
      item.addClass("magnet");
    } else {
      TweenMax.to(item, 0.6, {
        y: 0,
        x: 0,
        scale: 1,
      });
      item.removeClass("magnet");
    }
  }

  function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
          Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
      )
    );
  }

  /* Mouse sticky */
  function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }
})(jQuery);
