var React = require("react");

class Home extends React.Component {
  render() {

    return (

      <html>
        <body>
          <h1>Welcome to Toilet finder!</h1>
          <form className="search-form" method="GET" action="/results">
          <button type="button" name="search" type="submit">Search</button>
          </form>
        </body>
      </html>

    );
  }
}

module.exports = Home;