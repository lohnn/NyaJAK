/**
 * Created by lohnn
 */

var React = require("react");
var FirstLast = require("./specials/firstLast");
var Låneinsats = require("./calc_classes/låneinsats");
var Ränta = require("./calc_classes/ränta");
var Skattereduktion = require("./calc_classes/skattereduktion");

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
        var skattereduktion = Skattereduktion.calculate();
        var skattejämkning = <p>
            Skattereduktion/år: <FirstLast first={skattereduktion.first} last={skattereduktion.last}/>
        </p>;

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
                            <p>Amortering (rak): {this.amortering.toFixed(0)} kr</p>

                            <p>Sparande:
                                <FirstLast first={this.payState.postSavings.start.toFixed(0)}
                                           last={this.payState.postSavings.end.toFixed(0)}/>
                                kr </p>

                            <p>Lånekostnad: <FirstLast first={this.payState.loanCost.start.toFixed(0)}
                                                       last={this.payState.loanCost.end.toFixed(0)}/> kr</p>
                        </div>
                    </div>
                    <hr className="clear"/>
                    <div className="clear">
                        <p>
                            <i>Sparbelopp efter amortering: {this.efterAmortering.toFixed(0)}</i>
                        </p>

                        <p>
                            <b>Sparpoäng kvar: {this.sparpoängKvar.toFixed(0)}</b>
                        </p>

                        {skattejämkning}

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