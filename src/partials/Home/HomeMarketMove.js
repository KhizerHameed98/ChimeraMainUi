import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "phosphor-react";

function HomeMarketMove() {
  return (
    <>
      <div>
        <div className="max-w-6xl  text-center mt-24 mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
            <h1 className=" pt-16 font-extrabold text-black">
              Watch the market move
            </h1>
          </div>
        </div>
        <section className="relative">
          {/* Section background (needs .relative class on parent and next sibling elements) */}

          <div className="absolute left-0 right-0 bottom-0 m-auto transform translate-y-1/2"></div>

          <div className="relative max-w-7xl mx-auto  sm:px-6">
            <div className="py-2 md:py-20">
              {/* Items */}
              <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3  md:max-w-2xl lg:max-w-none">
                {/* 1st item */}
                <div className="relative flex flex-col  px-5 bg-white rounded shadow-xl">
                  <div className="max-w-sm mt-5 grid gap-6 grid-cols-12 border-b-2 border-black">
                    <div className="col-span-8 mt-4">
                      <h4>Top Collectors</h4>
                    </div>
                    <div className="col-span-4 text-right mb-2">
                      <span className="text-gray-500 text-xs">
                        RECENTLY COLLECTED
                      </span>
                    </div>
                  </div>
                  {/* First Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @rudy
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-1000">131</span>
                    </div>
                  </div>
                  {/* Second Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @jonathan
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-100">131</span>
                    </div>
                  </div>
                  {/* Third Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-100">
                        @spasmodic
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-100">131</span>
                    </div>
                  </div>
                  <div className="text-right  mt-4 mb-5">
                    <a className="font-bold  text-black-100 text-xs" href="#">
                      SEE ALL{" "}
                    </a>{" "}
                  </div>
                </div>

                {/* 2nd item */}
                <div className="relative flex flex-col  px-5 bg-white rounded shadow-xl">
                  <div className="max-w-sm mt-5 grid gap-6 grid-cols-12 border-b-2 border-black">
                    <div className="col-span-8 mt-4">
                      <h4>Top Collectors</h4>
                    </div>
                    <div className="col-span-4 text-right mb-2">
                      <span className="text-gray-500 text-xs">
                        RECENTLY COLLECTED
                      </span>
                    </div>
                  </div>
                  {/* First Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @rudy
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-1000">131</span>
                    </div>
                  </div>
                  {/* Second Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <img
                        src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                        role="presentation"
                        className="rounded-full ring-2 ring-white"
                      />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @jonathan
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-100">131</span>
                    </div>
                  </div>
                  {/* Third Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @spasmodic
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-1000">131</span>
                    </div>
                  </div>
                  <div className="text-right mt-4 mb-5">
                    <a className="font-bold text-black-100 text-xs" href="#">
                      SEE ALL{" "}
                    </a>{" "}
                  </div>
                </div>
                {/* 3rd item */}
                <div className="relative flex flex-col  px-5 bg-white rounded shadow-xl">
                  <div className="max-w-sm mt-5 grid gap-6 grid-cols-12 border-b-2 border-black">
                    <div className="col-span-8 mt-4">
                      <h4>Top Collectors</h4>
                    </div>
                    <div className="col-span-4 text-right mb-2">
                      <span className="text-gray-500 text-xs">
                        RECENTLY COLLECTED
                      </span>
                    </div>
                  </div>
                  {/* First Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @rudy
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-1000">131</span>
                    </div>
                  </div>
                  {/* Second Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @jonathan
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-100">131</span>
                    </div>
                  </div>
                  {/* Third Line */}
                  <div className="max-w-sm mt-3 grid gap-6 grid-cols-12 border-b border-black">
                    <div className="col-span-2 mb-3">
                      <Icons.UserCircle size={38} />
                    </div>
                    <div className="col-span-6 mt-2">
                      <span className="text-sm font-extrabold text-black-1000">
                        @spasmodic
                      </span>
                    </div>
                    <div className="col-span-4 mt-1 text-right ">
                      <span className="text-xs  text-black-1000">131</span>
                    </div>
                  </div>
                  <div className="text-right mt-4 mb-5">
                    <a className="font-bold text-black-100 text-xs" href="#">
                      SEE ALL{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center mt-20">
          {localStorage.getItem("walletAddress") ? (
            <>
              <Link to="/market">
                <button
                  data-aos="zoom-y-out"
                  className="btn btn-primary"
                  style={{
                    width: 250,
                    height: 45,
                    backgroundColor: "black",
                    borderColor: "black",
                  }}
                >
                  <strong style={{ fontSize: "12px" }}>START COLLECTING</strong>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  data-aos="zoom-y-out"
                  className="btn btn-primary"
                  style={{
                    width: 250,
                    height: 45,
                    backgroundColor: "black",
                    borderColor: "black",
                  }}
                >
                  <strong style={{ fontSize: "12px" }}>START COLLECTING</strong>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default HomeMarketMove;
