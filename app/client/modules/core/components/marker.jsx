import React from 'react';

const Marker = React.createClass({
  getInitialState: function() {
    return {
      marker: ''
    };
  },

  componentDidMount: function() {
    const tooltip = new google.maps.InfoWindow();
    const markerImage = {
      url: 'https://s3-eu-west-1.amazonaws.com/kuresel-upload/marker-octopus.png', // url
      scaledSize: new google.maps.Size(62, 86), // scaled size
    };

    const geocoder = new google.maps.Geocoder();

    const map = GoogleMaps.maps.myMap;
    const {instance} = map;

    const marker = new google.maps.Marker({
      map: instance,
      icon: markerImage
    });

    this.setState({
      map: map,
      marker: marker,
      tooltip: tooltip,
      geocoder: geocoder
    });

    marker.addListener('click', () => {
      this.openTooltip(map.instance, marker);
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
      this.props.handler(marker.getPosition());
    }
  },

  getTooltipContent({plate, speed, address}) {
    const contentString = '<div>' +
                          '<h3> Plaka : ' + plate + '</h3>' +
                          '<p> <strong>Hız : </strong><span class="badge">' + speed + '</span> </p>' +
                          '<p> <strong>Adres : </strong>' + address + '</p>' +
                          '</div>';
    return contentString;
  },

  openTooltip(mapInstance, marker) {
    const tooltip = this.state.tooltip;
    const geocoder = this.state.geocoder;
    const latLng = this.getLatLng();

    geocoder.geocode({location: latLng}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          const plate = this.props.plate;
          const speed = this.props.track.speed;
          const address = results[0].formatted_address;

          const contentString = this.getTooltipContent({plate, speed, address});
          tooltip.setContent(contentString);
          tooltip.open(mapInstance, marker);
        } else {
          console.log('Geocode was not successful for the following reason: ${status}');
        }
      }
    });
  },

  render: function() {
    this.setMarkerPosition();
    return (
      <div>dummy!</div>
    );
  }
});


export default Marker;
