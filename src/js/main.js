document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const burger = document.querySelector("#burger");
  const headerMobile = document.querySelector(".header-mobile");
  const heightHeader = document.querySelector(".header").offsetHeight;
  const heroBlocks = document.querySelectorAll(".hero");
  const header404 = document.querySelectorAll(".header__bottom--404");
  const headerIndex = document.querySelectorAll(".header__bottom--index");
  const headerLogo = document.querySelector('.header__logo');

  if (heroBlocks.length > 0) {
    heroBlocks.forEach((item) => {
      item.style.marginTop = "-" + heightHeader + "px";
    });
  }

  if (header404.length > 0) {
    header404.forEach((item) => {
      burger.addEventListener('click', function() {
        item.classList.toggle("active");
        if (this.classList.contains('active')) {
          headerLogo.setAttribute("src", "images/vector/header-logo-index.svg");
        } else {
          headerLogo.setAttribute("src", "images/vector/header-logo.svg");
        }
      })
    });
  }

  if (headerIndex.length > 0) {
    headerIndex.forEach((item) => {
      burger.addEventListener('click', function() {
        item.classList.toggle("active");
        if (this.classList.contains('active')) {
          headerLogo.setAttribute("src", "images/vector/header-logo-index.svg");
        } else {
          headerLogo.setAttribute("src", "images/vector/header-logo.svg");
        }
      })
    });
  }

  burger.addEventListener("click", () => {
    body.classList.toggle("hidden");
    headerMobile.classList.toggle("active");
    burger.classList.toggle("active");
  });

  const swiper = new Swiper(".hero__swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const swiper2 = new Swiper(".news-company-swiper", {
    spaceBetween: 70,
    slidesPerView: 3,
    breakpoints: {
      0: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
      381: {
        slidesPerView: 2,
        spaceBetween: 45,
      },
      1281: {
        slidesPerView: 3,
        spaceBetween: 70,
      },
    },
  });

  const swiper3 = new Swiper(".news-more__swiper", {
    slidesPerView: 4,
    spaceBetween: 40,
    loop: false,
    breakpoints: {
      0: {
        slidesPerView: "auto",
      },
      381: {
        slidesPerView: 2,
      },
      769: {
        slidesPerView: 3,
        // loop: true,
      },
      1281: {
        loop: false,
        slidesPerView: 4,
        allowTouchMove: false
      },
    },
  });
});

$(document).ready(function () {
  $(".header-mobile__submenu").hide();
  $(".header-mobile__menu a").on("click", function (evt) {
    evt.preventDefault();
    $(this).next("div").toggle();
  });

  // tabs
  $(".job__wrapper .tab-content").hide();
  $(".job__wrapper .tab").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });

  // меню в шапке
  if (window.innerWidth > 1279) {
    function responseMenu() {
      let wrap_width = $("ul.main-nav").outerWidth();
      let menu_width = 0;

      $("ul.main-nav>li.item").each(function () {
        menu_width +=
          $(this).outerWidth() +
          parseInt(getComputedStyle($(this)[0]).marginRight);
      });

      menu_width -= $("ul.main-nav>li.dd_menu").outerWidth();

      if (wrap_width < menu_width + 150) {
        $("ul.main-nav li.dd_menu").show();

        let items = $("ul.main-nav>li.item");
        $("ul.main-nav__submenu").append(items.eq(items.length - 1));

        responseMenu();
      }

      return false;
    }
    $(window)
      .on("resize", function () {
        if (window.innerWidth < 1920) {
          responseMenu();
        }
      })
      .trigger("resize");
  }

});
