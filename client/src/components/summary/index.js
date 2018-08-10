import React from 'react';
import './index.css';

function Summary({summary, humidity, temperature}) {


    return <div className="summary">
                temp: {temperature} &nbsp;&nbsp; humidity: {humidity} &nbsp;&nbsp;  {summary}
        </div>;
  }

export default Summary;