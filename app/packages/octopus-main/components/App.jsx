const {
  AppBar,
  Styles,
} = MUI;


App = React.createClass({
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
	<AppLeftNav />
      </div>
    );
  }
});
