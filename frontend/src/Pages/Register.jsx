import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [organization, setOrganization] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/register `, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        image,
        contact,
        location,
        organization,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      setRedirect(true);
      alert("Successfull");
    } else {
      alert("registration failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <label>Enter Username</label>
  //     <input type="text" onChange={(e) => setUsername(e.target.value)} />
  //     <label>Enter Password</label>
  //     <input type="text" onChange={(e) => setPassword(e.target.value)} />
  //     &nbsp;
  //     <input onChange={(e) => setImage("")} />
  //     <button onClick={register}>Register</button>
  //   </div>
  // );

  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-xl min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-[100px] opacity-1 flex max-w-3xl p-2 rounded-xl shadow-[10px_4px_6px_10px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="sm:block hidden w-1/2">
          <img className=" rounded-2xl" src="./register.jpg" alt="" />
        </div>
        <div className="sm:w-1/2 px-8">
          <h2 className="font-bold text-2xl text-white">Register</h2>
          <p className="text-sm mt-4 text-white">Register to get started</p>
          <form className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-lg outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <input
              className="p-2 mt-2 rounded-lg outline-none"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <input
              className="p-2 mt-2 rounded-lg outline-none"
              type="text"
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter phone number"
            />

            <select
              className="focus:outline-none p-2 rounded-lg"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>Select a Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>UAE</option>
              <option>Australia</option>
              <option>Malayasia</option>
            </select>
            <button
              className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl text-white py-2"
              onClick={register}
            >
              Register
            </button>
          </form>
          <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-300" />
            <p className="text-center text-gray-300">OR</p>
            <hr className="border-gray-300" />
          </div>
          <p className="items-center text-center text-gray-300">
            Already a member?{" "}
            <Link className="text-gray-100" to={"/login"}>
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
