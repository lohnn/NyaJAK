/**
 * Created by lohnn
 */

var JAKMixin = {
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
        månadsbetalning = this.state.månadsbetalning;
        amortering = this.state.amortering;
        savings = this.state.savings;
        fee = this.state.fee;
        efterAmortering = this.state.efterAmortering;
        sparpoängKvar = this.state.sparpoängKvar;
    },

    updateState: function () {
        this.setState({
            månadsbetalning: this.månadsbetalning,
            amortering: this.amortering,
            savings: this.savings,
            fee: this.fee,
            efterAmortering: this.efterAmortering,
            sparpoängKvar: this.sparpoängKvar
        });
    },

    render: function () {
        console.log(this.state.payState.loanCost);
        return <div className="fiftypc floatL ">
            <div>
                <h2>{this.state.headerText}</h2>

                <div className={this.state.divClass}>
                    <p><b>Månadsbetalning (snitt): {this.state.månadsbetalning.toFixed(0)} kr</b></p>

                    <p>Varav amortering: {this.state.amortering.toFixed(0)} kr</p>

                    <p>Varav sparande: {this.state.savings.toFixed(0)} kr</p>

                    <p>Varav lånekostnad: första månaden (max) {this.state.payState.loanCost.start.toFixed(0)} kr sista månaden
                        (min) {this.state.payState.loanCost.end.toFixed(0)} kr</p>
                    <br />

                    <p><b>Sparbelopp efter amortering: {this.state.efterAmortering.toFixed(0)}</b></p>

                    <p><b>Sparpoäng kvar: {this.state.sparpoängKvar.toFixed(0)}</b></p>
                </div>
                <hr />
            </div>
        </div>;
    }
};