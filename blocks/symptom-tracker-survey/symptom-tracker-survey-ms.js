import { generateDownloadPdf } from "../../scripts/helpers/hander-ms.js";
import { arrToParts } from "../../scripts/helpers/format.js";

function covertStepRc(arrStep, step) {
  let mkRc = "";
  arrStep.forEach((arr, i) => {
    let tds = "";
    for (var i = 0; i <= 3; i++) {
      let td = "";
      if (arr[i] !== undefined || arr[i] != null) {
        const imgSrc = `https://xeljanzcom.test.pfizerstatic.io/images/pdf-icons/ra-survey/step-${step}/icon-${arr[
          i
        ]
          .toLowerCase()
          .trim()}.png`;
        console.log(imgSrc);
        td = `<td style="width: 130px; padding: 0; padding-bottom: 20px;">
                <div style="border: 2px solid #e5e5e5; padding-bottom: 7px; border-radius: 10px; box-shadow: 0px 0px 3px #e5e5e5;">
                  <div style="text-align: center; height: 80px; margin: 5px 0 5px 0;">
                    <img
                      style="width: 50px; height: auto;"
                      src="${imgSrc}"
                    />
                    <br>
                    <span style="font-size: 13.5px; font-family:open-sans-regular; color: #454b4b; padding:10px 0;">  ${arr[i]} </span>
                  </div>
                </div>
              </td>`;
      } else if (i != 3) {
        td = `<td style="padding: 0;"></td>`;
      } else {
        td = `<td style="padding: 0; width: 1px;"></td>`;
      }
      tds = tds + td;
    }

    mkRc = mkRc + `<tr>${tds}</tr>`;
  });

  return mkRc;
}

export async function handlePdfMS(formData) {
  const basePath = "https://xeljanzcom.test.pfizerstatic.io/";
  const token = "xeljanz_uat-DDG-RA-pdf-config-download";
  const requestUrl =
    "https://ms-forms-service-uat.digitalpfizer.com/api/v2/forms";

  const today = new Date();
  const date = today.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let step1_rc = "";
  if (formData.step0.length > 0) {
    const step1 = arrToParts(formData.step0, 3);
    step1_rc = covertStepRc(step1, 1);
  }
  let step2_rc = "";
  if (formData.step1.length > 0) {
    const step2 = arrToParts(formData.step1, 3);
    step2_rc = covertStepRc(step2, 2);
  }

  let payload = {
    csrfToken: "",
    base_path: basePath,
    date_created: date,
    indication: formData.indication,
    type: "download",
    step3: formData.step2,
    step4: formData.step3,
    step1_rc: step1_rc,
    step1_rc_class: "",
    step2_rc: step2_rc,
    step2_rc_class: "",
    total_row_count_less_than_equals_4: "visible",
    total_row_count_less_than_equals_3: "visible",
    total_row_count_greater_than_3: "invisible",
    total_row_count_greater_than_4: "invisible",
    total_row_count_equals_4: "invisible",
    response: "worse than usual",
    csrfToken: "",
  };

  await generateDownloadPdf(payload, requestUrl, token);
}
