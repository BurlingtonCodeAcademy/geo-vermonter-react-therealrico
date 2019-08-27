import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map.js';
import borderData from './border.js';
import L from 'leaflet';
import leafletPip from '@mapbox/leaflet-pip'

class Home extends React.Component{
  state = {isDisabled:true, 
  latLong: [43.89, -72.717]}
  gamestart=()=>{
    this.startSpot()
    this.setState({isDisabled:false})
  }

  startSpot= () => {
    let lat = Math.random() * (45.005419 - 42.73030315) + 42.73030315;
    let long = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    let randomSpot = leafletPip.pointInLayer([long, lat], L.geoJSON(borderData))
    if (randomSpot.length === 0) {
      this.startSpot()
    }
    else {
      this.setState({latLong:[lat, long]})
    }
  }
  giveUp= () => {
    this.setState({isDisabled:true})
  }

  render(){
    let {latLong} = this.state
  return( <div><Map latLong={latLong}></Map>
  <div id="header"><h1>Geo Vermont</h1></div>
  <div id="score">Score</div>
  <div id="infobox">{this.state.isDisabled? <p>{this.state.latLong}</p>:<p>?</p>}</div>
  <div id="compass"><button>North</button>
    <button>South</button>
    <button>East</button>
    <button>West</button>
  </div>
  <div id="gamebuttons">
    <button disabled={!this.state.isDisabled} onClick={this.gamestart}>Start a Game</button>
    <button disabled={this.state.isDisabled}>Guess the Spot</button>
    <button disabled={this.state.isDisabled} onClick={this.giveUp}>Give Up</button>  
  </div>
  
  
  </div>)
    
  }
}

ReactDOM.render(
  <Home></Home>,
  document.getElementById('root')
)