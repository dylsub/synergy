import React, { useState, useEffect } from "react";
import styles from "./companyreward.module.css"; // Import CSS module


function CompanyReward({ restaurant }) {

 
 const { name, logo, pointsReceived, threshold, savings_percent, savings_limit, savings_time } = restaurant;
 restaurant.pointsLeft = threshold - pointsReceived
 const totalPoints = threshold


 const progress = (pointsReceived / totalPoints) * 100;


 const [isPressed, setIsPressed] = useState(false);
 const [isSpinning, setIsSpinning] = useState(false);
 const [timer, setTimer] = useState(0);

const isComplete = restaurant.pointsLeft === 0
 


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
    setTimer(savings_time * 3600); // 48 hours in seconds
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
      {/*<svg className={styles.circle} viewBox="0 0 36 36">
          {<path
            className="text-gray-300"
            d="M18 1.0845
              a 16.9155 16.9155 0 0 1 0 33.831
              a 16.9155 16.9155 0 0 1 0 -33.831"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
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
          </svg>  */}

         <svg
           className={styles.circle}
           viewBox="0 0 36 36.7"
          //  width="160px"
          //  height="160px"
         >
           <circle
             cx="18"
             cy="18"
             r="15.91549430918954"
             fill="none"
             stroke="#eee"
             strokeWidth="3.8"
           />
           <circle
             cx="18"
             cy="18"
             r="15.91549430918954"
             fill="none"
             className={`${isPressed ? styles.pulse : ""} ${!isPressed && isComplete ? styles.pulse2 : ""}`}
             stroke={isPressed ? "#6b46c1" : "#4caf50"}
             strokeWidth="3.8"
             strokeDasharray={`${progress}, 100`}
             strokeLinecap="round"
           />
         </svg>

      <div className={styles.content__image__container}>
        <img className={styles.content__image} src={logo}></img>
      </div>
    
    </div>
  
    <div className={styles.content__text}>
      {/* {!isPressed && <h2 className="">{name}</h2> } */}

      <b><h2 className="">{name}</h2></b>

      {!isPressed && (
        <h3 className={styles.header3}>{`${isComplete ? "Redeem your reward!" : restaurant.pointsLeft + " points to go"}`}</h3>
      )}
      <h3 className={styles.header3}>{`${savings_percent}`}% off {"<"}${savings_limit} for {savings_time} hrs</h3>
      {isPressed && (
        <h3 className={styles.header3}>Time left: {getFormattedTime()}</h3>
      )}
    </div>
  </div>
   
 );
}








export default CompanyReward;
