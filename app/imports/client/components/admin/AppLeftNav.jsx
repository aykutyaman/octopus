/* global FlowRouter, React*/
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const AppLeftNav = React.createClass({
  _onLeftNavChange(e, selectedIndex, menuItem) {
    if (menuItem.target) {
      FlowRouter.go(menuItem.target);
    }
  },
  getMenuItems() {
    const menuItems = [
      { text: 'Ana Sayfa', target: '/' }
    ];

    if (Meteor.userId()) {
      menuItems.push({ text: 'Şirketler', target: '/list-companies' });
    }

    return menuItems;
  },
  toggle() {
    return this.refs.nav.toggle();
  },
  render() {
    return <LeftNav docked={false} onChange={this._onLeftNavChange} menuItems={this.getMenuItems()} ref="nav" />;
  }
});
