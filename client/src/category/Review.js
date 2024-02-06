import React from "react";
// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/review.css'

export default function Review() {
  const [review_product_information, product_setreview] = useState([]);
  const [review_address_information, address_setreview] = useState([]);
//   let { id } = useParams();
//   id = Number(id);

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
    const getreview = async () => {
      try {
        await fetch(
          `https://5ff6-2401-4900-1f3f-d9b3-45f7-f1f3-6c4a-9542.ngrok-free.app/review/get`,
          { headers }
        ).then(async (response) => {
          const data = await response.json();
          product_setreview(data.Product_information);
          address_setreview(data.Address_information);
        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    getreview();
  }, []);
  return (

    <>
    <h1>Review Details</h1>
    <hr />
    <h2>Product Information</h2>
    
      {review_product_information.map((element) => {
        return (
          
            
            <div className="container" id="reviewcontainer">
                <h3 id="reviewname">{element.product_name}</h3>
              <p>
                {element.product_description}
              </p>
              <hr />
              <p> Quantity : {element.quantity} | Total_Amount :  {element.total_amount}</p>
            </div>
           
        );
      })}
       <h2>Address information</h2>
            <div className="container" id="reviewcontainer">
              <h3 id="reviewname" className="reviewname">{review_address_information.full_name}</h3>
                <p id="p">{review_address_information.street_number},{review_address_information.city},{review_address_information.state}</p>
                <p id="p">{review_address_information.pincode},{review_address_information.country}</p>
                <p id="p">Mobile No. <strong>{review_address_information.mobile_number}</strong></p>
        
            </div>
    </>
  )
}
