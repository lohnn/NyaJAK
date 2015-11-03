/**
 * Created by lohnn
 */

var React = require("react");
var FirstLast = require("./specials/firstLast");
var Låneinsats = require("./calc_classes/låneinsats");
var Ränta = require("./calc_classes/ränta");
var Skatteavdrag = require("./calc_classes/skatteavdrag");
var Skatteåterbetalning = require("./calc_classes/skatteåterbetalning");

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

        var skatteavdrag = {};
        if (this.props.loanSettings.skattejämkning) {
            skatteavdrag = Skatteavdrag.calculate(this.payState.loanCost);
            skatteavdrag = <div class="clear" style={{marginLeft: 14+"px"}}>
                Skatteavdrag: <span className="orangeText boldText">
                <FirstLast first={skatteavdrag.first.toFixed(0)} last={skatteavdrag.last.toFixed(0)}/> kr</span>
            </div>;
        }
        var skatteåterbetalning = {};
        if (!this.props.loanSettings.skattejämkning) {
            skatteåterbetalning = Skatteåterbetalning.calculate();
            skatteåterbetalning =
                <p>
                    Skatteåterbetalning/år:
                    <FirstLast first={skatteåterbetalning.first} last={skatteåterbetalning.last}/> kr
                </p>;
        }

        return <div className="fiftypc floatL ">
            <div>
                <div className={this.divClass}>
                    <h2>{this.headerText}</h2>

                    <div className="floatL">
                        <p>Månadsbetalning</p>

                        <p><b><FirstLast first={this.payState.monthlyPay.start.toFixed(0)}
                                         last={this.payState.monthlyPay.end.toFixed(0)}/> kr</b></p>

                        <p><FirstLast first="Första" last="Sista månaden"/></p>
                    </div>

                    <div className="floatL">
                        <img className="floatL" src="images/bracket.png"/>

                        <div className="floatL">
                            <p>Amortering (rak): <span className="orangeText boldText">{this.amortering.toFixed(0)}
                                kr</span></p>

                            <p>Sparande: <span className="orangeText boldText"><FirstLast
                                first={this.payState.postSavings.start.toFixed(0)}
                                last={this.payState.postSavings.end.toFixed(0)}/> kr </span></p>

                            <p>Lånekostnad: <span className="orangeText boldText"><FirstLast
                                first={this.payState.loanCost.start.toFixed(0)}
                                last={this.payState.loanCost.end.toFixed(0)}/> kr</span></p>
                        </div>
                        {skatteavdrag}
                    </div>
                    <hr className="clear"/>
                    <div className="clear">
                        <p>
                            <i>Sparbelopp efter amortering: {this.efterAmortering.toFixed(0)}</i>
                        </p>

                        <p>
                            Sparpoäng kvar: {this.sparpoängKvar.toFixed(0)}
                        </p>

                        {skatteåterbetalning}

                        <p>
                            Avgår låneinsats: {Låneinsats.calculate()} kr
                        </p>

                        <p>
                            Total lånekostnad: {this.payState.loanCost.total} kr
                        </p>

                        <p>
                            Effektiv ränta: {Ränta.calculate()}%
                        </p>
                    </div>
                </div>
                <hr />
            </div>
        </div>;
    }
};

module.exports = JAKMixin;