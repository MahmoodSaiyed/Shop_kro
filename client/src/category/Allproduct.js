import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import '../css/allproduct.css'

export default function Allproduct(props) {
  const [secretData, setSecretData] = useState([]);
  const link ='http://localhost:9000'
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const token = localStorage.getItem('token');
    console.log("Token: ", token);
  useEffect(() => {
    const fetchdata = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
        method: "GET",
        withCredentials: true,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      };
      try {
        await fetch(
          `${link}/product/get/${props.category}`,
          { headers }
        ).then(async (response) => {
          const data = await response.json();
          //  console.log(data);
          setSecretData(data);
        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    fetchdata();

    document.title = `${capitalizeFirstLetter(props.heading)}`;
  }, [props.heading,props.category,token]);
  



  return (
    <div className="container my-3">
      <div className="row">
        {secretData.map((element) => {
          return (
            <div className="col-md-4 ">
            <Home
                title={element.product_title}
                description={element.product_description}
                imgurl={element.product_image}
                price={element.product_price}
                id={element.product_id}
             
              />
              
            </div>
          );
        })}
      </div>
    </div>
  );

      }