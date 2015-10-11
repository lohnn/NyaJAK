/**
 * Created by lohnn on 2015-10-11.
 */


var React = require("react");

var MinMax = React.createClass({
    render: function () {
        return <span>{this.props.first} | {this.props.last}</span>
    }
});

module.exports = MinMax;