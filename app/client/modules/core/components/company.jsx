import React from 'react';
import VehiclesList from '../containers/vehiclelist';

const Company = React.createClass({
  _vehicleSelected(vehicleId) {
    const { showVehicle } = this.props;
    showVehicle(vehicleId);
  },
  render() {
    const { company } = this.props;

    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <nav className="navbar navbar-default">
	    <div className="container-fluid">
              <div className="navbar-header">
	        <a className="navbar-brand" href="#"><h4>{company.name}</h4></a>
	      </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5">
                <p className="navbar-text navbar-right">
	          {/* <a href={`/map/${company._id}`} className="navbar-link map-link">
		  Araçları Haritada Görüntüle
	          </a> */}
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
	      <VehiclesList companyId={company._id} onVehicleClick={this._vehicleSelected} />
	    </div>
          </div>
        </div>
      </div>
    );
  }
});

Company.propTypes = {
  company: React.PropTypes.object
};

export default Company;
