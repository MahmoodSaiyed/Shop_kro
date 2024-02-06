import React from 'react'
import '../css/footer.css'

export default function Footer() {
   
  return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="first-item">
                        <div className="logo">
                        <h4>Shop Kro</h4>
                        </div>
                        <ul>
                            <li><a href="/">NNT Software 606/Synergy tower near vodaphone house,Ahemdabad</a></li>
                            <li><a href="/">Shopkro.com</a></li>
                            <li><a href="/">010-020-0340</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3">
                    <h4>Shopping &amp; Categories</h4>
                    <ul>
                        <li><a href="/clothes">Clothes</a></li>
                        <li><a href="/sports"> Sports</a></li>
                        <li><a href="/electronics">Electronics</a></li>
                    </ul>
                </div>
                <div className="col-lg-3">
                    <h4>Useful Links</h4>
                    <ul>
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/">About Us</a></li>
                        <li><a href="/">Help</a></li>
                        <li><a href="/contactus">Contact Us</a></li>
                    </ul>
                </div>
                <div className="col-lg-3">
                    <h4>Help &amp; Information</h4>
                    <ul>
                        <li><a href="/">Help</a></li>
                        <li><a href="/">FAQ's</a></li>
                        <li><a href="/">Shipping</a></li>
                        <li><a href="/">Tracking ID</a></li>
                    </ul>
                </div>
                <div className="col-lg-12">
                    <div className="under-footer">
                        <p>Copyright © 2024 Shop Kro Co., Ltd. All Rights Reserved.
                        
                        <br /> Design: <a href="/" target="_parent" title="free css templates">shope kro</a>

                        <br/>Distributed By: <a href="/" target="_blank" title="free & premium responsive templates">SHOP KRO</a></p>
                        <ul>
                            <li><a href="/"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="/"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="/"><i className="fa fa-linkedin"></i></a></li>
                            <li><a href="/"><i className="fa fa-behance"></i></a></li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    </footer>
  )
}
