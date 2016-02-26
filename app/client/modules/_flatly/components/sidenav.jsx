import React from 'react';
import Modal from 'react-modal-dumb';
import VehicleList from '../../core/containers/vehiclelist';

const SideNav = React.createClass({
  componentDidMount: function() {
    const {LocalState} = this.props.context();
    this.LocalState = LocalState;
    // defaults
    this.LocalState.set('ZOOM_VEHICLE', true);
    this.LocalState.set('CENTER_VEHICLE', true);
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

    const toggleZoom = () => {
      this.LocalState.set('ZOOM_VEHICLE', !this.LocalState.get('ZOOM_VEHICLE'));
    }
    const toggleCenter = () => {
      this.LocalState.set('CENTER_VEHICLE', !this.LocalState.get('CENTER_VEHICLE'));
    }

    return (
      <ul className="nav nav-sidebar">
	<li>
          <a href="#" id="modal-launcher" onClick={() => this.setEditing(true)}>
	    Araç listesi
          </a>
        </li>
	<li>
          <a href="#" onClick={() => toggleZoom()}>
	    Zoom
          </a>
	</li>
	<li>
          <a href="#" onClick={() => toggleCenter()}>
	    Merkez
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
