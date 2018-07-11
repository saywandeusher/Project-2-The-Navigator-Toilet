import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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

class RegisterModal extends Component {

constructor(props){
    super(props)

    this.state = {
      modalIsOpen: false
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


registerModal = () => {
  if (this.state.toilets === null) {

    return null

  } else {

      return (
      	<a href="#" onClick= {this.openModal} style={floatTopLeft}>Register</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Register</h2>

          <div>When you register with us, you get to rate our toilets!</div>
 
            <form action="/users/create" method="POST" ref={forms => this.forms = forms} >
                <input name="email" type="email" placeholder="email" value={this.props.email} style={{margin:'10px'}} />
                <br/>
                <input name="password" type="password" placeholder="password" /><br/>
                <input type="submit" value="Register" style={{margin:'10px'}} />
            </form>
        </Modal>      
      )
  }
}

ReactDOM.render(<RegisterModal />, root);
export default RegisterModal;