import React from 'react'

export default function Sports() {
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
          <img src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzJTIwZXF1aXBtZW50fGVufDB8fDB8fHww" class="card-img-top" alt=""  />
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
