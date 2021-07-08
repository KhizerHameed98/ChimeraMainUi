import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "axios";
import "../css/upload.css";
import MDBFileupload from "mdb-react-fileupload";

function CreateDigitalArt() {
  const [imageFile, setImageFile] = useState(null);
  function onChangeImageFile(e) {
    // setImageFile(e.target.files[0]);
    // console.log(e.target.files[0].name);
    let imageName = e.target.files[0].name;
    let splitName = imageName.split(".");

    if (
      splitName[1] === "png" ||
      splitName[1] === "jpg" ||
      splitName[1] === "jpeg" ||
      splitName[1] === "JPEG"
    ) {
      setImageFile(e.target.files[0]);
    } else {
      alert("Please Select correct format!!!!");
      setImageFile(null);
    }
  }
  function SubmitForm() {
    let formData = new FormData();
    formData.append("file", imageFile);
    formData.append("tokenId", 2);
    formData.append("user", localStorage.getItem("id"));

    axios
      .post(`http://localhost:5000/upload-file`, formData)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-black">Create Digital Art</h1>
            </div>
          </div>
          <div className="max-w-8xl  text-center mt-5 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            {/*Form Start*/}
            <div class="min-w-screen min-h-screen font-Inter font-extrabold   flex flex-col items-center justify-center">
              <div class="w-5/6  lg:w-3/6 rounded-xl shadow-2xl bg-gradient-to-b from-blue-600 to-blue-400 mr-3">
                <div class="flex flex-col shadow-2xl">
                  <div
                    id="header"
                    class="flex flex-col items-center justify-center text-white py-4 bg-blue-800"
                  >
                    <div class="text-center ">
                      <span className="text-3xl font-black ">Digital Art</span>
                    </div>
                  </div>

                  <div id="converters-area" class="px-4 py-5">
                    <div class="flex flex-col text-white">
                      <div class="flex items-center justify-between mb-5">
                        <div class="flex flex-col text-center  px-2">
                          <label class="mb-1" for="weight-kilograms">
                            Weight (kilograms)
                          </label>
                          <input
                            type="number"
                            id="weight-kilograms"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                      </div>

                      <div class="flex items-center justify-between mb-5">
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-metres">
                            Height (metres)
                          </label>
                          <input
                            type="number"
                            id="height-metres"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-feet">
                            Height (feet)
                          </label>
                          <input
                            type="number"
                            id="height-feet"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                      </div>

                      <div class="flex items-center justify-between mb-5">
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-metres">
                            Distance (kilometres)
                          </label>
                          <input
                            type="number"
                            id="distance-kilometres"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-feet">
                            Distance (miles)
                          </label>
                          <input
                            type="number"
                            id="distance-miles"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                      </div>

                      <div class="flex items-center justify-between mb-5">
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-metres">
                            Volume (litres)
                          </label>
                          <input
                            type="number"
                            id="volume-litres"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="height-feet">
                            Volume (gallons)
                          </label>
                          <input
                            type="number"
                            id="volume-gallons"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                      </div>
                      {/* <div class="flex flex-col text-center px-2">
                        <label class="mb-1" for="weight-kilograms">
                          Image:
                        </label>
                        <input
                          type="file"
                          id="description"
                          placeholder="Description"
                          class=" py-5 px-2 rounded focus:outline-none text-black"
                          onChange={onChangeImageFile}
                        />
                      </div> */}
                      <MDBFileupload />

                      <div class="flex flex-col text-center px-2">
                        <label class="mb-1" for="weight-kilograms">
                          About your Token
                        </label>
                        <input
                          type="text"
                          id="description"
                          placeholder="Description"
                          class="pb-40 pt-3 px-2 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                        />
                      </div>
                      <div class="flex mt-5 flex-col text-center px-5">
                        <button
                          className="btn btn-danger font-bold  py-2"
                          disabled={!imageFile}
                          onClick={SubmitForm}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Form End*/}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default CreateDigitalArt;
