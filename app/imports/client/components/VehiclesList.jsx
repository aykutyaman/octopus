import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MapsDirectionsCar from 'material-ui/lib/svg-icons/maps/directions-car';

export const VehiclesList = ({vehicles}) => (
  <List>
    {vehicles.map(vehicle => (
      <ListItem primaryText={vehicle.plate} key={vehicle._id} leftIcon={<MapsDirectionsCar />}/>
     ))}
  </List>
);
