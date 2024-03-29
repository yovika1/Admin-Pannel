

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
// import { BiSolidLogOutCircle } from "react-icons/bi";
import { SideBarMenu } from "../Data/SidebarData";
import { FaUserCircle } from "react-icons/fa";
import { Header } from "../components/header/Header";
// import { Header } from "../components/header/Header";

function MainTemplate() {
  const [expand, setExpand] = useState(true);
  return (
    <>
      <section className="flex w-screen">
        <div className="fixed">
        <div
          className={`flex bg-black min-h-screen sm:${!expand?"w-14":"w-60"} ${
            expand ? " w-60 " : "w-14"
          } duration-500 relative text-gray-500 flex-col px-4`}
        >
          <div
            className={`text-blue-800 font-bold flex rounded-xl ${
              expand ? "border-none" : " border-2"
            } blur-0 invert drop-shadow-xl border-blue-800 -rotate-4 border-dotted  text-2xl my-11 gap-6`}
          >
            {expand ? "Fikpy" : <FaUserCircle />}
          </div>

          <div className=" flex right-0 justify-end absolute ">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer my-2"
              onClick={() => setExpand(!expand)}
            />
          </div>

          <div className=" flex right-0 justify-end absolute ">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer my-2"
              onClick={() => setExpand(!expand)}
            />
          </div>

          <div className="flex flex-col gap-6 -mt-4">
            {SideBarMenu?.map((parentItem, parentIndex) => (
              <div
                key={parentIndex}
                className=" whitespace-pre flex-col group gap-2 flex uppercase font-bold"
              >
                <p>{expand ? parentItem.title : ""}</p>

                {parentItem?.links?.map((childItem, childIndex) => (
                  <Link
                    to={childItem?.link}
                    className="flex gap-2  hover:bg-gray-700 rounded-md items-center capitalize"
                    key={childIndex}
                  >
                    <div className=" bg-blue-900 rounded-sm">
                      {React.createElement(childItem?.icon, { size: "20" })}
                    </div>

                    <h2
                      style={{
                        transitionDelay: `${childIndex + 2}00ms`,
                      }}
                      className={`duration-500 ${
                        !expand ? "opacity-0 translate-x-28 w-0 overflow-hidden" : "text-gray-200 "
                      }`}
                    >
                      {childItem?.name}
                    </h2>
                    <h2
                      className={`${
                        expand
                          ? "hidden"
                          : "w-0 overflow-hidden group-hover:left-16 duration-300 group-hover:w-fit"
                      }  bg-gray-200 rounded-md text-blue-950 text-sm whitespace-pre font-semibold absolute py-0 px-0 drop-shadow-md`}
                    >
                      {childItem.name}
                    </h2>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>
        <div className="w-full flex flex-col">
          <Header />
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default MainTemplate;
