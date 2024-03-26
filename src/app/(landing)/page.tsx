"use client"
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function landing() {
  
  const router = useRouter()
  const handleLoginClick = () => {
    router.push("/sign-in");
  }
  return (
  
    <div className="relative min-h-screen bg-white">
        <Head>
            <title>Landing Page</title>
        </Head>
      <div className="absolute inset-0 overflow-hidden">
      
      </div>
      <div className="relative flex h-full">
        <div className="flex flex-col justify-center w-full max-w-4xl p-8 mx-auto text-left lg:w-1/2">
          <div className="flex justify-between mb-8">
            <a className="text-3xl font-bold text-blue-600" href="#">
              wanderlog
            </a>
            <div className="flex space-x-4">
                <Link href="/sign-in">
              <Button className="text-gray-800" variant="ghost" onClick={()=> handleLoginClick()}>
                Log in
              </Button>
              </Link>
                <Link href="/sign-up">
              <Button className="text-white" variant="login">
                Sign up
              </Button>
                </Link>
            </div>
          </div>
          <h1 className="mb-6 text-6xl font-bold leading-tight text-gray-800">
            You'll never travel without our trip planner again
          </h1>
          <p className="mb-6 text-lg text-gray-700">
            Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed
            for vacations & road trips, powered by our trip planner AI
          </p>
          <div className="flex space-x-4">
            <Link href="/sign-up">
            <Button className="text-white" variant="login">
              Start planning
            </Button>
            </Link>
          
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full bg-gradient-to-r from-blue-500 to-indigo-500  text-white py-4 text-center">
        <p>© 2024 wanderlog. All rights reserved.</p>
      </footer>
    </div>
  )
}

