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
import {
    Baby,
    BarChart2,
    Bed,
    Calendar,
    CheckCheck,
    CheckCircle,
    Clock,
    Drama,
    FileCheck,
    Globe,
    Goal,
    HandCoins,
    Handshake,
    Hotel,
    LandPlot,
    MapPin,
    Phone,
    Plane,
    StarIcon,
    Users,
    Wand
} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

interface timeLine {
    hotel: string;
    places: string[];
    activities: string[];
    date: string;
}

export default function ItineraryForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: "Paris",
        startDate: new Date().toISOString().split("T")[0],
        // Add 7 days to the start date
        endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        budget: "Normal",
        travelType: "solo",
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
    const [extraDetails, setExtraDetails] = useState<{
        name: any;
        rating: any;
        photo: any;
        address: any;
        phone: any;
        website: any;
        description: any;
        num_reviews: any;
        ranking_category: any;
        ranking_subcategory: any;
    } | null>(null);
    // create generatedPlan state with type timeLine array
    const [generatedPlan, setGeneratedPlan] = useState<timeLine[]>([]);
    const [showGeneratedPlan, setShowGeneratedPlan] = useState(false);


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
            const geos_result = data.filter((item: any) => item.result_type === 'geos')[0].result_object;
            const things_to_do = data.filter((item: any) => item.result_type === 'things_to_do')
            const lodging = data.filter((item: any) => item.result_type === 'lodging' || item.result_type === 'restaurants' || item.result_type === 'hotels')
            const available_activities = data.filter((item: any) => item.result_type === 'activities')

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
            const photo = geos_result.photo.images.small.url
            const things_to_do_list = things_to_do.map((item: any) => {
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
            const popularHotels = lodging.map((item: any) => {
                return {
                    name: item.result_object.name,
                    location_id: item.result_object.location_id,
                    latitude: item.result_object.latitude,
                    longitude: item.result_object.longitude,
                    photo: item.result_object.photo.images.small.url,
                    rating: item.result_object.rating,
                    open_now_text: item.result_object.open_now_text
                }
            })
            const activities_list = available_activities.map((item: any) => {
                return {
                    name: item.result_object.name,
                    location_id: item.result_object.location_id,
                    latitude: item.result_object.latitude,
                    longitude: item.result_object.longitude,
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
                photo,
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

    // Extra details fetching function
    async function getExtraDetails(locationId: any) {
        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/attractions/get-details',
            params: {
                location_id: locationId,
                currency: 'USD',
                lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': 'fd4182cd10msh9b8fc7d77a696bep1632d6jsn1e6475ca59eb',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const data = response.data;

            // Extract only the information needed for the dialog
            const name = data.name
            const rating = data.raw_ranking
            const photo = data.photo.images.original.url;
            const address = data.address;
            const phone = data.phone;
            const website = data.web_url;
            const description = data.description;
            const num_reviews = data.num_reviews;
            const ranking_category = data.ranking_category;
            const ranking_subcategory = data.ranking_subcategory;

            const extraDetails = {
                name,
                rating,
                photo,
                address,
                phone,
                website,
                description,
                num_reviews,
                ranking_category,
                ranking_subcategory

            };

            return extraDetails;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Functions to handle form data


    const handleCardClick = async (locationId: any) => {
        console.log("Card clicked, Location ID:", locationId);
        try {
            const details = await getExtraDetails(locationId);
            console.log("Extra details:", details);
            setExtraDetails(details);
        } catch (error) {
            console.error('Error fetching extra details:', error);
        }
    };


    const handleAddToPlaces = (place: any) => {
        console.log("Clicked: ", place); // Add this line for debugging
        if (formData.selectedPlaces.includes(place)) {
            console.log("Removing place: ", place); // Add this line for debugging
            setFormData({
                ...formData,
                selectedPlaces: formData.selectedPlaces.filter((p) => p !== place),
            });
        } else {
            console.log("Adding place: ", place); // Add this line for debugging
            setFormData({
                ...formData,
                selectedPlaces: [...formData.selectedPlaces, place],
            });
        }
    };


    const handleAddToSelectedHotels = (hotel: any) => {
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

    const handleAddToSelectedActivities = (activity: any) => {
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

    const handleGeneratePlan = async () => {
        try {
            const plan = await generatePlan(formData);

            setGeneratedPlan(plan.days);
            console.log(plan.days);
            setShowGeneratedPlan(true);
        } catch (error) {
            console.error("Error generating plan:", error);
            // Display an error message to the user

        }
    };

    const generatePlan = async (formData: any): Promise<timeLine> => {
        const datas = JSON.stringify(formData);
        const prompt = getPrompt(datas);

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        };

        const apiUrl =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyBNJh-Z4JdnkFa3l0gfGw-FyNL4iRWd2fY";

        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`Error from API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            const jsonData = data.candidates[0].content.parts[0].text;
            console.log(jsonData);
            return JSON.parse(jsonData) as timeLine;
        } else {
            throw new Error("No response data available");
        }
    };

    const saveGeneratedPlan = async () => {
        try {
            let days = generatedPlan
            // console.log(days)
            const response = await fetch('/api/plan/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //Send days, destination,  startDate, endDate, budget, travelType, numAdults, numChildren
                body: JSON.stringify(
                    {
                        days,
                        destination: formData.destination,
                        startDate: formData.startDate,
                        endDate: formData.endDate,
                        budget: formData.budget,
                        travelType: formData.travelType,
                        numAdults: formData.numAdults,
                        numChildren: formData.numChildren
                    }
                )
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getPrompt = (data: string): string => {
        return `This is the stringified version of formData : ${data}
        timeline structure:
        interface timeLine{
            days:
            {
                hotel:string;
                places:string[];
                activities:string[];
                date:Date;
            }
        
        }
        I want you to return a valid JSON object strictly following the above timeline structure schema. Use the above formData to plan the trip timeline with place and date. The date should be bounded between the given start date and end date. The places can be places, hotels, or activities. Avoid placing two hotels on the same date, and each day should have one hotel and can have multiple places and activities. Consider the latitude and longitude properties to estimate the distance and group the activities, places, and hotels accordingly for the day. Do not include any additional formatting like` + "```json``` in the response.Give all the days in a 'days' array.strictly dont add ```json``` in the response";
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
                    <Button onClick={handleNextStep} className="bg-indigo-500 hover:bg-indigo-400">
                        Next
                    </Button>
                )}
                {currentStep === 7 && (
                    <Button onClick={handleGeneratePlan}
                            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400">
                        <Wand/>
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
                                    <Label htmlFor="destination">
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
                    <div className="flex flex-col justify-end gap-y-2 p-4">
                        {/* Information part */}
                        <div className="flex flex-col lg:flex-row bg-muted p-6 rounded-2xl">
                            <Card>

                                <img src={popularPlaces.photo} alt={popularPlaces.name}
                                     className="rounded-2xl w-48 h-48 p-2"/>
                                <p className="flex justify-center">{popularPlaces.name}</p>

                            </Card>
                            <div className="flex flex-col items-start max-w-4xl">
                                <h1 className="text-3xl font-bold p-4">{popularPlaces.name}</h1>
                                <p className="text-foreground p-4">{popularPlaces.geo_description}</p>
                                <div className="flex gap-x-4 px-4">
                                    <p>{popularPlaces.activities}+ activities</p>
                                    <p>{popularPlaces.attractions}+ attractions</p>
                                    <p>{popularPlaces.shopping}+ shopping</p>
                                    <p>{popularPlaces.restaurants}+ restaurants</p>
                                </div>
                            </div>
                        </div>
                        {/* Cards, second row */}
                        <div>
                            <h1 className="text-3xl font-bold p-4 text-center">Popular Attractions</h1>
                            <div className="flex overflow-x-scroll m-2 flex-wrap justify-center">
                                <Dialog>
                                    {popularPlaces.things_to_do_list.map((place) => (

                                        <Card
                                            className={"p-2 m-2 w-64 hover:bg-secondary"}

                                        >
                                            <DialogTrigger key={place.location_id}>
                                                <CardContent className={"flex flex-col gap-y-2"}
                                                             onClick={() => handleCardClick(place.location_id)}>
                                                    <img src={place.photo} alt={place.name}
                                                         className={"rounded-2xl w-full max-w-48 h-48 p-2"}/>
                                                    <p className={"font-bold text-wrap"}>{place.name}</p>
                                                    <p>{place.rating}</p>
                                                    <p>{place.open_now_text ? place.open_now_text : "Status not available"}</p>

                                                </CardContent>
                                            </DialogTrigger>
                                            {/* Add a container for the button */}
                                            <div className="flex justify-center mt-auto">
                                                <Button
                                                    onClick={() => handleAddToPlaces(place)}
                                                    className={`w-32 items-center ${
                                                        formData.selectedPlaces.includes(place) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-indigo-500 hover:bg-indigo-400'
                                                    }`}
                                                >
                                                    {formData.selectedPlaces.includes(place) ? (
                                                        <>
                                                            <CheckCheck className={"h-6 w-6"}/>
                                                            Added
                                                        </>
                                                    ) : (
                                                        'Add to Plan'
                                                    )}
                                                </Button>
                                            </div>
                                        </Card>

                                    ))}
                                    <DialogContent className="p-4">
                                        {extraDetails ? (
                                            <>
                                                <h1 className="text-2xl font-bold">{extraDetails.name}</h1>
                                                <p className="text-gray-500 flex items-center">
                                                    <span className="mr-2"><StarIcon/></span>{extraDetails.rating}
                                                </p>
                                                <img src={extraDetails.photo} alt={extraDetails.name}
                                                     className="rounded-lg w-full h-auto max-h-96"/>
                                                <p className="mt-4 text-gray-700">{extraDetails.description}</p>
                                                <p className="mt-2 flex items-center"><span
                                                    className="mr-2"><MapPin/></span>{extraDetails.address}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Phone/></span>{extraDetails.phone}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Globe/></span><a href={extraDetails.website}
                                                                                       target="_blank"
                                                                                       rel="noopener noreferrer"
                                                                                       className="text-blue-600">{extraDetails.website}</a>
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Drama/></span>{extraDetails.num_reviews}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_category}
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_subcategory}
                                                </p>
                                            </>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </DialogContent>

                                </Dialog>

                            </div>
                        </div>
                        <div className="place-self-end">
                            <Buttons/>
                        </div>

                    </div>

                )
            case 5:

                return (
                    <div className={"flex flex-col justify-end gap-y-2 p-4"}>
                        <div className={"flex bg-muted p-6 rounded-2xl"}>
                            <Card>

                                <img src={popularPlaces.photo} alt={popularPlaces.name}
                                     className="rounded-2xl w-48 h-48 p-2"/>
                                <p className="flex justify-center">{popularPlaces.name}</p>

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
                                <Dialog>
                                    {popularPlaces.popularHotels.map((place) => (
                                        <Card key={place.location_id}
                                              className={"p-2 m-2 w-64 hover:bg-secondary"}
                                        >
                                            <DialogTrigger key={place.location_id}>
                                                <CardContent className={"flex flex-col gap-y-2"}
                                                             onClick={() => handleCardClick(place.location_id)}>
                                                    {/*photo: item.result_object.photo.images.original.url,*/}
                                                    <img src={place.photo} alt={place.name}
                                                         className={"rounded-2xl w-full max-w-48 h-48 p-2"}/>
                                                    <p className={"font-bold text-wrap"}>{place.name}</p>
                                                    <p>
                                                        {place.rating}
                                                    </p>
                                                    <p>
                                                        {place.open_now_text ? place.open_now_text : "Status not available"}
                                                    </p>
                                                </CardContent>
                                            </DialogTrigger>
                                            {/* Add a container for the button */}
                                            <div className="flex justify-center mt-auto">
                                                <Button
                                                    onClick={() => handleAddToSelectedHotels(place)}
                                                    className={`w-32 items-center ${
                                                        formData.selectedHotels.includes(place) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-indigo-500 hover:bg-indigo-400'
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
                                            </div>
                                        </Card>
                                    ))}
                                    <DialogContent className="p-4">
                                        {extraDetails ? (
                                            <>
                                                <h1 className="text-2xl font-bold">{extraDetails.name}</h1>
                                                <p className="text-gray-500 flex items-center">
                                                    <span className="mr-2"><StarIcon/></span>{extraDetails.rating}
                                                </p>
                                                <img src={extraDetails.photo} alt={extraDetails.name}
                                                     className="rounded-lg w-full h-auto max-h-96"/>
                                                <p className="mt-4 text-gray-700">{extraDetails.description}</p>
                                                <p className="mt-2 flex items-center"><span
                                                    className="mr-2"><MapPin/></span>{extraDetails.address}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Phone/></span>{extraDetails.phone}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Globe/></span><a href={extraDetails.website}
                                                                                       target="_blank"
                                                                                       rel="noopener noreferrer"
                                                                                       className="text-blue-600">{extraDetails.website}</a>
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Drama/></span>{extraDetails.num_reviews}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_category}
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_subcategory}
                                                </p>
                                            </>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </DialogContent>
                                </Dialog>
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

                                <img src={popularPlaces.photo} alt={popularPlaces.name}
                                     className="rounded-2xl w-48 h-48 p-2"/>
                                <p className="flex justify-center">{popularPlaces.name}</p>

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
                                <Dialog>
                                    {popularPlaces.activities_list.map((place) => (
                                        <Card key={place.location_id}
                                              className={"p-2 m-2 w-64 hover:bg-secondary"}

                                        >
                                            <DialogTrigger key={place.location_id}>
                                                <CardContent className={"flex flex-col gap-y-2"}
                                                             onClick={() => handleCardClick(place.location_id)}>
                                                    {/*photo: item.result_object.photo.images.original.url,*/}
                                                    <img src={place.photo} alt={place.name}
                                                         className={"rounded-2xl w-full max-w-48 h-48 p-2"}/>
                                                    <p className={"font-bold text-wrap"}>{place.name}</p>
                                                    <p>
                                                        {place.rating}
                                                    </p>
                                                    <p>
                                                        {place.is_closed ? place.is_closed : "Status not available"}
                                                    </p>

                                                </CardContent>
                                            </DialogTrigger>
                                            {/* Add a container for the button */}
                                            <div className="flex justify-center mt-auto">
                                                <Button
                                                    onClick={() => handleAddToSelectedActivities(place)}
                                                    className={`w-32 items-center ${
                                                        formData.selectedActivities.includes(place) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-indigo-500 hover:bg-indigo-400'
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
                                            </div>
                                        </Card>
                                    ))}
                                    <DialogContent className="p-4 max-w-lg w-full">
                                        {extraDetails ? (
                                            <>
                                                <h1 className="text-2xl font-bold">{extraDetails.name}</h1>
                                                <p className="text-gray-500 flex items-center">
                                                    <span className="mr-2"><StarIcon/></span>{extraDetails.rating}
                                                </p>
                                                <img src={extraDetails.photo} alt={extraDetails.name}
                                                     className="rounded-lg w-full  max-h-96"/>
                                                <p className="mt-4 text-gray-700">{extraDetails.description}</p>
                                                <p className="mt-2 flex items-center"><span
                                                    className="mr-2"><MapPin/></span>{extraDetails.address}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Phone/></span>{extraDetails.phone}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Globe/></span><a href={extraDetails.website}
                                                                                       target="_blank"
                                                                                       rel="noopener noreferrer"
                                                                                       className="text-blue-600">{extraDetails.website}</a>
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><Drama/></span>{extraDetails.num_reviews}</p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_category}
                                                </p>
                                                <p className="flex items-center"><span
                                                    className="mr-2"><BarChart2/></span>{extraDetails.ranking_subcategory}
                                                </p>
                                            </>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </div>
                        <div className={"place-self-end"}>
                            <Buttons/>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="flex justify-around items-center h-screen">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle className="h-6 w-6"/>
                                        <span>Step 7: Confirmation and Itinerary Generation</span>
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    Review your selections before generating your itinerary.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <Label className="flex items-center gap-2 text-2xl font-bold">
                                            <Plane className="h-8 w-8"/>
                                            <span>{formData.destination}</span>
                                        </Label>
                                    </div>
                                    <div className="flex-col mt-2 ">
                                        <Label className="flex items-center gap-2">
                                            <FileCheck className="h-8 w-8"/>
                                            <span className="font-bold text-xl">Itinerary Details</span>
                                        </Label>
                                        <div className="flex flex-col gap-2">
                                            <p className="flex gap-2 mt-4">
                                                <Calendar/>
                                                <span>Date: {formData.startDate} - {formData.endDate}</span>
                                            </p>
                                            <p className="flex items-center gap-2 mt-2">
                                                <HandCoins className="h-6 w-6"/>
                                                Budget: {formData.budget}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Handshake className="h-6 w-6"/>
                                                Travel Type: {formData.travelType}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Users className="h-6 w-6"/>
                                                Number of Adults: {formData.numAdults}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Baby className="h-6 w-6"/>
                                                Number of Children: {formData.numChildren}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-6 w-6"/>
                                                Preferred Travel Time: {formData.preferredTravelTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="flex items-center gap-2 font-bold text-xl">
                                            <LandPlot className="h-8 w-8"/>
                                            <span>Selected Places:</span>
                                        </Label>
                                        <ul>
                                            {formData.selectedPlaces.map((place) => (
                                                <li key={place.location_id}>{place.name}</li>
                                            ))}
                                        </ul>
                                        <Label className="flex items-center gap-2 font-bold text-xl">
                                            <Bed className="h-8 w-8"/>
                                            <span>Selected Hotels:</span>
                                        </Label>
                                        <ul>
                                            {formData.selectedHotels.map((hotel) => (
                                                <li key={hotel.location_id}>{hotel.name}</li>
                                            ))}
                                        </ul>
                                        <Label className="flex items-center gap-2 font-bold text-xl">
                                            <Goal className="h-8 w-8"/>
                                            <span>Selected Activities:</span>
                                        </Label>
                                        <ul>
                                            {formData.selectedActivities.map((activity) => (
                                                <li key={activity.location_id}>{activity.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <Buttons/>
                            </CardFooter>
                        </Card>
                        {showGeneratedPlan && (
                            <div>
                                <h1 className="text-2xl font-bold">Generated Plan</h1>
                                <div className="flex flex-col gap-4">
                                    {/* {generatedPlan.map((day, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Day {index + 1}</h2>
                {day.hotel && <p>Hotel: {day.hotel}</p>}
                {day.places && <p>Places: {day.places.join(", ")}</p>}
                {day.activities && <p>Activities: {day.activities.join(", ")}</p>}
                {day.date && <p>Date: {day.date}</p>}
              </div>
            ))} */}
                                    <Carousel
                                        className="w-full max-w-xl rounded-xl"
                                    >
                                        <CarouselContent>
                                            {generatedPlan.map((day, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="p-1">
                                                        <Card>
                                                            <CardContent
                                                                className="flex flex-col items-center justify-center p-6">
                                                                <h2 className="text-xl font-bold">Day {index + 1}</h2>
                                                                <p>
                                                                    <Hotel className="h-4 w-4"/>
                                                                    {day.hotel && <p>Hotel: {day.hotel}</p>}
                                                                </p>
                                                                {day.places && <p>Places: {day.places.join(", ")}</p>}
                                                                {day.activities &&
                                                                    <p>Activities: {day.activities.join(", ")}</p>}
                                                                {day.date && <p>Date: {day.date}</p>}
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious/>
                                        <CarouselNext/>
                                    </Carousel>
                                    <Button onClick={saveGeneratedPlan}>Save Plan</Button>

                                </div>

                            </div>
                        )}
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


// {
//     "days": [
//         {
//             "date": "2024-04-05",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [
//                 "Paris Metro"
//             ],
//             "activities": [
//                 "Paris Walking Food Tour with Secret Food Tours"
//             ]
//         },
//         {
//             "date": "2024-04-06",
//             "hotel": "Saint James Paris",
//             "places": [
//                 "The Paris Catacombs"
//             ],
//             "activities": []
//         },
//         {
//             "date": "2024-04-07",
//             "hotel": "Hyatt Paris Madeleine",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-08",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-09",
//             "hotel": "Saint James Paris",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-10",
//             "hotel": "Hyatt Paris Madeleine",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-11",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [],
//             "activities": []
//         }
//     ]
// }