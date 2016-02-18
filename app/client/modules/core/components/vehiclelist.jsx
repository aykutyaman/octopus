import React from 'react';

const VehicleList = ({vehicles, company}) => (
  <div className="bs-docs-section clearfix">
    <div className="row">
      <nav className="navbar navbar-default">
	<div className="container-fluid">
          <div className="navbar-header">
	    <a className="navbar-brand" href="#">{company.name}</a>
	  </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5">
            <p className="navbar-text navbar-right">
	      <a href={`/map/${company._id}`} className="navbar-link">Araçları Haritada Görüntüle</a>
            </p>
          </div>
	</div>
      </nav>
      <div className="col-md-3">
	<ul className="nav nav-pills nav-stacked">
	  <li role="presentation">
	    <a href="/admin/new-vehicle">Yeni Araç Ekle</a>
	  </li>
	</ul>
      </div>
      <div className="col-md-9">
	<div className="panel panel-default">
	  <div className="panel-heading">Araçlar  </div>
	  <div className="list-group">
	    {vehicles.map(vehicle => (
	      <a href='#' className="list-group-item" key={vehicle._id}>{vehicle.plate}</a>
	     ))}
	  </div>
	</div>
      </div>
    </div>
  </div>
);

export default VehicleList;
