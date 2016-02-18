export default {
  create({Meteor, LocalState, FlowRouter}, plate, imei, company) {
    if (!plate || !imei || !company) {
      return LocalState.set('SAVING_ERROR', 'Plaka, imei ve şirket seçmek zorunludur.');
    }

    LocalState.set('SAVING_ERROR', null);

    Meteor.call('vehicles.create', plate, imei, company, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.message);
      }
    });
    FlowRouter.go(`/admin/companies/${company}/vehicles`);
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
