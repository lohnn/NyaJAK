/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");

var OldJAK = React.createClass({
    mixins: [JAKMixin],

    componentWillMount: function () {
        this.divClass = "oldJAK";
        this.headerText = "Gamla JAK-banken";
    },

    calculate: function (loanSettings, bankSettings) {

        this.amortering = (loanSettings.amount / (loanSettings.time * 12));

        var poängförbrukning = (((loanSettings.amount / (loanSettings.time * 12)) /
            2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12));

        this.savings = ((poängförbrukning - loanSettings.förspar) / poängförbrukning) * this.amortering;

        this.lånekostnad = (bankSettings.lånekostnad * loanSettings.amount);

        this.månadsbetalning = this.amortering + this.savings + this.lånekostnad;

        this.efterAmortering = this.savings * loanSettings.time * 12;

        //M26
        var minstaSparkrav = 100 / (bankSettings.optimal_u_kvot / bankSettings.u_kvot);
        //M44
        var sparkravsändring = 100 / (bankSettings.optimal_u_kvot / ((bankSettings.optimal_u_kvot /
            (bankSettings.maxTime - bankSettings.minTime)) * (loanSettings.time - bankSettings.minTime)));
        sparkravsändring = (minstaSparkrav > sparkravsändring ) ? minstaSparkrav : sparkravsändring;
        //N38
        //var sparpoängOmräknad = loanSettings.förspar * (1 / (bankSettings.u_kvot / bankSettings.optimal_u_kvot));
        //M44
        //var eftersparkrav = ((sparkravsändring / 100) * ((loanSettings.amount / (loanSettings.time * 12)) /
        //    2 * ((loanSettings.time * 12) + 1) * (loanSettings.time * 12)) - (sparpoängOmräknad));
        //O44

        this.sparpoängKvar = (loanSettings.förspar > poängförbrukning) ? loanSettings.förspar - poängförbrukning : 0;

        var eftersparkrav = (((loanSettings.amount / (loanSettings.time * 12)) / 2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12)) - loanSettings.förspar;

        this.payState = PaymentMixin.calculateStraightPayment(loanSettings, bankSettings, this.amortering, eftersparkrav);
    }
});

module.exports = OldJAK;