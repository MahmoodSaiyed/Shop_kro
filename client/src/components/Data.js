import "../css/home.css";
import '../css/data.css'
import img1 from '../logo/banner1.jpg'
import img2 from '../logo/banner2.jpg'


// import { Carousel } from "react-bootstrap";
export default function Data() {
  return (
    <div className="container my-4">
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        {" "}
        <div class="carousel-indicators">
          {" "}
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>{" "}
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>{" "}
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>{" "}
        </div>{" "}
        <div class="carousel-inner">
          {" "}
          <div class="carousel-item active">  
            {" "}
            <img
              src={img1}
              class="d-block w-100" height="500px" width="100px"
              alt="..."
            />{" "}
            <div class="carousel-caption d-none d-md-block">
              {" "}
              <h2  >Up to 30% Off New Arrivals</h2>{" "}
            </div>{" "}
          </div>{" "}
          <div class="carousel-item">
            {" "}
            <img
              src={img2}
              class="d-block w-100" height="500px" width="100px"
              alt="..."
            />{" "}
            <div class="carousel-caption d-none d-md-block">
              {" "}
              <h2>Up to 30% Off New Arrivals</h2>{" "}
            </div>{" "}
          </div>{" "}
         </div>{" "}
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          {" "}
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>{" "}
          <span class="visually-hidden">Previous</span>{" "}
        </button>{" "}
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          {" "}
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>{" "}
          <span class="visually-hidden">Next</span>{" "}
        </button>{" "}
      </div>

      <div className="container my-4">
        <h1>
          <b>
            <i style={{color:'white'}}>CLOTHES</i>
          </b>
        </h1>
        <p style={{color:"white"}}>-------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>        <div class="row row-cols-2 g-3">
          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/61UE51azLWL._SY879_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">T-Shirt</h5>
                <p class="card-text">XYXX Men 100% Cotton Polo Tshirt</p>
                <a href="/clothes">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/5137SFdCROL._SX679_.jpg "
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Trackpants</h5>
                <p class="card-text">
                  ENDEAVOUR WEAR Men's Regular Fir Trackpants{" "}
                </p>
                <a href="/clothes">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/71s4LwobDyL._SY741_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">T-shirt</h5>
                <p class="card-text">
                  Jpckey 2715 Men's Super Combed Cotton Rich Striped Round Neck
                  Half Sleeve Tshirt{" "}
                </p>
                <a href="/clothes">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h1>
          <b>
            <i style={{color:'white'}}>ELECTRONICS</i>
          </b>
        </h1>
        <p style={{color:"white"}}>-------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>        <div class="row row-cols-2 g-3">
          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY218_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Iphone</h5>
                <p class="card-text">Apple iPhone 15 (128 GB) - Black</p>
                <a href="/electronics">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/71chepZjt2L._AC_UY218_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Laptop</h5>
                <p class="card-text">
                  ZEBRONICS NBC 5S Intel Core i7 12th Gen 1255U Laptop - (16 GB
                  RAM 3200MHz/ 1 TB M.2 SATA SSD/Windows 11 Home) 15.6” 1080p,
                  Dolby Atmos,Type C Port, Fingerprint Sensor, 38.5Wh Battery
                  (Midnight Blue)
                </p>
                <a href="/electronics">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/81L6069AwHL._AC_UY218_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Mobile</h5>
                <p class="card-text">
                  Redmi 13C 5G (Starlight Black, 8GB RAM, 256GB Storage) |
                  MediaTek Dimensity 6100+ 5G | 90Hz Display
                </p>
                <a href="/electronics">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h1>
          <b>
            <i style={{color:'white'}}>SPORTS</i>
          </b>
        </h1>
        <p style={{color:"white"}}>-------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
        <div class="row row-cols-2 g-3">
          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/61IGwX1Yb8L._AC_UL320_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Sports</h5>
                <p class="card-text">
                  Unisex Adult Sneakers - Multiplay Sports Shoes for Men & Women
                </p>
                <a href="/sports">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/61G20A9RhZL._AC_UL320_.jpg "
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Sports</h5>
                <p class="card-text">
                  Plain Encounter Football Stockings for Men & Women, Knee
                  Length
                </p>
                <a href="/sports">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-custom">
              <img
                src="https://m.media-amazon.com/images/I/61pOQHaR9SL._AC_UL320_.jpg"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">Sports</h5>
                <p class="card-text">
                  Men 4030 White Cricket Shoes (CK4030J4){" "}
                </p>
                <a href="/Sports">
                  <button className="btn btn-primary btn-sm">
                    View more...
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
