import { handlePdfMS } from "./symptom-tracker-survey-ms.js";
// import { fetchPlaceholders } from "../../scripts/lib-franklin.js";

/**
 * Convert list item to checkbox form element.
 *
 * @param {HTMLLIElement[]} ul
 * @param {HTMLFormElement} form
 * @param {Number} stepIndex
 */
export function renderCheckbox(ul, form, stepIndex) {
  [...ul.children].forEach((item, index) => {
    const id = `field-${index}-step-${stepIndex}`;
    const name = `field_${index}_step_${stepIndex}`;
    const html = `
      <div class='form-item form-type-checkbox'>
        <input type='checkbox' id='${id}' name='${name}' value='${item.innerHTML}' data-step='step${stepIndex}'>
        <label for='${id}'>${item.innerHTML}</label>
      </div>`;
    form.insertAdjacentHTML("beforeend", html);
  });
}

/**
 * Convert list item to radio form element.
 *
 * @param {HTMLLIElement[]} ol
 * @param {HTMLFormElement} form
 * @param {Number} stepIndex
 */
export function renderRadio(ol, form, stepIndex) {
  [...ol.children].forEach((item, index) => {
    const id = `field-${index}-step-${stepIndex}`;
    const name = `field_step_${stepIndex}`;
    const html = `
      <div class='form-item form-type-radio'>
        <input type='radio' id='${id}' name='${name}' value='${item.innerHTML}' data-step='step${stepIndex}'>
        <label for='${id}'>${item.innerHTML}</label>
      </div>`;
    form.insertAdjacentHTML("beforeend", html);
  });
}

/**
 * Build the form markup.
 *
 * @param {HTMLElement} row
 */
function renderRow(row, index) {
  row.classList.add("symptom-tracker-survey__step", `step-${index}`);
  if (index == 0) {
    row.classList.add("is-active");
  }

  const ul = row.querySelector("ul");
  if (ul) {
    // Create form
    const form = document.createElement("form");
    form.setAttribute("data-validate-status", "1");
    const message = `<div class=message></div>`;
    ul.insertAdjacentHTML("beforebegin", message);
    form.classList.add(`form-step-${index}`);
    renderCheckbox(ul, form, index);
    // Replace list by form
    ul.replaceWith(form);
  }

  const ol = row.querySelector("ol");
  if (ol) {
    // Create form
    const form = document.createElement("form");
    form.setAttribute("data-validate-status", "0");
    const message = `<div class=message></div>`;
    ol.insertAdjacentHTML("beforebegin", message);
    form.classList.add(`form-step-${index}`);
    renderRadio(ol, form, index);
    // Replace list by form
    ol.replaceWith(form);
  }
}

/**
 * Validate each step form.
 *
 * @param {HTMLElement} form
 * @return {Object} status
 */
function validateStepForm(form) {
  const status = form.getAttribute("data-validate-status");
  if (status == 1) {
    return {
      status: true,
      message: "",
    };
  }
  return {
    status: false,
    message: "required",
  };
}

