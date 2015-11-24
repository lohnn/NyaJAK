/**
 * Created by lohnn
 */

var React = require("react");
var FirstLast = require("./specials/firstLast");
var Låneinsats = require("./calc_classes/låneinsats");
//var Ränta = require("./calc_classes/ränta");
var Skatteavdrag = require("./calc_classes/skatteavdrag");
var Skatteåterbetalning = require("./calc_classes/skatteåterbetalning");
var NumerShow = require("./../extras/NumberShow");

var JAKMixin = {
    divClass: "",
    header: "JAK-banken",

    componentWillMount: function () {
        this.amortering = 0;
        this.efterAmortering = 0;
        this.sparpoängKvar = 0;
    },

    render: function () {
        this.calculate(this.props.loanSettings, this.props.bankSettings);

        var skatteavdrag = {};
        if (this.props.loanSettings.skattejämkning) {
            skatteavdrag = Skatteavdrag.calculate(this.payState.loanCost);
            skatteavdrag = <p className="paymentPart">Skatteavdrag: <span className="orangeText boldText"><FirstLast
                first={skatteavdrag.first.toFixed(0)}
                last={skatteavdrag.last.toFixed(0)}/> kr</span></p>;
        }
        var skatteåterbetalning = {};
        if (!this.props.loanSettings.skattejämkning) {
            skatteåterbetalning = Skatteåterbetalning.calculate(this.props.loanSettings, this.props.bankSettings.getLånekostnad(), this.amortering);
            skatteåterbetalning = <p style={{marginTop: "5px", marginBottom: "5px"}}>
                (Skatteåterbetalning/år: <FirstLast first={skatteåterbetalning.first.toFixed(0)}
                                                    last={skatteåterbetalning.last.toFixed(0)}/> kr)
            </p>;
        }

        return <div className="fiftypc floatL ">
            <div>
                <div className="box">
                    {this.headerText}

                    <div className="floatL marginTop marginbottom">
                        <div className="floatL normalMargins">
                            <p className="paymentPart">Månadsbetalning</p>

                            <p className="reallyBigText"><FirstLast first={this.payState.monthlyPay.start.toFixed(0)}
                                                                    last={this.payState.monthlyPay.end.toFixed(0)}/> kr
                            </p>

                            <p className="paymentPart"><FirstLast first="Första" last="Sista månaden"/></p>
                        </div>

                        <div className="floatL normalMargins">
                            <img className="floatL" src="images/bracket.png"/>

                            <div className="floatL">
                                <p className="paymentPart">Amortering (rak): <span
                                    className="orangeText boldText">{NumerShow.setSeparator(this.amortering.toFixed(0))}
                                    kr</span></p>

                                <p className="paymentPart">Sparande: <span className="orangeText boldText"><FirstLast
                                    first={this.payState.postSavings.start.toFixed(0)}
                                    last={this.payState.postSavings.end.toFixed(0)}/> kr </span></p>

                                <p className="paymentPart">Lånekostnad: <span className="orangeText boldText"><FirstLast
                                    first={this.payState.loanCost.start.toFixed(0)}
                                    last={this.payState.loanCost.end.toFixed(0)}/> kr</span></p>
                                {skatteavdrag}
                            </div>
                        </div>
                    </div>
                    <hr className="clear"/>
                    <div className="clear">
                        <p className="marginLeft">
                            Sparbelopp efter amortering: <span
                            className="boldText">{NumerShow.setSeparator(this.efterAmortering.toFixed(0))} kr</span>
                        </p>

                        <p className="marginLeft">
                            Sparpoäng kvar: {NumerShow.setSeparator(this.sparpoängKvar.toFixed(0))} poäng
                        </p>

                        <p className="marginLeft">
                            Erläggs som
                            låneinsats: {NumerShow.setSeparator(Låneinsats.calculate(this.props.loanSettings.amount, this.props.bankSettings.getLåneinsats())) + " kr"}
                        </p>

                        <div className="box">
                            <p style={{marginTop:"5px",marginBottom: "5px"}}>
                                Total lånekostnad: {NumerShow.setSeparator(this.payState.loanCost.total.toFixed(0))} kr
                            </p>

                            <p style={{marginTop: "5px", marginBottom: "5px"}}>
                                Totalt
                                skatteavdrag: {NumerShow.setSeparator((this.payState.loanCost.total * -0.3).toFixed(0))}
                                kr
                            </p>
                            {skatteåterbetalning}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>;
        /*
         <p>
         Motsvarar effektiv ränta: {Ränta.calculate()}%
         </p>
         */
    }
};

module.exports = JAKMixin;