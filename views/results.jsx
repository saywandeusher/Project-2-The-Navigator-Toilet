var React = require("react");

class Results extends React.Component {
  render() {

const center = {
      margin: '100px',
      textAlign: 'center',
      } ;

const fill = {
      margin: '0',
      height: '100%',
}

const tableWidth = {
      margin: '0 auto',
      width: '80%',
} 


    return (

      <html style={fill}>
        <head>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"/>

          <title >Toilets Found</title>

        </head>
          <body style={fill}>

            <h1 style={center}>Toilets near you!</h1>

            <table class="table" style={tableWidth}>
              <thead class="thead-dark">
                <tr>
                  <th scope="col" >#</th>
                  <th scope="col" >Name</th>
                  <th scope="col" >Location</th>
                  <th scope="col" >Time</th>
                  <th scope="col" >Ratings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
          </body>
      </html>

    );
  }
}

module.exports = Results;