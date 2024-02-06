import React, { useState, useEffect } from 'react'
import '../css/verify.css'

export default function Verify() {
  const [otp, setOtp] = useState(null)
  const [sucess, setSucess] = useState(null)
  console.log(sucess)

  const handleSubmitotp = async (event) => {
    event.preventDefault()
    await fetch('http://localhost:9000/user/post/mobile_number_verification', {
      method: 'POST',
      headers: {
        "ngrok-skip-browser-warning": true,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        'otp': otp
      })
    })
      .then(async (response) => {
        const data = await response.json()
        console.log(data)
        setSucess(data)
      })
  }

  useEffect(() => {
    if (sucess && sucess.message === "user verification is successfully") {
      window.location.href = '/signin'
    } else {
      document.getElementById('demo').innerHTML = "Please Enter Correct Otp"
    }
  }, [sucess])

  return (
    <div className="verify-container">
      <form onSubmit={handleSubmitotp} className="verify-form">
        <label htmlFor='code' className="verify-label">Send OTP on your registered mobile no. +91XXXXXXXXXX </label>
        <fieldset className="verify-fieldset">
          <label htmlFor="">Enter OTP</label> <br />
          <input type="number" maxLength={6} onChange={(e) => setOtp(e.target.value)} className="verify-input" />
          <button className='btn btn-success verify-button' type='submit' onClick={handleSubmitotp}>Submit</button>
          <p id='demo' className="verify-error"></p>
          <button className='btn btn-success verify-back-button'><a href="/signup" >Back</a></button>
        </fieldset>
      </form>
    </div>
  )
}