export default async function decorate(block) {
  // const placeholders = await fetchPlaceholders();
  const indication = block.children[0].textContent.trim();
  block.removeChild(block.children[0]);
  let formData = {
    step0: [],
    step1: [],
    step2: "",
    step3: "",
    indication: indication,
  };

  const totalSteps = block.children.length;
  let currentStepIndex = 0;
  const steps = document.createElement("div");
  steps.classList.add("symptom-tracker-survey__steps");

  [...block.children].forEach((row, index) => {
    renderRow(row, index);
    steps.append(row);
  });
  block.textContent = "";
  block.append(steps);

  const paginationHtml = `
    <div class="pagination">
      <button type="button" class="previous hidden">Back</a>
      <button type="button" class="next">Next</a>
      <button type="button" class="finish hidden">Finish</a>
    </div>
  `;
  block.insertAdjacentHTML("beforeend", paginationHtml);

  const msHtml = `
    <div class="ms-actions hidden">
      <button class="ms-actions__pdf">Save Recap</button>
      <form class="ms-actions__mail-form">
        <input class="ms-actions__email" type="text" placeholder="Email Address">
        <button class="ms-actions__send" type="submit">Send</button>
      </form>
    </div>
  `;
  block.insertAdjacentHTML("beforeend", msHtml);

  const checkboxes = block.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener("change", (e) => {
      const element = e.target;
      const step = element.getAttribute("data-step");
      const parentLabel = element.parentNode;
      if (element.checked) {
        parentLabel.classList.add("checked");
      } else {
        parentLabel.classList.remove("checked");
      }
      const form = element.closest("form");
      const data = [];
      const inputs = form.querySelectorAll('input[type="checkbox"]:checked');
      inputs.forEach((input, index) => {
        data.push(input.value);
      });
      formData[step] = data;
    });
  }

  const radios = block.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radios.length; i += 1) {
    radios[i].addEventListener("change", (e) => {
      const element = e.target;
      const step = element.getAttribute("data-step");
      const parentLabel = element.parentNode;
      const form = element.closest("form");
      form.setAttribute("data-validate-status", "1");
      form.querySelectorAll(".form-type-radio.checked").forEach((radio) => {
        radio.classList.remove("checked");
      });
      parentLabel.classList.add("checked");
      formData[step] = element.value;
    });
  }

  // Actions Pagination
  const pagination = block.querySelector(".pagination");
  const nextBtn = pagination.querySelector(".next");
  const prevBtn = pagination.querySelector(".previous");
  const finishBtn = pagination.querySelector(".finish");

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentStep = block.querySelector(`.step-${currentStepIndex}`);
    const currentStepForm = currentStep.querySelector("form");
    const isValidate = validateStepForm(currentStepForm);
    if (isValidate.status) {
      currentStep.querySelector(".message").innerHTML = "";
      const nextStepIndex = currentStepIndex + 1;
      const nextStep = block.querySelector(`.step-${nextStepIndex}`);
      currentStep.classList.remove("is-active");
      nextStep.classList.add("is-active");

      if (prevBtn.classList.contains("hidden")) {
        prevBtn.classList.remove("hidden");
      }
      if (nextStepIndex == totalSteps - 1) {
        nextBtn.classList.add("hidden");
        finishBtn.classList.remove("hidden");
      }
      if (formData[`step${currentStepIndex}`].length === 0) {
        currentStep.classList.add("is-invisible");
      } else {
        currentStep.classList.remove("is-invisible");
      }
      currentStepIndex = nextStepIndex;
    } else {
      currentStep.querySelector(
        ".message"
      ).innerHTML = `<span>${isValidate.message}</span>`;
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentStep = block.querySelector(`.step-${currentStepIndex}`);
    currentStep.querySelector(".message").innerHTML = "";

    const prevStepIndex = currentStepIndex - 1;
    const prevStep = block.querySelector(`.step-${prevStepIndex}`);
    currentStep.classList.remove("is-active");
    prevStep.classList.add("is-active");

    if (prevStepIndex == 0) {
      nextBtn.classList.remove("hidden");
      prevBtn.classList.add("hidden");
    }
    if (prevStepIndex == totalSteps - 2) {
      nextBtn.classList.remove("hidden");
      finishBtn.classList.add("hidden");
    }
    currentStepIndex = prevStepIndex;
  });

  finishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentStep = block.querySelector(`.step-${currentStepIndex}`);
    const currentStepForm = currentStep.querySelector("form");
    const isValidate = validateStepForm(currentStepForm);
    if (isValidate.status) {
      currentStep.querySelector(".message").innerHTML = "";
      block.classList.add("is-finished");
    } else {
      currentStep.querySelector(
        ".message"
      ).innerHTML = `<span>${isValidate.message}</span>`;
    }
  });

  // MS actions
  const msActionsPdf = block.querySelector(".ms-actions__pdf");
  const msActionsSend = block.querySelector(".ms-actions__send");

  msActionsPdf.addEventListener("click", async (e) => {
    e.preventDefault();
    await handlePdfMS(formData);
  });
}
