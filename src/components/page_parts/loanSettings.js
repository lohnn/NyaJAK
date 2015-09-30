var React = require("react");

var LoanSettings = React.createClass({
    componentWillMount: function() {
        this.loanSettings = this.props.values;
    },

    changeTime: function (event) {
        this.loanSettings.time = +event.target.value;
        this.props.stateChange(this.loanSettings);
    },
    changeAmount: function (event) {
        this.loanSettings.amount = +event.target.value;
        this.props.stateChange(this.loanSettings);
    },
    changeFörspar: function (event) {
        this.loanSettings.förspar = +event.target.value;
        this.props.stateChange(this.loanSettings);
    },

    render: function(){
    return <div className="header">
        <h1 className="clear">JAK-lån</h1>

        <p>Låneberäkning med säkerhet</p>

        <div className="floatL">
            <p><b>Belopp jag vill låna (kr):</b></p>
            <p></p>
            <input id="belopp"
                   type="range"
                   value={this.props.values.amount}
                   min={this.props.bankSettings.minAmount}
                   max={this.props.bankSettings.maxAmount}
                   step={1000}
                   onChange={this.changeAmount}/>

            <input type="number"
                   value={this.props.values.amount}
                   min={this.props.bankSettings.minAmount}
                   max={this.props.bankSettings.maxAmount}
                   onChange={this.changeAmount}/>
        </div>

        <div className="floatL">
            <p><b>På hur lång tid (år):</b></p>
            <input id="tid"
                   type="range"
                   value={this.props.values.time}
                   min={this.props.bankSettings.minTime}
                   max={this.props.bankSettings.maxTime}
                   onChange={this.changeTime}/>
            <input type="number"
                   value={this.props.values.time}
                   min={this.props.bankSettings.minTime}
                   max={this.props.bankSettings.maxTime}
                   onChange={this.changeTime}/>

            <p className="noMargins"><i>Idag mest fördelaktiga amorteringstid i nya JAK-banken: Upp till {this.props.bestAmortering.toFixed(1)} år</i></p>
        </div>

        <div className="hundredpc clear">
            <p className="noMargins"><b>Tillför sparpoäng</b></p>
            <input id="försparpoäng" type="number"
                   min={0}
                   defaultValue={this.props.values.förspar}
                   onChange={this.changeFörspar}/>
        </div>
    </div>;
    }
});

module.exports = LoanSettings;