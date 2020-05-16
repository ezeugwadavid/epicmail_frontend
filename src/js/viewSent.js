const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

let url_strings = window.location.href;
let myurl = new URL(url_strings);
let ids = myurl.searchParams.get("id");
window.localStorage.setItem("ids", ids);

const viewSent = () => {
  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/messages/getMail/${ids}`;
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
      console.log(data);
      let message = "";
      console.log("connected");
      var result = data.retrievedMessage[0];

      const ts = new Date(result.created_date);
      // const date = ts.toDateString();
      const time = new Date(result.created_date).toLocaleTimeString();

      let output = "";

      window.localStorage.setItem("toemail", result.toemail);
      window.localStorage.setItem("subject", result.subject);
      window.localStorage.setItem("message", result.message);

     

      output += ` <div class="panel-sub-heading inner-all">
                   <div class="pull-left">
                      <strong class="lead ml-3">${result.subject}</strong>
                        </div>
         
                <div class="clearfix"></div>
                </div>
      <div class="panel-sub-heading inner-all">
          <div class="row ml-3">
              <div class="col-md-8 col-sm-8 col-xs-7 ">
                  <img src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg"
                      alt="profile pic" class="img-circle senden-img">
                  <span>me</span>
                  to
                  <strong>${result.toemail}</strong>
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
              <a href="editMessage.html"  class="btn btn-info btn-sm"   
                  title=""><i class="fa fa-edit"></i> </a>
              <button class="btn btn-danger btn-sm tooltips" data-container="body" data-original-title="Trash"
                  data-toggle="tooltip" data-placement="top" onclick="retractMail()" title=""><i class="fa fa-trash-o"></i></button>
             
          </div><!-- /.view-mail -->
  
      </div>


        
        
        
        
        
        `;

      //data-toggle="modal" data-target="#exampleModal"

      message = "Error: mail not found.";
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, "red");
        return;
      }

      document.getElementById("getMail").innerHTML = output;
      // updateStatus(urlId);
    })
    .catch((err) => {
      console.log(err);
    });
};

viewSent();

const retractMail = () => {
  // let url_strings = window.location.href
  // let myurl = new URL(url_strings);
  // let ids = myurl.searchParams.get("id");

  const userConfirm = confirm("Are you sure you want to retract this message?");
  const targetUrls = `https://epic-mail-apis.herokuapp.com/api/v1/messages/retractMail/${ids}`;

  if (userConfirm === true) {
    fetch(targetUrls, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let message = "";
       // console.log(data);

        // handle error messages
        message = "Error: mail not found";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message = "Error: server not responding. Please try again.";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message = "Error: problem retrieving email";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message = "Error: server not responding, Try again later";
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, "red");
          return;
        }

        message = "Success: mail retracted successfully!";
        if (data.message === message) {
          Handler.alertMessage(data.message, 1, "green");
        }

        message = "mail has been deleted";
        if (data.message === message) {
          Handler.alertMessage(data.message, 1, "green");
          //alert(data.message);
          window.location.assign("/src/sent.html");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
