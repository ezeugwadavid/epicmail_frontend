
const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const getMails = () => {
  const targetUrl =
    "http://epic-mail-apis.herokuapp.com/api/v1/messages/getReceive";
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
      // let message = '';
      console.log("connected");
      const result = data.retrievedMessages;

      let message = "";

      message = "Error: no message found";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      let output = "";

      result.forEach((datum) => {
      //  console.log(result.rowCount);

        const ts = new Date(datum.created_date);
        const date = ts.toDateString();

        output += `
           
           
           <div class="card shadow-sm mb-4">
           <h5 class="card-header">${datum.lastname} <span class="pull-right">${date}</span></h5>
           <div class="card-body">
           <h5 class="card-title">${datum.subject}</h5>
           
           <a href="/src/view.html?id=${datum.id}" class="btn btn-primary pull-right" id="getMessage" >View</a>
           </div>
           </div>                                                               
           
           `;
      });

     
      document.getElementById("mails").innerHTML = output;

     
    })
    .catch((err) => {
      console.log(err);
    });
};

getMails();



      
