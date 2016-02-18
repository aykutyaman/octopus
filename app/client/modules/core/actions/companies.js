export default {
  create({Meteor, LocalState, FlowRouter}, name) {
    if (!name) {
      return LocalState.set('SAVING_ERROR', 'Başlık girmek zorunludur.');
    }

    LocalState.set('SAVING_ERROR', null);

    // There is a method stub for this in the config/method_stubs
    // That's how we are doing latency compensation
    Meteor.call('companies.create', name, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.message);
      }
    });
    FlowRouter.go('/admin/companies');
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
