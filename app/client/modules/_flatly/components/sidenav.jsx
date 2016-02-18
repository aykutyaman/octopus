import React from 'react';

import Modal from 'react-modal-dumb';

const SideNav = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    }
  },
  setEditing: function(editing) {
    this.setState({editing});
  },
  render: function() {
    const {editing} = this.state;
    return (
      <ul className="nav nav-sidebar">
	<li><a href="#" id="modal-launcher" onClick={() => this.setEditing(true)}>Araç Listesi</a></li>
	<Modal show={editing} close={()=> this.setEditing(false)}>
	  hello modal
	</Modal>
      </ul>
    )
  }
});

export default SideNav;
