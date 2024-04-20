"use client"
import Link from "next/link";
import { useState } from "react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import {useRouter} from "next/navigation";

export default function Component() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        router.push("/"); // Redirect the user to the login page or any other desired page
      } else {
        console.error("Error logging out:", response.status);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white px-4 py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-indigo-500">
        ExploreEase
        </Link>
        <div className="flex items-center space-x-4">
         {/* Create Plan button */}
         <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end items-center">
            <button
              className="bg-indigo-500 text-white p-4 rounded-full shadow-lg flex items-center hover:bg-indigo-400 transition-colors duration-300 ease-in-out"
              onClick={() => router.push("/form")}
            >
              <FaPlus className="text-2xl" />
              <span className="ml-2">Create Plan</span>
            </button>
          </div>
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
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      closeDropdown();
                    }}
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
