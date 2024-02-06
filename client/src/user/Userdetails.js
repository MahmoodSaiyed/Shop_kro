import React from 'react'
// import userlogo from '../logo/MicrosoftTeams-image.png'
import '../css/userdetails.css'
import { useEffect,useState } from 'react';

export default function Userdetails() {
    const[details,setDetails]=useState({})
    const link='http://localhost:9000'
    const token =localStorage.getItem('token')

   

    
    const edit =()=>{
      window.location.href='/edituser'
    }
    const handlelogout=()=>{
      localStorage.removeItem('token')
      window.location.href='/signin'
    }
    useEffect(() => {
        const headers = {
          Authorization: token,
          method: "GET",
          withCredentials: true,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        };
        const showdetails = async () => {
          try {
            await fetch(
              `${link}/user/get`,
              { headers }
            ).then(async (response) => {
              const data = await response.json();
              setDetails(data);
            
            });
          } catch (error) {
            console.error("Error fetching secret data:", error);
          }
        };
        showdetails();
      },[token] );
      
  return (


<div className="user-detail-container">
  
<h2>My Info</h2>
<hr />
<div className="user-detail">
  <div className='childuser'>  <img className='userimage' src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="/" /> </div>

<div className='parentuser'>
<div className="detail-row">
<span className="detail-label">Name:</span>
<span className="detail-value">{details.user_name}</span>
</div>
<div className="detail-row">

<span className="detail-label">Email:</span>
<span className="detail-value">{details.email}</span>
</div>
<div className="detail-row">
<span className="detail-label">Phone:</span>
<span className="detail-value">{details.mobile_number}</span>
</div>
<div className="detail-row">
<span className="detail-label">Password:</span>
<span className="detail-value">{details.password}</span>
</div>
<button className='btn-success mx-2' onClick={edit}>Edit Details</button>
<button className='btn-dark'onClick={handlelogout}>Logout</button>

</div>
</div>
</div>

  )
}
