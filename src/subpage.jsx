var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { render } from 'react-dom';
var request = require('superagent');


var Feed = React.createClass({
  propTypes: {
    photos: React.PropTypes.array.isRequired
  },

  render: function() {
    console.log(this.props.photos);
    var rows = this.props.photos.map(function(photo) {
      return (
        <div className='row subpage-feed-photo-row' key={photo}>
          <img src={photo} className='subpage-feed-photo' />
        </div>
      );
    });

    return (
      <div className='subpage-feed'>
        <ReactCSSTransitionGroup transitionName="feed" transitionEnterTimeout={1000} >
          {rows}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Subpage = React.createClass({
  getInitialState: function() {
    return {
        flight: null,
        photos: [],
        hotelImage: null
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
      var photos = codeObj.location_list[0].images;
      this.setState({
        flight: codeObj.flight,
        photos: [photos[0]],
        hotelImage: codeObj.location_list[0]['hotel_image']
      });

      this.refs.map.setMap(codeObj.flight);

      var i = 1;
      setInterval(function() {
        var newPhotos = this.state.photos.slice(0);
        newPhotos.unshift(photos[i]);
        newPhotos.splice(3, 1);

        this.setState({
          photos: newPhotos
        });

        if (i === photos.length - 1) {
          i = 0;
        } else {
          i++;
        }
      }.bind(this), 3000);
    }.bind(this));
  },
  render: function() {
    var flightTo;
    var staying;
    var hotelImage;
    var bookNow;
    if (this.state.flight) {
      flightTo = <h1 className='subpage-header'>Hey! Here's your flight to <span className='jetblue'>{this.state.flight.dest_city}</span>.</h1>
      staying = <h1 className='subpage-header'>You'll be staying at the <span className='jetblue'>{this.state.flight.hotel_property}</span>.</h1>;
      hotelImage = <img className='subpage-hotel-image' src={this.state.hotelImage} />
      bookNow = <a href='http://www.jetblue.com/vacations/'><button className='pure-button pure-button-primary book-now'>Book Now</button></a>
    } else {
      flightTo = <h1 className='subpage-header'>Hey! Here's your flight:</h1>
    }

    return (
      <div className='subpage'>
        <Feed photos={this.state.photos} />
        <div className='subpage-content'>
          {flightTo}
          <GoogleMap flight={this.state.flight} mlat="55.0000" mlong="-113.0000" ref="map"/>
          {staying}
          {hotelImage}
          {bookNow}
        </div>
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
      disableDefaultUI: true,
      draggable: false,
      panControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      mapTypeControl: false
    };

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i]);
    }

    var map = new google.maps.Map(this.refs.googleMap, mapOptions);

    var originMarker = new google.maps.Marker({position: originLocation, map: map});
    originMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

    var destMarker = new google.maps.Marker({position: destLocation, map: map});
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
