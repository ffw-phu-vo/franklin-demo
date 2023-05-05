import { createTag } from "../../scripts/scripts.js";

function heroTest(image, content) {
  return `
    ${image ? `<div class=hero-test__image>${image}</div>` : ""}
    <div class=hero-test__content>${content}</div>
  `;
}
export default function decorate(block) {
  const section = block.closest(".section");
  const picture =
    block.firstElementChild.querySelector("div:nth-child(2)").innerHTML;
  const content = block.firstElementChild.firstElementChild.innerHTML;

  // console.log("block", block);
  // console.log("picture", picture);
  // console.log("content", content);
  // console.log("sectionMeta", section.getAttribute("data-test-data"));
  // console.log("heroTest", heroTest(picture, content));
  block.innerHTML = heroTest(picture, content);
}
