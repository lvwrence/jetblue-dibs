var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { render } from 'react-dom';
var request = require('superagent');


var Feed = React.createClass({
  propTypes: {
    code: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      photos: []
    };
  },

  componentDidMount: function() {
    request
    .get('api/destinations/' + this.props.code + '/feed')
    .end(function(err, res) {
      var newPhotos = JSON.parse(res.text);
      var i = 0;

      setInterval(function() {
        var photos = this.state.photos.slice(0);

        if (photos.length === 3) {
          photos.splice(2, 1);
        }

        photos.unshift(newPhotos[i]['images'][0]);
        console.log(photos);

        if (i === newPhotos.length - 1) {
          i = 0;
        } else {
          i++;
        }

        this.setState({
          photos: photos
        });
      }.bind(this), 5000);

      console.log(res);
    }.bind(this));
  },

  render: function() {
    var rows = this.state.photos.map(function(photo) {
      return (
        <div className='row subpage-feed-photo-row' key={photo}>
          <img src={photo} className='subpage-feed-photo' />
        </div>
      );
    });

    return (
      <div className='subpage-feed'>
        <ReactCSSTransitionGroup transitionName="feed" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
          {rows}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Subpage = React.createClass({
  render: function() {
    var urlPieces = window.location.href.split('/');
    var code = urlPieces[urlPieces.length - 1];

    return (
      <div className='subpage'>
        <Feed code={code} />
        {/* main content here */}
      </div>
    );
  }
});

render(<Subpage />, document.getElementById('subpage'));
