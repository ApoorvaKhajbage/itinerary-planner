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
- **Framer Motion**: For fluid animations and transitions
- **Nodemailer**: Used for sending emails, such as account verification and password reset notifications
- **Gemini API**: Generates detailed itinerary plans based on user preferences
- **Travel Advisor API**: Fetches popular places, restaurants, and activities based on the entered destination
- **bcryptjs**: For password hashing and security
- **JWT**: JSON Web Tokens for user authentication

## Results

The Personalized Itinerary Planner empowers users to create detailed travel plans effortlessly. By leveraging advanced technologies and seamless integration with external APIs, it delivers accurate and customized itineraries tailored to individual preferences.

## Screenshots
<img width="1668" alt="Screenshot 2024-04-12 at 7 14 36 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/b28c1a63-b970-492e-a216-d93c620e1ff0">
<img width="1668" alt="Screenshot 2024-04-12 at 7 14 59 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/da33e299-186b-4695-bebe-71210f2d7fd5">
<img width="1668" alt="Screenshot 2024-04-20 at 7 41 25 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/77974c71-7c86-4833-ac93-8ef52791163e">
<img width="1668" alt="Screenshot 2024-04-20 at 8 13 08 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/3c01ca67-4a6e-4625-a93f-afc4e611c98d">
<img width="1668" alt="Screenshot 2024-04-20 at 8 13 53 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/7ae85d7d-9e52-4204-8c54-e82d71bb9b57">
<img width="1668" alt="Screenshot 2024-04-12 at 7 14 49 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/351749b4-b695-4f6a-91fc-a3ab136acba0">
<img width="1668" alt="Screenshot 2024-04-12 at 7 15 51 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/c355205c-11b6-4747-9fda-9a29ea61a5b1">
<img width="1668" alt="Screenshot 2024-04-12 at 7 16 58 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/f201d449-250c-449f-bd2a-d74329e2272b">
<img width="1668" alt="Screenshot 2024-04-12 at 7 16 19 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/1da95ae4-fe9d-4678-a345-7a711fdfaeeb">

Plan form:

<img width="542" alt="Screenshot 2024-04-20 at 8 08 50 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/b850d2e0-6f5f-4b8f-9bf9-dde3b026a4d6">
<img width="784" alt="Screenshot 2024-04-20 at 7 30 34 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/67331f76-0820-4607-baf2-fa722aaf425c">
<img width="784" alt="Screenshot 2024-04-20 at 7 31 14 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/8b940d84-c722-4ebe-88d7-1d6e0bd52cd3">
<img width="1672" alt="Screenshot 2024-04-20 at 7 58 23 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/b0d3eaa4-540c-465b-a75f-ddfcfd310ead">
<img width="1672" alt="Screenshot 2024-04-20 at 7 59 00 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/19fd2138-dcea-4954-9f05-97b76f61efb1">
<img width="1668" alt="Screenshot 2024-04-12 at 7 21 50 AM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/7632e8f9-17fb-4400-904c-463ed18d7a28">


<img width="1672" alt="Screenshot 2024-04-20 at 7 59 23 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/5f8a1e7d-a822-4e0c-a20a-363075796ed6">
<img width="845" alt="Screenshot 2024-04-20 at 7 59 41 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/43448619-7cc2-4994-9377-1019af6712bf">
<img width="1668" alt="Screenshot 2024-04-20 at 8 00 28 PM" src="https://github.com/ApoorvaKhajbage/it/assets/100022222/89167343-5645-4c1f-9fe7-fed4d53d2712">




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

**Note**: Please ensure that all necessary environment variables are set up for proper functionality, including API keys, database credentials, and email configurations for Nodemailer and mailtrap.
