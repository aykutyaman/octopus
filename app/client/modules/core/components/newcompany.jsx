import React from 'react';

class NewCompany extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <div className="bs-docs-section clearfix">
	<div className="new-post">
	  <h3>Yeni Şirket Ekle</h3>

	  {error ? <p style={{color: 'red'}}>{error}</p> : null}

	  <input ref="nameRef" type="Text" placeholder="Şirket İsmi" /> <br/>
	  <button onClick={this.createCompany.bind(this)}>Ekle</button>
	</div>
      </div>
    );
  }

  createCompany() {
    const {create} = this.props;
    const {nameRef} = this.refs;

    create(nameRef.value);
  }
}

export default NewCompany;
