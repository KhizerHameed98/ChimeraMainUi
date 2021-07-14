import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div>
      <div className="max-w-xs mx-auto ">
        <div className="text-center mt-3 ml-20">
          <ReactLoading
            className="text-center"
            type={"bubbles"}
            color={"grey"}
            height={"60%"}
            width={"60%"}
          />
        </div>
      </div>
    </div>
  );
};
export default Loader;
