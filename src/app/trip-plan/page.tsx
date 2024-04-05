"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface Timeline {
  day: {
    hotel: string;
    places: string[];
    activities: string[];
    date: Date;
  }[];
}

const TripPlanPage: React.FC = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  if (plan) {
    try {
      const parsedPlan = plan as unknown as Timeline;
      console.log('Parsed Plan:', parsedPlan);

      return (
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Trip Plan</h1>
          {parsedPlan.day.map((day, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold mb-2">Day {index + 1}</h2>
              <p className="mb-2">Hotel: {day.hotel}</p>
              <p className="mb-2">Date: {day.date.toLocaleDateString()}</p>
              <h3 className="text-lg font-bold mb-2">Places</h3>
              <ul className="list-disc pl-4">
                {day.places.map((place, placeIndex) => (
                  <li key={placeIndex}>{place}</li>
                ))}
              </ul>
              <h3 className="text-lg font-bold mb-2">Activities</h3>
              <ul className="list-disc pl-4">
                {day.activities.map((activity, activityIndex) => (
                  <li key={activityIndex}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error('Error parsing plan data:', error);
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Trip Plan</h1>
          <p>Error loading plan data.</p>
        </div>
      );
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Trip Plan</h1>
      <p>No plan data available.</p>
    </div>
  );
};

export default TripPlanPage;