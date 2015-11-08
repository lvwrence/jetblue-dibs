var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { render } from 'react-dom';
var request = require('superagent');


var Feed = React.createClass({
  propTypes: {
    locations: React.PropTypes.array.isRequired
  },

  render: function() {
/*
    var rows = this.props.locations.map(function(location) {

      return (
        <div className='row subpage-feed-photo-row' key={photo}>
          <img src={photo} className='subpage-feed-photo' />
        </div>
      );
    });
*/

    var rows = [];

    return (
      <div className='subpage-feed'>
        <ReactCSSTransitionGroup transitionName="feed" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
          {rows}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Map = React.createClass({
  render: function() {
            return <h1> Hello world </h1>
          }
});

var Subpage = React.createClass({
  getInitialState: function() {
    return {
        flight: null,
        locations: [],
    };
  },
  componentDidMount: function() {
    var urlPieces = window.location.href.split('/');
    var code = urlPieces[urlPieces.length - 1];


    request
    .get('api/destinations/' + code + '/feed')
    .end(function(err, res) {

      var codeObj = JSON.parse(res.text);
      console.log(codeObj);

      this.setState({
        flight: codeObj.flight,
        locations: codeObj.location_list
      });
      this.refs.map.setMap(codeObj.flight);

    }.bind(this));
  },
  render: function() {

    return (
      <div className='subpage'>
        <Feed locations={this.state.locations} />
        <GoogleMap flight={this.state.flight} mlat="55.0000" mlong="-113.0000" ref="map"/>
        {/* main content here */}
        <Map />
      </div>
    );
  }
});

var GoogleMap = React.createClass({

  setMap: function (flight) {
    var originLocation = makeLatLng(flight.origin_coords);
    var destLocation = makeLatLng(flight.dest_coords);
    var markers = [originLocation, destLocation];

    var mapOptions = {
          center: originLocation,
          zoom: 6
    };
    
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i]);
    }

    var map = new google.maps.Map(this.refs.googleMap); //, mapOptions);

    var originMarker = new google.maps.Marker({position: originLocation, title: 'Hi', map: map});
    var destMarker = new google.maps.Marker({position: destLocation, title: 'Hi', map: map});
    var flightPath = new google.maps.Polyline({
            path: markers,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

    flightPath.setMap(map)
    map.fitBounds(bounds);

    this.setState({map: map});
  },

  render: function () {
    return (
        <div ref="googleMap" className='map-gic'></div>
        );
  }
});


var makeLatLng = function(coords) {
  return new google.maps.LatLng(coords[0], coords[1]);
}

render(<Subpage />, document.getElementById('subpage'));
