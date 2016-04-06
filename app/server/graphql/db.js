import { JourneyReports } from '/lib/collections';

export const DB = {
  Reports: {
    getJourneys: function({plates, limit, from, to}) {
      return JourneyReports.find({
	plate: {$in: plates},
	startedAt: {$gte: new Date(from)},
	stoppedAt: {$lte: new Date(to)}
      }, {limit: limit}).fetch();
    }
  }
};
