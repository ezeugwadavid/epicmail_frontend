const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

// To create a new group
const newGroup = () => {
  let name = document.getElementById("myInput").value.trim();

  if (name === undefined) {
    Handler.alertMessage("Error: name field cannot be empty", 0, "red");
    return;
  }
  if (name === "") {
    Handler.alertMessage("Error: name field cannot be empty", 0, "red");
    return;
  }

  name = name.trim().toString();
  if (name.length < 2) {
    Handler.alertMessage(
      "Error: name should be over 2 characters long",
      0,
      "red"
    );
    return;
  }

  const targetUrl = "https://epic-mail-apis.herokuapp.com/api/v1/createGroups";

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let message = "";
      console.log("data");

      // return some error messages
      message = "Error: name field cannot be empty";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: name cannot include space.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: name should be over 2 characters long";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: this name is taken. Please try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server did not respond. Please try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: server not responding. Please try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      if (data.message === "Success: group created successfully!") {
        Handler.alertMessage(data.message, 0, "green");

        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//To delete a certain group
const deleteGroup = () => {
  const url_string = window.location.href;
  const urls = new URL(url_string);
  const ides = urls.searchParams.get("id");

  const targetLink = `https://epic-mail-apis.herokuapp.com/api/v1/deleteGroup/${ides}`;

  fetch(targetLink, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      let message = "";

      message = "Error: server not responding. Try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: group could not be deleted. Try again";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Success: group deleted successfully!";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "green");

        window.location.assign("/src/groups.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getGroups = () => {
  const targetUrl = "https://epic-mail-apis.herokuapp.com/api/v1/getGroups";
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
      const result = data.retrievedGroups;
     // console.log(data);

      let output = "";
      result.forEach((res) => {
        output += `

          <div class="ul mt-3">
                            <div class="group"><p>${res.name}</p>
                                <div class="buttons d-flex justify-content-end">
                                <a href="/src/addUser.html?id=${res.id}" class="btn btn-primary mb-1 ">Add User</a>
                                <a href="/src/deleteGroup.html?id=${res.id}"   class="btn btn-danger mb-1 "   id=${res.id} >Del</a>
                            </div>
                            </div>

                           
                            
                        </div>


         `;
      });

      document.getElementById("groups").innerHTML = output;
      console.log("groups retrieved");
    })
    .catch((err) => {
      console.log(err);
    });
};

getGroups();
