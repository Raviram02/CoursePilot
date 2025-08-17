import Logo from "@/app/_components/Logo";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { IoLogoIonitron } from "react-icons/io5";

function Header({ display = false }) {
  const { user } = useUser({});
  return (
    <div className={`flex ${display? 'justify-between' : 'justify-end'} items-center p-5 shadow-sm`}>
      {display && <Logo />}
      {/* <IoLogoIonitron className="text-3xl text-primary"/> */}
      {user && <UserButton />}
    </div>
  );
}

export default Header;
