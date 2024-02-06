import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/singleproduct.css";
import loading from "../logo/Iphone-spinner-2.gif";

function SingleProduct(props) {
  const [product, setProduct] = useState([]);

  const [quantity, setquantity] = useState(1);
  const [similar, setSimilar] = useState(null);
  // const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

  const link =
    "http://localhost:9000";
  console.log(similar);

  let { id } = useParams();
  id = Number(id);

  const token = localStorage.getItem('token');
console.log(token)

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
        await fetch(`${link}/product/get/product/${id}`, { headers }).then(
          async (response) => {
            const data = await response.json();
            setProduct(data);
          }
        );
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };
    fetchProduct();
  }, [id,token]);

  // useEffect(() => {
  //   const headers = {
  //     Authorization: token,
  //     method: "GET",
  //     withCredentials: true,
  //     "Content-Type": "application/json",
  //     "ngrok-skip-browser-warning": true,
  //   };
  //   const showproduct = async () => {
  //     try {
  //       const response = await fetch(
  //         `${link}/product_recomondation/get/${id}`,
  //         {
  //           headers,
  //         }
  //       );
  //       const data = await response.json();
  //       setSimilar(data);
  //       setIsLoadingSimilar(false);
  //     } catch (error) {
  //       console.error("Error fetching secret data:", error);
  //     }
  //   };
  //   showproduct();
  // }, [id,token]);

  const addtocart = async () => {
    try {
      await fetch(`${link}/cart/post`, {
        method: "POST",
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": true,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
          quantity: Number(quantity),
        }),
      }).then(async (response) => {
        await response.json();
        window.location.reload()
        alert("Successfully added to cart");
      });
      document.getElementById("msgcart").innerHTML = "Successfully Added";
    } catch (error) {
      console.error("Error fetching secret data:", error);
    }
  };

 

  // if (!product) {
  //   return <div> Loading...</div>;
  // }

  return (
    <>
      <div className="container my-4" id="singlecontainer">
        {/* <div className=" my-3 card" id="singlecard"> */}
        <div className="child">
          <img className="helloimg" src={product.product_image} alt="/" />
          <p className="qprice">
            Quantity :{" "}
            <input
              placeholder="1"
              type="number"
              className="price"
              min={1}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 1) {
                  setquantity(value);
                }
              }}
              style={{ width: "60px", height: "25px" }}
            />{" "}
            <button onClick={addtocart} className="btn btn-primary">
              Add to Cart
            </button>{" "}
          </p>
        </div>
        <div className="child">
          {" "}
          <h2 className="h2tag">{product.product_name}</h2>
          {product.product_description}
          <hr />
          <p className="discount">
            {" "}
            {product.discount}
            {product.discount_type} OFF <br />
            M.R.P :{" "}
            <span className="text-decoration-line-through">
              ₹{product.product_price}
            </span>
          </p>
          <hr />
          <p className="mrp">
            Total Price : {product.total_amount_after_discount * quantity}
          </p>
        </div>
      </div>
      {/* <hr /> */}
      {/* <h2>Similar Products</h2> */}
      {/* <div className="container my-3">
        <div className="row">
          {isLoadingSimilar ? (
            <img
              src={loading}
              alt="/"
              style={{ height: "80px", width: "80px", marginLeft: "500px" }}
            />
          ) : (
            similar &&
            similar.map((e) => {
              return (
                <div class="col-md-3 py-3">
                  <div class="card h-100" style={{ width: "18rem;" }}>
                    <img
                      class="card-img-top h-100"
                      src={e.product_image}
                      alt="/"
                    />
                    <div class="card- h-80 py-3">
                      <h5 class="card-title">{e.product_name}</h5>
                      <p class="card-text ">{e.product_description}</p>
                      <p class="card-text">
                        <span className="text-decoration-line-through">
                          {"Price : "}
                          {e.product_price}{" "}
                        </span>
                      </p>
                      <h5 className="card-text">
                        <button className=" btn btn-danger" id="danger">
                          OFF : {e.discount} {e.discount_type}
                        </button>
                        {"total_amount  : "}
                        {e.total_amount_after_discount}
                      </h5>
                      <button className="btn btn-primary" onClick={hehe}>
                        <a href={`/singleproductpage/${e.product_id}`}>
                          View Product
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div> */}
    </>
  );
}

export default SingleProduct;
