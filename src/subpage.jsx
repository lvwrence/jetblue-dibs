var React = require('react');
import { render } from 'react-dom';
var request = require('superagent');

var Subpage = React.createClass({
  render: function() {
    return (
      <div>
        hello world
      </div>
    );
  }
});

render(<Subpage />, document.getElementById('subpage'));
