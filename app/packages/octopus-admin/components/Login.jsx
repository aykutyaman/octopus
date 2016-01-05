/* global FlowRouter, React, ReactDOM */
Login = React.createClass({
  handleSubmit(event) {
    event.preventDefault();

    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

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
    return <div>
    <h3>Octopus Admin Giriş</h3>
    <form className="login">
    <p><input type="text" ref="email" placeholder="Email" /></p>
    <p><input type="password" ref="password" placeholder="Şifre" /></p>
    <p><button onClick={this.handleSubmit}>Giriş</button></p>
    </form>
    </div>;
  }
});
