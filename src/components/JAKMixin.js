/**
 * Created by lohnn
 */

var React = require("react");

var JAKMixin = {
    divClass : "",
    header : "JAK-banken",

    componentWillMount: function () {
        //månadsbetalning = this.state.månadsbetalning;
        this.amortering = 0;
        this.savings = 0;
        //fee = this.state.fee;
        this.efterAmortering = 0;
        this.sparpoängKvar = 0;
    },

    render: function () {
        this.calculate(this.props.values);
        return <div className="fiftypc floatL ">
            <div>
                <div className={this.divClass}>
                    <h2>{this.headerText}</h2>

                    <p><b>Månadsbetalning: första månaden {this.payState.monthlyPay.start.toFixed(0)} kr sista
                        månaden {this.payState.monthlyPay.end.toFixed(0)} kr</b></p>

                    <p>Varav amortering (rak): {this.amortering.toFixed(0)} kr</p>

                    <p>Varav sparande: första månaden (min) {this.payState.postSavings.start.toFixed(0)} kr sista
                        månaden (max) {this.payState.postSavings.end.toFixed(0)} kr </p>

                    <p>Varav lånekostnad: första månaden (max) {this.payState.loanCost.start.toFixed(0)} kr sista
                        månaden
                        (min) {this.payState.loanCost.end.toFixed(0)} kr</p>
                    <br />

                    <p><b>Sparbelopp efter amortering: {this.efterAmortering.toFixed(0)}</b></p>

                    <p><b>Sparpoäng kvar: {this.sparpoängKvar.toFixed(0)}</b></p>
                </div>
                <hr />
            </div>
        </div>;
    }
};

module.exports = JAKMixin;