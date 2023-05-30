function sendDataPdf(payload, pdflink, requestUrl, token) {
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

export async function generateDownloadPdf(payload, requestUrl, token) {
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
      sendDataPdf(payload, pdflink, requestUrl, token);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Something went wrong with the get request:", error);
    });
}
