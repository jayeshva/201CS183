import React from 'react'
import { useState, useEffect } from "react";
import TrainTiles from './TrainTiles'
const TrainDashboard = () => {
    const [Alltrains, setTrains] = useState([]);
    useEffect(() => {
        const fetchTrains = async () => {
          try {
            const response = await fetch("http://localhost:5003/train");
            const data = await response.json();
            setTrains(data);
          } catch (error) {
            console.error("Error in fetch Trains:", error);
          }
        };
    
        console.log("entered use effect");
        fetchTrains();
      }, []);

      if (Alltrains.length === 0) {
        
        return <div class="container">
       <h1>Loading.......</h1>
      </div>;
      }
    
  return (
    <div>
        <h1 style={{textAlign:"center"}}>Train DashBoard</h1>
        {Alltrains.map((each) => (
        <TrainTiles
          
          trainName={each.trainName}
          trainNumber={each.trainNumber}
        />
      ))}
    </div>
  )
}

export default TrainDashboard