import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function CreatePhysicalArt() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-black">Create Physical Art</h1>
            </div>
          </div>
          <div className="max-w-8xl  text-center mt-5 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            {/*Form Start*/}
            <div class="min-w-screen min-h-screen  flex flex-col items-center justify-center">
              <div class="w-5/6  lg:w-3/6 rounded-xl shadow-2xl bg-gradient-to-b from-blue-600 to-blue-400 mr-3">
                <div class="flex flex-col shadow-2xl">
                  <div
                    id="header"
                    class="flex flex-col items-center justify-center text-white py-4 bg-blue-800"
                  >
                    <div class="text-center ">
                      <span className="text-3xl font-extrabold font-Lobster">
                        Physical Art
                      </span>
                    </div>
                  </div>

                  <div id="converters-area" class="px-4 py-5">
                    <div class="flex flex-col text-white">
                      <div class="flex items-center justify-between mb-5">
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="weight-kilograms">
                            Weight (kilograms)
                          </label>
                          <input
                            type="number"
                            id="weight-kilograms"
                            class="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          />
                        </div>
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <label class="mb-1" for="weight-pounds">
                            Weight (pounds)
                          </label>
                          <input
                            type="number"
                            id="weight-pounds"
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

                      <div class="flex items-center justify-between mb-5 text-right">
                        <div class="flex flex-col text-right w-3/6 px-2">
                          <label for="decimals" class="mr-3">
                            Decimals:
                          </label>
                        </div>
                        <div class="flex flex-col text-center w-3/6 px-2">
                          <select
                            id="decimals"
                            class="appearance-none border-none text-gray-600 py-3 pl-3 pr-8 rounded leading-tight w-32"
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2" selected>
                              2
                            </option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                          <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                            REGISTER NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Form End*/}
            {/*End Form*/}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default CreatePhysicalArt;
