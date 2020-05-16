
const forgotPassword = () => {
  let email = document.getElementById("email").value.trim();
  console.log(email);

  if (email === undefined) {
    Handler.alertMessage("Error: email field is required", 0, "red");
    return;
  }
  if (email === "") {
    Handler.alertMessage("Error: email cannot be empty.", 0, "red");
    return;
  }
  if (email.includes(" ")) {
    Handler.alertMessage("Error: email cannot include space.", 0, "red");
    return;
  }
  if (typeof email !== "string") {
    Handler.alertMessage("Error: email should be a string", 0, "red");
    return;
  }

  // email check: stackoverflow
  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailCheck.test(email)) {
    Handler.alertMessage("Error: email format is invalid", 0, "red");
    return;
  }
  email = email.toLowerCase().trim();
  if (email.length < 5 || email.length > 30) {
    Handler.alertMessage(
      "Error: email should be 10 to 30 characters long",
      0,
      "red"
    );
    return;
  }

  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/users/resetpassword`;

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let message = "";

      message = "Error: there is no user with that email. Please try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server not responding. Please try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }
      message = "Something went wrong. Pls try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      if (data.message === "Kindly check your email for further instructions") {
        alert(data.message);
        window.location.assign("/src/index.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document
  .getElementById("forgotPassword")
  .addEventListener("click", forgotPassword);