/* global FlowRouter, React, ReactDOM */

const {TextField, Paper, RaisedButton, Snackbar} = MUI;
Login = React.createClass({
  handleSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.getValue().trim();
    const password = this.refs.password.getValue().trim();

    if (email.length === 0 || password.length === 0) {
      alert("Email ve şifre alanları boş olamaz.");
      return;
    }

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        FlowRouter.go('/admin');
      }
    });
  },
  render() {
    const paperStyle = {
      padding: '30px'
    };
    return <Paper style={paperStyle} zDepth={3}>
        <center>
          <Paper zDepth={0} circle={true}>
            <img src="https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/2-128.png" />
          </Paper>
          <br />
          <TextField
            ref="email"
            floatingLabelText="E-posta" />
          <br />
          <TextField
            ref="password"
            floatingLabelText="Şifre"
            type="password" />
          <br />
          <RaisedButton onClick={this.handleSubmit} label="Giriş" secondary={true} />
        </center>
      </Paper>;
  }
});
