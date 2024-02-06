import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Editcart() {
  const [name, setname] = useState({});
  const [mobile, setmobile] = useState({});
  const [pincode, setpincode] = useState({});
  const [area, setarea] = useState({});
  const [city, setcity] = useState({});
  const [state, setstate] = useState({});
  const [country, setcountry] = useState({});
  let { id } = useParams();
  id = Number(id);
  

  const updateaddress = async () => {
    try {
      await fetch(
        `https://e732-2401-4900-1f3f-d9b3-8870-ed74-da49-3ffd.ngrok-free.app/address/put/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk3ODg0LCJleHAiOjE3MDU5NzM4ODR9.s47Zr-2XyYVzyRpssrkw9w0w13G3DaQj1Es96ByNXI4",
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            country: country,
            full_name: name,
            street_number: area,
            city: city,
            state: state,
            pincode: pincode,
            mobile_number: mobile,
          }),
        }
      ).then(async (response) => {
        await response.json();
        document.getElementById("done").innerHTML="Successfully Added"
        window.location.reload();
      })     

    } catch (error) {
      console.error("Error fetching secret data:", error);
    }
  };

  return (
    <div className="my-4 container" id="container">
      <form className="my-3" onSubmit={updateaddress}>
        <fieldset>
          <legend>Update Address</legend>
          <label htmlFor="">
            {" "}
            Name{" "}
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setname(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            Mobile No.{" "}
            <input
              type="text"
              placeholder="Mobile no."
              onChange={(e) => setmobile(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            Pincode{" "}
            <input
              type="text"
              placeholder="pincode"
              onChange={(e) => setpincode(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            Area{" "}
            <input
              type="text"
              placeholder="Area/Building/block no."
              onChange={(e) => setarea(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            City{" "}
            <input
              type="text"
              placeholder="city"
              onChange={(e) => setcity(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            State{" "}
            <input
              type="text"
              placeholder="state"
              onChange={(e) => setstate(e.target.value)}
            />
          </label>{" "}
          <br />
          <label htmlFor="">
            {" "}
            Country{" "}
            <input
              type="text"
              placeholder="country"
              onChange={(e) => setcountry(e.target.value)}
            />
          </label>{" "}
          <br />
          <button type="submit" className="btn btn-primary">Update Address</button>
<a href="/selectaddress" className="btn btn-primary" style={{width:"150px"}}>Goto Address</a>
          <p id="done" style={{color:"green"}}></p>
        </fieldset>
      </form>
    </div>
  );
}
