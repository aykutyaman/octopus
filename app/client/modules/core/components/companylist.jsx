import React from 'react';

const CompanyList = ({companies}) => (
  <div className="bs-docs-section clearfix">
    <div className="row">
      <div className="col-md-3">
	<ul className="nav nav-pills nav-stacked">
	  <li role="presentation">
	    <a href="#">Yeni Şirket Ekle</a>
	  </li>
	</ul>
      </div>
      <div className="col-md-9">
	<div className="panel panel-default">
	  <div className="panel-heading">Şirketler</div>
	  <ul className="list-group">
	    {companies.map(company => (
	      <li className="list-group-item" key={company._id}>
	      {company.name}
	      </li>
	     ))}
	  </ul>
	</div>
      </div>
    </div>
  </div>
);

export default CompanyList;
