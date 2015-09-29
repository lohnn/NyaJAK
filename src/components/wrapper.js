/**
 * Created by lohnn
 */

var NewJAK = require("./newJAK");
var OldJAK = require("./oldJAK");
var React = require("react");
var LoanSettings = require("./page_parts/loanSettings");

var Wrapper = React.createClass({
    //mixins: [LoanSettings], // Use the mixin

    newJAK: <NewJAK values={this.state} />,

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
            fee: 0.0025,
            optimal_u_kvot: 0.9
        };
    },
    componentWillMount: function () {
        this.amount = this.state.amount;
        this.time = this.state.time;
        this.förspar = this.state.förspar;
        this.u_kvot = this.state.u_kvot;
    },

    componentDidMount: function(){
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
            u_kvot: this.u_kvot
        });
    },

    render: function () {
        var bestAmortering = ((this.state.maxTime - this.state.minTime) / this.state.optimal_u_kvot) * this.state.u_kvot + this.state.minTime;
        bestAmortering = (this.maxTime < bestAmortering) ? this.state.maxTime : bestAmortering;

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
            <LoanSettings pass={this} bestAmortering={bestAmortering}/>
        <div>
            <hr />

            <NewJAK values={this.state} />
            <OldJAK values={this.state} />
            <br />
        </div>
        </div>;
    }
});

module.exports = Wrapper;