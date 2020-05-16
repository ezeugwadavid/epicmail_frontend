const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const urlstring = window.location.href;
const url = new URL(urlstring);
const mesgId = url.searchParams.get("id");

const deleteMail = () => {
  const targetLinks = `https://epic-mail-apis.herokuapp.com/api/v1/deleteGroupMails/${mesgId}`;

  fetch(targetLinks, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
     // console.log(data);
      let message = "";

      message = "Error: mail not found";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message =
        "Error: mail could not be deleted either because the mail was not found, or something bad happened.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Success: group mails deleted successfully!";
      if (data.message === message) {
        window.location.assign("/src/groupMessages.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
