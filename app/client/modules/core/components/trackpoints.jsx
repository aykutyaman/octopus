import React from 'react';

const TrackPoints = React.createClass({

  setPoints: function() {
    // XXX: muhtemelen bu elementlerin baslatilmasi action icinde olmali
    //http://www.jacquet80.eu/blog/post/2011/02/Display-GPX-tracks-using-Google-Maps-API
    const map = GoogleMaps.maps.myMap.instance;

    var points = [];
    var bounds = new google.maps.LatLngBounds ();
    // XXX: jquery ile stringi parse etmek pek hos degil
    $(this.props.gpx).find("trkpt").each(function() {
      var lat = $(this).attr("lat");
      var lon = $(this).attr("lon");
      var p = new google.maps.LatLng(lat, lon);
      points.push(p);
      bounds.extend(p);
    });

    var poly = new google.maps.Polyline({
      // use your own style here
      path: points,
      strokeColor: "#FF00AA",
      strokeOpacity: .7,
      strokeWeight: 4
    });

    poly.setMap(map);

    // fit bounds to track
    map.fitBounds(bounds);

  },

  render: function() {
    this.setPoints();
    return (
      <div>dummy!</div>
    );
  }
});


export default TrackPoints;
