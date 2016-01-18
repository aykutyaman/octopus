/* global React, ReactMeteorData, Companies, Vehicles, FlowRouter*/

const {Paper, List, ListItem, TextField, RaisedButton} = MUI;
const VehicleIcon = MUI.Libs.SvgIcons.NotificationTimeToLeave;
const CompanyIcon = MUI.Libs.SvgIcons.SocialLocationCity;

VehiclesContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const companyId = FlowRouter.getParam('companyId');
    const handleCompanySubs = Meteor.subscribe('Companies.single', companyId);
    const handleVehiclesSubs = Meteor.subscribe('Vehicles.inList', companyId);
    const data = {};

    if (handleCompanySubs.ready() && handleVehiclesSubs.ready()) {
      data.company = Companies.findOne(companyId);
      data.vehicles = Vehicles.find({'company._id': companyId}, {sort: { createdAt: -1 }}).fetch();
    }
    return data;
  },
  getVehiclesList() {
    return <List>
    {this.data.vehicles.map( vehicle => {
      return <ListItem
      key={vehicle._id}
      primaryText={vehicle.plate}
      secondaryText={vehicle.imei}
      leftIcon={<VehicleIcon />} />;
    })}
    </List>;
  },
  getCompanyInfo() {
    const companyId = FlowRouter.getParam('companyId');
    const company = Companies.findOne(companyId);

    return <div>
    <h1> <CompanyIcon /> {company.name}</h1>
    </div>;
  },
  _submitNewVehicle() {
    const refs = this.refs;
    const plate = refs.vehiclePlate.getValue().trim();
    const imei = refs.vehicleImei.getValue().trim();
    const companyId = FlowRouter.getParam('companyId');

    const company = Companies.findOne(companyId);

    if (!company) {
      alert('Şirket bulunamadı.');
      return;
    }
    // Call the Method
    Vehicles.methods.newVehicle.call({
      companyId: company._id,
      companyName: company.name,
      plate: plate,
      imei: imei
    }, (err) => {
      if (err) {
        alert(err);
      } else {
        this.refs.vehiclePlate.clearValue();
        this.refs.vehicleImei.clearValue();
        alert('Yeni araç başarıyla eklendi.');
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
    {this.data.company ? this.getCompanyInfo() : 'Şirket bilgileri yükleniyor...'}
    </Paper>

    <Paper style={paperStyle} zDepth={2}>
    <div className="newVehicle">
    <h3>Yeni Araç Ekle</h3>
    <TextField ref="vehiclePlate" hintText="Araç Plakası" />
    <span> </span>
    <TextField ref="vehicleImei" hintText="IMEI" />
    <span> </span>
    <RaisedButton label="Ekle" onClick={this._submitNewVehicle} secondary={true} />
    </div>
    </Paper>

    <Paper style={paperStyle} zDepth={2}>
    <div className="vehiclesList">
    <h3>Araçlar</h3>
    {this.data.vehicles ? this.getVehiclesList() : 'Araçlar yükleniyor...'}
    </div>
    </Paper>

    </div>;
  }
});
