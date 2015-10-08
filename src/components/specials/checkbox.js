var React = require("react");

var Checkbox = React.createClass({
    getInitialState: function () {
        return {
            selected: this.props.value !== undefined ? this.props.value : true
        }
    },

    setValue: function (value) {
        this.setState({selected: value});
        if (this.props.onChange !== undefined)
            this.props.onChange(value);
    },

    render: function () {
        var value = this.props.value !== undefined ? this.props.value : this.state.selected;
        var selection = value ? "leftSelected" : "rightSelected";

        var leftSelected = "", rightSelected = "";
        if (value)
            rightSelected = "checkbox_block_not_selected";
        else
            leftSelected = "checkbox_block_not_selected";

        return <div className="checkbox">
            <div className={selection + " selectBox"}></div>
            <div className="checkbox_blockWrapper">
                <div className={"checkbox_block " + leftSelected} onClick={function(){
                    this.setValue(true);
                }.bind(this)}>Ja
                </div>
                <div className={"checkbox_block " + rightSelected} onClick={function(){
                    this.setValue(false);
                }.bind(this)}>Nej
                </div>
            </div>
        </div>
    }
});

module.exports = Checkbox;