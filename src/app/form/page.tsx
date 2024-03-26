"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LuMap } from "react-icons/lu";
import { LuTag } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import { useState } from 'react';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function ItineraryForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGeneratePlan = () => {
    // Logic to generate plan
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid gap-4">
            <div>
              <Label className="sr-only" htmlFor="destination">Destination</Label>
              <Input id="destination" placeholder="Enter your destination" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start" className="block text-sm font-medium">Start Date</Label>
                <Input id="start" placeholder="Select date" type="date" />
              </div>
              <div>
                <Label htmlFor="end" className="block text-sm font-medium">End Date</Label>
                <Input id="end" placeholder="Select date" type="date" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Content for Step 2 (Budget Selection) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button id="budget" variant="outline">Select Budget</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Choose your budget</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem id="economy">Economy</DropdownMenuItem>
                    <DropdownMenuItem id="normal">Normal</DropdownMenuItem>
                    <DropdownMenuItem id="luxury">Luxury</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              
          </div>
        );
      case 3:
        return (
            <div className="grid gap-4">
            <RadioGroup defaultValue="solo">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="solo" value="solo" />
                <Label htmlFor="solo" className="font-medium text-sm peer-checked:font-semibold peer-checked:text-base">Solo</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="partner" value="partner" />
                <Label htmlFor="partner" className="font-medium text-sm peer-checked:font-semibold peer-checked:text-base">Partner</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="family" value="family" />
                <Label htmlFor="family" className="font-medium text-sm peer-checked:font-semibold peer-checked:text-base">Family</Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
  <div>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select number of adults</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose number of adults</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem id="1">1</DropdownMenuItem>
        <DropdownMenuItem id="2">2</DropdownMenuItem>
        <DropdownMenuItem id="3">3</DropdownMenuItem>
        <DropdownMenuItem id="4">4</DropdownMenuItem>
        <DropdownMenuItem id="5">5</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select number of children</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose number of children</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem id="0">0</DropdownMenuItem>
        <DropdownMenuItem id="1">1</DropdownMenuItem>
        <DropdownMenuItem id="2">2</DropdownMenuItem>
        <DropdownMenuItem id="3">3</DropdownMenuItem>
        <DropdownMenuItem id="4">4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div>
  
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select preferred travel time</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose preferred travel time</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem id="anytime">Anytime</DropdownMenuItem>
        <DropdownMenuItem id="morning">Morning</DropdownMenuItem>
        <DropdownMenuItem id="afternoon">Afternoon</DropdownMenuItem>
        <DropdownMenuItem id="evening">Evening</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>

            </div>
        );
      case 4:
        return (
          <div>
            {/* Content for Step 4 (Confirmation and Itinerary Generation) */}
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
                <LuCheckCircle className="h-6 w-6" />
                Step 4: Confirmation and Itinerary Generation
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && (
              "Enter your destination and select your travel dates."
            )}
            {currentStep === 2 && (
              "Select your budget preference."
            )}
            {currentStep === 3 && (
              "Specify who you are traveling with and your preferred travel time."
            )}
            {currentStep === 4 && (
              "Review your selections before generating your itinerary."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
        <div className="px-6 py-4 flex justify-between">
          {currentStep !== 1 && (
            <Button variant="outline" onClick={handlePreviousStep}>Previous</Button>
          )}
          {currentStep !== 4 ? (
            <Button className="bg-indigo-500 hover:bg-indigo-400" onClick={handleNextStep}>Next</Button>
          ) : (
            <Button className="bg-indigo-500 hover:bg-indigo-400" onClick={handleGeneratePlan}>Generate Plan</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
