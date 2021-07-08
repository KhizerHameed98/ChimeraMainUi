import React from "react";

function HomeHowitWorks() {
  return (
    <>
      <div className="max-w-6xl  mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black"></div>
        <div className="grid sm:grid-cols-12  px-6 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <h1
                className="text-4xl md:text-3xl my-2 font-extrabold  tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                How it works for Artists.
              </h1>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 mt-4 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              AUTHENTICATE YOUR WORK.
            </h6>
            <p className="text-sm">
              Digitally sign your work by creating a tokenized certificate.
            </p>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 mt-4 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              SET PRICES & RUN AUCTIONS.
            </h6>
            <p className="text-sm">
              Set a price or let collectors bid on your art in the digital art
              marketplace.
            </p>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              WE'RE IN EARLY ACCESS.
            </h6>
            <p className="text-sm">
              SuperRare is still in early access, onboarding only a small number
              of hand-picked artists. Use the form below to get on our radar for
              our full launch next year.
            </p>
          </div>
        </div>
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
            GET ON OUR RADAR
          </a>
        </div>
      </div>
    </>
  );
}
export default HomeHowitWorks;
