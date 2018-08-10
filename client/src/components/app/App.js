import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

import Alert from '../alert';
import Caution from '../caution';
import Summary from '../summary';
import Footer from '../footer';
import moment from 'moment';
import Temperature from '../temperature';

// var styles = {
// 	fontSize:80,
// 	color:'red',
// 	fontWeight:'bold'
// };


class App extends Component {

  constructor() {
    super()

    this.state = {
      latitude: '42.482286',
      longitude: '-70.938776',
      city:"Lynn",
      state:"MA",
      zip:"01902",
      alerts:[],
      apparentTemp:"",
      temperature:"",
      weather: {}
    }

    //this.getMyLocation = this.getMyLocation.bind(this)
  }

  componentDidMount() {
    fetch('/weather')
      .then(res => res.json())
      .then(json => {

        console.log("WEEEE" +JSON.stringify(json.data));
        this.setState({weather:json.data.currently});
        
         //Check for alerts
        const weatherAlerts = json.data.alerts;
        if(weatherAlerts){
          this.setState({alerts:weatherAlerts});
        }
        
        const temperature = Math.round(json.data.currently.temperature) + '°';
        this.setState({temperature:temperature});

        const apparentTemp = Math.round(json.data.currently.apparentTemperature) + '°';
        this.setState({apparentTemp:apparentTemp});
      
      });

     // console.log("TEST" + this.state.weather.currently.summary);

      //this.getMyLocation()
    }
  
    // getMyLocation() {
    //   const location = window.navigator && window.navigator.geolocation
      
    //   if (location) {
    //     location.getCurrentPosition((position) => {
    //       this.setState({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       })

    //       getAddress(this.state.latitude, this.state.longitude).then(
    //         (address) => {
    //             console.log(address);
    //             this.setState({ city: address.address_components[2].long_name });
    //             this.setState({ state: address.address_components[4].short_name });
    //             this.setState({ zip: address.address_components[6].long_name });
    //           }).catch(console.error);


    //     }, (error) => {
    //       this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
    //     })
    //   }
    // }




  render() {


    let date;
    if(this.state.weather && this.state.weather.time){

    date = moment.unix(this.state.weather.time).format('dddd, MMMM Do, h:mm A')

     //date = new Date(this.state.weather.time);
     console.log(date);
    // date = date.toLocaleDateString()
     
    }

    let summary;
    if(this.state.weather && this.state.weather.summary){
      summary = this.state.weather.summary;
      console.log(summary);
    }

    let humidity;
    if(this.state.weather && this.state.weather.humidity){
      humidity = Math.round(this.state.weather.humidity * 100);
      humidity = humidity + '%';
      console.log(humidity);
    }
    


    let alert;
    if(this.state.alerts && this.state.alerts.length > 0){
      alert = <Alert messages={this.state.alerts}></Alert>
    }


    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">What's the weather like today?</h1>
        </header>
        {alert}
      
        <div className="container">
          <div className="box"><Summary temperature = {this.state.temperature} humidity = {humidity} summary = {summary}/> </div>
          <div className="box"><Temperature temperature = {this.state.apparentTemp} date={date}> </Temperature></div>
          <div className="box"><Caution temperature = {this.state.apparentTemp}></Caution></div>
        </div>
            
        <Footer />
      </div>
  
        
    );
  }
}


function getAddress (latitude, longitude) {
  return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();

      var method = 'GET';
      var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
      var async = true;

      request.open(method, url, async);
      request.onreadystatechange = function () {
          if (request.readyState == 4) {
              if (request.status == 200) {
                  var data = JSON.parse(request.responseText);
                  var address = data.results[0];
                  resolve(address);
              }
              else {
                  reject(request.status);
              }
          }
      };
      request.send();
  });
};

export default App;
