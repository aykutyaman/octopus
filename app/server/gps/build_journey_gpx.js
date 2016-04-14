import { DB } from '/server/graphql/db';
import promise from 'meteor/promise';
import { saveGPXToS3 } from './save_gpx_to_s3';
import { buildGPXFile } from './build_gpx_file';

export const buildJourneyGPX = (journeyId, imei) => {
  try {
    const coordinates = DB.Tracks.getCoordinatesByImei(imei);

    const gpx = buildGPXFile(coordinates);

    const result = Promise.await(saveGPXToS3(gpx, journeyId));

    return result;

  } catch (error) {
    console.log(error);
  }
};
