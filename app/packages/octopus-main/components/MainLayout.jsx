/* global MainLayout, React */

injectTapEventPlugin();

const {
  AppBar,
  Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

MainLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  render() {
    const styles = {
      zIndex: 1101
    }
    const mainStyles = {
      paddingLeft: 256
    }
    return (
      <div>
	<AppBar style={styles} title='Octopus' />
	<div style={mainStyles}>
	  {this.props.content()}
	</div>
	<AppLeftNav />
      </div>
    )
  }
});
