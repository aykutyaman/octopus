const {
  AppBar,
  Styles,
} = MUI;


App = React.createClass({
  getInitialState() {
    return {
      showModalState: false
    }
  },
  showModal(modalType) {
    this.setState({
      showModalState: true
    });
  },
  hideModal(e) {
    this.setState({
      showModalState: false
    });
  },
  render() {
    const styles = {
      zIndex: 1101
    };
    const mainStyles = {
      paddingLeft: 256
    };

    return (
      <div>
	<AppBar style={styles} title='Octopus' />
	<div style={mainStyles}>
	  <MapContainer />
	</div>
	<AppLeftNav
		showModal={this.showModal}
	/>
	<Modal
		showModalState={this.state.showModalState}
		hideModal={this.hideModal} />
      </div>
    );
  }
});
