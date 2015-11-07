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
      photos: ['https://scontent-lga3-1.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12224410_1675698252715933_34938382_n.jpg']
    };
  },

  componentDidMount: function() {
    request
    .get('api/destinations/' + this.props.code + '/feed')
    .end(function(err, res) {

      setInterval(function() {
        var photos = this.state.photos.slice(0);

        if (photos.length === 3) {
          photos.splice(0, 1);
        }
        photos.unshift('https://scontent-lga3-1.xx.fbcdn.net/hprofile-xtf1/v/t1.0-1/c192.192.768.768/s320x320/12042648_10156080020945722_4267941789067235661_n.jpg?oh=2d0a9788f4f75996968911595d75d802&oe=56BA860C');

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
        <div className='row' key={photo}>
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
      </div>
    );
  }
});

render(<Subpage />, document.getElementById('subpage'));
