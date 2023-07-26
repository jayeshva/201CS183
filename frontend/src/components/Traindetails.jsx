import React from 'react'
import { useState, useEffect } from "react";

const Traindetails = (props) => {
    const trainNumber = props.match.params.trainNumber;
    const [train, setTrain] = useState([]);
    useEffect(() => {
        const fetchTrains = async () => {
          try {
            const response = await fetch(`http://localhost:5003/train/${props.trainNumber}`);
            const data = await response.json();
            setTrain(data);
            console.log(data);
          } catch (error) {
            console.error("Error in fetch Trains:", error);
          }
        };
    
        console.log("entered use effect");
        fetchTrains();
      }, []);


  return (
    <div>{trainNumber}</div>
  )
}

export default Traindetails