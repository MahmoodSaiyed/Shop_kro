import React from "react";
import { useState, useEffect } from "react";
import "../css/address.css";

export default function Address() {
  const [address, setaddress] = useState([]);
  console.log("hello",address)
  const link ='https://18eb-2401-4900-1f3f-d9b3-8870-ed74-da49-3ffd.ngrok-free.app'
  

  // Show address data

  useEffect(() => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk3ODg0LCJleHAiOjE3MDU5NzM4ODR9.s47Zr-2XyYVzyRpssrkw9w0w13G3DaQj1Es96ByNXI4";
    const headers = {
      Authorization: token,
      method: "GET",
      withCredentials: true,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    };
    const address = async () => {
      try {
        await fetch(
          `${link}/address/get`,
          { headers }
        ).then(async (response) => {
          const data = await response.json();
          setaddress(data);
        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    address();
  },[]);

  // delete address
  async function handledelete(id) {
    console.log(id);
    try {
      await fetch(
        `https://e732-2401-4900-1f3f-d9b3-8870-ed74-da49-3ffd.ngrok-free.app/address/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk3ODg0LCJleHAiOjE3MDU5NzM4ODR9.s47Zr-2XyYVzyRpssrkw9w0w13G3DaQj1Es96ByNXI4",
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            address_id: id,
          }),
        }
      ).then(async (response) => {
        await response.json();
        window.location.reload();
        
      });
    } catch (error) {
      console.error("Error fetching secret data:", error);
    }
  }

  // postaddress data to review page
  const review= async(id)=>{
      

    await fetch('https://e732-2401-4900-1f3f-d9b3-8870-ed74-da49-3ffd.ngrok-free.app/review/post', {method:'POST',
    headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk3ODg0LCJleHAiOjE3MDU5NzM4ODR9.s47Zr-2XyYVzyRpssrkw9w0w13G3DaQj1Es96ByNXI4",
      "ngrok-skip-browser-warning": true,
      "content-type":"application/json"
    },      
    body:JSON.stringify({
     address_id:id
    })  
    
    
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
    })

}
    if(address.error)
    {
      return (
      <div>
        <h1>You Dont have any Existing Address</h1>
      <a href="/checkout"><button className=" btn btn-primary">Add address</button></a>
      </div>
      )
    }
return (
    <div className=" my-4  container " id="addcontainer">
      <h1>Select Address</h1>
      <a href="/checkout"><button className=" btn btn-primary">Add address</button></a>
      <hr />
    
      {address.map((element) => {
        return (
          <div className="container">
            <h3 className="name">{element.full_name}</h3>
            <p className="area">{element.street_number}</p>
            <p className="city">
              {element.city},{element.state}-{element.pincode}
            </p>
            <p className="num">
              Mobile NO. <strong>{element.mobile_number}</strong>
            </p>
            <a href={`/review/${element.address_id}`}>
              <button className=' btn btn-success'onClick={()=>{review(element.address_id)}}>Select address</button>
              </a>

            <a href={`/editcart/${element.address_id}`}><button className=' btn-dark' id="btn-dark" >Edit</button></a>

            <button
              className="btn-danger"
              id="btn-danger" onClick={()=>{handledelete(element.address_id)}}>
              Delete
            </button>

            <hr />
          </div>


);
      })}
    </div>
  )}

