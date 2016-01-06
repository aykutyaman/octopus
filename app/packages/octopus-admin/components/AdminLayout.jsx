/* global FlowRouter, MainLayout, React */

injectTapEventPlugin();

const {
  AppBar,
  Styles,
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
    const mainStyles = {
      padding: '10px'
    };
    return <div>
    <AppLeftNav ref="nav" />

    <AppBar
    title={"Octopus Admin"}
    onLeftIconButtonTouchTap={this.openLeftNav}
    iconElementRight={this.navElementRight()}
    />

    <div style={mainStyles}>
    {this.props.content()}
    </div>
    </div>;
  }
});
