var React = require('react');
var request = require('superagent');

var Card = React.createClass({
  propTypes: {
    destination: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="homepage-card four columns">
        <img className="homepage-image" src={this.props.destination.image} />
        <h2 className="homepage-image-text">{this.props.destination.city}</h2>
      </div>
    );
  }
});

var Home = React.createClass({
  getInitialState: function() {
    return {
      destinations: []
    };
  },

  componentDidMount: function() {
    request
    .get('api/destinations')
    .end(function(err, res) {
      var destinations = JSON.parse(res.text);
      this.setState({
        destinations: destinations
      });
    }.bind(this));
  },

  render: function() {
    var cards = this.state.destinations.map(function(destination) {
      console.log(destination);
      return (<Card destination={destination} key={destination.code} />);
    });

    return (
      <div className='homepage-module'>
        {cards}
      </div>
    );
  }
});

module.exports = Home;
