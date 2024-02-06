import React from 'react'
import payment from '../logo/download.png'

export default function Paymentsuccess() {
  return (
    <div className='my-4 container'>
      <img src={payment} alt="" />
      <h1 style={{color:'green'}}>Your order has confirmed</h1>
      <a href="/" className='btn btn-primary' style={{width:"150px"}}> Shop Now</a>
    </div>
  )
}
