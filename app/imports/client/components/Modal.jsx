import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { MeteorData } from './MeteorData.jsx';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { VehiclesList } from './VehiclesList.jsx';


export const Modal = React.createClass({
  handleClose() {
    this.props.hideModal();
  },
  render() {
    // TODO: Modal render edilmeyecekse daha iyi bir kontrol yöntemi bulunabilir mi?
    if (this.props.showModalState === false) return <div></div>;
    const companyId = FlowRouter.getParam('companyId');

    const actions = [
      <FlatButton
              label="Kapat"
              secondary={true}
              onTouchTap={this.handleClose} />
    ];
    return (
      <div>
	<Dialog
		title="Araç Listesi"
		actions={actions}
		open={this.props.showModalState}
		onRequestClose={this.handleClose}>
	  <MeteorData
		  subscribe = { () => {
			       return Meteor.subscribe('Vehicles.inList', companyId) }}
		  fetch = { () => {
			   return {data: Vehicles.find().fetch()}}}
		  render = { ({loading, data}) => {
			    return (
			      <VehiclesList vehicles={data} />
			    )
			    }}
						    />

	</Dialog>
      </div>
    );
  }
});
