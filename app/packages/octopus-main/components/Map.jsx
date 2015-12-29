/* global Meteor, GoogleMaps, google, ReactMeteorData, React */
MapContainer = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    GoogleMaps.load();
  },
  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    return {
      center: new google.maps.LatLng(39.934486, 32.853241),
      zoom: 7
    };
  },
  render() {
    if (this.data.loaded) {
      return <Map name="mymap" options={this.data.mapOptions} />;
    }
    return <div>Harita yükleniyor...</div>;
  }
});

Map = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: document.getElementById('map'),
      options: this.props.options
    });
  },
  getMeteorData() {
    const handle = Meteor.subscribe('endPosition');
    const data = {};
    if(handle.ready()) {
      data.endPosition = Tracks.findOne();
    }
    
    return data;
  },
  getLatLng() {
    const locationArr = this.data.endPosition ? this.data.endPosition.location.coordinates : [];
    return locationArr.length ? _.object(['lat', 'lng'], locationArr) : "";
  },
  setMarkerPosition() {

    const latLng = this.getLatLng();

    GoogleMaps.ready(this.props.name, function(map) {
      var marker;

      // Create and move the marker when latLng changes.

      if (!latLng) {
        return;
      };

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(15);
    });
    
  },
  render() {
    this.setMarkerPosition()
    return <div id="map" className="googleMap"></div>;
  }
});
