/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");

var NewJAK = React.createClass({
    mixins: [JAKMixin], // Use the mixin

    componentWillMount: function(){
        this.divClass = "newJAK";
        this.headerText = "Nya JAK-banken";
    },

    calculate: function (loanSettings, bankSettings) {
        this.amortering = (loanSettings.amount / (loanSettings.time * 12));

        //M26
        var minstaSparkrav = 100 / (bankSettings.optimal_u_kvot / bankSettings.u_kvot);
        //M43
        var sparkravsändring = 100 / (bankSettings.optimal_u_kvot / ((bankSettings.optimal_u_kvot /
            (bankSettings.maxTime - bankSettings.minTime)) * (loanSettings.time - bankSettings.minTime)));
        sparkravsändring = (minstaSparkrav > sparkravsändring ) ? minstaSparkrav : sparkravsändring;
        //N38
        var sparpoängOmräknad = loanSettings.förspar * (1 / (bankSettings.u_kvot / bankSettings.optimal_u_kvot));
        //M44
        var eftersparkrav = ((sparkravsändring / 100) * ((loanSettings.amount / (loanSettings.time * 12)) /
            2 * ((loanSettings.time * 12) + 1) * (loanSettings.time * 12)) - (sparpoängOmräknad));
        //O44
        var poängförbrukning = ((this.amortering / 2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12));

        this.savings = ((eftersparkrav / poängförbrukning) * this.amortering);
        this.savings = (this.savings < 0) ? 0 : this.savings;

        this.fee = (bankSettings.fee * loanSettings.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.efterAmortering = this.savings * loanSettings.time * 12;

        this.sparpoängKvar = (loanSettings.förspar > poängförbrukning) ? loanSettings.förspar - poängförbrukning : 0;

        //Beräkna raka månadsbetalningen
        this.payState = PaymentMixin.calculateStraightPayment(loanSettings, bankSettings, this.amortering, eftersparkrav);
    }
});

module.exports = NewJAK;