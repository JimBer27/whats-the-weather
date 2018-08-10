import React from 'react';
import './index.css';

function Temperature({temperature, date}) {
    return (
       
          <div className = 'temperature'>
             <span className ='large'>Feels like {temperature} </span> 
            
            <p className="small">Last updated: {date}</p>
          </div>
      
    );
  }

export default Temperature;