/* global FlowRouter, React*/

const { LeftNav, MenuItem } = MUI;

AppLeftNav = React.createClass({
  _onLeftNavChange(e, selectedIndex, menuItem) {
    if (menuItem.target) {
      FlowRouter.go(menuItem.target);
    }
  },
  getMenuItems() {
    const menuItems = [
      { text: 'Ana Sayfa', target: '/admin' }
    ];

    if (Meteor.userId()) {
      menuItems.push({ text: 'Şirketler', target: '/admin/companies' });
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
