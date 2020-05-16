const token = localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const urlstring = window.location.href;
const url = new URL(urlstring);
const groupId = url.searchParams.get("groupid");
const memId = url.searchParams.get("memberid");
console.log(groupId, memId);

const deleteUser = () => {
  const targetLinks = `https://epic-mail-apis.herokuapp.com/api/v1/deleteGroupUsers/${groupId}`;
  const memberid = memId;
  fetch(targetLinks, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      memberid,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let message = "";

      message = "Error: group member could not be deleted. Try again.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: group does not exist";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Error: you are not the admin";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      message = "Success: group member deleted successfully";
      if (data.message === message) {
        window.location.assign(`/src/addUser.html?id=${groupId}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
