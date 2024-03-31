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
import {CheckCheck} from "lucide-react";

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
        selectedHotels: [],
        selectedActivities: [],
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBudget, setSelectedBudget] = useState("");
    const [selectedNumAdults, setSelectedNumAdults] = useState("1");
    const [selectedNumChildren, setSelectedNumChildren] = useState("0");
    const [selectedTravelTime, setSelectedTravelTime] = useState("anytime");
    const [selectedTravelType, setSelectedTravelType] = useState("");
    const [popularPlaces, setPopularPlaces] = useState({
        things_to_do_list: [],
        popularHotels: [],
        activities_list: [],
    });

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
            const lodging = data.filter((item) => item.result_type === 'lodging')
            const available_activities = data.filter((item) => item.result_type === 'activities')

            // console.log(geos_result);

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
            const popularHotels = lodging.map((item) => {
                return {
                    name: item.result_object.name,
                    location_id: item.result_object.location_id,
                    photo: item.result_object.photo.images.small.url,
                    rating: item.result_object.rating,
                    open_now_text: item.result_object.open_now_text
                }
            })
            const activities_list = available_activities.map((item) => {
                return {
                    name: item.result_object.name,
                    location_id: item.result_object.location_id,
                    photo: item.result_object.photo.images.small.url,
                    rating: item.result_object.rating,
                    is_closed: item.result_object.is_closed
                }
            })

            const response_temp = {
                name,
                timezone,
                activities,
                attractions,
                shopping,
                restaurants,
                geo_description,
                things_to_do_list,
                popularHotels,
                activities_list
            }
            // console.log(response_temp);
            // return response_temp;
            setPopularPlaces(response_temp)
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToPlаces = (place) => {
        if (formData.selectedPlaces.includes(place)) {
            setFormData({
                ...formData,
                selectedPlaces: formData.selectedPlaces.filter((p) => p !== place),
            });
        } else {
            setFormData({
                ...formData,
                selectedPlaces: [...formData.selectedPlaces, place],
            });
            // console.log("Places: ", formData.selectedPlaces)
        }
    };

    const handleAddToSelectedHotels = (hotel) => {
        if (formData.selectedHotels.includes(hotel)) {
            setFormData({
                ...formData,
                selectedHotels: formData.selectedHotels.filter((h) => h !== hotel),
            });
        } else {
            setFormData({
                ...formData,
                selectedHotels: [...formData.selectedHotels, hotel],
            });
            // console.log("Hotels: ", formData.selectedHotels)
        }

    }

    const handleAddToSelectedActivities = (activity) => {
        if (formData.selectedActivities.includes(activity)) {
            setFormData({
                ...formData,
                selectedActivities: formData.selectedActivities.filter((a) => a !== activity),
            });
        } else {
            setFormData({
                ...formData,
                selectedActivities: [...formData.selectedActivities, activity],
            });
            console.log("Activities: ", formData.selectedActivities)
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

    ;

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

                        {/*Information part*/}
                        <div className={"flex flex-col lg:flex-row bg-muted p-6 rounded-2xl"}>
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
                                                onClick={() => handleAddToPlаces(place)}
                                                className={`w-32 self-center justify-self-end ${
                                                    formData.selectedPlaces.includes(place)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                                        : ''
                                                }`}
                                            >
                                                {/*  TODO: hide added message after 2-3 seconds and change button to remove*/}
                                                {formData.selectedPlaces.includes(place) ? (
                                                    <>
                                                        <CheckCheck className={"h-6 w-6"}/>
                                                        Added
                                                    </>
                                                ) : (
                                                    'Add to Plan'
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className={"place-self-end"}>
                            <Buttons/>
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className={"flex flex-col justify-end gap-y-2 p-4"}>
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
                        {/*    Cards , second row  case 5*/}
                        <div>
                            <h1 className={"text-3xl font-bold p-4 text-center"}>Hotels and Restaurants</h1>
                            <div className={"flex overflow-x-scroll m-2 flex-wrap justify-center"}>
                                {popularPlaces.popularHotels.map((place) => (
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
                                                onClick={() => handleAddToSelectedHotels(place)}
                                                className={`w-32 self-center justify-self-end ${
                                                    formData.selectedHotels.includes(place)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                                        : ''
                                                }`}
                                            >
                                                {formData.selectedHotels.includes(place) ? (
                                                    <>
                                                        <CheckCheck className={"h-6 w-6"}/>
                                                        Added
                                                    </>
                                                ) : (
                                                    'Add to Plan'
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className={"place-self-end"}>
                            <Buttons/>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className={"flex flex-col justify-end gap-y-2 p-4"}>
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
                        {/*    Cards , second row  case 5*/}
                        <div>
                            <h1 className={"text-3xl font-bold p-4 text-center"}>Popular Activities</h1>
                            <div className={"flex overflow-x-scroll m-2 flex-wrap justify-center"}>
                                {popularPlaces.activities_list.map((place) => (
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
                                                {place.is_closed ? place.is_closed : "Status not available"}
                                            </p>
                                            <Button
                                                onClick={() => handleAddToSelectedActivities(place)}
                                                className={`w-32 self-center justify-self-end ${
                                                    formData.selectedActivities.includes(place)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                                        : ''
                                                }`}
                                            >
                                                {formData.selectedActivities.includes(place) ? (
                                                    <>
                                                        <CheckCheck className={"h-6 w-6"}/>
                                                        Added
                                                    </>
                                                ) : (
                                                    'Add to Plan'
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className={"place-self-end"}>
                            <Buttons/>
                        </div>
                    </div>
                );
            case 7:
                return (
                //     Display summary of entire plan
                    <div>
                        <h1>Summary</h1>
                        <ul>
                            <li>Destination: {formData.destination}</li>
                            <li>Start Date: {formData.startDate}</li>
                            <li>End Date: {formData.endDate}</li>
                            <li>Budget: {formData.budget}</li>
                            <li>Travel Type: {formData.travelType}</li>
                            <li>Number of Adults: {formData.numAdults}</li>
                            <li>Number of Children: {formData.numChildren}</li>
                            <li>Preferred Travel Time: {formData.preferredTravelTime}</li>
                            <li><b>Selected Places:</b>
                                {formData.selectedPlaces.map((place) => (
                                    <li key={place.location_id}>
                                        {place.name,place.location_id}
                                    </li>
                                ))}
                            </li>
                            <li><b>Selected Hotels: </b>{formData.selectedHotels.map((hotel) => (
                                <li key={hotel.location_id}>
                                    {hotel.name}
                                </li>
                            ))}</li>
                            <li><b>Selected Activities:</b> {formData.selectedActivities.map((activity) => (

                                <li key={activity.location_id}>
                                    {activity.name}
                                </li>
                            ))}</li>
                        </ul>
                        <Buttons/>
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


