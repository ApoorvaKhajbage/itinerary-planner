"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuMap } from "react-icons/lu";
import { LuTag } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";

export default function ItineraryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelType: "",
    numAdults: "1",
    numChildren: "0",
    preferredTravelTime: "anytime",
    selectedPlaces: [],
    selectedRestaurants: [],
    selectedHotels: [],
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedNumAdults, setSelectedNumAdults] = useState("1");
  const [selectedNumChildren, setSelectedNumChildren] = useState("0");
  const [selectedTravelTime, setSelectedTravelTime] = useState("anytime");
  const [selectedTravelType, setSelectedTravelType] = useState("");
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [popularHotels, setPopularHotels] = useState([]);

  // useEffect(() => {
  //   // Fetch popular places, restaurants, and hotels based on the destination
  //   // This can be done using an API call
  //   // Example:
  //   // fetchPopularPlaces();
  //   // fetchPopularRestaurants();
  //   // fetchPopularHotels();
  // }, [formData.destination]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGeneratePlan = () => {
    // Logic to generate plan using formData
    console.log(formData);
  };

  const handleCancelStep = () => {
    // Logic to cancel form
    router.push("/dashboard");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch popular places, restaurants, and hotels based on the entered destination
    
  };

  const fetchPopularData = async (destination: any) => {
    const popularPlaces = await fetchPopularPlaces(destination);
    const popularRestaurants = await fetchPopularRestaurants(destination);
    const popularHotels = await fetchPopularHotels(destination);

    // Update component state with fetched data
    setPopularPlaces(popularPlaces);
    setPopularRestaurants(popularRestaurants);
    setPopularHotels(popularHotels);
  };

  const handleCheckboxChange = (e: any, type: any) => {
    const { id, checked } = e.target;
    const selectedItem = {
      id,
      type,
    };
    let selectedItems = [...formData[type]];

    if (checked) {
      selectedItems.push(selectedItem);
    } else {
      selectedItems = selectedItems.filter((item) => item.id !== id);
    }

    setFormData((prevState) => ({
      ...prevState,
      [type]: selectedItems,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="destination">
              Destination
            </Label>
            <Input
              id="destination"
              name="destination"
              placeholder="Enter your destination"
              value={formData.destination}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start" className="block text-sm font-medium">
                  Start Date
                </Label>
                <Input
                  id="start"
                  name="startDate"
                  placeholder="Select date"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="end" className="block text-sm font-medium">
                  End Date
                </Label>
                <Input
                  id="end"
                  name="endDate"
                  placeholder="Select date"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="budget" variant="outline">
                  {selectedBudget ? selectedBudget : "Select Budget"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose your budget</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  id="economy"
                  onClick={() => {
                    setSelectedBudget("Economy");
                    setFormData({ ...formData, budget: "economy" });
                  }}
                >
                  Economy
                </DropdownMenuItem>
                <DropdownMenuItem
                  id="normal"
                  onClick={() => {
                    setSelectedBudget("Normal");
                    setFormData({ ...formData, budget: "normal" });
                  }}
                >
                  Normal
                </DropdownMenuItem>
                <DropdownMenuItem
                  id="luxury"
                  onClick={() => {
                    setSelectedBudget("Luxury");
                    setFormData({ ...formData, budget: "luxury" });
                  }}
                >
                  Luxury
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      case 3:
        return (
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="travelType"
                value="solo"
                id="solo"
                checked={selectedTravelType === "solo"}
                onChange={(e) => {
                  setSelectedTravelType(e.target.value);
                  setFormData({ ...formData, travelType: "solo" });
                }}
                className="radio-input"
              />
              <label htmlFor="solo" className="radio-label">
                Solo
              </label>

              <input
                type="radio"
                name="travelType"
                value="partner"
                id="partner"
                checked={selectedTravelType === "partner"}
                onChange={(e) => {
                  setSelectedTravelType(e.target.value);
                  setFormData({ ...formData, travelType: "partner" });
                }}
                className="radio-input"
              />
              <label htmlFor="partner" className="radio-label">
                Partner
              </label>

              <input
                type="radio"
                name="travelType"
                value="family"
                id="family"
                checked={selectedTravelType === "family"}
                onChange={(e) => {
                  setSelectedTravelType(e.target.value);
                  setFormData({ ...formData, travelType: "family" });
                }}
                className="radio-input"
              />
              <label htmlFor="family" className="radio-label">
                Family
              </label>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedNumAdults
                        ? `Adults: ${selectedNumAdults}`
                        : "Select number of adults"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Choose number of adults
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      id="1"
                      onClick={() => {
                        setSelectedNumAdults("1");
                        setFormData({ ...formData, numAdults: "1" });
                      }}
                    >
                      1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="2"
                      onClick={() => {
                        setSelectedNumAdults("2");
                        setFormData({ ...formData, numAdults: "2" });
                      }}
                    >
                      2
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="3"
                      onClick={() => {
                        setSelectedNumAdults("3");
                        setFormData({ ...formData, numAdults: "3" });
                      }}
                    >
                      3
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="4"
                      onClick={() => {
                        setSelectedNumAdults("4");
                        setFormData({ ...formData, numAdults: "4" });
                      }}
                    >
                      4
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="5"
                      onClick={() => {
                        setSelectedNumAdults("5");
                        setFormData({ ...formData, numAdults: "5" });
                      }}
                    >
                      5
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedNumChildren
                        ? `Children: ${selectedNumChildren}`
                        : "Select number of children"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Choose number of children
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      id="0"
                      onClick={() => {
                        setSelectedNumChildren("0");
                        setFormData({ ...formData, numChildren: "0" });
                      }}
                    >
                      0
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="1"
                      onClick={() => {
                        setSelectedNumChildren("1");
                        setFormData({ ...formData, numChildren: "1" });
                      }}
                    >
                      1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="2"
                      onClick={() => {
                        setSelectedNumChildren("2");
                        setFormData({ ...formData, numChildren: "2" });
                      }}
                    >
                      2
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="3"
                      onClick={() => {
                        setSelectedNumChildren("3");
                        setFormData({ ...formData, numChildren: "3" });
                      }}
                    >
                      3
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      id="4"
                      onClick={() => {
                        setSelectedNumChildren("4");
                        setFormData({ ...formData, numChildren: "4" });
                      }}
                    >
                      4
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedTravelTime
                      ? `Preferred Travel Time: ${selectedTravelTime}`
                      : "Select preferred travel time"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Choose preferred travel time
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    id="anytime"
                    onClick={() => {
                      setSelectedTravelTime("Anytime");
                      setFormData({
                        ...formData,
                        preferredTravelTime: "Anytime",
                      });
                    }}
                  >
                    Anytime
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    id="morning"
                    onClick={() => {
                      setSelectedTravelTime("Morning");
                      setFormData({
                        ...formData,
                        preferredTravelTime: "Morning",
                      });
                    }}
                  >
                    Morning
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    id="afternoon"
                    onClick={() => {
                      setSelectedTravelTime("Afternoon");
                      setFormData({
                        ...formData,
                        preferredTravelTime: "Afternoon",
                      });
                    }}
                  >
                    Afternoon
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    id="evening"
                    onClick={() => {
                      setSelectedTravelTime("Evening");
                      setFormData({
                        ...formData,
                        preferredTravelTime: "Evening",
                      });
                    }}
                  >
                    Evening
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <Label className="text-lg font-bold mb-2">
              Select Popular Places
            </Label>
            <div className="grid gap-4">
              {popularPlaces.map((place) => (
                <Card
                  key={place.id}
                  className="p-4 border border-gray-200 rounded-md shadow-md"
                >
                  <input
                    type="checkbox"
                    id={place.id}
                    name={place.name}
                    checked={formData.selectedPlaces.some(
                      (item) => item.id === place.id
                    )}
                    onChange={(e) => handleCheckboxChange(e, "selectedPlaces")}
                  />
                  <label htmlFor={place.id}>{place.name}</label>
                </Card>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <Label className="text-lg font-bold mb-2">
              Select Popular Restaurants
            </Label>
            <div className="grid gap-4">
              {popularRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="p-4 border border-gray-200 rounded-md shadow-md"
                >
                  <input
                    type="checkbox"
                    id={restaurant.id}
                    name={restaurant.name}
                    checked={formData.selectedRestaurants.some(
                      (item) => item.id === restaurant.id
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "selectedRestaurants")
                    }
                  />
                  <label htmlFor={restaurant.id}>{restaurant.name}</label>
                </Card>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <Label className="text-lg font-bold mb-2">
              Select Popular Hotels
            </Label>
            <div className="grid gap-4">
              {popularHotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="p-4 border border-gray-200 rounded-md shadow-md"
                >
                  <input
                    type="checkbox"
                    id={hotel.id}
                    name={hotel.name}
                    checked={formData.selectedHotels.some(
                      (item) => item.id === hotel.id
                    )}
                    onChange={(e) => handleCheckboxChange(e, "selectedHotels")}
                  />
                  <label htmlFor={hotel.id}>{hotel.name}</label>
                </Card>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            {/* Display a summary of selected options */}
            <div className="border border-gray-200 p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Summary of Your Plan:
              </h2>
              <p>
                <strong>Destination:</strong> {formData.destination}
              </p>
              <p>
                <strong>Travel Dates:</strong> {formData.startDate} to{" "}
                {formData.endDate}
              </p>
              <p>
                <strong>Budget:</strong> {formData.budget}
              </p>
              <p>
                <strong>Travel Type:</strong> {formData.travelType}
              </p>
              <p>
                <strong>Number of Adults:</strong> {formData.numAdults}
              </p>
              <p>
                <strong>Number of Children:</strong> {formData.numChildren}
              </p>
              <p>
                <strong>Preferred Travel Time:</strong>{" "}
                {formData.preferredTravelTime}
              </p>
              <p>
                <strong>Selected Places:</strong>
              </p>
              <ul>
                {formData.selectedPlaces.map((place) => (
                  <li key={place.id}>{place.name}</li>
                ))}
              </ul>
              <p>
                <strong>Selected Restaurants:</strong>
              </p>
              <ul>
                {formData.selectedRestaurants.map((restaurant) => (
                  <li key={restaurant.id}>{restaurant.name}</li>
                ))}
              </ul>
              <p>
                <strong>Selected Hotels:</strong>
              </p>
              <ul>
                {formData.selectedHotels.map((hotel) => (
                  <li key={hotel.id}>{hotel.name}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentStep === 1 && (
              <div className="flex items-center gap-4">
                <LuMap className="h-6 w-6" />
                Step 1: Destination and Dates
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex items-center gap-4">
                <LuTag className="h-6 w-6" />
                Step 2: Budget Selection
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex items-center gap-4">
                <FiUsers className="h-6 w-6" />
                Step 3: Travel Details
              </div>
            )}
            {currentStep === 4 && (
              <div className="flex items-center gap-4">
                <LuMap className="h-6 w-6" />
                Step 4: Popular Places
              </div>
            )}
            {currentStep === 5 && (
              <div className="flex items-center gap-4">
                <LuMap className="h-6 w-6" />
                Step 5: Popular Restaurants
              </div>
            )}
            {currentStep === 6 && (
              <div className="flex items-center gap-4">
                <LuMap className="h-6 w-6" />
                Step 6: Popular Hotels
              </div>
            )}
            {currentStep === 7 && (
              <div className="flex items-center gap-4">
                <LuCheckCircle className="h-6 w-6" />
                Step 7: Confirmation and Itinerary Generation
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 &&
              "Enter your destination and select your travel dates."}
            {currentStep === 2 && "Select your budget preference."}
            {currentStep === 3 &&
              "Specify who you are traveling with and your preferred travel time."}
            {currentStep === 4 && "Select popular places you want to visit."}
            {currentStep === 5 && "Select popular restaurants to dine at."}
            {currentStep === 6 && "Select popular hotels for accommodation."}
            {currentStep === 7 &&
              "Review your selections before generating your itinerary."}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <div className="px-6 py-4 flex justify-between">
          {currentStep === 1 && (
            <Button variant="outline" onClick={handleCancelStep}>
              Cancel
            </Button>
          )}
          {currentStep !== 1 && (
            <Button variant="outline" onClick={handlePreviousStep}>
              Previous
            </Button>
          )}
          {currentStep !== 7 ? (
            <Button
              className="bg-indigo-500 hover:bg-indigo-400"
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              className="bg-indigo-500 hover:bg-indigo-400"
              onClick={handleGeneratePlan}
            >
              Generate Plan
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
