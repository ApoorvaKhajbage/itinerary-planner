"use client"
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanCard from "@/components/PlanCard";
import { FaPlus } from "react-icons/fa";
import {useRouter} from "next/navigation";

const Dashboard = () => {
  // Sample list of plans
  const router = useRouter();

  const plans = [
    { id: 1, title: "Plan 1", description: "Description of Plan 1" },
    { id: 2, title: "Plan 2", description: "Description of Plan 2" },
    { id: 3, title: "Plan 3", description: "Description of Plan 3" },
    { id: 4, title: "Plan 4", description: "Description of Plan 4" },
    { id: 5, title: "Plan 5", description: "Description of Plan 5" },
    { id: 6, title: "Plan 6", description: "Description of Plan 6" },
    // Add more plans as needed
  ];
  const handleCreatePlan = () => {
   
    // Navigate to the form route
    router.push('/form');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
            />
          ))}
          {/* Create Plan button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end items-center">
           
            <button className="bg-indigo-500 text-white p-4 rounded-full shadow-lg flex items-center"
            onClick={handleCreatePlan}>
              <FaPlus className="text-2xl" />
              <span className="ml-2">Create Plan</span>
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
