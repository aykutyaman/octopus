import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


export const Modal = React.createClass({
  handleClose() {
    this.props.hideModal();
  },
  render() {
    const actions = [
      <FlatButton
              label="Kapat"
              secondary={true}
              onTouchTap={this.handleClose} />
    ];

    return (
      <div>
	<Dialog
		title="Dialog With Actions"
		actions={actions}
		open={this.props.showModalState}
		onRequestClose={this.handleClose}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>
      </div>
    );
  }
});
