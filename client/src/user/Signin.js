import React, { useState } from 'react';
import '../css/signin.css'
export default function Signin() {
  const [email, setemail] = useState({});
  const [password, setpassword] = useState({});
  const[gettoken,settoken]=useState(null)
console.log(gettoken)


  const handleSubmit = async (e) => {
    e.preventDefault()
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	if (!emailRegex.test(email)) {
		document.getElementById("p").innerHTML="Enter valid email"
	  return 
	}
	
    const datasubmit={
      email,
      password,
    }
    await fetch('http://localhost:9000/authentication/post/signin', {method:'POST',
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
      settoken(data)
      localStorage.setItem('token',data.token);
      window.location.href='/'
    })
	

};



  return (
	<>
    <form onSubmit={handleSubmit} className='a' >
		<fieldset className='field'> <br />
     <label className='label'>Email <br /> <input type="text" placeholder='Email' onChange={(e) => setemail(e.target.value)} /></label> 
	 <p id='p' style={{color:"red"}}></p>
     <label className='label'>Password <br /> <input type="text" placeholder='Password' onChange={(e) => setpassword(e.target.value)} /> </label><br />


      <button type="submit" value="Submit" onClick={handleSubmit} className='btn btn-dark'>Login</button>
	  <p className='ptag'>Don't have account? <a href="/signup">Signup</a></p>
	  </fieldset>
    </form>
    </>
  );
}

