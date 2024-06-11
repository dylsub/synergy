import React, { useState, useEffect } from "react";
import styles from "./companyreward.module.css"; // Import CSS module


function CompanyReward({ restaurant }) {
 const { name, logo, pointsReceived, pointsLeft, totalPoints } = restaurant;


 const progress = (pointsReceived / totalPoints) * 100;
 const isComplete = pointsLeft === 0;


 const [isPressed, setIsPressed] = useState(false);
 const [timer, setTimer] = useState(0);


 useEffect(() => {
   let timerInterval;
   if (isPressed) {
     timerInterval = setInterval(() => {
       setTimer((prev) => {
         if (prev <= 0) {
           clearInterval(timerInterval);
           setIsPressed(false);
           return 0;
         }
         return prev - 1;
       });
     }, 1000);
   }
   return () => clearInterval(timerInterval);
 }, [isPressed]);


 const handlePress = () => {
   if (isComplete) {
     setIsPressed(true);
     setTimer(48 * 3600); // 48 hours in seconds
   }
 };


 const getFormattedTime = () => {
   const hours = Math.floor(timer / 3600);
   const minutes = Math.floor((timer % 3600) / 60);
   const seconds = timer % 60;
   return `${hours.toString().padStart(2, "0")}:${minutes
     .toString()
     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
 };


 return (
   <div
     className={`border border-gray-300 rounded-lg p-4 text-center m-4 max-w-xs ${
       isComplete ? styles.hoverFull : ""
     }`}
     onClick={handlePress}
   >
     <div className="relative w-32 h-32">
       <img
         src={logo}
         alt={`${name} logo`}
         className={`w-32 h-32 rounded-full object-cover ${
           isComplete ? styles.filterGreen : ""
         }`}
       />
       <svg
         className="absolute top-0 left-0 w-full h-full"
         viewBox="0 0 36 36"
       >
         <path
           className="text-gray-300"
           d="M18 1.0845
             a 16.9155 16.9155 0 0 1 0 33.831
             a 16.9155 16.9155 0 0 1 0 -33.831"
           stroke="currentColor"
           strokeWidth="2"
           fill="none"
         />
         <path
           className={`${styles.clickedRing}`}
           d={`M18 1.0845 a 16.9155 16.9155 0 0 1 0 33.831`}
           stroke={`${isPressed ? "#6b46c1" : "#4caf50"}`}
           strokeWidth="2"
           fill="none"
           strokeDasharray="100, 100"
           strokeDashoffset={`${100 - progress}`}
           strokeLinecap="round"
           transform="rotate(-90 18 18)"
         />
       </svg>
     </div>
     <h2 className="text-xl mt-2">{name}</h2>
     <p className="text-gray-600">Points left: {pointsLeft}</p>
     {isPressed && (
       <p className={styles.textWhite}>Time left: {getFormattedTime()}</p>
     )}
   </div>
 );
}








export default CompanyReward;
