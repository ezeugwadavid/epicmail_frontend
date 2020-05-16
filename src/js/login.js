console.log('connected');


const login = (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

       // Email Validation
       if (email === undefined) {
        Handler.alertMessage('Error: email field is required', 0, 'red');
        return;                         
          
      }
      if (email === '') {
        Handler.alertMessage('Error: email cannot be empty.', 0, 'red');
        return;                  
          
      }
      if (email.includes(' ')) {
        Handler.alertMessage('Error: email cannot include space.', 0, 'red');
        return;               
          
      }
      if (typeof email !== 'string') {
        Handler.alertMessage( 'Error: email should be a string', 0, 'red');
        return;               
          
      }
    
      // email check: stackoverflow
      const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if (!emailCheck.test(email)) {
        Handler.alertMessage( 'Error: email format is invalid', 0, 'red');
        return;             
        
      }
      email = email.toLowerCase().trim();
      if (email.length < 5 || email.length > 30) {
        Handler.alertMessage( 'Error: email should be 10 to 30 characters long', 0, 'red');
        return;                 
        
      }
  
      // Password Validation
      if (password === undefined) {
        Handler.alertMessage( 'Error: password field cannot be empty', 0, 'red');
        return;                 
          
      }
      if (password === '') {
        Handler.alertMessage( 'Error: password field cannot be empty', 0, 'red');
        return;               
          
      }

      if (password.includes(' ')) {
        Handler.alertMessage( 'Error: password cannot include space.', 0, 'red');
        return;            
          
      }

     
      if (password === ' ') {
        Handler.alertMessage( 'Error: password cannot contain spaces', 0, 'red');
        return;         
          
      }
      if (typeof password !== 'string') {
        Handler.alertMessage( 'Error: password should be a string', 0, 'red');
        return;             
          
      }

      

      password = password.trim();
      if (password.length < 5 || password.length > 30) {
        Handler.alertMessage( 'Error: password should be 5 to 30 characters long', 0, 'red');
        return;           
        
     }


  
  const data = {
    'email': email,
    'password': password
  }

  fetch('https://epic-mail-apis.herokuapp.com/api/v1/users/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then((data) => {
      // alert(data.message)
      console.log(data.message)

      let message = '';
      console.log('connected')
      // return some error messages
      message = 'The credientials you provided is incorrect';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Please enter a valid email address';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Some values are missing';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      window.localStorage.setItem('token', data.token);
      if (data.message === 'login successful!') {
        window.location.assign('/src/inbox.html');
        Handler.alertMessage(data.message, 2, 'green');
        // alert(`${data.message}`);
        return;
      }
     
     

    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('loginUser').addEventListener('submit', login);

