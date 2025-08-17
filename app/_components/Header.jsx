import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between p-5 border-b shadow-md">
      <Logo />
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Header;
