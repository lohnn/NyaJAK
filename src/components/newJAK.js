/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");

var NewJAK = React.createClass({
    mixins: [JAKMixin],

    componentWillMount: function () {
        this.divClass = "newJAK";
        this.headerText = "Nya JAK-banken";
    },

    //TODO: See if I can modulize this even more, making sure I provide all "this"-settings
    calculate: function (loanSettings, bankSettings) {
        this.amortering = (loanSettings.amount / (loanSettings.time * 12));

        //M26
        var minstaSparkrav = 100 / (bankSettings.getOptimalUKvot() / bankSettings.getUKvot());
        //M43
        var sparkravsändring = 100 / (bankSettings.getOptimalUKvot() / ((bankSettings.getOptimalUKvot() /
            (bankSettings.getTimeMax() - bankSettings.getTimeMin())) * (loanSettings.time - bankSettings.getTimeMin())));
        sparkravsändring = (minstaSparkrav > sparkravsändring ) ? minstaSparkrav : sparkravsändring;
        //N38
        var sparpoängOmräknad = loanSettings.förspar * (1 / (bankSettings.getUKvot() / bankSettings.getOptimalUKvot()));
        //O44
        var poängförbrukning = ((this.amortering / 2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12));

        //M44
        var eftersparkrav = ((sparkravsändring / 100) * ((loanSettings.amount / (loanSettings.time * 12)) /
            2 * ((loanSettings.time * 12) + 1) * (loanSettings.time * 12)) - (sparpoängOmräknad));

        this.savings = ((eftersparkrav / poängförbrukning) * this.amortering);
        this.savings = (this.savings < 0) ? 0 : this.savings;

        this.lånekostnad = (bankSettings.getLånekostnad() * loanSettings.amount);

        //this.månadsbetalning = this.amortering + this.savings + this.lånekostnad;

        this.efterAmortering = this.savings * loanSettings.time * 12;

        this.sparpoängKvar = (loanSettings.förspar > poängförbrukning) ? loanSettings.förspar - poängförbrukning : 0;

        //Beräkna raka månadsbetalningen
        this.payState = PaymentMixin.calculateStraightPayment(loanSettings, bankSettings, this.amortering, eftersparkrav);
    }
});

module.exports = NewJAK;