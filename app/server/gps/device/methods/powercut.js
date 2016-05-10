import { DB } from '/server/graphql/db';

export const powercut = (data) => {
  console.log('Powercar received');

  const vehicle = DB.Vehicles.getByImei(data.imei);

  if (!vehicle) {
    throw new Error("We cannot find the vehicle for imei:" + data.imei);
  }

  const powerCut = vehicle.powerCut || false;

  DB.Vehicles.updatePowerCutStatus(vehicle._id, !powerCut);
}
