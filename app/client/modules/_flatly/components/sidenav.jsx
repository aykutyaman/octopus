import React from 'react';
import Modal from 'react-modal-dumb';
import VehicleList from '../../core/containers/vehiclelist';

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
    const {companyId} = this.props;

    return (
      <ul className="nav nav-sidebar">
	<li><a href="#" id="modal-launcher" onClick={() => this.setEditing(true)}>Araç Listesi</a></li>
	<Modal show={editing} close={()=> this.setEditing(false)}>
	  <VehicleList companyId={companyId} />
	</Modal>
      </ul>
    )
  }
});

export default SideNav;
