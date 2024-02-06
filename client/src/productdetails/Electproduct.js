import React from 'react'

export default function Electproduct() {
  return (
    <div>
      <div>
  <div className="container">
    <h1>
      <b>
        <i>Electronics</i>
      </b>
    </h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img-top" alt=""  />
          <div class="card-body">
            <h5 class="card-title">Electronics</h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. <br />
              Price :- Rs. 70000.00
            </p>
            <a href="/electronicsproducts">
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
  )
}
