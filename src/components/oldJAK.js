/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");

var OldJAK = React.createClass({
    mixins: [JAKMixin],

    componentWillMount: function () {
        this.headerText = <h2>Gamla JAK-banken</h2>;
    },

    calculate: function (loanSettings, bankSettings) {

        this.amortering = (loanSettings.amount / (loanSettings.time * 12));

        var poängförbrukning = ((this.amortering / 2 * ((loanSettings.time * 12) + 1)) * (loanSettings.time * 12));

        var eftersparkrav = Math.max(0, poängförbrukning - loanSettings.förspar);

        this.lånekostnad = (bankSettings.getLånekostnad() * loanSettings.amount);

        //Beräkna raka månadsbetalningen
        this.payState = PaymentMixin.calculatePayment(loanSettings, bankSettings, this.amortering, eftersparkrav, eftersparkrav, false);

        this.efterAmortering = ((this.payState.postSavings.start + this.payState.postSavings.end) / 2) * (loanSettings.time * 12);

        this.sparpoängKvar = Math.max(0, loanSettings.förspar - poängförbrukning);
    }
});

module.exports = OldJAK;