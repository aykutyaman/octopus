import React from 'react';

const VehicleList = ({vehicles}) => (
  <div className="panel panel-default">
    <div className="panel-heading">Araçlar  </div>
    <div className="list-group">
      {vehicles.map(vehicle => (
	<a href='#' className="list-group-item" key={vehicle._id}>{vehicle.plate}</a>
       ))}
    </div>
  </div>
);

export default VehicleList;
