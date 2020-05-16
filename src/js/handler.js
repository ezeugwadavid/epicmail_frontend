class Handler {
    static alertMessage(message, fieldIndex, color) {
      const alert = document.getElementsByClassName('alerts')[fieldIndex];
      alert.innerHTML = message;
      alert.style.color = color;
      setInterval(() => {
        alert.innerHTML = '';
      }, (7400));
    }
  
    static clearAlert() {
      const alert = document.getElementsByClassName('alerts');
      alert.style.display = 'none';
    }
  
    static clearSignup() {
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }
  
     static saveId(id) {
       window.localStorage.setItem('id', id);
     }
  
    static saveGroup(id, name) {
      window.localStorage.setItem('id', id);
      window.localStorage.setItem('name', name);
    }
  
    static saveName(name) {
      window.localStorage.setItem('name', name);
    }

    //  static deleteMessage(id) {
    //   const userConfirm = confirm('Are you sure you want to delete this mail?')
    //   const targetUrl = '';
    // }
  
    static removeId() {
      window.localStorage.removeItem('id', id);
    }
  }

 