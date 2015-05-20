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
            månadbetalning: 0,
            u_kvot: 0.9,
            amortering: 0,
            savings: 0,
            fee: 0,
            amorteringstid: 0
        };
    },
    componentWillMount: function () {
        this.calculate();
    },

    calculate: function () {
        this.setState({månadsbetalning: this.state.månadbetalning});
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
                <p><b>Belopp jag vill låna:</b></p>
                <input id="belopp"
                       type="range"
                       value={this.state.amount}
                       min={this.state.minAmount}
                       max={this.state.maxAmount}
                       step={1000}
                       onChange={this.changeAmount}/>

                <input type="text"
                       value={this.state.amount + " kr"}/>
            </div>

            <div>
                <p><b>På hur lång tid:</b></p>
                <input id="tid"
                       type="range"
                       value={this.state.time}
                       min={this.state.minTime}
                       max={this.state.maxTime}
                       onChange={this.changeTime}/>
                <input type="text"
                       value={this.state.time + " år"}/>
            </div>

            <div>
                <p><b>Tillför sparpoäng</b></p>
                <input id="försparpoäng" type="number"
                       min={0}
                       defaultValue={this.state.förspar}
                       onChange={this.changeFörspar}/>
            </div>
            <br />

            <p><i>Mest fördelaktiga amorteringstid: {this.state.amorteringstid} år</i></p>

            <hr />

            <div>
                <p>Månadsbetalning (snitt): {this.state.månadbetalning} kr</p>

                <p>Varav amortering: {this.state.amortering} kr</p>

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