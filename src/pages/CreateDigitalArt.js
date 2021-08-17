import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "axios";
import Web3 from "web3";
import "../partials/Loader";
import Swal from "sweetalert2";
import * as Icons from "phosphor-react";
import { useHistory } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import "../css/upload.css";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import config from "../config";
import Loader from "../partials/Loader";

const chimeraContract = require("../contracts/Chimera.json");
const SMAV2Contract = require("../contracts/ChimeraMarketAuctionV2.json");
let web3;
let accounts;
let chimera;
let SMAV2;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CreateDigitalArt() {
  const history = useHistory();

  const classes = useStyles();
  const size = 100242880;
  
  const [imageFile, setImageFile] = useState(null);
  const [imgFormat, setImgFormat] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState({
    sizeError: false,
    formatError: false,
  });
  const [description, setDescription] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [loading, setLoading] = useState(false);
  const [Tags, setTags] = useState([]);
  const [tempTag, setTempTag] = useState("");

  function OnChangeTokenName(e) {
    setTokenName(e.target.value);
  }
  function OnChangeDescription(e) {
    setDescription(e.target.value);
  }

  async function onChangeImageFile(e) {
    // setImageFile(e[0]);
    // setLoading(true);
    console.log(e[0]);

    setError({ sizeError: false });
    setError({ formatError: false });

    if (e[0]) {
      if (e[0].size < size) {
        let imageName = e[0].name;
        let splitName = imageName.split(".");

        if (
          splitName[1] === "png" ||
          splitName[1] === "jpg" ||
          splitName[1] === "jpeg" ||
          splitName[1] === "JPEG" ||
          splitName[1] === "gif"
        ) {
          setImgFormat(true);
        } else if (
          splitName[1] === "mp4" ||
          splitName[1] === "mkv" ||
          splitName[1] === "MKV" ||
          splitName[1] === "gifv"
        ) {
          setImgFormat(false);
          console.log("hey");
        }
        if (
          splitName[1] === "png" ||
          splitName[1] === "jpg" ||
          splitName[1] === "jpeg" ||
          splitName[1] === "JPEG" ||
          splitName[1] === "gif" ||
          splitName[1] === "mp4" ||
          splitName[1] === "mkv" ||
          splitName[1] === "MKV" ||
          splitName[1] === "gifv"
        ) {
          setImageFile(e[0]);
        } else {
          setError({ formatError: true });
          setImageFile(null);
        }
      } else {
        setError({ sizeError: true });
        setImageFile(null);
      }
    }
  }
  function validateForm() {
    return (
      description.length > 0 &&
      tokenName.length > 0 &&
      imageFile &&
      Tags.length > 0
    );
  }
  async function SubmitForm() {
    console.log(Tags);
    if (!window.ethereum) {
      alert("Please Install metamask!!");
    } else {
      let tokenId;
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setLoading(true);
      accounts = await web3.eth.getAccounts();
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );
      try {
        tokenId = await chimera.methods.idCounter().call();
      } catch (error) {
        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }

      let formData = new FormData();
      formData.append("file", imageFile);
      formData.append("tokenId", tokenId);
      formData.append("name", tokenName);
      formData.append("owner", localStorage.getItem("id"));
      formData.append("artist", localStorage.getItem("id"));

      formData.append("tag", JSON.stringify(Tags));
      try {
        let res = await axios.post(`${config.host}/upload-file`, formData);
        console.log(res.data.message);
        await chimera.methods
          .addNewToken(description, 0)
          .send({ from: accounts[0] });
        await Swal.fire({
          icon: "success",
          title: "Uploaded",
          text: "Successfully Uploaded",
        });
        setLoading(false);
        history.push("/collection");
      } catch (error) {
        setLoading(false);
        console.log(error);
        await axios.delete(`${config.host}/delete/${tokenId}`).then((res) => {
          console.log(res);
        });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  }
  function onChangeTag(e) {
    setTempTag(e.target.value);
  }
  function submitTag() {
    console.log(tempTag);
    setTags([...Tags, tempTag]);
    setTempTag("");
  }
  function handleDelete(index) {
    Tags.splice(index, 1);
    setTags([...Tags]);
  }
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-5xl text-black">Create Digital Art</h1>
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
                    <div class="flex flex-col text-left mt-5 text-white px-2">
                      <label class="mb-1" for="weight-kilograms">
                        Name
                      </label>
                      <input
                        type="text"
                        id="description"
                        placeholder="Enter your Token Name here!"
                        class="py-2  px-6 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                        onChange={OnChangeTokenName}
                      />
                    </div>
                    <div class="flex flex-col text-white">
                      <div class="flex flex-col rounded-6xl mt-5 text-left px-1">
                        <label class="mb-1" for="weight-kilograms">
                          About your Token
                        </label>
                        <input
                          onChange={OnChangeDescription}
                          type="text"
                          id="description"
                          placeholder="Description"
                          className="pb-40 pt-3 px-6 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                        />
                      </div>
                      <div class="flex flex-col text-left mt-5 text-white px-2">
                        <label class="mb-1" for="weight-kilograms">
                          Tags
                        </label>
                        <input
                          onChange={onChangeTag}
                          type="text"
                          value={tempTag}
                          id="tags"
                          placeholder="Tags here"
                          class="py-2  px-6 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                          // onChange={OnChangeTokenName}
                        />
                        <button
                          disabled={!tempTag}
                          style={{ backgroundColor: "black", border: "black" }}
                          className="btn btn-primary mt-4 px-2 w-1/6"
                          onClick={submitTag}
                        >
                          Add
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-12 mt-2 gap-8">
                        {Tags.map((tag, index) => {
                          return (
                            <div
                              className="col-span-5 px-3 py-2"
                              // className="ml-5 px-3 py-2 mb-5"
                              style={{
                                fontSize: "16px",
                                marginTop: "5px",
                                color: "#065A6F",
                                backgroundColor: "#B0D6D1",
                                borderRadius: 5,
                              }}
                            >
                              {tag}
                              <button>
                                <i
                                  onClick={() => {
                                    handleDelete(index);
                                  }}
                                  className="fas fa-trash-alt ml-3"
                                  style={{ color: "red" }}
                                ></i>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <DropzoneArea
                        acceptedFiles={["image/*", "video/*"]}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={onChangeImageFile}
                        filesLimit={1}
                        maxFileSize={size}
                        dropzoneClass="drop"

                      />

                      <div className={classes.root}>
                        {error.sizeError ? (
                          <>
                            <Alert severity="error">
                              Size should be less than 5mb
                            </Alert>
                          </>
                        ) : null}
                        {error.formatError ? (
                          <>
                            <Alert severity="error">
                              Format should be .jpg,png,jpeg,JPEG
                            </Alert>
                          </>
                        ) : null}
                      </div>

                      <div class="flex mt-5 flex-col text-center px-5">
                        <button
                          className="btn btn-danger font-bold  py-2"
                          disabled={!validateForm()}
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
            {loading ? (
              <>
                <Loader />{" "}
              </>
            ) : null}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default CreateDigitalArt;
