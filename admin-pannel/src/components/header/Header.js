import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className=" h-14 gap-4 w-full shadow-lg justify-end flex  bg-gray-900 cursor-pointer items-end  ">
        <div className=" flex sm:mr-20 md:mr-[34%] lg:mr-[56%]">
   =
  </div>
        <p className="text-2xl flex drop shadow-lg text-violet-600 mb-3">
          <IoMdNotifications />
        </p>

        <div className=" border-2 duration-500 mr-4 h-6 border-dotted my-3 top-2 text-violet-700 border-blue-950  text-sm font-extrabold rounded-xl">
          <div className="relative inline-block text-left">
            <div
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="  font-medium rounded-lg text-xl text-center inline-flex items-center"
              type="button"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <FaUserCircle />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="z-10 origin-top-right absolute whitespace-pre right-0 mt-2 w-20 rounded-lg shadow-lg  dark:bg-gray-700">
                <ul
                  className=" px-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                  onClick={() => {
                    Cookies.remove("token");
                    window.location.reload();
                  }}
                >
                  <li>
                    <a
                      href="#"
                      className="block px-2 py-2  dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
