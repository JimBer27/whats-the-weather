import React from 'react';
import './index.css';

function Caution({temperature}) {

    let displayMessage;

    if(temperature > 124){
        displayMessage = 'EXTREME DANGER!!! - Stay Inside';
    }else if(temperature > 102){
        displayMessage = 'DANGER!!! - Stay Inside';
    }else if(temperature > 90){
        displayMessage = 'Extreme Caution - Go outside but be extremely cautious';
    }else if(temperature > 79){
        displayMessage = 'Caution - Go outside but be cautious';
    }else{
        displayMessage = 'Go outside!';
    }


    return <div className="caution">
         {displayMessage}
        </div>;
  }

export default Caution;
