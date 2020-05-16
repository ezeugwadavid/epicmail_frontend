const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const eMail = window.localStorage.getItem("toemail");

const subJect = window.localStorage.getItem("subject");

const myMessages = window.localStorage.getItem("message");

document.getElementById("toemail").innerHTML = eMail;
document.getElementById("subject").innerHTML = subJect;
document.getElementById("message").innerHTML = myMessages;

const myId = window.localStorage.getItem("ids");

const edit = () => {
  let toemail = document.getElementById("toemail").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();
  let msgstatus = "sent";

  if (toemail === undefined) {
    Handler.alertMessage("Error: email field cannot be empty", 3, "red");
    return;
  }

  toemail = toemail.toLowerCase();
  if (typeof toemail !== "string") {
    Handler.alertMessage("Error: email should be a string", 3, "red");
    return;
  }
  if (toemail === "") {
    Handler.alertMessage("Error: email field cannot be empty.", 3, "red");
    return;
  }
  if (toemail.includes(" ")) {
    Handler.alertMessage("Error: email cannot include space.", 3, "red");
    return;
  }
  // email check: stackoverflow
  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailCheck.test(toemail)) {
    Handler.alertMessage("Error: email format is invalid", 3, "red");
    return;
  }
  if (toemail.length < 10 || toemail.length > 30) {
    Handler.alertMessage(
      "Error: email should be 10 to 30 characters long",
      3,
      "red"
    );
    return;
  }

  if (subject === undefined) {
    Handler.alertMessage("Error: subject cannot be empty", 3, "red");
    return;
  }

  if (subject === " ") {
    Handler.alertMessage("subject cannot include space", 3, "red");
    return;
  }

  if (subject === "") {
    Handler.alertMessage("Error: subject field cannot be empty", 3, "red");
    return;
  }
  subject = subject.trim();
  subject = subject.replace(/ {1,}/g, " ");

  if (message === undefined) {
    Handler.alertMessage("Error: message cannot be empty", 3, "red");
    return;
  }

  if (message === "") {
    Handler.alertMessage("Error: message field cannot be empty", 3, "red");
    return;
  }

  if (message === " ") {
    Handler.alertMessage("mesage cannot include space", 3, "red");
    return;
  }

  message = message.replace(/ {1,}/g, " ");

  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/messages/updateMessage/${myId}`;

  fetch(targetUrl, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      subject,
      message,
      toemail,
      msgstatus,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      const mesg = data.error;

      let message = "";

      // return some error messages
      message = "Error: email field cannot be empty.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }
      const messages = "Error: email format is invalid";

      if (mesg === messages) {
        Handler.alertMessage(mesg, 0, "red");
        //  alert(mesg);
        return;
      }

      message = "Error: email should be 2 to 100 characters long";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: email does not exist.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: message not found";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: subject field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, "red");
        return;
      }

      message = "Error: message field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, "red");
        return;
      }

      message = "Error: message could not be edited. Try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, "red");
        return;
      }

      if (data.message === "Success: message updated successfully!") {
        Handler.alertMessage(data.message, 0, "green");

        window.location.assign("/src/sent.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const drafts = () => {
  let toemail = document.getElementById("toemail").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();
  let msgstatus = "draft";

  if (toemail === undefined) {
    Handler.alertMessage("Error: email field cannot be empty", 3, "red");
    return;
  }

  toemail = toemail.toLowerCase();
  if (typeof toemail !== "string") {
    Handler.alertMessage("Error: email should be a string", 3, "red");
    return;
  }
  if (toemail === "") {
    Handler.alertMessage("Error: email field cannot be empty.", 3, "red");
    return;
  }
  if (toemail.includes(" ")) {
    Handler.alertMessage("Error: email cannot include space.", 3, "red");
    return;
  }
  // email check: stackoverflow
  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailCheck.test(toemail)) {
    Handler.alertMessage("Error: email format is invalid", 3, "red");
    return;
  }
  if (toemail.length < 10 || toemail.length > 30) {
    Handler.alertMessage(
      "Error: email should be 10 to 30 characters long",
      3,
      "red"
    );
    return;
  }

  if (subject === undefined) {
    Handler.alertMessage("Error: subject cannot be empty", 3, "red");
    return;
  }

  if (subject === " ") {
    Handler.alertMessage("subject cannot include space", 3, "red");
    return;
  }

  if (subject === "") {
    Handler.alertMessage("Error: subject field cannot be empty", 3, "red");
    return;
  }
  subject = subject.trim();
  subject = subject.replace(/ {1,}/g, " ");

  if (message === undefined) {
    Handler.alertMessage("Error: message cannot be empty", 3, "red");
    return;
  }

  if (message === "") {
    Handler.alertMessage("Error: message field cannot be empty", 3, "red");
    return;
  }

  if (message === " ") {
    Handler.alertMessage("mesage cannot include space", 3, "red");
    return;
  }

  message = message.replace(/ {1,}/g, " ");

  const targetUrl = "https://epic-mail-apis.herokuapp.com/api/v1/messages";

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
      toemail,
      msgstatus,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const mesgs = data.error;
      let message = "";
      console.log(data.message);
      // return some error messages
      message = "Error: email field cannot be empty.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      const msg = "Error: email format is invalid";
      if (mesgs === msg) {
        Handler.alertMessage(msg, 1, "red");

        return;
      }

      message = "Error: email should be 2 to 100 characters long";
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, "red");

        return;
      }

      message = "Error: email does not exist.";
      if (data.message === message) {
        Handler.alertMessage(message, 3, "red");
        return;
      }

      message = "Error: subject field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 4, "red");
        return;
      }

      message = "Error: message field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, "red");
        return;
      }

      message = "Error: message sending failed.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, "red");
        return;
      }
      message = "Error: email cannot include space.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, "red");
        return;
      }
      message = "Error: Oops! looks like you tried to email yourself.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, "red");
        return;
      }

      if (data.message === "Success: message sent successfully!") {
        Handler.alertMessage("draft saved", 1, "green");
        window.location.assign("/src/drafts.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
