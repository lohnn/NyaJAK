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
    changeSkattejämkning: function (value) {
        this.loanSettings.skattejämkning = value;
        this.props.stateChange(this.loanSettings);
    },

    render: function () {
        this.loanSettings.bestAmortering = ((this.bankSettings.getTimeMax() - this.bankSettings.getTimeMin()) /
            this.bankSettings.getOptimalUKvot()) * this.bankSettings.getTurboCalculation() * this.bankSettings.getUKvot() + this.bankSettings.getTimeMin();
        this.loanSettings.bestAmortering = (this.bankSettings.getTimeMax() < this.loanSettings.bestAmortering) ? this.bankSettings.getTimeMax() : this.loanSettings.bestAmortering;

        return <div>
            <h1 className="clear"><img src="https://www.jak.se/logo.png" alt="JAK-lån"/></h1>

            <div className="box">
                <div className="floatL">
                    <div className="floatL">
                        <h2 className="floatL bigMarginRight">Låneberäkning</h2>
                        <div className="floatL normalMargins">
                            <p>
                                <b>Försparade poäng:</b>
                            </p>
                            <input id="försparpoäng" type="number"
                                   min={0}
                                   value={this.loanSettings.förspar}
                                   step={1000}
                                   onChange={this.changeFörspar}/>
                        </div>
                    </div>
                    <div className="clear"/>
                    <div className="floatL">
                        <div className="floatL normalMargins">
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
                        <div className="floatL normalMargins">
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
                    </div>
                    <div className="floatL">
                        <div className="floatL normalMargins">
                            <p>
                                <b>Säkerhet:</b>
                            </p>
                            <Checkbox value={this.loanSettings.säkerhet} onChange={this.changeSäkerhet}/>
                        </div>
                        <div className="floatL normalMargins">
                            <p>
                                <b>Skattejämkning:</b>
                            </p>
                            <Checkbox value={this.loanSettings.skattejämkning} onChange={this.changeSkattejämkning}/>
                        </div>
                    </div>
                </div>

                <p className="noMargins clear">
                    <i>Idag mest fördelaktiga amorteringstid i nya JAK-banken: Upp
                        till <span className="yearText">{this.loanSettings.bestAmortering.toFixed(1)}</span> år</i>
                </p>

                <div className="hundredpc clear">
                </div>
            </div>
        </div>;
    }
});

module.exports = LoanSettings;