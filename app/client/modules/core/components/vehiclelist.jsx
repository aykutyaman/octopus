import React from 'react';

const VehicleList = ({vehicles = [], handler = () => null }) => (
  <div className="panel panel-default">
    <div className="panel-heading">Araçlar</div>
    <div className="list-group">
      {vehicles.map(vehicle => (
	<a href='#' className="list-group-item" onClick={() => handler(vehicle._id)} key={vehicle._id} value={vehicle._id}>{vehicle.plate}</a>
       ))}
    </div>
  </div>
);

export default VehicleList;
