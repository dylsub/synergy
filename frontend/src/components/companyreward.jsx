import React, { useState, useEffect } from "react";
import styles from "./companyreward.module.css"; // Import CSS module


function CompanyReward({ restaurant }) {

 
 const { name, logo, pointsReceived, pointsLeft, totalPoints } = restaurant;
 restaurant.pointsReceived = 100
 restaurant.pointsLeft = 0
 restaurant.totalPoints = 100


 const progress = (pointsReceived / totalPoints) * 100;
 const isComplete = pointsLeft === 0;


 const [isPressed, setIsPressed] = useState(false);
 const [isSpinning, setIsSpinning] = useState(false);
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
    setIsSpinning(true);
    setIsPressed(true);
    setTimer(48 * 3600); // 48 hours in seconds
    setTimeout(() => {
      setIsSpinning(false);
    }, 400); // The duration of the animation in milliseconds
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
  <div className={styles.content}>
    <div className={`${styles.content__graphic} ${isSpinning ? styles.spin : ''}`} onClick={handlePress}>
      <svg className={styles.circle} viewBox="0 0 36 36">
          {/* <path
            className="text-gray-300"
            d="M18 1.0845
              a 16.9155 16.9155 0 0 1 0 33.831
              a 16.9155 16.9155 0 0 1 0 -33.831"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          /> */}
          <path
            className={`${styles.clickedRing} ${isPressed ? styles.pulse : ""}`}
            d={`M18 1.0845 a 16.9155 16.9155 0 0 1 0 33.831`}
            stroke={`${isPressed ? "#6b46c1" : "#4caf50"}`}
            strokeWidth="2"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={`${10}`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
      </svg>
      <div className={styles.content__image__container}>
        <img className={styles.content__image} src={logo}></img>
      </div>
    
    </div>
  
    <div className={styles.content__text}>
      <h2 className="">{name}</h2>
      <h3 className={styles.header3}>Points left: {pointsLeft}</h3>

      {!isPressed && (
        <h3 className={styles.header3}>4% for 48 hrs</h3>
      )}
      {isPressed && (
        <h3 className={styles.header3}>Time left: {getFormattedTime()}</h3>
      )}
    </div>
  </div>
   
 );
}








export default CompanyReward;
