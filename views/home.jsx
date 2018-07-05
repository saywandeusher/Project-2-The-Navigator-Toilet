var React = require("react");
var geolocated = require('react-geolocated');

class Home extends React.Component {
  render() {

    return (

      <html>
        <body>
          <h1>Welcome to Toilet finder!</h1>
          <form className="search-form" method="GET" action="/results">
          <button type="button" name="search" type="submit">Search</button>
          </form>
                !this.props.isGeolocationAvailable
                ? <div>Your browser does not support Geolocation</div>
                : !this.props.isGeolocationEnabled
                  ? <div>Geolocation is not enabled</div>
                  : this.props.coords
                    ? <table>
                      <tbody>
                        <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                        <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                        <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
                        <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
                        <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
                      </tbody>
                    </table>
                    : <div>Getting the location data&hellip; </div>

        </body>
      </html>

    );
  }
}

module.exports = Home;