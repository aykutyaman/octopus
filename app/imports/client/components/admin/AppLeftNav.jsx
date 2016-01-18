/* global FlowRouter, React*/
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const AppLeftNav = React.createClass({
  getInitialState() {
    return {
      leftNavOpen: false
    };
  },
  getMenuItems() {
    const menuItems = [
      { text: 'Ana Sayfa', target: '/admin', id: 'homePage' }
    ];

    if (Meteor.userId()) {
      menuItems.push({ text: 'Şirketler', target: '/admin/companies', id: 'companies' });
    }
    return menuItems;
  },
  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open
    });
  },
  toggle() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },
  render() {
    const list = this.getMenuItems().map((item) => {
      return (
	<ListItem
		primaryText={item.text} key={item.id} href={item.target} />
      )
    });

    return (
      <LeftNav
	      docked={false}
	      open={this.state.leftNavOpen}
	      onRequestChange={this.handleChangeRequestLeftNav}
      >
	<List >
	  {list}
	</List>
      </LeftNav>
    );
  }
});
