var React = require("react");

var BankSettings = React.createClass({
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
    changeF�rspar: function (event) {
        this.loanSettings.f�rspar = +event.target.value;
        this.props.stateChange(this.loanSettings);
    },

    render: function(){
        return <div className="header">
            <h1 className="clear">JAK-l�n</h1>

            <p>L�neber�kning med s�kerhet</p>

            <div className="floatL">
                <p><b>Belopp jag vill l�na (kr):</b></p>
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
                <p><b>P� hur l�ng tid (�r):</b></p>
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

                <p className="noMargins"><i>Idag mest f�rdelaktiga amorteringstid i nya JAK-banken: Upp till {this.props.bestAmortering.toFixed(1)} �r</i></p>
            </div>

            <div className="hundredpc clear">
                <p className="noMargins"><b>Tillf�r sparpo�ng</b></p>
                <input id="f�rsparpo�ng" type="number"
                       min={0}
                       defaultValue={this.props.values.f�rspar}
                       onChange={this.changeF�rspar}/>
            </div>
        </div>;
    }
});

module.exports = BankSettings;