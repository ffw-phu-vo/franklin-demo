import { loadCSS } from "../../scripts/lib-franklin.js";
import { loadScript } from "../../scripts/scripts.js";

export default function decorate(block) {
  loadCSS("/libraries/slick/slick.css");
  loadCSS("/libraries/slick/slick-theme.css");
  loadScript("/libraries/slick/slick.min.js");

  let carouselSlick = setInterval(frame, 300);
  function frame() {
    if (typeof $.fn.slick == "function") {
      clearInterval(carouselSlick);
      jQuery(block).slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      });
    }
  }
}
