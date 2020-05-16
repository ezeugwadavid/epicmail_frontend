
console.log('hey');

const signup = () => {
   ;
    let firstName = document.getElementById('firstname').value.trim();
    let lastName = document.getElementById('lastname').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let repeatPassword = document.getElementById('repeatPassword').value.trim();



          
      // First name validation
      if (firstName === undefined) {
        Handler.alertMessage('First name field cannot be empty', 0, 'red');
        return;
      }
      if (firstName === '') {
        Handler.alertMessage('First name field cannot be empty', 0, 'red');
        return;
       
      }

      if (firstName === ' ') {
        Handler.alertMessage('First name cannot include space', 0, 'red');
        return;
       
      }

      


      if (typeof firstName !== 'string') {
        Handler.alertMessage('First name must be a string', 0, 'red');
        return;                   
          
      }
      firstName = firstName.trim().replace(/\s\s+/g, ' ');
      if (firstName.length < 3 || firstName.length > 50) {
        Handler.alertMessage('First name should be 4 to 50 aplhabets long', 0, 'red');
        return;                                             
          
      }
      const validFirstNameCharacters = /^[a-zA-Z]+$/;
      if (!validFirstNameCharacters.test(firstName)) {
        Handler.alertMessage('First name accepts only alphabets', 0, 'red');
        return;                  
          
      }

      

  
      // Last name validation
      if (lastName === undefined) {
        Handler.alertMessage('Last name field is required', 2, 'red');
        return;                      
          
      }
      if (lastName === '') {
        Handler.alertMessage('Last name field cannot be empty', 2, 'red');
        return;            
          
      }

      if (lastName === ' ') {
        Handler.alertMessage('lastName cannot include space', 2, 'red');
        return;              
          
      }

    

      if (typeof lastName !== 'string') {
        Handler.alertMessage('Last name must be a string', 2, 'red');
        return;            
          
      }
      lastName = lastName.trim().replace(/\s\s+/g, ' ');
      if (lastName.length < 3 || lastName.length > 50) {
        Handler.alertMessage('Last name should be 4 to 50 aplhabets long', 2, 'red');
        return;                          
          
      }
     

      const validlastNameCharacters = /^[a-zA-Z]+$/;
      if (!validlastNameCharacters.test(lastName)) {
        Handler.alertMessage('Last name accepts only alphabets', 2, 'red');
        return;             
        
      }
  
     // Email Validation
      if (email === undefined) {
        Handler.alertMessage('Error: email field is required', 3, 'red');
        return;                         
          
      }
      if (email === '') {
        Handler.alertMessage('Error: email cannot be empty.', 3, 'red');
        return;                  
          
      }
      if (email.includes(' ')) {
        Handler.alertMessage('Error: email cannot include space.', 3, 'red');
        return;               
          
      }
      if (typeof email !== 'string') {
        Handler.alertMessage( 'Error: email should be a string', 3, 'red');
        return;               
          
      }
    
      // email check: stackoverflow
      const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if (!emailCheck.test(email)) {
        Handler.alertMessage( 'Error: email format is invalid', 3, 'red');
        return;             
        
      }
      email = email.toLowerCase().trim();
      if (email.length < 5 || email.length > 30) {
        Handler.alertMessage( 'Error: email should be 10 to 30 characters long', 3, 'red');
        return;                 
        
      }
  
      // Password Validation
      if (password === undefined) {
        Handler.alertMessage( 'Error: password field cannot be empty', 4, 'red');
        return;                 
          
      }
      if (password === '') {
        Handler.alertMessage( 'Error: password field cannot be empty', 4, 'red');
        return;               
          
      }

      if (password.includes(' ')) {
        Handler.alertMessage( 'Error: password cannot include space.', 4, 'red');
        return;            
          
      }

     
      if (password === ' ') {
        Handler.alertMessage( 'Error: password cannot contain spaces', 4, 'red');
        return;         
          
      }
      if (typeof password !== 'string') {
        Handler.alertMessage( 'Error: password should be a string', 4, 'red');
        return;             
          
      }

      if (password !== repeatPassword) {
        Handler.alertMessage( 'Error: password values must match', 5, 'red');
        return;         
          
      }

      password = password.trim();
      if (password.length < 5 || password.length > 30) {
        Handler.alertMessage( 'Error: password should be 5 to 30 characters long', 4, 'red');
        return;           
        
     }
  
    fetch('https://epic-mail-apis.herokuapp.com/api/v1/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName, lastName, email, password
      })
    })
      .then(res => res.json())
      .then((data) => {
        
        let message = '';
        
       
  
        message = 'User with that EMAIL already exist';
        if (data.message === message) {
          Handler.alertMessage(data.message, 5, 'red');
          return;
        }
        message = 'Error: user not created';
        if (data.message === message) {
          Handler.alertMessage(data.message, 5, 'red');
          return;
        }
           message = 'Success: User created successfully!';
        if (data.message === 'Success: account created successfully!') {
          alert(data.message);
          
          window.location.assign('/src/index.html');
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  document.getElementById('createUser').addEventListener('click', signup);