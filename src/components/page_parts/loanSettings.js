var React = require("react");
var Checkbox = require("../specials/checkbox");

var LoanSettings = React.createClass({

    componentWillMount: function () {
        this.loanSettings = this.props.values;
        this.bankSettings = this.props.bankSettings;
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

    changeSäkerhet: function (value) {
        this.bankSettings.setSäkerhet(value);

        this.loanSettings.säkerhet = value;
        this.props.stateChange(this.loanSettings);
    },
    changeStraightPayment: function (value) {
        this.loanSettings.rak_månadsbetalning = value;
        this.props.stateChange(this.loanSettings);
    },
    changeSkattejämkning: function (value) {
        this.loanSettings.skattejämkning = value;
        this.props.stateChange(this.loanSettings);
    },

    render: function () {
        var bestAmortering = ((this.bankSettings.getTimeMax() - this.bankSettings.getTimeMin()) /
            this.bankSettings.getOptimalUKvot()) * this.bankSettings.getUKvot() + this.bankSettings.getTimeMin();
        bestAmortering = (this.bankSettings.getTimeMax() < bestAmortering) ? this.bankSettings.getTimeMax() : bestAmortering;

        return <div className="header">
            <h1 className="clear">JAK-lån</h1>

            <p>Låneberäkning med säkerhet</p>

            <div className="floatL">
                <p>
                    <b>Belopp jag vill låna (kr):</b>
                </p>

                <div>
                    <input type="number"
                        value={this.loanSettings.amount}
                        min={this.bankSettings.getAmountMin()}
                        max={this.bankSettings.getAmountMax()}
                        onChange={this.changeAmount}/>
                </div>
                <div>
                    <input id="belopp"
                        type="range"
                        value={this.loanSettings.amount}
                        min={this.bankSettings.getAmountMin()}
                        max={this.bankSettings.getAmountMax()}
                        step={1000}
                        onChange={this.changeAmount}/>
                </div>
            </div>

            <div className="floatL">
                <div className="floatL">
                    <p>
                        <b>På hur lång tid (år):</b>
                    </p>

                    <div>
                        <input type="number"
                            value={this.loanSettings.time}
                            min={this.bankSettings.getTimeMin()}
                            max={this.bankSettings.getTimeMax()}
                            onChange={this.changeTime}/>
                    </div>
                    <div>
                        <input id="tid"
                            type="range"
                            value={this.loanSettings.time}
                            min={this.bankSettings.getTimeMin()}
                            max={this.bankSettings.getTimeMax()}
                            onChange={this.changeTime}/>
                    </div>
                </div>
                <div className="floatL">
                    <p>
                        <b>Säkerhet:</b>
                    </p>
                    <Checkbox value={this.loanSettings.säkerhet} onChange={this.changeSäkerhet}/>
                </div>
                <div className="floatL">
                    <p>
                        <b>Försparade poäng:</b>
                    </p>
                    <input id="försparpoäng" type="number"
                        min={0}
                        value={this.loanSettings.förspar}
                        step={1000}
                        onChange={this.changeFörspar}/>
                </div>
                <p className="noMargins clear">
                    <i>Idag mest fördelaktiga amorteringstid i nya JAK-banken: Upp
                        till {bestAmortering.toFixed(1)} år</i>
                </p>
            </div>
            <div className="floatL">
                <div className="floatL">
                    <p>
                        <b>Rak månadsbetalning:</b>
                    </p>
                    <Checkbox value={this.loanSettings.rak_månadsbetalning} onChange={this.changeStraightPayment}/>
                </div>
                <div className="floatL">
                    <p>
                        <b>Skattejämkning:</b>
                    </p>
                    <Checkbox value={this.loanSettings.skattejämkning} onChange={this.changeSkattejämkning}/>
                </div>
            </div>

            <div className="hundredpc clear">
            </div>
        </div>;
    }
});

module.exports = LoanSettings;