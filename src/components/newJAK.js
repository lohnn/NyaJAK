/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");
var Checkbox = require("./specials/checkbox");

var NewJAK = React.createClass({
    mixins: [JAKMixin],

    changeStraightPayment: function (value) {
        this.setState({rak_månadsbetalning: value});
    },

    getInitialState: function () {
        return {
            rak_månadsbetalning: true
        };
    },

    //TODO: See if I can modulize this even more, making sure I provide all "this"-settings
    calculate: function (loanSettings, bankSettings) {
        this.headerText = <div>
            <h2 className="floatL">Nya JAK-banken</h2>

            <div className="floatR">
                <p>
                    <b>Rak månadsbetalning:</b>
                </p>
                <Checkbox value={this.state.rak_månadsbetalning} onChange={this.changeStraightPayment}/>
            </div>
            <div className="clear"/>
        </div>;

        this.amortering = (loanSettings.amount / (loanSettings.time * 12));

        //M26
        var minstaSparprocent = 100 / (bankSettings.getOptimalUKvot() / bankSettings.getUKvot());
        //M43
        var sparkravsändring = 100 / (bankSettings.getOptimalUKvot() / ((bankSettings.getOptimalUKvot() /
            (bankSettings.getTimeMax() - bankSettings.getTimeMin())) * (loanSettings.time - bankSettings.getTimeMin())));
        sparkravsändring = (minstaSparprocent > sparkravsändring ) ? minstaSparprocent : sparkravsändring;
        //N38
        var sparpoängOmräknad = loanSettings.förspar * (1 / (bankSettings.getUKvot() / bankSettings.getOptimalUKvot()));

        //M44
        var eftersparprocent = bankSettings.getTurboCalculation() * Math.max(minstaSparprocent,
                ((loanSettings.bestAmortering * minstaSparprocent) + ((loanSettings.time - loanSettings.bestAmortering) * 100)) / loanSettings.time);

        var poängförbrukning = ((this.amortering / 2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12));

        var eftersparkrav = ((sparkravsändring / 100) * ((loanSettings.amount / (loanSettings.time * 12)) /
        2 * ((loanSettings.time * 12) + 1) * (loanSettings.time * 12)) - (sparpoängOmräknad));

        var nyttEftersparkrav = Math.max(0, ((poängförbrukning * (eftersparprocent / 100)) - sparpoängOmräknad));

        this.lånekostnad = (bankSettings.getLånekostnad() * loanSettings.amount);

        //Beräkna raka månadsbetalningen
        this.payState = PaymentMixin.calculatePayment(loanSettings, bankSettings, this.amortering, eftersparkrav, nyttEftersparkrav, this.state.rak_månadsbetalning);

        this.efterAmortering = ((this.payState.postSavings.start + this.payState.postSavings.end) / 2) * (loanSettings.time * 12);

        if (!this.state.rak_månadsbetalning) {
            this.payState.ackumuleradePoäng = this.payState.eftersparPerMånad * 0.5 * (loanSettings.time * 12) * ((loanSettings.time * 12) + 1);
        }

        //console.log("OUT:");
        //console.log(this.payState.ackumuleradePoäng);
        this.sparpoängKvar = Math.max(0, (sparpoängOmräknad - (poängförbrukning * (eftersparprocent / 100)) + this.payState.ackumuleradePoäng) * (loanSettings.förspar / sparpoängOmräknad));

        if (isNaN(this.sparpoängKvar)) this.sparpoängKvar = 0;
    }
});

module.exports = NewJAK;