/* global FlowRouter, MainLayout, React */

injectTapEventPlugin();

const {
  AppBar,
  Styles,
  Paper,
  IconButton,
  FlatButton
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

AdminLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  openLeftNav() {
    this.refs.nav.toggle();
  },
  _handleLogout() {
    Meteor.logout( (error) => {
      if (!error) {
        FlowRouter.go('signin');
      }
    });
  },
  navElementRight() {
    return Meteor.userId() ? <FlatButton label="Çıkış" onTouchTap={this._handleLogout} /> : null;
  },
  render() {
    const containerStyle = {
      padding: 20
    };
    return <div>
    <AppLeftNav ref="nav" />

    <AppBar
    title={"Octopus Admin"}
    onLeftIconButtonTouchTap={this.openLeftNav}
    iconElementRight={this.navElementRight()}
    />

    <Paper style={containerStyle} zDepth={3}>
    {this.props.content()}
    </Paper>
    </div>;
  }
});
