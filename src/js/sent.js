const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const getSentMessages = () => {
  const targetUrl =
    "https://epic-mail-apis.herokuapp.com/api/v1/messages/sentMail";
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
      const result = data.retrievedMessages;

      let output = "";
      result.forEach((datum) => {
        const ts = new Date(datum.created_date);
        const date = ts.toDateString();

        output += `
        <div class="card shadow-sm mt-5 mb-4">
        <h5 class="card-header">${datum.lastname} <span class="pull-right">${date}</span></h5>
        <div class="card-body">
        <h5 class="card-title">${datum.subject}</h5>
        
        <a href="/src/viewSent.html?id=${datum.id}" class="btn btn-primary pull-right" id="getMessage" >View</a>
        </div>
        </div>                                                               
        
             `;
      });

      document.getElementById("sent").innerHTML = output;
      console.log("sent messages retrieved");
    })
    .catch((err) => {
      console.log(err);
    });
};
getSentMessages();
