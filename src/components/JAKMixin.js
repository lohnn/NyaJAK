/**
 * Created by lohnn
 */

var React = require("react");
var FirstLast = require("./specials/firstLast");

var JAKMixin = {
    divClass: "",
    header: "JAK-banken",

    componentWillMount: function () {
        this.amortering = 0;
        this.savings = 0;
        this.efterAmortering = 0;
        this.sparpoängKvar = 0;
    },

    render: function () {
        this.calculate(this.props.loanSettings, this.props.bankSettings);
        return <div className="fiftypc floatL ">
            <div>
                <div className={this.divClass}>
                    <h2>{this.headerText}</h2>

                    <FirstLast first="Första månaden" last="Sista månaden" />

                    <p>
                        <b>Månadsbetalning:
                            <FirstLast first={this.payState.monthlyPay.start.toFixed(0)}
                                last={this.payState.monthlyPay.end.toFixed(0)} />
                            kr</b>
                    </p>

                    <p>Varav amortering (rak): {this.amortering.toFixed(0)} kr</p>

                    <p>Varav sparande:
                        <FirstLast first={this.payState.postSavings.start.toFixed(0)}
                            last={this.payState.postSavings.end.toFixed(0)} />
                        kr </p>

                    <p>Varav lånekostnad: <FirstLast first={this.payState.loanCost.start.toFixed(0)}
                        last={this.payState.loanCost.end.toFixed(0)} /> kr</p>
                    <br />

                    <p>
                        <b>Sparbelopp efter amortering: {this.efterAmortering.toFixed(0)}</b>
                    </p>

                    <p>
                        <b>Sparpoäng kvar: {this.sparpoängKvar.toFixed(0)}</b>
                    </p>
                </div>
                <hr />
            </div>
        </div>;
    }
};

module.exports = JAKMixin;