"use client"
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

export default function Component() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white px-4 py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="text-xl font-bold text-indigo-500">
          Wanderlog
        </Link>
        <div className="flex items-center space-x-4">
          <Input
            className="w-[400px] rounded-md border px-4 py-2 border-indigo-300 focus:border-none focus:ring-2 focus:ring-none focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white text-sm text-gray-700 placeholder-gray-400"
            placeholder="Search"
            type="search"
          />
          <div className="relative" onClick={toggleDropdown}>
            <Avatar>
              <AvatarImage
                alt="User avatar"
                src="/assets/avatar.svg"
                className="rounded-full w-10 h-10"
              />
            </Avatar>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 w-48 mt-12 rounded-md bg-white shadow-lg">
                {/* Dropdown content */}
                <ul className="py-1">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}


          </div>
        </div>
      </div>
    </nav>
  );
}
