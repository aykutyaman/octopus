const {
  LeftNav,
  MenuItem
} = MUI;


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
	<MenuItem index={0}>Menu Item</MenuItem>
	<MenuItem index={1}>Menu Item2</MenuItem>
      </LeftNav>
    )
  }
});
