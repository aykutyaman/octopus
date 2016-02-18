import React from 'react';

const CompanyList = ({companies}) => (
  <div className="bs-docs-section clearfix">
    <div className="row">
      <div className="col-md-3">
	<ul className="nav nav-pills nav-stacked">
	  <li role="presentation">
	    <a href="/admin/new-company">Yeni Şirket Ekle</a>
	  </li>
	</ul>
      </div>
      <div className="col-md-9">
	<div className="panel panel-default">
	  <div className="panel-heading">Şirketler</div>
	  <div className="list-group">
	    {companies.map(company => (
	      <a href={`/admin/companies/${company._id}`} className="list-group-item" key={company._id}>{company.name}</a>
	     ))}
	  </div>
	</div>
      </div>
    </div>
  </div>
);

export default CompanyList;
