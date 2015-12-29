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
      return <Map name="mymap" options={this.data.mapOptions} />
    }
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
    console.log('render MAP');
    return (
      <div>
	<div id="map" className="googleMap"></div>

	<MeteorData
		subscribe = { () => {
			     return Meteor.subscribe('Track.foo') }}
		fetch = { () => {
			 return {data: Tracks.findOne()}}}
		render = { ({loading, data}) => {
			  return <MapMarker name="mymap"  data={data} loading={loading} />
			  }}
				 />
      </div>
    )
  }
});

MapMarker = React.createClass({
  componentDidMount() {
    console.log('mount');
  },
  getLatLng() {
    const locationArr = this.props.data ? this.props.data.location.coordinates : [];
    return locationArr.length ? _.object(['lat', 'lng'], locationArr) : "";
  },
  setMarkerPosition() {
    const latLng = this.getLatLng();
    GoogleMaps.ready(this.props.name, (map) => {
      var marker;

      if (!latLng) {
	return;
      }

      if (!marker) {
	console.log('new marker');
	marker = new google.maps.Marker({
	  position: new google.maps.LatLng(latLng.lat, latLng.lng),
	  map: map.instance
	});
      } else {
	console.log('update marker');
	marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      //map.instance.setCenter(marker.getPosition());
      //map.instance.setZoom(15);
    });
  },
  render() {
    if (!this.props.loading) {
      // we can render marker
      this.setMarkerPosition();
    }
    return <div></div>;
  }
});
