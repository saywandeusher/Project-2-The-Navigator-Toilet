import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';

const center = {
  margin: '0 auto',
  marginTop: '200px',
  textAlign: 'center',
};

const btnCenter = {
  margin: '0 auto',
  marginTop: '50px',
  width: '200px',
  height: '150px',
};

const tableWidth = {
  margin: '0 auto',
  width: '80%',
};

const floatTopRight = {
  position: 'relative',
  marginTop: '-180px',
  float: 'right',
};

const floatTopLeft = {
  position: 'relative',
  marginTop: '-180px',
  float: 'left',
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class App extends Component {

constructor(props){
    super(props)

    this.state = {
      toilets: null,
      latitude: null,
      modalIsOpen: false,
      email: '',
      password: '',
      isLogin: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
    this.subtitle.style.textAlign = 'center';
    this.forms.style.textAlign = 'center';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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


createUser = (e) => {
e.preventDefault();
axios.post('http://localhost:3001/users/create', {
  email: this.state.email,
  password: this.state.password
  })
  .then((response) => {
    this.setState({isLogin: true})
    this.setState({modalIsOpen: false});
  })
  .catch(function (error) {
    console.log(error);
});
}

handleEmail = (e) => {
  this.setState({email: e.target.value})
}

handlePassword = (e) => {
  this.setState({password: e.target.value})
}

trafficControlBtn = () => {
    if(this.state.latitude != null) {
      return ( <button className="btn btn-success btn-lg" onClick={this.handleOnClick} style={btnCenter}>Find Neaby Toilets</button> );
    } else {
      return ( <button className="btn btn-danger btn-lg" onClick={this.handleOnClick} style={btnCenter}>Locating</button> );
    }
  }


renderToiletTable = () => {
  if (this.state.toilets === null) {

    return null

  } else {

  const listItems = this.state.toilets.map((toilet,index) => 
    <tr key={toilet.id} >
      <td> {index + 1} </td>
      <td> {toilet.name}</td> 
      <td> {toilet.location}</td> 
      <td> {toilet.time}</td> 
      {/*<td> {toilet.ratings}</td>*/}
    </tr>
  )
      return (
                <table className="table" style={tableWidth} style={{marginTop:'100px'}}>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" >#</th>
                      <th scope="col" >Name</th>
                      <th scope="col" >Location</th>
                      <th scope="col" >Time</th>
                      {/*<th scope="col" >Ratings</th>*/}
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

    let loginButton
    if (this.state.isLogin) {
      loginButton =  <a href="#" onClick= "#" style={floatTopRight}>Logout</a>
    } else {
      loginButton =  <a href="#" onClick= {this.openModal} style={floatTopRight}>Login</a>
    }

    return (
      <div className="container" style={center}>
      <a href="#" onClick= {this.openModal} style={floatTopLeft}>Register</a>
      {loginButton}        
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Register</h2>

          <div>When you register with us, you get to rate our toilets!</div>
 
            <form onSubmit={this.createUser} ref={forms => this.forms = forms} >
                <input name="email" onChange={this.handleEmail} type="email" placeholder="email" value={this.props.email} style={{margin:'10px'}} />
                <br/>
                <input name="password" onChange={this.handlePassword} type="password" placeholder="password" /><br/>
                <input type="submit" value="Register" style={{margin:'10px'}} />
            </form>
        </Modal>
          <h1>Toiletどこ</h1>
          {this.trafficControlBtn()}
          {this.renderToiletTable()}
      </div>

    );
  }
}

ReactDOM.render(<App />, root);
export default App;