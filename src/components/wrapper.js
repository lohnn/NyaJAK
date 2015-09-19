/**
 * Created by lohnn
 */

var NewJAK = require("./newJAK");
var OldJAK = require("./oldJAK");
var React = require("react");

var Wrapper = React.createClass({
    getInitialState: function () {
        return {
            amount: 1000000,
            minAmount: 20000,
            maxAmount: 6000000,
            time: 20,
            minTime: 2,
            maxTime: 40,
            förspar: 50039000,
            u_kvot: 0.63,
            bestAmortering: 0,
        };
    },
    componentWillMount: function () {
        this.amount = this.state.amount;
        this.time = this.state.time;
        this.förspar = this.state.förspar;
        this.u_kvot = this.state.u_kvot;
        this.bestAmortering = this.state.bestAmortering;
    },

    componentDidMount: function(){
        this.calculate();
    },

    calculate: function () {
        var optimal_u_kvot = 0.9;

        this.bestAmortering = ((this.state.maxTime - this.state.minTime) / optimal_u_kvot) * this.state.u_kvot + this.state.minTime;
        this.bestAmortering = (this.state.maxTime < this.state.bestAmortering) ? this.state.maxTime : this.bestAmortering;

        this.updateState();
        this.refs.newjak.calculate(this);
        this.refs.oldjak.calculate(this);
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
        });
    },

    render: function () {
        return <div>
        <div className="marginbottom">
            <p className="floatL u-kvot">Aktuell U-Kvot: </p>
            <input type="number" min="0" max="1" step={0.01}
                   defaultValue={this.state.u_kvot}
                   onChange={this.changeUKvot}/>
            <span className="u-kvot2">
              <i>Sätts förslagsvis av styrelsen kvartalsvis utifrån faktisk U-kvot</i>
            </span>
        </div>
        <div className="header">
            <h1 className="clear">JAK-lån</h1>

            <p>Låneberäkning med säkerhet</p>

            <div className="floatL">
                <p><b>Belopp jag vill låna (kr):</b></p>
                <p></p>
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

            <div className="floatL">
                <p><b>På hur lång tid (år):</b></p>
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

                <p className="noMargins"><i>Idag mest fördelaktiga amorteringstid i nya JAK-banken: Upp till {this.state.bestAmortering.toFixed(1)} år</i></p>
            </div>

            <div className="hundredpc clear">
                <p className="noMargins"><b>Tillför sparpoäng</b></p>
                <input id="försparpoäng" type="number"
                       min={0}
                       defaultValue={this.state.förspar}
                       onChange={this.changeFörspar}/>
            </div>

        </div>
        <div>
            <hr />

            <NewJAK values={this.state} ref="newjak" />
            <OldJAK values={this.state} ref="oldjak" />
            <br />
        </div>
        </div>;
    }
});

module.exports = Wrapper;