 // logout

 

 document.getElementById('logout').addEventListener('click',(e) => {

    e.preventDefault();


   

    // make api request
    fetch('http://localhost:8000/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            'refresh_token': localStorage.getItem('refreshToken')
        })
    }).then(response => response.json()).then((data) => {
        if(data.message){

            console.log('data',data.message)
            // clear access token and refresh token
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            // redirect to login page 
            window.location.href = '/Templates/Login.html'
        }
        else    {
            console.log('error',error);
        }

    }).catch(error=>console.log(error))
});

// function for refresh token

let refreshAccessToken = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if(refreshToken){

        fetch('http://localhost:8000/api/token/refresh/',
        {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
            
        },
            body: JSON.stringify({
                'refresh': refreshToken
            })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.access){
                // store new access token
                localStorage.setItem('accessToken',data.access)

                localStorage.setItem('refreshToken',data.refresh)

                // verify new  access token
                verifyAccessToken()

            }else{
                window.location.href = '/Templates/Login.html'
            }
            console.log('data',data)
            
        }).catch(error => {
            console.log('error',error)
        })

    }else{
        // redirect to login page
        window.location.href = '/Templates/Login.html'
    }

}

// function to access token verification

let verifyAccessToken = () => {

    fetch('http://localhost:8000/api/token/verify/',
        {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            'token': localStorage.getItem('accessToken')
        })
    })
        .then(response => response.json())
        .then((data) => {
          //  console.log('data',data)
            if(data.code == 'token_not_valid'){
               // console.log(data.code)
               // window.location.href = '/Templates/Login.html'

               // access token expired try to refresh it
               refreshAccessToken();
            }
        })


}

// Authorization
document.addEventListener('DOMContentLoaded', () => {

    // test fetch
    // var access_token = localStorage.getItem('accessToken')
//  fetch('http://localhost:8000/',{
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Authorization': `Bearer ${access_token}`
//     },
//     }).then(response => response.json()).then((daa)=>console.log(daa))

    if(localStorage.getItem('accessToken')){
     //   console.log('iamin')
    //    const headers = { 'Authorization': 'Bearer'+localStorage.getItem('accessToken') }

    // access token verification

    verifyAccessToken();

        
    }
    else
    {
        window.location.href = '/Templates/Login.html'
    }
})