/* global Meteor GoogleMaps */
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
      center: new google.maps.LatLng(39.934486,32.853241),
      zoom: 7
    };
  },
  render() {
    if (this.data.loaded)
      return <Map name="mymap" options={this.data.mapOptions} />
    
    return <div>Harita yükleniyor...</div>;
  }
});

Map = React.createClass({
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
  render() {
    return <div id="map" className="googleMap"></div>;
  }
});
