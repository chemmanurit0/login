// function to validate username

      let validateUsername = (username) => {
       
        if(username.length < 4 || username.length > 8){
         
          return false
        }

        if(!/^[a-zA-Z0-9]+$/.test(username)){
          return false
        }
        return true
      }

      // function to validate email

      let validateEmail = (email) => {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          return false
        }
        return true
      }

      // function to validate name

      let validateName = (name) => {
        if(!/^[a-zA-Z0-9]+$/.test(name)){
          return false
        }
        if(name.length < 2 || name.length > 20){
          return false
        }
        return true

      }

      // function to validate password

      let validatePassword = (password) => {
        console.log(password.length)

        if(password.length < 4 || password.length > 8){
          return false
        }
        if(!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
          return false
        }
        return true 
      }

      // signup button
      const btn = document.getElementById('signup');

      const name = document.getElementById('name')
      const email = document.getElementById('email')
      const username = document.getElementById('username')
      const password = document.getElementById('password')


      // validation
            name.addEventListener('input', () => {
              if(!validateName(name.value)){
                document.getElementById('ename').textContent = 'please enter a valid name'
              }
              else{
                document.getElementById('ename').textContent = ' '
              }
            })

            email.addEventListener('input', () => {
              !validateEmail(email.value)?
                document.getElementById('eemail').textContent = 'please enter a valid email'
                  :            
                 document.getElementById('eemail').textContent = ' '
              
            })

            username.addEventListener('input', () => {
              !validateUsername(username.value)?
                document.getElementById('eusername').textContent = 'please enter a valid username'
                  :            
                 document.getElementById('eusername').textContent = ' '
              
            })

            password.addEventListener('input', () => {
              console.log(password.value)
              console.log(validatePassword(password.value))
              !validatePassword(password.value)?
                document.getElementById('epassword').textContent = 'password must include at least one lowercase, one uppercase and one digit.It should be at 4 characters long'
                  :            
                 document.getElementById('epassword').textContent = ' '
              
            })
            
            


  

            btn.addEventListener("click", (e) => {
              e.preventDefault();
             // console.log(email.value);
            // console.log("print",validateUsername(username.value))


              if(!validateName(name.value)){
                // console.log("Invalid Name")
                
                document.getElementById('ename').innerHTML = "please enter a valid name"
              }
              
              if(!validateEmail(email.value)){
                // console.log("Invalid Email")
                document.getElementById('eemail').innerHTML = "please enter a valid email"

              }
              
              if(!validateUsername(username.value)){
                // console.log("Invalid username")
                document.getElementById('eusername').innerHTML = 'please enter a valid username'
              }


              if(!validatePassword(password.value)){
                // console.log("Inavalid Password")
                document.getElementById('epassword').innerHTML = "please enter a valid password"

              }

      if(validateEmail(email.value) && validateName(name.value) 
      && validatePassword(password.value) && validateUsername(username.value)){

        axios.post("http://127.0.0.1:8000/signup", {
          first_name: name.value,
          email: email.value,
          username: username.value,
          password: password.value
        })
        .then((response) => {
          console.log(response);
          response.status === 201 ? window.location.href = '/Templates/Login.html':''
          response.status === 200? document.getElementById('eusername').innerHTML = response.data.error:''
        });
        
      }

  

});