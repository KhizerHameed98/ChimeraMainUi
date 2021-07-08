import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import config from "../../config";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 h-500"
            src={`${config.host}/uploads/image1.png`}
            alt="First slide"
            style={{ height: 630 }}
          />

          {/* <Carousel.Caption style={{ paddingBottom: 150 }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 transparent">
                <div style={{ paddingTop: 50, paddingBottom: 50 }}>
                  <h1>First slide label</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: 630 }}
            className="d-block w-100 "
            src={`${config.host}/uploads/image2.png`}
            alt="Second slide"
          />

          {/* <Carousel.Caption style={{ paddingBottom: 150 }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 transparent">
                <div style={{ paddingTop: 50, paddingBottom: 50 }}>
                  <h1>Second slide label</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: 630 }}
            className="d-block w-100"
            src={`${config.host}/uploads/image3.png`}
            alt="Third slide"
          />

          {/* <Carousel.Caption style={{ paddingBottom: 150 }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 transparent">
                <div style={{ paddingTop: 50, paddingBottom: 50 }}>
                  <h1>Third slide label</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </>
  );
}
export default HomeCarousel;
