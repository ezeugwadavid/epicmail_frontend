const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

let url_strings = window.location.href;
let myurl = new URL(url_strings);
let idss = myurl.searchParams.get("id");
window.localStorage.setItem("idss", idss);

// update message status to 'read'
const updateStatus = (id) => {
  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/messages/updateStatus`;
  const status = "read";
  const msgid = id;

  fetch(targetUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      status,
      msgid,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("connected");

      // handle error messages
      console.log(data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

const url_string = window.location.href;
const urls = new URL(url_string);
const ides = urls.searchParams.get("id");
window.localStorage.setItem("viewid", ides);

const viewMessage = () => {
  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/messages/getMail/${ides}`;
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
      // console.log(data)
      let message = "";
      console.log("connected");
      const result = data.retrievedMessage[0];

      window.localStorage.setItem("fromemails", result.fromemail);
      window.localStorage.setItem("subjects", result.subject);
      window.localStorage.setItem("messages", result.message);

      const ts = new Date(result.created_date);
      const date = ts.toDateString();
      const time = new Date(result.created_date).toLocaleTimeString();

      let output = "";

      output += ` <div class="panel-sub-heading inner-all">
                 <div class="pull-left">
                    <strong  class="lead ml-3">${result.subject}</strong>
                      </div>
       
              <div class="clearfix"></div>
              </div>
    <div class="panel-sub-heading inner-all">
        <div class="row ml-3">
            <div class="col-md-8 col-sm-8 col-xs-7 ">
                <img src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg"
                    alt="profile pic" class="img-circle senden-img">
                <span>${result.fromemail}</span>
                to
                <strong>me</strong>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-5">
                <p class="pull-right">${time}</p>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="view-mail mx-3">
            <p>
            ${result.message}
            </p>
    
        </div>
        <div class="pull-right mr-3">
        <button class="btn btn-danger btn-sm tooltips" data-container="body" data-original-title="Trash"
        data-toggle="tooltip" data-placement="top" onclick="deleteMessage()" title=""><i class="fa fa-trash-o"></i></button>
        <a href="/src/compose.html" class="btn btn-success btn-sm"><i class="fa fa-reply"></i> Reply</a>
        </div><!-- /.view-mail -->
        
        </div>
        
        
        
        
        
        `;
      //  <a href="editInbox.html" class="btn btn-info btn-sm "><i class="fa fa-edit"></i> </a>

      message = "Error: mail not found.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      document.getElementById("getMails").innerHTML = output;
      // updateStatus(urlId);
    })
    .catch((err) => {
      console.log(err);
    });
};

viewMessage();

//delete a message
const deleteMessage = () => {
  const userConfirm = confirm("Are you sure you want to delete this mail?");
  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/messages/deleteMail/${ides}`;

  if (userConfirm === true) {
    fetch(targetUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const mesgErr = data.error;
        //  console.log(data);
        let message = "";

        message = "Error: mail not found";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }
        message = "Error: mail not found try deleting from your sent mails";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message =
          "Error: mail could not be deleted either because the mail was not found, or something bad happened. Please try again.";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message = "Success: mail deleted successfully!";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "green");
          window.location.assign("/src/inbox.html");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
