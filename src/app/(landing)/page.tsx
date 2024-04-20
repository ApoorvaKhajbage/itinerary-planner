"use client"
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function landing() {
//   const router = useRouter();
//   const handleLoginClick = () => {
//     router.push("/sign-in");
//   };

//   return (
//     <div className="relative min-h-screen bg-white">
//       <Head>
//         <title>Landing Page</title>
//       </Head>
//       <div className="relative flex h-full">
//         <div className="flex flex-col justify-center w-full max-w-4xl p-8 mx-auto text-left lg:w-1/2">
//           <div className="flex justify-between mb-8">
//             <a className="text-3xl font-bold text-blue-600" href="#">
//               wanderlog
//             </a>
//             <div className="flex space-x-4">
//               <Link href="/sign-in">
//                 <Button
//                   className="text-gray-800"
//                   variant="ghost"
//                   onClick={() => handleLoginClick()}
//                 >
//                   Log in
//                 </Button>
//               </Link>
//               <Link href="/sign-up">
//                 <Button className="text-white" variant="login">
//                   Sign up
//                 </Button>
//               </Link>
//             </div>
//           </div>
//           <h1 className="mb-6 text-6xl font-bold leading-tight text-gray-800">
//             You'll never travel without our trip planner again
//           </h1>
//           <p className="mb-6 text-lg text-gray-700">
//             Travel planning at its best. Build, organize, and map your custom
//             itineraries in a free travel app designed for vacations & road
//             trips, powered by our trip planner AI
//           </p>
//           <div className="flex space-x-4">
//             <Link href="/sign-up">
//               <Button className="text-white" variant="login">
//                 Start planning
//               </Button>
//             </Link>
//           </div>
//           {/* Carousel */}
          
//           <Carousel>
//             <CarouselContent>
//               <CarouselItem 
//               className="basis-1/3"
//               // on mouse enter hover effect
//               >
//                 <Image
//                   src="/assets/photographer.jpeg"
//                   alt="carousel 1"
//                   width={800}
//                   height={600}
//                 />
//               </CarouselItem>
//               <CarouselItem className="basis-1/3">
//                 <Image
//                   src="/assets/photographer.jpeg"
//                   alt="carousel 2"
//                   width={800}
//                   height={600}
//                 />
//               </CarouselItem>
//               <CarouselItem className="basis-1/3">
//                 <Image
//                   src="/assets/photographer.jpeg"
//                   alt="carousel 3"
//                   width={800}
//                   height={600}
//                 />
//               </CarouselItem>
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import Image from "next/image";
import { delay, motion, stagger } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const bgAnimate = {
    hidden: {
      clipPath: "polygon(21% 27%, 77% 26%, 77% 77%, 21% 77%)",
    },
    show: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  const textAnimate1 = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.8,
        delayChildren: 1,
      },
    },
  };

  const textAnimate2 = {
    hidden: {
      x: 0,
    },
    show: (i) => ({
      x: i,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    }),
  };

  const imageAnimate = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: 3.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const imageAnimateChild = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  const navAnimate = {
    hidden: {
      y: "-110%",
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2,
      },
    },
  };

  const textParagraph = {
    hidden: {
      y: "-110%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2.8,
      },
    },
  };

  return (
    <main className="h-screen px-4 overflow-auto">
      <motion.div
        className="absolute inset-0 h-screen w-screen z-0"
        variants={bgAnimate}
        initial="hidden"
        animate="show"
      >
        <Image
          src="/assets/explorer.jpeg"
          alt="background"
          fill
          priority={true}
          sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
          className="object-cover brightness-50"
        />
      </motion.div>
      <motion.nav
        className="flex justify-between items-center relative z-10 p-4 bg-white bg-opacity-15 rounded-lg"
        variants={navAnimate}
        initial="hidden"
        animate="show"
      >
        <div className={"text-4xl font semibold text-white"}>
          <a href="/">ExploreEase</a>
        </div>
        <ul className="w-[300px] flex justify-between items-center">
          <li className="text-2xl font-semibold text-white">
            <a href="/">Home</a>
          </li>
          <li className="text-2xl font-semibold text-white">
            <a href="/sign-in">Sign In</a>
          </li>
          <li className="text-2xl font-semibold text-white">
            <a href="/sign-up">Sign Up</a>
          </li>
        </ul>
      </motion.nav>
      <div className="relative top-[120px]">
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-9xl font-bold text-white tracking-tighter z-10"
            variants={textAnimate2}
            custom={-150}
          >
            Travel
          </motion.h1>
        </motion.div>
        <motion.p
          className="absolute top-12 right-32 z-10 w-[500px] text-justify leading-8 text-white font-medium"
          variants={textParagraph}
          initial="hidden"
          animate="show"
        >
          <span className="text-indigo-300 block mb-4">
            Travel planning at its best. Build, organize, and map your custom
            itineraries in a free travel app designed for vacations & road
            trips, powered by our trip planner AI.
          </span>
          <span className="text-gray-400 block mb-2">
            Discover new destinations and experiences tailored to your interests
            and preferences.
          </span>
          <span className="text-gray-400 block mb-2">
            Seamlessly collaborate with friends and family to plan your next
            adventure together.
          </span>
          <span className="text-gray-400 block mb-2">
            Access insider tips and recommendations from seasoned travelers to
            make the most out of your trip.
          </span>
          <span>
          <Link href="/sign-up">
             <Button className="text-white" variant="login">Start planning</Button>
          </Link>
          </span>
        </motion.p>

        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-9xl font-bold text-indigo-500 tracking-tighter z-10"
            variants={textAnimate2}
            custom={100}
          >
            EXPERIENCE
          </motion.h1>
        </motion.div>
      </div>

      {/* Image Gallery */}
      <motion.div className="flex gap-4 absolute bottom-4 overflow-x-auto  max-w-full" variants={imageAnimate} initial="hidden" animate="show">
        
          <motion.div className="relative w-[300px] h-[200px]" 
          variants={imageAnimateChild}
          whileHover={{ scale: 1.5 }}>
            <Image
              src="/assets/amsterdam.jpeg"
              alt="explore pic 1"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          {/* Add more images here */}
          <motion.div className="relative w-[300px] h-[200px]" 
          variants={imageAnimateChild}
          whileHover={{ scale: 1.5 }}>
            <Image
              src="/assets/greece.jpeg"
              alt="explore pic 2"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          <motion.div className="relative w-[300px] h-[200px] hover:scale-105" 
          variants={imageAnimateChild}
          whileHover={{ scale: 1.25 }}>
            <Image
              src="/assets/kerala.jpeg"
              alt="explore pic 3"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          <motion.div className="relative w-[300px] h-[200px] hover:scale-105" 
          variants={imageAnimateChild}
          whileHover={{ scale: 1.25 }}>
            <Image
              src="/assets/paris.jpeg"
              alt="explore pic 4"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          <motion.div className="relative w-[300px] h-[200px] hover:scale-105"
           variants={imageAnimateChild}
           whileHover={{ scale: 1.25 }}>
            <Image
              src="/assets/rome.jpeg"
              alt="explore pic 5"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          <motion.div className="relative w-[300px] h-[200px] hover:scale-105"
           variants={imageAnimateChild}
           whileHover={{ scale: 1.25 }}>
            <Image
              src="/assets/singapore.jpeg"
              alt="explore pic 6"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          <motion.div className="relative w-[300px] h-[200px] hover:scale-105"
           variants={imageAnimateChild}
           whileHover={{ scale: 1.25 }}>
            <Image
              src="/assets/turkey.jpeg"
              alt="explore pic 7"
              fill
              sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
              className="object-cover rounded-sm saturate-150"
            />
          </motion.div>
          
     
      </motion.div>
    </main>
  );
}
