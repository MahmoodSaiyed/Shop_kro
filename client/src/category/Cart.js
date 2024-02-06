import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../css/cart.css";
import loading from '../logo/Iphone-spinner-2.gif'


export default function Cart() {
  const [cartproduct, setcartProduct] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
localStorage.setItem("cart",cartproduct.total_product)
  const link='http://localhost:9000'
  const token = localStorage.getItem('token');
console.log(token)
  /*Add to cart  */
  useEffect(() => {
    const headers = {
      Authorization: token,
      method: "GET",
      withCredentials: true,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    };
    const fetchProduct = async () => {
      try {
        await fetch(
          `${link}/cart/get`,
          { headers }
        ).then(async (response) => {
          const data = await response.json();
          setcartProduct(data);
        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    fetchProduct();
  }, [token]);
  /*Add to cart  function completed */

  /*Delete item from cart   */

  async function handledelete(cart_id, product_id) {
    console.log(cart_id, product_id);
    setIsLoadingSimilar(true)
    try {
      await fetch(
        `${link}/cart/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              token,
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            cart_id: cart_id,
            product_id: product_id,
          }),
        }
      ).then(async (response) => {
        await response.json();
         window.location.reload(true);
        setIsLoadingSimilar(false);
      });
    } catch (error) {
      console.error("Error fetching secret data:", error);
    }   
    
  }
  /*Delete item from cart ends hear */

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OgSGjSCvPW0BRZvDI7KRUEB7cgDjApbwVOAFnPutpZ4v9JkEpttd3HkZhsOEz8s0OzPzJYs9FcRJ4KC7ABT9EyC00LC4xNYxI"
    );

    // const body = {
    //   total_amount: cartproduct.total_price_of_all_product,
    // };
    const headers = {
      mode: "no-cors",
      Authorization:
        token,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    };
    const response = await fetch(
      `${link}/stripe/post`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(),
      }
    );

    const session = await response.json();
    console.log(session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

   if (!cartproduct.product_list) {
    return (
      <div>
        {" "}
        <h1>Your cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="container my-3">
      <div className="row">
        
         {isLoadingSimilar ? (
            <img src={loading} alt="/" style={{height:"80px", width:"80px", marginLeft:"500px"}} />
          ) : cartproduct.product_list.map((element) => {
          return (
            <div className="col-md-4" key={element.cart_id}>
              <div className="card my-2">
                <img
                  src={element.product_image}
                  height={"300px"}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{element.product_name}...</h5>
                  <p className="card-text">{element.product_description}...</p>
                  <p className="card-text">Quantity : {element.quantity}</p>
                  <button
                    className="btn-danger"
                    style={{ backgroundColor: "red" }}
                  >
                    {element.discount}
                    {element.discount_type} OFF
                  </button>
                  <p className="card-text">
                    Price:-{element.total_amount_of_product_with_quantity}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handledelete(element.cart_id, element.product_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 style={{color:'white'}}>Total Amount : {cartproduct.total_price_of_all_product}</h1>
      <button className="btn btn-primary" onClick={makePayment}>
        Checkout
      </button>
    </div>
  );
}
