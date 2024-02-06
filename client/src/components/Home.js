import React from 'react'

export default function Home(props) {
    let {imgurl,title,description,price,id} = props
    
    return (
      <div>
        

        <div className="card my-2 h-80" >
  <img src={imgurl} height={"300px"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'>Price:-{price}</p>
    <button className='btn btn-primary' ><a href={`/singleproductpage/${id}`}>View Product</a></button>

    

  </div>
</div>
      </div>
    )
}