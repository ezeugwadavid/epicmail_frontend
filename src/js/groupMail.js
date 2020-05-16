const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const groupid = window.localStorage.getItem("groupId");

const send = (e) => {
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  const status = "sent";
  if (subject === undefined) {
    Handler.alertMessage("Error: subject cannot be empty", 0, "red");
    return;
  }

  if (subject === " ") {
    Handler.alertMessage("subject cannot include space", 0, "red");
    return;
  }

  if (subject === "") {
    Handler.alertMessage("Error: subject field cannot be empty", 0, "red");
    return;
  }
  subject = subject.trim();
  subject = subject.replace(/ {1,}/g, " ");

  if (message === undefined) {
    Handler.alertMessage("Error: message cannot be empty", 2, "red");
    return;
  }

  if (message === "") {
    Handler.alertMessage("Error: message field cannot be empty", 2, "red");
    return;
  }

  if (message === " ") {
    Handler.alertMessage("mesage cannot include space", 2, "red");
    return;
  }

  message = message.replace(/ {1,}/g, " ");

  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/sendGroupMail/${groupid}`;

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      subject,
      message,
      status,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // const mesg = data.error

      let message = "";

      message = "Error: server taking too long to respond. Try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server could not respond. Try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: group does not exist.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server not responding. Try again.";
      if (data.success === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      if (data.message === "Success: group message sent successfully!") {
        Handler.alertMessage(data.message, 0, "green");

        window.location.assign("/src/groupMessages.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
