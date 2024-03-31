"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LuMap, LuTag} from "react-icons/lu";
import axios from "axios";
import {FiUsers} from "react-icons/fi";
import {CheckCheck, TicketCheckIcon} from "lucide-react";

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
    const [popularPlaces, setPopularPlaces] = useState({
        things_to_do_list: []
    });
    const [popularRestaurants, setPopularRestaurants] = useState([]);
    const [popularHotels, setPopularHotels] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);

    // useEffect(() => {
    //   // Fetch popular places, restaurants, and hotels based on the destination
    //   // This can be done using an API call
    //   // Example:
    //   // fetchPopularPlaces();
    //   // fetchPopularRestaurants();
    //   // fetchPopularHotels();
    // }, [formData.destination]);


    async function getPopularPlaces() {

        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/locations/search',
            params: {
                query: `${formData.destination}`,
                limit: '30',
                offset: '0',
                units: 'km',
                location_id: '1',
                currency: 'USD',
                sort: 'relevance',
                lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': 'fd4182cd10msh9b8fc7d77a696bep1632d6jsn1e6475ca59eb',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const data = response.data.data;
            const geos_result = data.filter((item) => item.result_type === 'geos')[0].result_object;
            const things_to_do = data.filter((item) => item.result_type === 'things_to_do')
            console.log(geos_result);

            //     Extract only information that we need from geos
            const name = geos_result.name;
            const timezone = geos_result.timezone;
            // const photos = geos_result.photo.images.medium.url;
            // TODO: mod by thousand and present as 5k instead of 5000...
            const activities = geos_result.category_counts.attractions.activities
            const attractions = geos_result.category_counts.attractions.attractions
            const shopping = geos_result.category_counts.attractions.shopping
            const restaurants = geos_result.category_counts.restaurants.total
            const geo_description = geos_result.geo_description
            const things_to_do_list = things_to_do.map((item) => {
                    return {
                        name: item.result_object.name,
                        category: item.result_object.category,
                        location_id: item.result_object.location_id,
                        rating: item.result_object.rating,
                        photo: item.result_object.photo.images.small.url,
                        open_now_text: item.result_object.open_now_text

                        //     latitude
                        //     longitude
                    }
                }
            )

            const response_temp = {
                name,
                timezone,
                activities,
                attractions,
                shopping,
                restaurants,
                geo_description,
                things_to_do_list
            }
            console.log(response_temp);
            // return response_temp;
            setPopularPlaces(response_temp)
        } catch (error) {
            console.error(error);
        }
    }

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

    useEffect(() => {
        if (currentStep === 4) {
            getPopularPlaces()
        }
    }, [currentStep]);

    function Buttons() {
        return (
            <div className="flex gap-x-5">
                {currentStep == 1 && (
                    <Button onClick={handleCancelStep} variant="outline">
                        Cancel
                    </Button>
                )}
                {currentStep > 1 && (
                    <Button onClick={handlePreviousStep} variant="outline">
                        Previous
                    </Button>
                )}
                {currentStep < 7 && (
                    <Button onClick={handleNextStep}>
                        Next
                    </Button>
                )}
                {currentStep === 7 && (
                    <Button onClick={handleGeneratePlan} variant="outline">
                        Generate Plan
                    </Button>
                )}
            </div>
        );
    }

    const handleCheckboxChange = (e: any, type: any) => {
        const {id, checked} = e.target;
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
                    <div className={"flex justify-center items-center h-screen"}>
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <div className="flex items-center gap-4">
                                        <LuMap className="h-6 w-6"/>
                                        Step 1: Destination and Dates
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    Enter your destination and select your travel dates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <Label className="sr-only" htmlFor="destination">
                                        Destination
                                    </Label>
                                    <Input
                                        id="destination"
                                        name="destination"
                                        placeholder="Enter your destination"
                                        value={formData.destination}
                                        onChange={(e) => {
                                            setFormData({...formData, destination: e.target.value})
                                        }
                                        }
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
                                                // onChange={handleInputChange}
                                                onChange={(e) => {
                                                    setFormData({...formData, startDate: e.target.value})
                                                }
                                                }
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
                                                // onChange={handleInputChange}
                                                onChange={(e) => {
                                                    setFormData({...formData, endDate: e.target.value})
                                                }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <Buttons/>
                            </CardFooter>

                        </Card>
                    </div>
                );
            case 2:
                return (
                    <div className={"flex justify-center items-center h-screen"}>
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <div className="flex items-center gap-4">
                                        <LuTag className="h-6 w-6"/>
                                        Step 2: Budget Selection
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    Select your budget for the trip
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button id="budget" variant="outline">
                                                {selectedBudget ? selectedBudget : "Select Budget"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Choose your budget</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                id="economy"
                                                onClick={() => {
                                                    setSelectedBudget("Economy");
                                                    setFormData({...formData, budget: "economy"});
                                                }}
                                            >
                                                Economy
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                id="normal"
                                                onClick={() => {
                                                    setSelectedBudget("Normal");
                                                    setFormData({...formData, budget: "normal"});
                                                }}
                                            >
                                                Normal
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                id="luxury"
                                                onClick={() => {
                                                    setSelectedBudget("Luxury");
                                                    setFormData({...formData, budget: "luxury"});
                                                }}
                                            >
                                                Luxury
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <Buttons/>
                            </CardFooter>
                        </Card>
                    </div>
                );
            case 3:
                return (
                    <div className={"flex justify-center items-center h-screen"}>
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <div className="flex items-center gap-4">
                                        <FiUsers className="h-6 w-6"/>
                                        Step 3: Travel Details
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    Specify who you are travelling with and your preferred travel time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
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
                                                setFormData({...formData, travelType: "solo"});
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
                                                setFormData({...formData, travelType: "partner"});
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
                                                setFormData({...formData, travelType: "family"});
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
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem
                                                        id="1"
                                                        onClick={() => {
                                                            setSelectedNumAdults("1");
                                                            setFormData({...formData, numAdults: "1"});
                                                        }}
                                                    >
                                                        1
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="2"
                                                        onClick={() => {
                                                            setSelectedNumAdults("2");
                                                            setFormData({...formData, numAdults: "2"});
                                                        }}
                                                    >
                                                        2
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="3"
                                                        onClick={() => {
                                                            setSelectedNumAdults("3");
                                                            setFormData({...formData, numAdults: "3"});
                                                        }}
                                                    >
                                                        3
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="4"
                                                        onClick={() => {
                                                            setSelectedNumAdults("4");
                                                            setFormData({...formData, numAdults: "4"});
                                                        }}
                                                    >
                                                        4
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="5"
                                                        onClick={() => {
                                                            setSelectedNumAdults("5");
                                                            setFormData({...formData, numAdults: "5"});
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
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem
                                                        id="0"
                                                        onClick={() => {
                                                            setSelectedNumChildren("0");
                                                            setFormData({...formData, numChildren: "0"});
                                                        }}
                                                    >
                                                        0
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="1"
                                                        onClick={() => {
                                                            setSelectedNumChildren("1");
                                                            setFormData({...formData, numChildren: "1"});
                                                        }}
                                                    >
                                                        1
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="2"
                                                        onClick={() => {
                                                            setSelectedNumChildren("2");
                                                            setFormData({...formData, numChildren: "2"});
                                                        }}
                                                    >
                                                        2
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="3"
                                                        onClick={() => {
                                                            setSelectedNumChildren("3");
                                                            setFormData({...formData, numChildren: "3"});
                                                        }}
                                                    >
                                                        3
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        id="4"
                                                        onClick={() => {
                                                            setSelectedNumChildren("4");
                                                            setFormData({...formData, numChildren: "4"});
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
                                                <DropdownMenuSeparator/>
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
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <Buttons/>
                            </CardFooter>
                        </Card>
                    </div>
                );
            case 4:
                return (
                    <div className={"flex flex-col justify-end gap-y-2 p-4"}>
                        {/*    Print values of all popular places*/}
                        {/*<h1 className="text-lg font-bold">Popular Places</h1>*/}
                        {/*<ul>*/}
                        {/*    <li>Activities: {popularPlaces.activities}</li>*/}
                        {/*    <li>Attractions: {popularPlaces.attractions}</li>*/}
                        {/*    <li>Shopping: {popularPlaces.shopping}</li>*/}
                        {/*    <li>Restaurants: {popularPlaces.restaurants}</li>*/}
                        {/*    <li>Geo Description: {popularPlaces.geo_description}</li>*/}
                        {/*</ul>*/}
                        <div className={"flex bg-muted p-6 rounded-2xl"}>
                            <Card>
                                <CardContent>
                                    Test Card
                                </CardContent>
                            </Card>
                            <div className={"flex flex-col items-start max-w-4xl"}>
                                <h1 className={"text-3xl font-bold p-4"}>{popularPlaces.name}</h1>
                                <p className={"text-foreground p-4"}>{popularPlaces.geo_description}</p>
                                <div className={"flex gap-x-4 px-4"}>
                                    <p>{popularPlaces.activities}+ activities</p>
                                    <p>{popularPlaces.attractions}+ attractions</p>
                                    <p>{popularPlaces.shopping}+ shopping</p>
                                    <p>{popularPlaces.restaurants}+ restaurants</p>
                                </div>
                            </div>
                        </div>
                        {/*    Cards , second row */}
                        <div>
                            <h1 className={"text-3xl font-bold p-4 text-center"}>Popular Attractions</h1>
                            <div className={"flex overflow-x-scroll m-2 flex-wrap justify-center"}>
                                {popularPlaces.things_to_do_list.map((place) => (
                                    <Card key={place.location_id} className={"p-2 m-2 w-64 hover:bg-secondary"}>
                                        <CardContent className={"flex flex-col gap-y-2"}>
                                            {/*photo: item.result_object.photo.images.original.url,*/}
                                            <img src={place.photo} alt={place.name}
                                                 className={"rounded-2xl w-48 h-48 p-2"}/>
                                            <p className={"font-bold text-wrap"}>{place.name}</p>
                                            <p>
                                                {place.rating}
                                            </p>
                                            <p>
                                                {place.open_now_text ? place.open_now_text : "Status not available"}
                                            </p>
                                            <Button
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        selectedPlaces: [...formData.selectedPlaces, place]
                                                    })
                                                //     Change button text to remove from plan, and functionality to remove from plan

                                                }
                                                }
                                                className={"w-32 self-center justify-self-end"}
                                            >
                                               <CheckCheck className={"h-6 w-6"}/>
                                                Add to Plan
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                )
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
        <div>
            {renderStepContent()}
        </div>
    )
}


