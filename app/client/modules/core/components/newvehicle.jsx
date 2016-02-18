import React from 'react';

class NewVehicle extends React.Component {
  render() {
    const {error} = this.props;
    const {companies} = this.props;
    return (
      <div className="bs-docs-section clearfix">
	<div className="new-post">
	  <h3>Yeni Araç Ekle</h3>

	  {error ? <p style={{color: 'red'}}>{error}</p> : null}

	  <select ref="companyRef" className="form-control">
	    <option key="">Şirket Seçin</option>
	    {companies.map(company => (
	      <option key={company._id} value={company._id}>{company.name}</option>
	     ))}
	  </select>
	  <input ref="plateRef" type="Text" placeholder="Araç Plakası" /> <br/>
	  <input ref="imeiRef" type="Text" placeholder="Araç IMEI" /> <br/>
	  <button onClick={this.createVehicle.bind(this)}>Ekle</button>
	</div>
      </div>
    )
  }

  createVehicle() {
    const {create} = this.props;
    const {
      companyRef,
      plateRef,
      imeiRef
    } = this.refs;
    create(plateRef.value, imeiRef.value, companyRef.value);
  }
}

export default NewVehicle;
