import TrackPoints from '../components/trackpoints.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {GoogleMaps} from 'meteor/dburles:google-maps';

/**
 * Haritanin yuklenilmesi icin dogru yer burasinin mi oldugundan emin
 * degilim. Bu islemi burada yaparak komponenti stateless olarak
 * kullanabildik. Bunun aksine marker icin komponenti kullanidik.
 */
export const composer = ({context, gpxFile}, onData) => {
  const {Meteor, Collections} = context();
  // load gps data through ajax
  loadGPXFile(gpxFile, (gpx) => {
    onData(null, {gpx});
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(TrackPoints);

const loadGPXFile = (gpxFile, callback) => {
  $.ajax({
    url: "http://" + gpxFile,
    dataType: "xml",
    success: function(xml) {
      callback(xml);
    },
    error: function(xhr, options, error) {
      console.log(error);
    }
  });
};
