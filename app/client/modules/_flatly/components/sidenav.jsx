import React from 'react';
import Modal from 'react-modal-dumb';
import VehicleList from '../../core/containers/vehiclelist';

const SideNav = React.createClass({
  componentDidMount: function() {
    const {LocalState} = this.props.context();
    this.LocalState = LocalState;
  },
  getInitialState: function() {
    return {
      editing: false
    }
  },
  setEditing: function(editing) {
    this.setState({editing});
  },
  vehicleSelected: function(vehicleId) {
    this.LocalState.set('vehicle_selected', vehicleId)
    this.setEditing(false);
  },
  render: function() {
    const {editing} = this.state;
    const {companyId} = this.props;

    return (
      <ul className="nav nav-sidebar">
	      <li>
          <a href="#" id="modal-launcher" onClick={() => this.setEditing(true)}>
            <img src="https://s3-eu-west-1.amazonaws.com/kuresel-v4/img/two-cars-in-line.svg" alt="Araç listesi" />
          </a>
        </li>
	      <Modal show={editing} close={()=> this.setEditing(false)}>
	        <VehicleList companyId={companyId} onVehicleClick={this.vehicleSelected} />
	      </Modal>
      </ul>
    )
  }
});

export default SideNav;
