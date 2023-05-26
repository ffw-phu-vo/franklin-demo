function arrToMultipleParts(arr, num) {
  let result = [];
  for (var i = 0; i < arr.length; i += num) {
    result.push(arr.slice(i, i + num));
  }
  return result;
}

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

function sendData(payload, pdflink, requestUrl, token) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", requestUrl, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("x-config-token", token);
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // eslint-disable-next-line no-console
      console.log("Success, PDF generated");
      const res = xhttp.responseText;
      const obj = JSON.parse(res);
      pdflink.location = obj.data[0].details[0].downloadUrl;
    }
    if (xhttp.readyState !== 4 && xhttp.status !== 200) {
      // eslint-disable-next-line no-console
      console.error("Something went wrong! Please try again.");
    }
  };
  xhttp.send(JSON.stringify(payload));
}

async function generateDownloadPdf(payload, requestUrl, token) {
  let pdflink = "";
  pdflink = window.open("", "_blank");
  pdflink.document.write("Loading preview...");
  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Config-Token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      payload.csrfToken = data.data.csrfToken;
      sendData(payload, pdflink, requestUrl, token);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Something went wrong with the get request:", error);
    });
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
    const step1 = arrToMultipleParts(formData.step0, 3);
    step1_rc = covertStepRc(step1, 1);
  }
  let step2_rc = "";
  if (formData.step1.length > 0) {
    const step2 = arrToMultipleParts(formData.step1, 3);
    step2_rc = covertStepRc(step2, 2);
  }

  let payload = {
    csrfToken: "",
    base_path: basePath,
    date_created: date,
    indication: "ra",
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
