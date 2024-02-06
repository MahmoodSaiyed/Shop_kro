import React, { useState } from 'react';
import '../css/signup.css'

function Signup() {
  const [user_name, setname] = useState({});
  const [email, setemail] = useState({});
  const [password, setpassword] = useState({});
  const [mobile_number, setnumber] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();
    const datasubmit={
      user_name,
      email,
      password,
      mobile_number,
    }
    
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
document.getElementById("email").innerHTML="Enter valid email"  
    return
    }

    // Validate password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(password)) {
      document.getElementById("pass").innerHTML="Enter password with one Uppercase,lowercase,number,and special character"
      return
    }

    // Validate username (minimum 3 characters)
    if (user_name.length < 3) {
      document.getElementById("uname").innerHTML=" Your username must be at least 3 characters long."
      return
    }

    // Validate mobile number (10 digits)
    const mobileNumberRegex = /^\d{10}$/
    if (!mobileNumberRegex.test(mobile_number)) {
document.getElementById("num").innerHTML="Mobile No. should be 10 digits only"
      return
    }
    await fetch('http://localhost:9000/user/post', {method:'POST',
    headers:{
      "ngrok-skip-browser-warning": true,
      "content-type":"application/json"
    },      
    body:JSON.stringify({
      ...datasubmit
    })  
    
    
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
      alert("User Register SUccessfully You will be Redirected to login page")
      window.location.href='/signin'
    })


};



  return (
    <form onSubmit={handleSubmit} className='a' >
		<fieldset className='upfield'> <br />
     <label className='label'>Name  <br /> <input type="text"  onChange={(e) => setname( e.target.value)} /></label> <p id='uname' style={{color:"red"}}></p>
     <label className='label'>Email <br /> <input type="text"  onChange={(e) => setemail(e.target.value)} /></label> <p id='email' style={{color:"red"}}></p> 
     <label className='label'>Password <br /> <input type="text"  onChange={(e) => setpassword(e.target.value)} /> </label> <p id='pass' style={{color:"red"}}></p>
     <label className='label'>Mobile no. <br /> <input type="text"  onChange={(e) => setnumber(e.target.value)} /> <p id='num' style={{color:"red"}}></p></label>


      <button type="submit" value="Submit" onClick={handleSubmit} className='btn btn-dark'>Register</button>
	  </fieldset>
    </form>
    
  );
}

export default Signup;
