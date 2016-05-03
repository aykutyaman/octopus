import { EventEmitter } from 'events';

class VehicleDeviceHub extends EventEmitter {}

const vehicleDeviceHub = new VehicleDeviceHub();

export default vehicleDeviceHub;
