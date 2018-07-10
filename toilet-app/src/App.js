import React, { Component } from 'react';
import axios from 'axios';

const center = {
  margin: '0 auto',
  marginTop: '200px',
  textAlign: 'center',
};

const btnCenter = {
  margin: '100px',
  width: '200px',
  height: '150px',
};

const tableWidth = {
  margin: '0 auto',
  width: '80%',
};



class App extends Component {

constructor(props){
    super(props)
    this.state = {
      toilets: null,
    }
}

componentDidMount(){
  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var success = (pos) => {
  var crd = pos.coords;

  console.log('Your current position is:');
                          //because it's a string
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  this.setState({latitude: crd.latitude, longitude:crd.longitude})

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
}

renderToiletTable = () => {
  if (this.state.toilets === null) {

    return null

  } else {

  const listItems = this.state.toilets.map((toilet,index) => 
    <tr key={toilet.id}>
      <td> {index + 1} </td>
      <td> {toilet.name}</td> 
      <td> {toilet.location}</td> 
      <td> {toilet.time}</td> 
      <td> {toilet.ratings}</td>  
    </tr>
  )
      return (
                <table className="table" style={tableWidth}>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" >#</th>
                      <th scope="col" >Name</th>
                      <th scope="col" >Location</th>
                      <th scope="col" >Time</th>
                      <th scope="col" >Ratings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems}
                  </tbody>
                </table>        
      )
  }
}
    
handleOnClick = () => {
  axios.get(`http://localhost:3001/toilets?Latitude=${this.state.latitude}&Longitude=${this.state.longitude}`).then(response => {
    // handle success
    console.log(response.data);
    this.setState({toilets: response.data.rows});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  
  render() {

    return (

      <div className="container" style={center}>
          <h1>Toilet どこ？</h1>
          <button className="btn btn-danger btn-lg" onClick={this.handleOnClick} style={btnCenter}>Find</button>
          {this.renderToiletTable()}
      </div>

    );
  }
}

export default App;