



const getUsers = () => {
  let token = window.localStorage.getItem("token");
  if (!token) {
    window.location.assign("/src/index.html");
    alert("Please login");
  }
  const targetUrl = "https://epic-mail-apis.herokuapp.com/api/v1/users/getUser";
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
     // console.log(data);

      let output = data.user;

      document.getElementById("info").innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
};

getUsers();
