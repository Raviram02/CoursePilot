import React from "react";
import { IoLogoIonitron } from "react-icons/io5";

function Logo() {
  return (
    <div className="text-2xl font-extrabold text-primary flex">
      <IoLogoIonitron className="text-3xl " />
      <div className="ml-2">
        <span>Course</span>
        <span className="text-black">Pilot</span>
      </div>
    </div>
  );
}

export default Logo;
