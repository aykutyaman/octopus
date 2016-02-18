export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    if (!email || !password) {
      return LocalState.set('LOGIN_ERROR', 'Şifre ve email zorunludur.');
    }

    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(email, password, (err) => {
      if (err && err.reason) {
        return LocalState.set('LOGIN_ERROR', err.reason);
      }
      FlowRouter.go('/admin/companies');
    });
  },

  loginErrorClear({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  }
}
