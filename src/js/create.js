const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('/src/index.html');
  alert('Please login');
}

const send = (e) => {
    e.preventDefault();
    const toemail = document.getElementById('toemail').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgstatus = 'sent';

  const targetUrl = 'https://epic-mail-apis.herokuapp.com/api/v1/messages';

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({
      subject, message, toemail, msgstatus
    })
  })
    .then(res => res.json())
    .then((data) => {
      const mesg = data.error
    
      let message = '';
    
     
      // return some error messages
      message = 'Error: email field cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
     const  messages = 'Error: email format is invalid';
     
      if (mesg === messages) {
         Handler.alertMessage(mesg, 0, 'red');
      //  alert(mesg);
        return;
      }


      message = 'Error: email should be 2 to 100 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email does not exist.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: Oops! looks like you tried to email yourself.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: message sending failed.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      if (data.message === 'Success: message sent successfully!') {
        Handler.alertMessage(data.message, 0, 'green');
        
        window.location.assign('/src/sent.html');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const draft = (e) => {
  e.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const toemail = document.getElementById('toemail').value.trim();
  const msgstatus = 'draft';

  const targetUrl = 'https://epic-mail-apis.herokuapp.com/api/v1/messages';

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({
      subject, message, toemail, msgstatus
    })
  })
    .then(res => res.json())
    .then((data) => {

      const mesgs = data.error
      let message = '';
      console.log(data.message);
      // return some error messages
      message = 'Error: email field cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

     const  msg = 'Error: email format is invalid';
      if (mesgs === msg) {
         Handler.alertMessage(msg, 1, 'red');
        
        return;
      }

      message = 'Error: email should be 2 to 100 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
       
        return;
      }

      message = 'Error: email does not exist.';
      if (data.message === message) {
        Handler.alertMessage(message, 3, 'red');
        return;
      }

      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 4, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: message sending failed.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }
      message = 'Error: email cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }
      message = 'Error: Oops! looks like you tried to email yourself.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }
      

      if (data.message === 'Success: message sent successfully!') {
        Handler.alertMessage('draft saved', 1, 'green');
        window.location.assign('/src/inbox.html');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('sendMail').addEventListener('click', send);
document.getElementById('saveDraft').addEventListener('click', draft);
