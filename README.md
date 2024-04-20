# Personalized Itinerary Planner

Welcome to the Personalized Itinerary Planner repository! This project is a Next.js application designed to assist users in creating personalized travel itineraries. With a combination of technologies such as Next.js, MongoDB, Tailwind CSS, Nodemailer, and more, users can register, create, save, and regenerate their travel plans seamlessly.

## Why Personalized Itinerary Planner?

Travel planning can be a daunting task, especially when trying to cater to individual preferences and constraints. Our application simplifies this process by allowing users to create customized itineraries tailored to their specific needs. Whether it's budget considerations, travel preferences, or desired destinations, our system streamlines the planning process, saving users time and effort.

## Functionalities

- **User Registration**: Users can sign up for an account to access the itinerary planning features.
- **Dashboard**: Once logged in, users are presented with a dashboard where they can view their created plans and access the itinerary creation tool.
- **Itinerary Creation**: The itinerary creation process is divided into multiple steps, including adding destinations, budget details, travel types, preferred travel times, and selecting popular places, restaurants, and hotels.
- **Gemini API Integration**: Upon confirmation, the selected preferences are sent to the Gemini API, which generates a detailed itinerary plan day-wise, including timings and nearby attractions.
- **Plan Management**: Users can save or regenerate their plans, and all created plans are stored in the MongoDB database for future reference.

## Overview

This application provides a user-friendly interface for generating personalized travel itineraries. By guiding users through a step-by-step process and integrating with external APIs, it delivers comprehensive and tailored plans suited to individual preferences.

## Tech Stacks

- **Next.js**: Version 14 or higher
- **React**: Version 17 or higher
- **MongoDB**: Database for storing user data and plan information
- **Tailwind CSS**: For styling the user interface
- **Nodemailer**: Used for sending emails, such as account verification and password reset notifications
- **bcryptjs**: For password hashing and security
- **JWT**: JSON Web Tokens for user authentication

## Results

The Personalized Itinerary Planner empowers users to create detailed travel plans effortlessly. By leveraging advanced technologies and seamless integration with external APIs, it delivers accurate and customized itineraries tailored to individual preferences.

## Screenshots

![Uploading Screenshot 2024-04-12 at 7.14.36 AM.png…]()

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js version 12 or higher if not already installed.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Configure the MongoDB connection in the application settings.
5. Set up Nodemailer with your email service provider for sending notifications.
6. Run `npm run dev` to start the development server.
7. Access the application in your browser at `http://localhost:3000`.

Feel free to explore and contribute to enhance the Personalized Itinerary Planner!

---

**Note**: Please ensure that all necessary environment variables are set up for proper functionality, including API keys, database credentials, and email configurations for Nodemailer.
