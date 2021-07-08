import React, { useEffect, useState } from "react";
import Data from "../../Data/Activity/data";

function MainActivity() {
  useEffect(() => {
    console.log(Data.activityData[0]);
  }, []);

  return (
    <>
      <div className="mx-auto grid gap-6 md:grid-cols-12 lg:grid-cols-12 md:max-w-2xl lg:max-w-none sm:mx-0">
        <div className=" sm:col-start-1 col-span-6 px-10 lg:col-start-2 col-span-5">
          {/*Loop Start */}
          {Data.activityData.map((d, key) => {
            return (
              <>
                <div className="mx-auto gap-6 md:grid-cols-12 lg:grid-cols-12 border-b border-gray-1000 pb-5">
                  <div className="mb-3 max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
                    <div className="col-start-1 col-span-2">
                      <img
                        src={d.Avatar}
                        role="presentation"
                        className="rounded-full ring-2 ring-white"
                      />
                    </div>
                    <div className="col-start-3 col-span-10 mt-2">
                      <p className="text-xs">
                        <a href="#"> {d.Name}</a> {d.Message}{" "}
                        <a href="#"> {d.Art}</a>
                      </p>
                    </div>
                  </div>
                  <div className="shadow-2xl">
                    <img src={d.ArtImage} />
                  </div>
                </div>
              </>
            );
          })}
          {/*Second Item*/}
          <div className="mx-auto gap-6 md:grid-cols-12 lg:grid-cols-12 border-b border-gray-1000 pb-5">
            <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
              <div className="col-start-1 col-span-2">
                <img
                  src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                  role="presentation"
                  className="rounded-full ring-2 ring-white"
                />
              </div>
              <div className="col-start-3 col-span-10 mt-2">
                <p className="text-xs">
                  <a href="#"> @misguidedonut</a> made an offer for about $763
                  on <a href="#"> Encounter</a>
                </p>
              </div>
            </div>
            <div className="shadow-2xl">
              <img src="https://ipfs.pixura.io/ipfs/QmdXhLeEWPetLEFGepgJiWJY6CyxdF6BhSiWMj54JuEHRy/the-band-aid-warehouse-.png" />
            </div>
          </div>
        </div>
        {/*Top Collectors */}
        <div className="hidden col-span-4 mt-4 ml-4 sm:block">
          <div>
            <span className="text-xl font-medium ">Top Collectors</span>
          </div>
          {/*first */}
          <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
            <div className="sm:col-start-1 col-span-1 lg:col-start-1 col-span-2">
              <img
                src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                role="presentation"
                className="rounded-full ring-2 ring-white"
              />
            </div>
            <div
              className="col-start-3 col-span-10 mt-2"
              style={{ marginLeft: "-12px" }}
            >
              <a className="text-xs" href="#">
                @benji8888
              </a>
            </div>
          </div>
          <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
            <div className="sm:col-start-1 col-span-1 lg:col-start-1 col-span-2">
              <img
                src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                role="presentation"
                className="rounded-full ring-2 ring-white"
              />
            </div>
            <div
              className="col-start-3 col-span-10 mt-2"
              style={{ marginLeft: "-12px" }}
            >
              <a className="text-xs" href="#">
                @benji8888
              </a>
            </div>
          </div>
          <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
            <div className="sm:col-start-1 col-span-1 lg:col-start-1 col-span-2">
              <img
                src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                role="presentation"
                className="rounded-full ring-2 ring-white"
              />
            </div>
            <div
              className="col-start-3 col-span-10 mt-2"
              style={{ marginLeft: "-12px" }}
            >
              <a className="text-xs" href="#">
                @benji8888
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainActivity;
