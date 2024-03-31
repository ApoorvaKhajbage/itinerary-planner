"use client"
import React from "react";

interface PlanCardProps {
    title: string;
    description: string;
}

const PlanCard = ({ title, description }: PlanCardProps) => {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default PlanCard;
