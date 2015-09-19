/**
 * Created by lohnn
 */

var React = require("react");

var NewJAK2 = React.createClass({
    getInitialState: function () {
        return {
            månadsbetalning: 0,
            amortering: 0,
            savings: 0,
            fee: 0,
            efterAmortering: 0,
            sparpoängKvar: 0
        };
    },

    componentWillMount: function () {
        this.månadsbetalning = this.state.månadsbetalning;
        this.amortering = this.state.amortering;
        this.savings = this.state.savings;
        this.fee = this.state.fee;
        this.efterAmortering = this.state.efterAmortering;
        this.sparpoängKvar = this.state.sparpoängKvar;
    },

    calculate: function (values) {
        var optimal_u_kvot = 0.9;

        this.amortering = (values.amount / (values.time * 12));

        var M26 = 100 / (optimal_u_kvot / values.u_kvot);
        var M43 = 100 / (optimal_u_kvot / ((optimal_u_kvot / (values.state.maxTime - values.state.minTime)) * (values.time - values.state.minTime)));
        M43 = (M26 > M43 ) ? M26 : M43;
        var N38 = values.förspar * (1 / (values.u_kvot / optimal_u_kvot));
        var M44 = ((M43 / 100) * ((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1) * (values.time * 12)) - (N38));
        var O44 = ((this.amortering / 2 * ((values.time * 12) + 1)) * (values.time * 12));
        this.savings = ((M44 / O44) * this.amortering);
        this.savings = (this.savings < 0) ? 0 : this.savings;

        this.fee = (0.000875 * values.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.efterAmortering = this.savings * values.time * 12;

        this.sparpoängKvar = (M44 > 0) ? 0 : -M44;

        this.updateState();
    },

    updateState: function () {
        this.setState({
            månadsbetalning: this.månadsbetalning,
            amortering: this.amortering,
            savings: this.savings,
            //fee: this.fee,
            efterAmortering: this.efterAmortering,
            sparpoängKvar: this.sparpoängKvar,
        });
    },

    render: function () {
        return <div className="fiftypc floatL newJAK">
            <h2>Nya JAK-banken</h2>

            <div>
                <p><b>Månadsbetalning (snitt): {this.state.månadsbetalning.toFixed(0)} kr</b></p>

                <p>Varav amortering: {this.state.amortering.toFixed(0)} kr</p>

                <p>Varav sparande: {this.state.savings.toFixed(0)} kr</p>

                <p>Varav lånekostnad - skatteavdrag (snitt): {this.state.fee.toFixed(0)} kr</p>
                <br />

                <p><b>Sparbelopp efter amortering: {this.state.efterAmortering.toFixed(0)}</b></p>

                <p><b>Sparpoäng kvar: {this.state.sparpoängKvar.toFixed(0)}</b></p>
            </div>
        </div>;
    }
});

module.exports = NewJAK2;