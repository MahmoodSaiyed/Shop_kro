import React from 'react'
import { useState } from 'react'

export default function Updateuser() {
    const[updateuser,setupdateuser]=useState([])
    const[user_name,setusername]=useState([])
    const[email,setemail]=useState([])
    const[password,setpassword]=useState([])
    const[mobile_number,setnumber]=useState([])
   

    const name =localStorage.getItem('name')
    const e =localStorage.getItem('email')
    const pass =localStorage.getItem('password')
    const number =localStorage.getItem('Mobileno')
    console.log(name,pass)



    const link='http://localhost:9000'
    const token =localStorage.getItem('token')
  

    const edituser= async()=>{
        const datasubmit={
            user_name,
            email,
            mobile_number,
            password,
          }
        try {
            await fetch(
              `${link}/user/put`,{method:'PUT',
              headers:{
                Authorization:token,
                "ngrok-skip-browser-warning": true,
                "content-type":"application/json"
              },      
              body:JSON.stringify({
                ...datasubmit
              })  
              
              
            }
            ).then(async (response) => {
              const data = await response.json();
              setupdateuser(data);
              console.log(updateuser)
              window.location.href='/userdetails'
            });
          } catch (error) {
            console.error("Error fetching secret data:", error);
          }
    }
  return (
    <div className='container'>
      <section class="my-3" style={{backgroundColor: "#eee;"}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style= {{borderRadius:"25px;"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Details</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" >Your Name</label>
                      <input type="text" placeholder={name} class="form-control" onChange={(e) => setusername(e.target.value)}/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example3c">Your Email</label>
                      <input type="email" id="form3Example3c" placeholder={e} class="form-control" onChange={(e) => setemail(e.target.value)} />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4c">Password</label>
                      <input type="text" id="form3Example4c" placeholder={pass} class="form-control" onChange={(e) => setpassword(e.target.value)} />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4cd">Mobile No.</label>
                      <input type="password" id="form3Example4cd" placeholder={number} class="form-control" onChange={(e) => setnumber(e.target.value)}/>
                    </div>
                  </div>

                 

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={edituser}>Update</button>
                  </div>

                </form>

              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
