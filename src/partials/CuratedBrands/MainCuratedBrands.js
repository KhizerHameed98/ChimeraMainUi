import React from "react";
import { MDBInput, MDBCol } from "mdbreact";
import Carousel from "react-bootstrap/Carousel";
import "../../css/curatedbrands.css";
import data from "../../Data/CuratedBrands/data";
import { Link } from "react-router-dom";
function MainCuratedBrands(props) {
  return (
    <>
      {/* 3D */}
      <div className="max-w-6xl  text-center  mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <MDBCol md="12" data-aos="zoom-y-out">
            <MDBInput
              hint="Search..."
              type="text"
              style={{
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
              }}
              containerClass="active-pink active-pink-2 mt-0 mb-3"
            />
          </MDBCol>
        </div>
      </div>
      <div className="text-center pt-4" data-aos="zoom-y-out">
        <span className="font-extrabold">Trending Brands</span>
      </div>
      <div className="max-w-6xl mt-40 text-center  mt-24 mx-auto px-4 sm:px-6">
        {data.map((d, key) => {
          return (
            // <Link to={{ pathname: `/curated-detailed/${d.src}`, state: { d } }}>
            <Link to={{ pathname: `/curated-detailed`, state: { d } }}>
              <Carousel className="mt-20 shadow-2xl CarouselAnimation curatedCarousel">
                <Carousel.Item className="changeColor">
                  <div>
                    <img
                      src={d.src}
                      class="object-cover rounded  w-full ..."
                      style={{ height: 380 }}
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default MainCuratedBrands;
