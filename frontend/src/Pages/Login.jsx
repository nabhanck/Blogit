import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        alert("Login Successfull");
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    // <div>
    //   <h1>Login</h1>
    //   <label>Enter Username</label>
    //   <input type="text" onChange={(e) => setUsername(e.target.value)} />
    //   <label>Enter Password</label>
    //   <input type="text" onChange={(e) => setPassword(e.target.value)} />
    //   &nbsp;
    //   <button onClick={login}>Register</button>
    // </div>
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-xl min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-[100px] opacity-1 flex max-w-3xl p-2 rounded-xl shadow-[10px_4px_6px_10px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="sm:w-1/2 px-8">
          <h2 className="font-bold text-2xl text-white">Login</h2>
          <p className="text-sm mt-4 text-white">
            Login to create awesome blogs !!
          </p>
          <form className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-lg outline-none"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <input
              className="p-2 rounded-lg  outline-none"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button
              className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl text-white py-2"
              onClick={login}
            >
              Login
            </button>
          </form>
          <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-300" />
            <p className="text-center text-gray-300">OR</p>
            <hr className="border-gray-300" />
          </div>
          <p className="items-center text-center text-gray-300">
            New here?{" "}
            <Link className="text-gray-100" to={"/register"}>
              Register Now
            </Link>
          </p>
        </div>
        <div className="sm:block hidden w-1/2">
          <img className=" rounded-2xl" src="./login.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
