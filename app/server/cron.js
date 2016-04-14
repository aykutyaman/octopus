import { SyncedCron } from 'meteor/percolate:synced-cron';
import { DB } from '/server/graphql/db';
import moment from 'moment';

SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 03:40');
  },
  job: function() {
    const date = moment().subtract(1, 'days').toDate();
    DB.Tracks.deleteByDate(date);
  }
});

SyncedCron.start();
