"use client";

import { Input } from "./ui/input";

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-12 bg-gray-300 flex justify-between items-center px-default">
      <div>LOGO</div>
      <Input type="search" placeholder="Wyszukaj prowadzącego" />
    </div>
  );
}

export default Navbar;
