/**
 * Created by lohnn
 */

var OldJAK = React.createClass({
    mixins: [JAKMixin, PaymentMixin], // Use the mixin

    getInitialState: function () {
        return {
            divClass: "oldJAK",
            headerText: "Gamla JAK-banken"
        };
    },

    calculate: function (values) {
        var optimal_u_kvot = 0.9;

        this.amortering = (values.amount / (values.time * 12));

        var poängförbrukning = (((values.amount/(values.time*12))/2*((values.time*12)+1))*(values.time*12));
        //this.savings = this.amortering - (values.förspar / (values.time * 12));
        this.savings =((poängförbrukning-values.förspar)/poängförbrukning)*this.amortering;

        this.fee = (0.0025 * values.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.efterAmortering = this.savings * values.time * 12;

        var M26 = 100 / (optimal_u_kvot / values.u_kvot);
        var M43 = 100 / (optimal_u_kvot / ((optimal_u_kvot / (values.state.maxTime - values.state.minTime)) * (values.time - values.state.minTime)));
        M43 = (M26 > M43 ) ? M26 : M43;
        var N38 = values.förspar * (1 / (values.u_kvot / optimal_u_kvot));
        var M44 = ((M43 / 100) * ((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1) * (values.time * 12)) - (N38));
        var O44 = ((this.amortering / 2 * ((values.time * 12) + 1)) * (values.time * 12));

        this.sparpoängKvar = (M44 > 0) ? 0 : -M44;

        this.updateState();
    }
});