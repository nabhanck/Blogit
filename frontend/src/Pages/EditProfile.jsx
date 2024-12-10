import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [organization, setOrganization] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState("");
  const [dp, setDp] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");

  const { userInfo } = useContext(UserContext);
  console.log(userInfo);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/dp/${id}`).then((response) => {
      response.json().then((dp) => {
        setDp(dp);
      });
    });
    fetch(`${process.env.REACT_APP_URL}/profile/${id}`).then((response) => {
      response.json().then((info) => {
        setUsername(info.username);
        setLocation(info.location);
        setOrganization(info.organization);
        setContact(info.contact);
      });
    });
  }, []);
  console.log(profileInfo);

  async function updateProfile(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("file", file[0]);
    data.set("username", username);
    data.set("location", location);
    data.set("organization", organization);
    data.set("contact", contact);
    const response = await fetch(`${process.env.REACT_APP_URL}/dp/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    response.json();
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="md:full h-auto mt-10 mb-4 bg-white flex flex-col justify-center items-center">
      <h1 className="mb-4 text-4xl font-semibold text-gray-600 tracking-wider">
        Edit Profile
      </h1>
      {!userInfo.username ? (
        <Navigate to={"/"} />
      ) : (
        <div className="md:w-1/2 h-auto bg-black/30 backdrop-blur-3xl mx-auto flex md:flex-row flex-col p-6 rounded-xl ">
          <div className="flex flex-col md:items-start items-center">
            <img
              src={`${process.env.REACT_APP_URL}/${dp.image}`}
              className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] rounded-full object-cover"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files)}
              className="mt-4 md:mb-0 mb-4 text-white"
            />
          </div>
          <form onSubmit={updateProfile} className="w-full h-auto">
            <div className="flex flex-col">
              <label className="text-gray-200 font-semibold mb-2">
                Username
              </label>
              <input
                className="border-none rounded-2xl px-2 py-2 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200 font-semibold mb-2">
                Location
              </label>
              <input
                className="border-none rounded-2xl px-2 py-2 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200 font-semibold mb-2">
                Organization
              </label>
              <input
                className="border-none rounded-2xl px-2 py-2 focus:outline-none"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200 font-semibold mb-2">
                Contact
              </label>
              <input
                className="border-none rounded-2xl px-2 py-2 focus:outline-none"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <button className="bg-black text-white hover:bg-white hover:text-black mt-6 mb-6 py-2 rounded-lg w-full">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
