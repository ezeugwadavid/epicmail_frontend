const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

// To add user
const addUser = () => {
  let email = document.getElementById("myUser").value.trim();

  if (email === undefined) {
    Handler.alertMessage("Error: email field cannot be empty", 0, "red");
    return;
  }
  if (email === "") {
    Handler.alertMessage("Error: email field cannot be empty", 0, "red");
    return;
  }

  email = email.trim().toString();
  if (email.length < 2) {
    Handler.alertMessage(
      "Error: email should be over 2 characters long",
      0,
      "red"
    );
    return;
  }

  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!emailCheck.test(email)) {
    Handler.alertMessage("Error: email format is invalid", 0, "red");
    return;
  }
  if (email.length < 10 || email.length > 30) {
    Handler.alertMessage(
      "Error: email should be 10 to 30 characters long",
      0,
      "red"
    );
    return;
  }

  const targetUrl = "https://epic-mail-apis.herokuapp.com/api/v1/addUser";

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let message = "";
      console.log(data);

      // return some error messages
      message = "Error: email field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: email cannot include space.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: email should be over 2 characters long";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: user does not exist. Try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: user not added. Try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server not responding. Try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Group member added successfully!";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "green");

        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


const getUsers = () => {
  const url_string = window.location.href;
  const urls = new URL(url_string);
  const ides = urls.searchParams.get("id");

  window.localStorage.setItem("groupId", ides);

  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/getGroupUsers/${ides}`;
  fetch(targetUrl, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("connected");
      const result = data.returnedMembers;
      //console.log(data);

      let output = "";
      result.forEach((res) => {
        output += `

          <div class="card mt-3">
                            <div class="card-body">
                              ${res.email}
                              <span><a href="/src/deleteUser.html?groupid=${res.groupid}&memberid=${res.memberid}" class="btn btn-danger btn-sm mb-1 ml-0 mr-0 pull-right ">
                                  <i class="fa fa-trash-o"></i></a></span>
                            </div>
                          </div>



         `;
      });

      document.getElementById("User").innerHTML = output;
      console.log("group users retrieved");
    })
    .catch((err) => {
      console.log(err);
    });
};

getUsers();









  
  
  
  
  