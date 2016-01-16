import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';

import { Modal } from './Modal.jsx';

export const AppLeftNav = React.createClass({
  getInitialState() {
    return {
      showModalState: false
    }
  },
  showModal(modalType) {
    this.setState({
      showModalState: true
    });
  },
  hideModal(e) {
    this.setState({
      showModalState: false
    });
  },

  render() {
    const leftNavStyles = {
      marginTop: 64
    };

    const foo = {
      cursor: 'pointer',
      marginTop: 64
    };

    return (
      <div>
	<LeftNav
		open={true}
		styles={leftNavStyles}
	>
	  <div style={foo}></div>
	  <List>
	    <ListItem
		    primaryText="Araçlar"
		    onClick={this.showModal}
		    leftIcon={<ContentInbox />} />
	  </List>
	</LeftNav>
	<Modal
		showModalState={this.state.showModalState}
		hideModal={this.hideModal} />
      </div>
    )
  }
});
