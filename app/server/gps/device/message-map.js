import { accStart } from './methods/accstart';
import { accStop } from './methods/accstop';
import { accOn } from './methods/accon';
import { powercut } from './methods/powercut';

export const messageMap = {
  accstart: accStart,
  accstop: accStop,
  help: () => {
    console.log('HELP MESSAGE');
  },
  accon: accOn,
  accoff: () => {
    // console.log('ACC OFF');
  },
  powercar: powercut
};
