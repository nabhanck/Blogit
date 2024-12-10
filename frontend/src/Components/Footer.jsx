import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {isLoginPage ? (
        ""
      ) : (
        <div className="w-full h-auto md:flex md:flex-col bg-[#212623] p-10 gap-20 md:mt-32 items-center">
          <div className="md:flex md:flex-row w-full gap-20">
            <div className=" w-1/2 ">
              <h1 className="text-6xl tracking-wider font-light text-white">
                Blogit
              </h1>
              <div className="flex flex-row gap-7 mt-10 h-auto text-white">
                <ion-icon name="logo-facebook" class="w-10 h-8" />

                <ion-icon name="logo-instagram" class="w-10 h-8" />

                <ion-icon name="logo-linkedin" class="w-10 h-8" />

                <ion-icon name="logo-youtube" class="w-10 h-8" />

                <ion-icon name="logo-google" class="w-10 h-8" />
              </div>
            </div>
            <div className="flex md:flex-row flex-col md:m-0 mt-5 w-1/2 gap-10 text-gray-200">
              <div>
                <ul className="flex flex-col gap-5 font-semibold text-lg">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Our Mission</li>
                  <li>Visit Us</li>
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-5 font-semibold text-lg">
                  <li>Partnership</li>
                  <li>Sponsorship</li>
                  <li>Advertise with us</li>
                  <li>Get Callback</li>
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-5 font-semibold text-lg">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Privacy Dashboard</li>
                  <li>Code of Conduct</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-gray-500 md:m-0 mt-4">
            {" "}
            &copy;Blogit 2024 All rights reserved
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
