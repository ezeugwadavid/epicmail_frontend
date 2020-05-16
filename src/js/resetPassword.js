const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJteWlkIiwidXNlckVtYWlsIjoiZGF2aWRlemV1Z3dhQGdtYWlsLmNvbSIsImlhdCI6MTU4OTM4Mzk3NiwiZXhwIjoxNTg5OTg4Nzc2fQ.pS556dCFacCgAcEvfWrFFh-YfAhyt8kb8R4gH23ehWU'
if (!token) {
    window.location.assign('/src/index.html');
    alert('Please login');
  }

  const urlstring = window.location.href
  const url = new URL(urlstring);
  const groupId = url.searchParams.get("token");
 
 

const updatepassword = () => {
    let password = document.getElementById('password').value.trim();
    let repeatPassword = document.getElementById('repeatPassword').value.trim();
    


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

      if (password !== repeatPassword) {
        Handler.alertMessage( 'Error: password values must match', 0, 'red');
        return;         
          
      }

      password = password.trim();
      if (password.length < 5 || password.length > 30) {
        Handler.alertMessage( 'Error: password should be 5 to 30 characters long', 0, 'red');
        return;           
        
     }
   
  
    const targetUrl = 'https://epic-mail-apis.herokuapp.com/api/v1/users/updatepassword';

  
    fetch(targetUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
         authorization: token
      },
      body: JSON.stringify({
        password,
      })
      
     
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
       
      
        let message = '';
      
       
        // return some error messages
      
  
  
        message = 'Error: user not found';
        if (data.message === message) {
          Handler.alertMessage(data.message, 1, 'red');
          return;
        }
  
        message = 'Error: password reset failed. Try again';
        if (data.message === message) {
          Handler.alertMessage(data.message, 2, 'red');
          return;
        }
  
       
  
        if (data.message === 'Success: password reset successfull!') {
          alert(data.message);
          
          window.location.assign('/src/index.html');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  
  document.getElementById('updatePassword').addEventListener('click', updatepassword);