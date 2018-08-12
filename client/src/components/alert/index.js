import React, { Component } from 'react';
import './index.css';

function Alert({messages}) {
    return <div className="alert">
        {messages.map((alert, index) => (
        <p>Alert: {alert.title}</p>
    ))}
        </div>;
  }

export default Alert;
