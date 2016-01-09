/* global MainLayout, React */

injectTapEventPlugin();

var { ThemeManager, LightRawTheme } = MUI.Styles;

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
    return (
      <div>
	{this.props.content()}
      </div>
    )
  }
});
