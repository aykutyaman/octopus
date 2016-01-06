const {
  LeftNav,
  Menu,
  MenuItem,
  List,
  ListItem,
  FontIcon
} = MUI;

const ContentInbox = MUI.Libs.SvgIcons.NotificationTimeToLeave;

AppLeftNav = React.createClass({
  render() {
    const leftNavStyles = {
      marginTop: 64
    };

    const foo = {
      cursor: 'pointer',
      marginTop: 64
    };

    return (
      <LeftNav
	      open={false}
	      styles={leftNavStyles}
      >
	<div style={foo}></div>
	<List>
	  <ListItem
		  primaryText="Araçlar"
		  onClick={this.props.showModal}
		  leftIcon={<ContentInbox />} />
	</List>
      </LeftNav>
    )
  }
});
