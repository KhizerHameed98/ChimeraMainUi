import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "phosphor-react";

function HomeRecentActivity() {
  return (
    <>
      <div>
        <div className="max-w-6xl  text-center  mt-24 mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
            <h1 className="font-extrabold text-black">Recent Activity</h1>
          </div>
        </div>
      </div>
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}

        <div className="absolute left-0 right-0 bottom-0 m-auto transform translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto  sm:px-6">
          <div className="py-12 md:py-20">
            {/* Items */}
            <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
              {/* 1st item */}
              <div className="relative flex flex-col bg-white ">
                <img
                  src="https://ipfs.pixura.io/ipfs/QmYbPHZCpLZwk1nd1AWtcwZWpLsMfPGctGtL8HmMMcQhsD/wheels-are-turning.jpg"
                  alt="Random Creativity Outburst"
                />
                <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
                  <div className="col-start-1 col-span-2">
                    <Icons.UserCircle size={48} />
                  </div>
                  <div className="col-start-3 col-span-8 mt-2">
                    <p className="text-xs">
                      <a href="#"> @misguidedonut</a> made an offer for about
                      $763 on <a href="#"> Encounter</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* 2nd item */}
              <div className="relative flex flex-col bg-white">
                <img
                  src="https://ipfs.pixura.io/ipfs/QmPrRbncSi243FsecPJHsgEL7DN5XcD8EPrUN7pF4R73ri/encounter.jpg"
                  class="recent-activity-item-img"
                  alt="Random Creativity Outburst"
                />
                <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
                  <div className="col-start-1 col-span-2">
                    <Icons.UserCircle size={48} />
                  </div>
                  <div className="col-start-3 col-span-8 mt-2">
                    <p className="text-xs">
                      <a href="#"> @misguidedonut</a> made an offer for about
                      $763 on <a href="#"> Encounter</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3rd item */}
              <div className="relative flex flex-col bg-white">
                <img
                  src="https://ipfs.pixura.io/ipfs/QmPN1CA11xbCjcTqVQEqpiRMMhxp9xHG4qV4BjQu5Xv26g/1703-ah03.png"
                  class="recent-activity-item-img"
                  alt="Random Creativity Outburst"
                />
                <div className="max-w-sm mt-3 grid gap-6  md:grid-cols-12  lg:grid-cols-12">
                  <div className="col-start-1 col-span-2">
                    <Icons.UserCircle size={48} />
                  </div>
                  <div className="col-start-3 col-span-8 mt-2">
                    <p className="text-xs">
                      <a href="#"> @misguidedonut</a> made an offer for about
                      $763 on <a href="#"> Encounter</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <a
          className="btn btn-primary "
          style={{
            fontSize: 13,
            fontWeight: "bold",
            width: 250,
            padding: 10,
            backgroundColor: "black",
            borderColor: "black",
          }}
        >
          VIEW ALL ACTIVITY
        </a>
      </div>
    </>
  );
}

export default HomeRecentActivity;
