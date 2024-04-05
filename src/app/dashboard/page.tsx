"use client"
import React, {useEffect} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {LuMap} from "react-icons/lu";

const Dashboard = () => {
  // Sample list of plans
  const router = useRouter();
  const [plans, setPlans] = React.useState([]);


  const fetchPlans = async () => {
    const response = await fetch("/api/plan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPlans(data.plans);
  }

  useEffect(() => {
    fetchPlans();

  }, [plans]);

  const handleCreatePlan = () => {
   
    // Navigate to the form route
    router.push('/form');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* List of plans */}
            {plans.map((plan) => (
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        <LuMap className="mr-2 inline-block" />
                        {plan.destination}
                      </CardTitle>
                      <CardDescription>
                        <span className="text-gray-500">Start Date:</span> {plan.startDate} <br />
                        <span className="text-gray-500">End Date:</span> {plan.endDate} <br />
                      </CardDescription>
                    </CardHeader>
                </Card>

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
