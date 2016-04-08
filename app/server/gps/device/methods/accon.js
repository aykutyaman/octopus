import { DB } from '/server/graphql/db';

export const accOn = (data) => {
  DB.Tracks.create(data);
};
