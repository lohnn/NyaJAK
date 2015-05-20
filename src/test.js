/**
 * Created by lohnn on 2015-05-20.
 */

var App = React.createClass({
    getInitialState: function () {
        return {
            amount: 1000000,
            minAmount: 20000,
            maxAmount: 6000000,
            time: 20,
            minTime: 2,
            maxTime: 40,
            förspar: 50039000,
            månadsbetalning: 0,
            u_kvot: 0.63,
            amortering: 0,
            savings: 0,
            fee: 0,
            bestAmortering: 0
        };
    },
    componentWillMount: function () {
        this.amount = this.state.amount;
        this.time = this.state.time;
        this.förspar = this.state.förspar;
        this.u_kvot = this.state.u_kvot;
        this.bestAmortering = this.state.bestAmortering;
        this.månadsbetalning = this.state.månadsbetalning;
        this.savings = this.state.savings;
        this.fee = this.state.fee;

        this.calculate();
    },

    calculate: function () {
        var optimal_u_kvot = 0.9;

        this.bestAmortering = ((this.state.maxTime - this.state.minTime) / optimal_u_kvot) * this.u_kvot + this.state.minTime;
        this.bestAmortering = (this.state.maxTime < this.bestAmortering) ? this.state.maxTime : this.bestAmortering;

        this.amortering = (this.amount / (this.time * 12));

        var M26 = 100 / (optimal_u_kvot / this.u_kvot);
        var M43 = 100 / (optimal_u_kvot / ((optimal_u_kvot / (this.state.maxTime - this.state.minTime)) * (this.time - this.state.minTime)));
        M43 = (M26 > M43 ) ? M26 : M43;
        var N38 = this.förspar * (1 / (this.u_kvot / optimal_u_kvot));
        var M44 = ((M43 / 100) * ((this.amount / (this.time * 12)) / 2 * ((this.time * 12) + 1) * (this.time * 12)) - (N38));
        var O44 = ((this.amortering / 2 * ((this.time * 12) + 1)) * (this.time * 12));
        this.savings = ((M44 / O44) * this.amortering);
        this.savings = (this.savings < 0) ? 0 : this.savings;

        this.fee = (0.000875 * this.amount);

        this.månadsbetalning = this.amortering + this.savings + this.fee;

        this.updateState();
    },

    changeTime: function (event) {
        this.time = +event.target.value;
        this.calculate();
    },
    changeAmount: function (event) {
        this.amount = +event.target.value;
        this.calculate();
    },
    changeFörspar: function (event) {
        this.förspar = +event.target.value;
        this.calculate();
    },
    changeUKvot: function (event) {
        this.u_kvot = +event.target.value;
        this.calculate();
    },

    updateState: function () {
        this.setState({
            amount: this.amount,
            time: this.time,
            förspar: this.förspar,
            u_kvot: this.u_kvot,
            bestAmortering: this.bestAmortering,
            månadsbetalning: this.månadsbetalning,
            amortering: this.amortering,
            savings: this.savings,
            fee: this.fee
        });
    },

    render: function () {
        return <div>
            <h1>Nya JAK</h1>

            <p>Låneberäkning med säkerhet</p>

            <div>
                <p><b>Belopp jag vill låna (kr):</b></p>
                <input id="belopp"
                       type="range"
                       value={this.amount}
                       min={this.state.minAmount}
                       max={this.state.maxAmount}
                       step={1000}
                       onChange={this.changeAmount}/>

                <input type="number"
                       min={this.state.minAmount}
                       max={this.state.maxAmount}
                       value={this.state.amount}
                       onChange={this.changeAmount}/>
            </div>

            <div>
                <p><b>På hur lång tid (år):</b></p>

                <p><i>Mest fördelaktiga amorteringstid: Upp till {this.state.bestAmortering.toFixed(1)} år</i></p>
                <input id="tid"
                       type="range"
                       value={this.state.time}
                       min={this.state.minTime}
                       max={this.state.maxTime}
                       onChange={this.changeTime}/>
                <input type="number"
                       min={this.state.minTime}
                       max={this.state.maxTime}
                       value={this.state.time}
                       onChange={this.changeTime}/>
            </div>

            <div>
                <p><b>Tillför sparpoäng</b></p>
                <input id="försparpoäng" type="number"
                       min={0}
                       defaultValue={this.state.förspar}
                       onChange={this.changeFörspar}/>
            </div>

            <hr />

            <div>
                <p><b>Månadsbetalning (snitt): {this.state.månadsbetalning.toFixed(0)} kr</b></p>

                <p>Varav amortering: {this.state.amortering.toFixed(0)} kr</p>

                <p>Varav sparande: {this.state.savings.toFixed(0)} kr</p>

                <p>Varav lånekostnad - skatteavdrag (snitt): {this.state.fee.toFixed(0)} kr</p>
            </div>

            <hr />

            <div>
                <p>Aktuell U-Kvot:</p>
                <input type="number" min="0" max="1"
                       defaultValue={this.state.u_kvot}
                       onChange={this.changeUKvot}/>
            </div>
        </div>;
    }
});

React.render(
    <App />,
    document.getElementById("main")
);