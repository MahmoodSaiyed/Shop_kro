import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Electproduct from "./productdetails/Electproduct";
import Sportsproducts from "./productdetails/Sportsproducts";
import Data from "./components/Data";
import Allproduct from "./category/Allproduct";
import SingleProduct from "./category/Singleproduct";
import Cart from "./category/Cart";
import Address from "./category/Address";
import Checkout from "./category/Checkout";
import Editcart from "./category/Editcart";
import Paymentsuccess from "./components/Paymentsuccess";
import Verify from "./category/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import Userdetails from "./user/Userdetails";
import Updateuser from "./user/Updateuser";
import ContactUs from "./components/ContactUs";


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path='/' element={<Data/>}></Route>
          <Route path="/sports" element={<Allproduct key={"/sports"} category={"category/sport"} heading={"Sports"}/>}></Route>
          <Route path="/clothes" element={<Allproduct key={"/clothes"} category={"category/cloth"} heading={"clothes"}/>}></Route>
          <Route path="/electronics" element={<Allproduct key={"/electronics"} category={"category/electronic"}heading={"electronics"} />}></Route>
          <Route path="/signup" element={<Signup  />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/singleproductpage/:id" element={<ProtectedRoute component={SingleProduct}/>}></Route>
          <Route path="/cart" element={<ProtectedRoute component={Cart}/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/selectaddress" element={<Address/>}></Route>
          <Route path="/electronicsproducts" element={<Electproduct />}></Route>
          <Route path="/sportsproducts" element={<Sportsproducts />}></Route>
          <Route path="/editcart/:id" element={<Editcart/>}></Route>
          <Route path="/success" element={<Paymentsuccess/>}></Route>
          <Route path="/userdetails" element={<Userdetails/>}></Route>
          <Route path="/edituser" element={<Updateuser/>}></Route>
          <Route path="/contactus" element={<ContactUs/>}></Route>



          {/* <Route path="/review/:id" element={<Review/>}></Route> */}
          <Route path="/otpVerify" element={<Verify/>}></Route>




          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
