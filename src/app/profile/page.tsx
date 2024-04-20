"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaRunning } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Baby,
  Calendar,
  HandCoins,
  Handshake,
  MapPinned,
  Plane,
  Users,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { MdOutlineBrunchDining } from "react-icons/md";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [plans, setPlans] = useState<any[]>([]); // Initialize plans with an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // get plan details
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

  // get user details
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched user:", data);
      setUser(data.data);
      setUpdatedUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // update user details
  const updateUser = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      console.log("Updated user:", data);
      setUser(data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // delete plan
  const handleDeletePlan = async (planId: string) => {
    try {
      const response = await fetch(`/api/plan?planId=${planId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-successful response
        throw new Error(
          `Failed to delete plan: ${response.status} ${response.statusText}`
        );
      } else {
        const data = await response.json();
        console.log("Plan deleted successfully:", data.message); // Log specific message
        // setPlans(data.plans); // Update state with plans if successful
              // Fetch the updated list of plans
      await fetchPlans();
      // Show the alert dialog
      setShowAlertDialog(true);

      }
      console.log("Plan deleted successfully");
    } catch (error) {
      // Handle fetch errors
      console.error("Error deleting plan:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPlans();
  }, []);

  // show alert dialog when user clicks on continue
  useEffect(() => {
    if (showAlertDialog) {
      setTimeout(() => {
        setShowAlertDialog(false);
      }, 3000);
    }
  }, [showAlertDialog]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4 p-4">My Profile</h1>
        {Object.keys(user).length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out">
            {!isEditing ? (
              <div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="username">
                    Username:
                  </label>
                  <p className="text-gray-700">{user.username}</p>
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="email">
                    Email:
                  </label>
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="username">
                    Username:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={updateUser}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <h1 className="text-2xl font-bold mt-8 mb-4 p-4">My Plans</h1>
        <div className="space-y-4 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className="flex justify-between items-center border-b border-gray-200 py-4 last:border-b-0"
              >
                <Dialog>
                  <DialogTrigger>
                    <div className="flex-1 cursor-pointer flex items-center"
                    onClick={() => handlePlanClick(plan)}>
                      <Plane className="mr-2 inline-block" />
                      <p className="text-gray-700">{plan.destination}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80%] max-w-[40%] overflow-y-scroll">
                    <div className="flex flex-col gap-2">
                      <h1 className="flex justify-center gap-2 mt-4">
                        <span className="text-3xl font-bold">
                          <Plane className="mr-2 inline-block" />
                          {plan.destination}
                        </span>
                      </h1>
                      <p className="flex gap-2 mt-4">
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
                          {plan.days.map((day: any, index: any) => (
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
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlan(plan._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No plans found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
