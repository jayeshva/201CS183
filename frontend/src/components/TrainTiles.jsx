import React from 'react'
import './TrainTiles.css'
import { useHistory } from "react-router-dom";

const TrainTiles = (props) => {
    const { trainName, trainNumber } = props;
    const history = useHistory();

    const handleOpenTraindetails = () => {
      history.push(`/train/${trainNumber}`);
      window.location.reload()
    };
  return (
    <div className='trainContainer'>
      <h4 style={{ marginLeft: '10px' }}>{trainName}</h4>
      <h5>TrainNo :{trainNumber}</h5>
      <button
        className='buttonBox'
        style={{ marginRight: '10px' }}
        onClick={handleOpenTraindetails}
        >
        View Details
      </button>

      
    </div>
  )
}

export default TrainTiles