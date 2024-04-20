"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Baby,
  Calendar,
  HandCoins,
  Handshake,
  Home,
  Hotel,
  MapPinned,
  Plane,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MdOutlineBrunchDining } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

const Dashboard = () => {
  const [plans, setPlans] = React.useState([]);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched plans:", data.plans);
      setPlans(data.plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  console.log("Rendered plans:", plans);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <Dialog>
                <DialogTrigger key={plan._id}>
                  <Card className="w-full max-w-xl cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
                  key={plan._id}>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        <Plane className="mr-2 inline-block" />
                        {plan.destination}
                        <img src={"/assets/plan.jpeg"} alt={plan.destination} className="w-full h-48 object-cover mt-4" />
                      </CardTitle>
                      <CardDescription>
                        <span className="text-gray-500">Start Date:</span>{" "}
                        {new Date(plan.startDate).toLocaleDateString()} <br />
                        <span className="text-gray-500">End Date:</span>{" "}
                        {new Date(plan.endDate).toLocaleDateString()} <br />
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-h-[80%] max-w-[40%] overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h1 className="flex justify-center gap-2 mt-4">
                      <Plane className="font-semibold h-8 w-8" />
                      <span className="text-3xl font-bold">
                        {plan.destination}
                      </span>
                    </h1>
                    <p className="flex gap-2 mt-4">
                      {" "}
                      <Calendar className="font-semibold" />
                      <span>
                        Date: {new Date(plan.startDate).toLocaleDateString()} -{" "}
                        {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <HandCoins className=" font-semibold h-6 w-6" />
                      Budget: {plan.budget}{" "}
                    </p>
                    <p className="flex items-center gap-2">
                      <Handshake className="h-6 w-6 font-bold" />
                      Travel Type: {plan.travelType}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users
                        className="font-semibold h-6 w-6"
                        style={{ fontWeight: "bold" }}
                      />
                      Number of Adults: {plan.numAdults}
                    </p>
                    <p className="flex items-center gap-2">
                      <Baby className="font-semibold h-6 w-6" /> Number of
                      Children: {plan.numChildren}
                    </p>
                    {plan.days.length > 0 && (
                      <div className="mt-4">
                        <h2 className="text-2xl font-bold">Day-wise Plan</h2>
                        {plan.days.map((day:any, index:any) => (
                          <div key={index} className="mt-4">
                            <h3 className="text-xl font-bold">
                              Day {index + 1}:{" "}
                              {new Date(day.date).toLocaleDateString()}
                            </h3>
                            <p className="flex items-center gap-2">
                              <span className="font-semibold">
                                <MdOutlineBrunchDining className="w-8 h-8" />
                              </span>{" "}
                              {day.hotel}
                            </p>{" "}
                            {day.places.length > 0 && (
                              <p className="flex items-center gap-2">
                                <span className="font-semibold">
                                  <MapPinned className="w-8 h-8" />
                                </span>{" "}
                                {day.places.join(", ")}
                              </p>
                            )}
                            {day.activities.length > 0 && (
                              <p className="flex items-center gap-2">
                                <span className="font-semibold">
                                  <MapPinned className="w-8 h-8" />
                                </span>{" "}
                                {day.activities.join(", ")}
                              </p>
                            )}
                            {day.places.length === 0 &&
                              day.activities.length === 0 && (
                                <p className="flex items-center gap-2">
                                  <span>
                                    <FaRunning className="w-8 h-8" />
                                  </span>{" "}
                                  Explore the city
                                </p>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-2xl font-bold">No plans created yet</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
