import React, { useState } from 'react'
import '../css/checkout.css'

export default function Checkout() {
    const[name,setname]=useState({})
    const[mobile,setmobile]=useState({})
    const[pincode,setpincode]=useState({})
    const[area,setarea]=useState({})
    const[city,setcity]=useState({})
    const[state,setstate]=useState({})
    const[country,setcountry]=useState({})


    
    
    const addaddress= async(e)=>{
        e.preventDefault();
      

        await fetch('https://18eb-2401-4900-1f3f-d9b3-8870-ed74-da49-3ffd.ngrok-free.app/address/post', {method:'POST',
        headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk3ODg0LCJleHAiOjE3MDU5NzM4ODR9.s47Zr-2XyYVzyRpssrkw9w0w13G3DaQj1Es96ByNXI4",
          "ngrok-skip-browser-warning": true,
          "content-type":"application/json"
        },      
        body:JSON.stringify({
          "country":country,
          "full_name":name,
          "street_number":area,
          "city":city,
          "state":state,
          "pincode":pincode,
          "mobile_number":mobile
        })  
        
        
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          document.getElementById("demo").innerHTML="Successfully Added"
        })
    
    }
    
    
    
  return (
    <div className='my-4 container' id='container'>
<form className='my-3' onSubmit={addaddress}>
    <fieldset>
        <legend>Shipping Address</legend>
        <label htmlFor=""> Name <input type="text" placeholder='name' onChange={(e) => setname( e.target.value)}/></label> <br />
        <label htmlFor=""> Mobile No. <input type="text" placeholder='Mobile no.'onChange={(e) => setmobile( e.target.value)}/></label> <br />
        <label htmlFor=""> Pincode <input type="text" placeholder='pincode'onChange={(e) => setpincode( e.target.value)}/></label> <br />
        <label htmlFor=""> Area <input type="text" placeholder='Area/Building/block no.'onChange={(e) => setarea( e.target.value)}/></label> <br />
        <label htmlFor=""> City <input type="text" placeholder='city'onChange={(e) => setcity( e.target.value)}/></label> <br />
        <label htmlFor=""> State <input type="text" placeholder='state'onChange={(e) => setstate( e.target.value)}/></label> <br />
        <label htmlFor=""> Country <input type="text" placeholder='country'onChange={(e) => setcountry( e.target.value)}/></label> <br />
        <button className='btn btn-primary'>
           Add Address 
        </button>
        <p id='demo' style={{color:"green"}}></p>






    </fieldset>
</form>
    </div>
  )
}
