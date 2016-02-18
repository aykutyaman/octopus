import React from 'react';

const Marker = React.createClass({
  getInitialState: function() {
    return {
      marker: ""
    };
  },

  componentDidMount: function() {
    const tooltip = new google.maps.InfoWindow();
    const markerImage = new google.maps.MarkerImage(
      "https://s3-eu-west-1.amazonaws.com/kuresel-upload/marker-octopus.png",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(62, 88)
    );

    // TODO: haritayi almak icin GoogleMaps paketinin bir fonksiyonu kullaniliyor.
    // Bunun yerine Map komponenti buraya haritayi parametre olarak gondermeli.
    GoogleMaps.ready('myMap', (map) => {
      const marker = new google.maps.Marker({
        map: map.instance,
        icon: markerImage
      });
      this.setState({
        map: map,
        marker: marker
      });

      marker.addListener('click', function() {
        tooltip.open(map.instance, marker);
      });
    });
  },

  getLatLng: function() {
    const locationArr = this.props.track ? this.props.track.location.coordinates : [];
    return locationArr.length ? _.object(['lat', 'lng'], locationArr) : "";
  },

  setMarkerPosition: function() {
    const latLng = this.getLatLng();
    const map = this.state.map;
    const marker = this.state.marker;

    if (map && marker) {
      marker.setPosition(latLng);
      console.log('update marker');

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(15);
    };
  },

  render: function() {
    this.setMarkerPosition();
    return (
      <div>dummy!</div>
    );
  }
});


export default Marker;
