import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [dp, setDp] = useState("");

  const location = useLocation();
  const isOnLoginPage = location.pathname === "/login";

  const headerId = userInfo.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        setUserInfo(info);
      });
    });

    // fetch(`http://localhost:5000/profileheader/${headerId}`, {
    //   credentials: "include",
    // }).then((response) => {
    //   response.json().then((info) => {
    //     setDp(info);
    //   });
    // });
  }, []);
  // console.log("dp", dp);

  function logout() {
    fetch(`${process.env.REACT_APP_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(" ");
  }
  const username = userInfo?.username;

  const navlinks = document.querySelector(".nav-links");
  function onToggleMenu(event) {
    event.name = event.name === "menu" ? "close" : "menu";
    navlinks.classList.toggle("top-[9%]");
  }

  return (
    // <>
    //   {username && (
    //     <div>
    //       <h5>
    //         Welcome! <Link to={`/profile/${userInfo.id}`}>{username}</Link>
    //       </h5>
    //       <Link to={"/"}>Home</Link>
    //       &nbsp; &nbsp;
    //       <Link to={"/create-post"}>Create a Post</Link>
    //       &nbsp; &nbsp;
    //       <Link onClick={logout} to={"/login"}>
    //         Logout
    //       </Link>
    //     </div>
    //   )}
    //   {!username && (
    //     <div>
    //       <Link to={"/"}>Home</Link>
    //       &nbsp; &nbsp;
    //       <Link to={"/register"}>Register</Link>
    //       &nbsp; &nbsp;
    //       <Link to={"/login"}>Login</Link>
    //     </div>
    //   )}
    // </>

    <header className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop:shadow-xl p-3 ">
      <nav className="flex justify-between items-center md:ml-12">
        <Link to={"/"}>
          <div>
            <h1 className="font-bold text-3xl text-white">Blogit</h1>
          </div>
        </Link>
        <div className="nav-links md:static absolute  md:min-h-fit min-h-[20vh] left-0 top-[-100%] z-10 md:w-auto w-full items-center px-5 md:bg-none bg-gradient-to-r from-purple-600 to-pink-600 rounded-br-xl rounded-bl-xl">
          {username && (
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-10 mt-5 md:ml-20 text-lg font-semibold text-white">
              <li>
                <Link className="hover:text-gray-500 " to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500 " to={"/create-post"}>
                  Create Post
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500 " to={"/authors"}>
                  Authors
                </Link>
              </li>
            </ul>
          )}
          {!username && (
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-12">
              <li>
                <Link
                  className="hover:text-gray-500 text-white"
                  to={"/login"}
                ></Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center md:gap-6 gap-2">
          {username && (
            <div className="text-white">
              <h5>
                Welcome!{" "}
                <Link to={`/profile/${userInfo.id}`} className="font-semibold">
                  {username}
                </Link>
              </h5>
            </div>
          )}
          {username && (
            <div className="flex items-center gap-6">
              <ion-icon
                name="person-circle-outline"
                class="text-3xl text-white"
              ></ion-icon>
              <button
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500 text-white  px-2 py-1 rounded-md  md:block hidden"
                onClick={logout}
                to={"/login"}
              >
                Logout
              </button>
            </div>
          )}
          {!username &&
            (isOnLoginPage ? (
              <Link to={"/register"}>
                <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-1 rounded-full hover:bg-[#72a3f7]">
                  Register
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-1 rounded-full hover:bg-[#72a3f7]">
                  Login
                </button>
              </Link>
            ))}

          <ion-icon
            name="menu"
            class="text-3xl cursor-pointer md:hidden text-white"
            onClick={(e) => onToggleMenu(e.target)}
          ></ion-icon>
        </div>
      </nav>
    </header>
  );
};

export default Header;
