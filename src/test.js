/**
 * Created by lohnn on 2015-05-20.
 */

var App = React.createClass({
    getInitialState: function () {
        return {
            amount: 200000,
            minAmount: 200000,
            maxAmount: 6000000,
            time: 2,
            minTime: 2,
            maxTime: 40,
            förspar: 0,
            månadsbetalning: 0,
            u_kvot: 0.9,
            amortering: 0,
            savings: 0,
            fee: 0,
            bestAmortering: 0
        };
    },
    componentWillMount: function () {
        this.calculate();
    },

    calculate: function () {
        var amortering = (this.state.amount / (this.state.time * 12));
        this.setState({
            amortering: amortering
        });
    },

    changeTime: function (event) {
        this.setState({time: +event.target.value});
        this.calculate();
    },
    changeAmount: function (event) {
        this.setState({amount: +event.target.value});
        this.calculate();
    },
    changeFörspar: function (event) {
        this.setState({förspar: +event.target.value});
        this.calculate();
    },
    changeUKvot: function (event) {
        this.setState({u_kvot: +event.target.value});
        this.calculate();
    },

    render: function () {
        return <div>
            <h1>Nya JAK</h1>

            <p>Låneberäkning med säkerhet</p>

            <div>
                <p><b>Belopp jag vill låna (kr):</b></p>
                <input id="belopp"
                       type="range"
                       value={this.state.amount}
                       min={this.state.minAmount}
                       max={this.state.maxAmount}
                       step={1000}
                       onChange={this.changeAmount}/>

                <input type="text"
                       value={this.state.amount}
                       onChange={this.changeAmount}/>
            </div>

            <div>
                <p><b>På hur lång tid (år):</b></p>
                <input id="tid"
                       type="range"
                       value={this.state.time}
                       min={this.state.minTime}
                       max={this.state.maxTime}
                       onChange={this.changeTime}/>
                <input type="text"
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
            <br />

            <p><i>Mest fördelaktiga amorteringstid: {this.state.bestAmortering} år</i></p>

            <hr />

            <div>
                <p><b>Månadsbetalning (snitt): {this.state.månadsbetalning} kr</b></p>

                <p>Varav amortering: {this.state.amortering.toFixed(0)} kr</p>

                <p>Varav sparande: {this.state.savings} kr</p>

                <p>Varav lånekostnad - skatteavdrag (snitt): {this.state.fee} kr</p>
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