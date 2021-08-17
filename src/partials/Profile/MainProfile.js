import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import Loader from "../Loader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";
import "../../css/profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        width: "22ch",
      },
      [theme.breakpoints.up("md")]: {
        width: "33ch",
      },
      [theme.breakpoints.up("lg")]: {
        width: "38ch",
      },
    },
  },
}));
function MainProfile(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userData, setUserData] = useState([]);

  const [imgFile, setImgFile] = useState("");
  async function callData() {
    setLoading(true);
    try {
      let res = await axios.get(
        `${config.host}/api/users/${localStorage.getItem("id")}`
      );
      console.log(res.data);
      setUserData(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    callData();
  }, []);

  function ChangeFirstName(e) {
    // setFlName(e.target.value);
    userData.flname = e.target.value;
  }
  function ChangeLoaction(e) {
    // setLocation(e.target.value);
    userData.location = e.target.value;
  }
  function ChangeBio(e) {
    // setBio(e.target.value);
    userData.bio = e.target.value;
  }
  function ChangeWebsite(e) {
    // setWebsite(e.target.value);
    userData.website = e.target.value;
  }

  function onChangeImageFile(e) {
    setImgFile(e[0]);
  }

  async function ConfirmUpdate(e) {
    e.preventDefault();
    setLoading2(true);
    let formData = new FormData();
    formData.append("flname", userData.flname);
    formData.append("location", userData.location);
    formData.append("bio", userData.bio);
    formData.append("website", userData.website);

    try {
      if (!imgFile) {
        let res = await axios.put(
          `${config.host}/api/users/address/${localStorage.getItem(
            "walletAddress"
          )}`,
          formData
        );

        localStorage.setItem("avatar", res.data.user.avatar);

        await Swal.fire({
          icon: "success",
          text: "Updated Successfully!",
        });

        window.location.reload();
      } else {
        formData.append("file", imgFile);
        let res = await axios.put(
          `${config.host}/api/users/address/${localStorage.getItem(
            "walletAddress"
          )}`,
          formData
        );
        console.log(res);
        await Swal.fire({
          icon: "success",
          text: "Updated Successfully!",
        });
        localStorage.setItem("avatar", res.data.user.avatar);

        window.location.reload();
      }
    } catch (error) {
      setLoading2(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  return (
    <>
      <div className="max-w-4xl    mt-12 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}

        {/*search item */}

        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className=" text-gray-700 grid gap-6 shadow-2xl rounded md:grid-cols-12 lg:grid-cols-12  md:max-w-2xl pb-12 mb-12 lg:max-w-none">
              <div
                className="lg:col-span-6 check  sm:col-span-12 px-4 pt-4"
                style={{ flexDirection: "column-reverse" }}
              >
                {/*1st column 6 */}

                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    name="flname"
                    id="standard-basic"
                    label="First and last name"
                    defaultValue={userData.flname}
                    onChange={ChangeFirstName}
                  />
                  <TextField
                    disabled
                    id="standard-basic"
                    label="username *"
                    defaultValue={userData.name}
                  />
                  <TextField
                    id="standard-basic"
                    label="email *"
                    defaultValue={userData.email}
                    disabled
                  />
                  <TextField
                    name="location"
                    id="standard-basic"
                    label="location"
                    defaultValue={userData.location}
                    onChange={ChangeLoaction}
                  />
                  <TextField
                    name="bio"
                    id="standard-basic"
                    label="Bio"
                    defaultValue={userData.bio}
                    onChange={ChangeBio}
                  />
                  <TextField
                    name="website"
                    defaultValue={userData.website}
                    onChange={ChangeWebsite}
                    id="standard-basic"
                    label="Website"
                    placeholder="https://www.chimera.com"
                  />
                </form>
                <button
                  className="btn px-3 ml-5 mt-2 text-left btn-primary"
                  style={{ backgroundColor: "black", borderColor: "black" }}
                  onClick={ConfirmUpdate}
                >
                  Save
                </button>
                {loading2 ? (
                  <>
                    <Loader />
                  </>
                ) : null}
              </div>

              <div className="lg:col-span-6 avatar mx-auto mt-3 md:col-span-12 sm:col-span:12 sm:mx-auto">
                <div>
                  <div className={classes.root}>
                    <Avatar
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt="Remy Sharp"
                      src={userData.avatar}
                      className={classes.large}
                    />
                  </div>
                </div>
                <span className="text-xs text-black-100">
                  Square cropped jpg, png, or gif. Max file size: 5mb.
                </span>
                <div className="mt-4">
                  <DropzoneArea
                    style={{ backgroundColor: "white" }}
                    className="uploader "
                    acceptedFiles={["image/*"]}
                    dropzoneText={""}
                    onChange={onChangeImageFile}
                    filesLimit={1}
                    maxFileSize={5000000}
                    dropzoneClass="dropzone-profile"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default MainProfile;
