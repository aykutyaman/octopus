import React from 'react';

const MapControls = React.createClass({
  getInitialState() {
    return {
      mapCreated: false
    };
  },
  componentDidMount() {
    const {LocalState} = this.props.context();

    // defaults
    LocalState.set('ZOOM_VEHICLE', true);
    LocalState.set('CENTER_VEHICLE', true);

    this.setState({
      mapCreated: true
    });
  },
  mountMapControls() {
    if (this.state.mapCreated) {
      const { GoogleMaps } = this.props.context();
      const map = GoogleMaps.maps.myMap;

      const controls = map.instance.controls[google.maps.ControlPosition.RIGHT_BOTTOM].getArray();

      if ( controls.length === 0 ) {
        const centerControlDiv = document.createElement('div');
        this._centerControl(centerControlDiv);

        centerControlDiv.index = 1;
        map.instance.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
      }
    }
  },
  _zoomVehicle() {
    const { zoom, zoomVehicle } = this.props;
    zoomVehicle(zoom);
  },
  _centerVehicle() {
    const { center, centerVehicle } = this.props;
    centerVehicle(center);
  },
  _centerControl(controlDiv) {
    // zoom vehicle ui
    const controlZoomUI = document.createElement('img');
    controlZoomUI.src = 'https://s3-eu-west-1.amazonaws.com/kuresel-v4/img/lockedzoomwithbackground.svg';
    controlZoomUI.style.cursor = 'pointer';
    controlZoomUI.style.marginTop = '5px';
    controlZoomUI.style.marginRight = '9px';
    controlZoomUI.style.width = '32px';
    controlZoomUI.style.boxShadow = '2px 2px 5px #ccc';
    controlZoomUI.style.display = 'block';
    controlZoomUI.title = 'Yakınlaştırma kilidi';
    controlDiv.appendChild(controlZoomUI);

    // center vehicle ui
    const controlCenterUI = document.createElement('img');
    controlCenterUI.src = 'https://s3-eu-west-1.amazonaws.com/kuresel-v4/img/lockedvehiclewithbackground.svg';
    controlCenterUI.style.cursor = 'pointer';
    controlCenterUI.style.marginTop = '5px';
    controlCenterUI.style.marginRight = '9px';
    controlCenterUI.style.width = '32px';
    controlCenterUI.style.boxShadow = '2px 2px 5px #ccc';
    controlCenterUI.style.display = 'block';
    controlCenterUI.title = 'Aracı takip et';
    controlDiv.appendChild(controlCenterUI);

    // Setup the click event listeners
    controlZoomUI.addEventListener('click', () => {
      this._zoomVehicle();
    });

    controlCenterUI.addEventListener('click', () => {
      this._centerVehicle();
    });
  },
  render() {
    this.mountMapControls();
    return <noscript />;
  }
});

export default MapControls;
