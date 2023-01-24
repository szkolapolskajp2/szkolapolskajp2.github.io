(function ($) {
  "use strict";

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  fetch("/json/sponsorzy.json")
    .then((r) => r.json())
    .then((obj) => {
      const $el = [];
      for (const { img, url, imie } of obj) {
        $el.push(`<div class="col-md-6 col-lg-2 text-center team mb-5">
            <div class="position-relative overflow-hidden mb-4" style="border-radius: 100%;">
                <img class="img-fluid w-100" src="${img}" alt="sponsor-image" />
                <div class="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                    <a class="btn btn-outline-light text-center px-0" style="width: 38px; height: 38px;" href="${url}" target="_blank"><i class="fas fa-link"></i></a>
                </div>
            </div>
            <i>${imie}</i>
        </div>`);
      }
      $(".Sponsorzy").append($el.join(""));
    });

  fetch("/json/zarzad_i_kadra.json")
    .then((r) => r.json())
    .then(({ nauczyciele, zarzad }) => {
      const carouselOptions = {
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: false,
        loop: true,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 4,
          },
        },
      };

      const el = (name, title, male = false) => `
        <div class="testimonial-item px-3">
          <div class="d-flex align-items-center">
              <img class="rounded-circle" src="${
                male ? "img/placeholder-man.webp" : "img/placeholder-woman.webp"
              }" style="width: 70px; height: 70px;" alt="Image" />
              <div class="pl-3">
                  <h5>${name}</h5>
                  <i>${title}</i>
              </div>
          </div>
      </div>`;

      const $nauczyciele = [];
      const $zarzad = [];
      for (const { imie, klasa, m } of nauczyciele) {
        $nauczyciele.push(el(imie, klasa, m));
      }
      for (const { imie, pozycja, m } of zarzad) {
        $zarzad.push(el(imie, pozycja, m));
      }
      $(".testimonial-carousel")
        .append($zarzad.join(""))
        .owlCarousel(carouselOptions);
      $(".teacher-carousel")
        .append($nauczyciele.join(""))
        .owlCarousel(carouselOptions);
    });
})(jQuery);
