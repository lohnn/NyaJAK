/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./paymentCalculator");
var React = require("react");

var OldJAK = React.createClass({
    mixins: [JAKMixin, PaymentMixin], // Use the mixin

    componentWillMount: function () {
        this.divClass = "oldJAK";
        this.headerText = "Gamla JAK-banken";
    },

    calculate: function (values) {

        this.amortering = (values.amount / (values.time * 12));

        var poängförbrukning = (((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1)) * (values.time * 12));
        //this.savings = this.amortering - (values.förspar / (values.time * 12));
        this.savings = ((poängförbrukning - values.förspar) / poängförbrukning) * this.amortering;

        this.fee = (values.fee * values.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.efterAmortering = this.savings * values.time * 12;

        //M26
        var minstaSparkrav = 100 / (values.optimal_u_kvot / values.u_kvot);
        //M44
        var sparkravsändring = 100 / (values.optimal_u_kvot / ((values.optimal_u_kvot / (values.maxTime - values.minTime)) * (values.time - values.minTime)));
        sparkravsändring = (minstaSparkrav > sparkravsändring ) ? minstaSparkrav : sparkravsändring;
        //N38
        var sparpoängOmräknad = values.förspar * (1 / (values.u_kvot / values.optimal_u_kvot));
        //M44
        var eftersparkrav = ((sparkravsändring / 100) * ((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1) * (values.time * 12)) - (sparpoängOmräknad));
        //O44
        //var poängförbrukning = ((this.amortering / 2 * ((values.time * 12) + 1)) * (values.time * 12));

        //this.sparpoängKvar = (eftersparkrav > 0) ? 0 : -eftersparkrav;
        this.sparpoängKvar = (values.förspar > poängförbrukning) ? values.förspar - poängförbrukning : 0;


        eftersparkrav = (((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1)) * (values.time * 12)) - values.förspar;

        this.payState = PaymentMixin.calculateStraightPayment(values, this.amortering, eftersparkrav);
        //this.calculateStraightPayment(values, this.amortering, eftersparkrav);

        //this.updateState();
    }
});

module.exports = OldJAK;