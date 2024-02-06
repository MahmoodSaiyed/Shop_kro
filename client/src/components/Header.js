import React, { useEffect, useState } from "react";
import img from "../logo/Screenshot (6)_LI.jpg";
import userlogo from "../logo/MicrosoftTeams-image.png";
import "../css/header.css";
export default function Header() {
  const [cartnumber, setcartnumber] = useState([]);
  const [show, setshow] = useState();


  const link =
    "http://localhost:9000";
  const token = localStorage.getItem("token");
  const cart =localStorage.getItem('cart')
  console.log(cartnumber)

  useEffect(() => {
    const headers = {
      Authorization: token,
      method: "GET",
      withCredentials: true,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    };
    if(token!==null){

    const fetchProduct = async () => {
      try {
        await fetch(`${link}/cart/get`, { headers }).then(async (response) => {
          const data = await response.json();
          setcartnumber(data);

        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    fetchProduct();}
  }, [token]);
 useEffect(()=>{
  if(token===null){
    setshow("Login")
  }
  else{
    setshow("")
  }
 },[token])


  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <div></div>
          <a className="navbar-brand" href="/">
            <img src={img} height={"50px"} width={"80px"} alt="" />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/contactus">
                  Contact Us
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/sports">
                      Sports
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/electronics">
                      Electronics
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/clothes">
                      Clothes
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item" id="login">
                <a className="nav-link" href="/signin">
                  {show}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/userdetails">
                  <img
                    src={userlogo}
                    alt="/
                      "
                  />
                </a>
              </li>

              <li class="cart-container nav-item">
                <a href="/cart">
                  <img
                    src="https://freepngimg.com/thumb/cart/8-2-cart-picture.png"
                    height={"30px"}
                    alt="/"
                  />
                </a>
                <div class="cart-number">{cartnumber.total_product}</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
