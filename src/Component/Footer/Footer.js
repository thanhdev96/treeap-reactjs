import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-dark">
      <section className="d-flex justify-content-between p-4 text-white">
        <div>
          <a href className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href className="text-white me-4">
            <i className="fab fa-twitter" />
          </a>
          <a href className="text-white me-4">
            <i className="fab fa-google" />
          </a>
          <a href className="text-white me-4">
            <i className="fab fa-instagram" />
          </a>
          <a href className="text-white me-4">
            <i className="fab fa-linkedin" />
          </a>
          <a href className="text-white me-4">
            <i className="fab fa-github" />
          </a>
        </div>
      </section>
      
      <section className>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Tree 247 JSC</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Sản Phẩm</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <a href="#!" className="text-dark">
                  Sen Đá
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Cây Trong Nhà
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Hoa Lan
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Cây Để Bàn
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <Link to="/" className="text-dark">
                  Trang Chủ
                </Link>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Shipping Rates
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Giới Thiệu
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Liên Hệ</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 0, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <i className="fas fa-home mr-3" /> DN, 124 Âu Cơ, VN
              </p>
              <p>
                <i className="fas fa-envelope mr-3" /> Thanh14c4b@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3" /> + 1900 6666
              </p>
              <p>
                <i className="fas fa-print mr-3" /> + 1900 6666
              </p>
            </div>
          </div>
        </div>
        
      </section>
    </footer>
  );
};

export default Footer;

