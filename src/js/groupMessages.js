const token = window.localStorage.getItem("token");
if (!token) {
  window.location.assign("/src/index.html");
  alert("Please login");
}

const groupid = window.localStorage.getItem("groupId");

const getGroupMessages = () => {
  const targetUrl = `https://epic-mail-apis.herokuapp.com/api/v1/getGroupMail/${groupid}`;
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
      // console.log('connected');
      const result = data.retrievedMessages;

      let output = "";
      result.forEach((datum) => {
        const ts = new Date(datum.created_date);
        const date = ts.toDateString();
        const time = new Date(datum.created_date).toLocaleTimeString();

        output += `

          <div class="panel-sub-heading inner-all mt-5 ">
          <hr mt-2>
                   <div class="pull-left">
                      <h1 class="lead ml-3">${datum.subject}</h1>
                        </div>
         
                <div class="clearfix"></div>
                </div>
      <div class="panel-sub-heading inner-all">
          <div class="row ml-3">
              <div class="col-md-8 col-sm-8 col-xs-7 ">
                  <img src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg"
                      alt="profile pic" class="img-circle senden-img">
                  <span>${datum.fromemail}</span>
                  to
                  <strong>group</strong>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-5">
                  <p class="pull-right">${time}</p>
              </div>
          </div>
      </div>
      <div class="panel-body">
          <div class="view-mail mx-3">
              <p>
              ${datum.message}
              </p>
      
          </div>
          <div class="pull-right mt-1 mr-2">
             
              <a href="/src/deleteGMail.html?id=${datum.id}" class="btn btn-danger mb-5 btn-sm "
                   title=""><i class="fa fa-trash-o"></i></a>


                        
           </div>  
          </div><!-- /.view-mail -->
         
  
      </div>
     


        
        
        

               `;
      });

      document.getElementById("getMails").innerHTML = output;
      console.log("group mails messages retrieved");
    })
    .catch((err) => {
      console.log(err);
    });
};

getGroupMessages();
