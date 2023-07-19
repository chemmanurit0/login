const loginbtn = document.getElementById('login')

        const username = document.getElementById('username')
        const password = document.getElementById('password')
        username.addEventListener('input', () => {
          if(username.value.length > 0){
            document.getElementById('username').style.borderColor = ''
          }
        })
        password.addEventListener('input', () => {
          if(password.value.length > 0){
            document.getElementById('password').style.borderColor = ''
          }
        })

        loginbtn.addEventListener('click', (e) => {
          e.preventDefault()
          if(username.value.length === 0){
            // document.getElementById('eusername').textContent = 'please enter your username'
            document.getElementById('username').style.borderColor = 'red'
            

          }
          if(password.value.length === 0){
            // document.getElementById('epassword').textContent = 'please enter your password'
            document.getElementById('password').style.borderColor = 'red'

          }
          if(username.value.length > 0 && password.value.length > 0){
            console.log('heee')
            axios.post('http://127.0.0.1:8000/api/token/', {
                username: username.value,
                password: password.value,
            }).then((response) => {
              console.log(response.data.access)
              if(response.data.access){

                localStorage.setItem('accessToken', response.data.access)
                localStorage.setItem('refreshToken', response.data.refresh)
                window.location.href = '/Templates/Homepage.html'
              }
              else{
                console.log(response)
              }
            }).catch((error)=>{
            //  console.log(error.response.data.detail)
              if(error.response.data.detail){
              document.getElementById('error').textContent = error.response.data.detail
              }
            //  console.log(error)
            })
          }
        })