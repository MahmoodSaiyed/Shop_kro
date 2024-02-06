import React from 'react'
import image from '../logo/baner-right-image-01.jpg'

export default function cltproduct() {
  return (
    <div>
      <div>

<div>
  <div className="container">
    <h1>
      <b>
        <i>Clothes</i>
      </b>
    </h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <img src={image} class="card-img-top" alt=""  />
          <div class="card-body">
            <h5 class="card-title">Women</h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. <br />
              Price :- Rs. 1000.00
            </p>
            <a href="/clothesproducts">
              {" "}
              <button className="btn btn-primary btn-sm">
                Add to Cart
              </button>{" "}
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



</div>

    </div>
  )
}
