/**
 * Created by lohnn on 2015-10-11.
 */

var React = require("react");
var NumerShow = require("./../../extras/NumberShow");


var MinMax = React.createClass({
    render: function () {
        return <span>{NumerShow.setSeparator(this.props.first)} | {NumerShow.setSeparator(this.props.last)}</span>
    }
});

module.exports = MinMax;