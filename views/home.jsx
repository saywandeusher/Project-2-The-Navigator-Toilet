var React = require("react");


const center = {
      margin: '100px',
      textAlign: 'center',
};

const fill = {
      margin: '0',
      height: '100%',
};

// const shiny = {
//   color: 'white',
//   fontWeight: 'bold',
//   fontSize: '2rem',
//   textDecoration: 'none',
//   textTransform: 'uppercase',
//   padding: '40px 90px',
//   backgroundColor: '#7681b9',
//   transition: 'transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), background-position 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 500ms linear',
//   // backgroundImage: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"   width="1296px" height="768px" viewBox="0 0 1296 768" enable-background="new 0 0 1296 768" xml:space="preserve"><g><polygon fill="#8694D1" points="766.6,1.2 -0.2,768 200.7,768 967.5,1.2   "/></g><g><polygon fill="#8694D1" points="1094.8,1.2 328,768 528.9,768 1295.7,1.2   "/></g></svg>'),
//   backgroundSize: 'contain',
//   backgroundPosition: '-200px center',
//   backgroundRepeat: 'no-repeat',
//   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
// }
// const 'shiny:hover' = {
//   transform: 'scale(1.1)',
//   backgroundPosition: '-60px',
//   boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
// }
// const shiny:active = {
//   transform: 'scale(1)',
//   backgroundPosition: '500px',
//   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
// }

class Home extends React.Component {



  render() {

    return (

      <html style={fill}>
        <body style={fill}>
          <h1 style={center}>Welcome to Toilet finder!</h1>
          <form style={center} className="search-form" method="GET" action="/results">
          <button className="shiny-btn" name="search" type="submit">Search</button>
          </form>
        </body>
      </html>

    );
  }
}

module.exports = Home;