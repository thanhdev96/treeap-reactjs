import "./SlideShow.css";

const SlideShow = () => {
  return (
    <div className="container-slide">
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://bizweb.dktcdn.net/thumb/2048x2048/100/364/767/themes/737174/assets/slide-img.jpg?1676649124511"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://bizweb.dktcdn.net/thumb/2048x2048/100/364/767/themes/737174/assets/slide-img2.jpg?1676649124511"
              className="d-block w-100"
              alt="..."
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/long-banner.jpg?1676649124511"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      
      <div className="slide-context">
        <div className="slide-context1">
          <div className="slide-context1-img">
            <img src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/set_cf1.png?1676649124511"></img>
          </div>
          <div class="slide-context1-text">
            <p className="slide-text1">Free ship toàn quốc</p>
            <p className="slide-text2">Free Ship tất cả hóa đơn từ 500k</p>
          </div>
        </div>
        <div className="slide-context1">
          <div className="slide-context1-img">
            <img src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/set_cf2.png?1676649124511"></img>
          </div>
          <div class="slide-context1-text">
            <p className="slide-text1">Tư vấn 24/7</p>
            <p className="slide-text2">Hotline: 1900 6750</p>
          </div>
        </div>
        <div className="slide-context1">
          <div className="slide-context1-img">
            <img src="https://bizweb.dktcdn.net/100/364/767/themes/737174/assets/set_cf3.png?1676649124511"></img>
          </div>
          <div class="slide-context1-text">
            <p className="slide-text1">Cây ươm tại vườn</p>
            <p className="slide-text2">
              Các loại cây được thuần <br></br> dưỡng với khí hậu Việt Nam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
