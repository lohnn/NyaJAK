/**
 * Created by lohnn
 */

var JAKMixin = require("./JAKMixin");
var PaymentMixin = require("./straightPayment");
var React = require("react");

var NewJAK = React.createClass({
    mixins: [JAKMixin, PaymentMixin], // Use the mixin

    getInitialState: function () {
        return {
            divClass: "newJAK",
            headerText: "Nya JAK-banken"
        };
    },

    calculate: function (values) {
        var optimal_u_kvot = 0.9;

        this.amortering = (values.amount / (values.time * 12));

        //M26
        var minstaSparkrav = 100 / (optimal_u_kvot / values.u_kvot);
        //M43
        var sparkravsändring = 100 / (optimal_u_kvot / ((optimal_u_kvot / (values.state.maxTime - values.state.minTime)) * (values.time - values.state.minTime)));
        sparkravsändring = (minstaSparkrav > sparkravsändring ) ? minstaSparkrav : sparkravsändring;
        //N38
        var sparpoängOmräknad = values.förspar * (1 / (values.u_kvot / optimal_u_kvot));
        //M44
        var eftersparkrav = ((sparkravsändring / 100) * ((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1) * (values.time * 12)) - (sparpoängOmräknad));
        //O44
        var poängförbrukning = ((this.amortering / 2 * ((values.time * 12) + 1)) * (values.time * 12));
        console.log(eftersparkrav);
        this.savings = ((eftersparkrav / poängförbrukning) * this.amortering);
        this.savings = (this.savings < 0) ? 0 : this.savings;

        this.fee = (0.0025 * values.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.efterAmortering = this.savings * values.time * 12;

        //var poängförbrukning = (((values.amount/(values.time*12))/2*((values.time*12)+1))*(values.time*12));

        this.sparpoängKvar = (values.förspar > poängförbrukning) ? values.förspar - poängförbrukning : 0;

        //Beräkna raka månadsbetalningen
        this.calculateStraightPayment(values, this.amortering, eftersparkrav);

        this.updateState();
    }
});

module.exports = NewJAK;