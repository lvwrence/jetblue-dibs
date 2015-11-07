var React = require('react');

var Subpage = React.createClass({
  render: function() {
    return (
      <div>
        hello world
      </div>
    );
  }
});

render(<Subpage/>, document.getElementById('subpage'));
