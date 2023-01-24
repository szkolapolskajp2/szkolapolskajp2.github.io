// script to extract data from https://photos.google.com/albums
/**
JSON.stringify(
  $$("a.MTmRkb").map((el) => [
    el.getElementsByClassName("mfQCMe")[0].innerText,
    el.href.slice(32),
    el.firstChild.style.backgroundImage.slice(39, -20),
  ])
.filter(([title]) => {
  const split = title.split("/");
  if (split.length !== 2 || !/20[0-4][0-9]-20[0-4][0-9]/.test(split[0])) {
    console.error(`Album Title || ${title} is wrong format`);
    return false;
  }
  return true;
}));
// [title, albumUrl, photoUrl]
*/

var albumBase = "https://photos.google.com/share/";
var thumbBase = "https://lh3.googleusercontent.com/";
var suffix = "-p-k-no";

const sortYears = (a, b) => {
  const numA = a.split("-").reduce((a, b) => Number(a) + Number(b));
  const numB = b.split("-").reduce((a, b) => Number(a) + Number(b));
  return numB - numA;
};

const makeButtonEl = (years, active = false) =>
  `<li class="btn btn-outline-primary m-1 ${
    active ? "active" : ""
  }" data-filter=".${years}">${years}</li>`;

const makeAlbumEl = (
  years,
  title,
  href,
  coverUrl
) => `<div class="col-lg-4 col-md-6 mb-4 portfolio-item ${years}">
    <div class="position-relative overflow-hidden mb-2">
        <img class="img-fluid w-100 minh-180" src="${coverUrl}" alt="">
        <div class="portfolio-btn d-flex align-items-center justify-content-center">
            <a href="${href}">
                <i class="text-white" style="font-size: 30px;">${title}</i>
            </a>
        </div>
    </div>
</div>`;

// test

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

  fetch("/json/gallery.json")
    .then((r) => r.json())
    .then(async (albums) => {
      let galleryElements = "";
      let buttonSet = new Set();
      for (const [albumName, albumUrl, photoUrl] of albums) {
        const [years, title] = albumName.split("/");
        galleryElements += makeAlbumEl(
          years,
          title,
          albumBase + albumUrl,
          thumbBase + photoUrl + suffix
        );
        buttonSet.add(years);
      }
      const buttonArray = [...buttonSet].sort(sortYears);

      $("#portfolio-flters").append(
        buttonArray.map((year, i) => makeButtonEl(year, i === 0)).join("")
      );
      $(".portfolio-container").append(galleryElements);

      await new Promise((r) => setTimeout(r, 1000));

      var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
        filter: `.${buttonArray[0]}`,
      });

      $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");
        portfolioIsotope.isotope({ filter: $(this).data("filter") });
      });
    });
})(jQuery);
