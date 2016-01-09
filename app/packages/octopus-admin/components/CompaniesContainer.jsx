/* global Companies, React, ReactDOM, FlowRouter, ReactMeteorData */

const {Paper, List, ListItem, TextField, RaisedButton} = MUI;
const CompanyIcon = MUI.Libs.SvgIcons.SocialLocationCity;

CompaniesContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const handle = Meteor.subscribe('Companies.inList');
    const data = {
      currentUser: Meteor.user()
    };

    if (handle.ready()) {
      data.companies = Companies.find({}, {sort: {name: 1}}).fetch();
    }
    return data;
  },
  _handleTouchTapRoute(companyId) {
    FlowRouter.go('vehicles', {companyId: companyId});
  },
  getCompaniesList() {
    return <List>
    {this.data.companies.map( company => {
      return <ListItem
      key={company._id}
      primaryText={company.name}
      leftIcon={<CompanyIcon />}
      onTouchTap={this._handleTouchTapRoute.bind(this, company._id)} />;
    })}
    </List>;
  },
  _submitNewCompany() {
    const refs = this.refs;
    const companyName = refs.companyName.getValue().trim();

    // Call the Method
    Companies.methods.newCompany.call({
      name: companyName
    }, (err) => {
      if (err) {
        if (err.error === 'Companies.methods.newCompany.unauthorized') {
          alert('Yeni şirket eklenemedi.');
        } else {
          alert(err.error);
        }
      } else {
        this.refs.companyName.clearValue();
        alert('Yeni şirket başarıyla eklendi.');
      }
    });
  },
  render() {
    const paperStyle = {
      padding: 20,
      marginBottom: 10
    };
    return <div>

    <Paper style={paperStyle} zDepth={2}>
    <div className="newCompany">
    <h3>Yeni Şirket Ekle</h3>
    <TextField ref="companyName" hintText="Şirket İsmi" />
    <RaisedButton label="Ekle" onClick={this._submitNewCompany} secondary={true} />
    </div>
    </Paper>

    <Paper style={paperStyle} zDepth={2}>
    <div className="companyList">
    <h3>Şirketler</h3>
    { this.data.companies ? this.getCompaniesList() : 'Şirketler listeleniyor...' }
    </div>
    </Paper>

    </div>;
  }
});
