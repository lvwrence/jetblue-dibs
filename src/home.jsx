var React = require('react');
import { render } from 'react-dom';
var request = require('superagent');

var CardRow = React.createClass({
  propTypes: {
    destinations: React.PropTypes.array.isRequired
  },

  render: function() {
    var cards = this.props.destinations.map(function(destination) {
      return (<Card destination={destination} key={destination.code} />);
    });

    return (
      <div className="row">
        {cards}
      </div>
    );
  }
});

var Card = React.createClass({
  propTypes: {
    destination: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="homepage-card four columns hvr-grow">
        <a href={this.props.destination.code}>
          <img className="homepage-image" src={this.props.destination.image} />
          <h2 className="homepage-image-text">{this.props.destination.city}</h2>
        </a>
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
    var rows = [];
    var row = [];
    var count = 0;
    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    for (var i = 0; i < this.state.destinations.length; i++) {
      if (i && i % 3 === 0) {
        rows.push(shuffle(row));
        row = [];
      }
      row.push(this.state.destinations[i]);
      shuffle(rows);
    }

    var rowDivs = rows.map(function(row) {
      return (<CardRow destinations={row} />);
    });

    return (
      <span>
        <h1 className='projectname'>Dibs, by <span className='jetblue'>JetBlue</span>.</h1>
        <h2 className='tagline'>Discounted travel packages.</h2>
        <h2 className='tagline'>Be the first to know.</h2>
        <h2 className='tagline'>Be the first to book.</h2>
        <div className='homepage-module'>
          {rowDivs}
        </div>
        <h3 className='credits'>A hack by Lawrence Wu, Jesse Gleave Riemann, Jaehyun Wie, and Philip Kukulak.</h3>
      </span>
    );
  }
});

render(<Home />, document.getElementById('home'));
