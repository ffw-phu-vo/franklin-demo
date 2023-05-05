import { loadCSS } from "../../scripts/lib-franklin.js";
import { loadScript } from "../../scripts/scripts.js";

export default function decorate(block) {
  loadCSS("/libraries/slick/slick.css");
  loadCSS("/libraries/slick/slick-theme.css");
  loadScript("/libraries/slick/slick.min.js");
  console.log("block", block);
  console.log(jQuery(block));
  // let slickInterval;
  // let carouselSlick = function (block) {
  //   console.log("test");
  //   if (typeof $.fn.slick == "function") {
  //     console.log("test2");
  //     // const $jq = jQuery.noConflict();
  //     // $jq(document).ready(function () {
  //     //   $jq(block).slick({
  //     //     infinite: true,
  //     //     slidesToShow: 3,
  //     //     slidesToScroll: 3,
  //     //   });
  //     // });
  //     // clearInterval(slickInterval);
  //   }
  // };
  // setInterval(carouselSlick(block), 300);

  let carouselSlick = setInterval(frame, 300);
  function frame() {
    if (typeof $.fn.slick == "function") {
      clearInterval(carouselSlick);
      jQuery(block).slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      });
      console.log("test");
    } else {
      console.log("test2");
    }
  }
}
