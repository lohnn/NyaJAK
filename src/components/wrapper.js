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
            loanSettings: {
                amount: 1000000,
                time: 20,
                förspar: 50039000,
                säkerhet: true,
                rak_månadsbetalning: true,
                skattejämkning: true
            },
            bankSettings: {
                u_kvot: 0.63,
                minAmount: 20000,
                maxAmount: 6000000,

                minTime: 2,
                maxTime: 40,

                fee: 0.0025,

                låneinsats: 0.6,

                optimal_u_kvot: 0.9
            }
        };
    },

    changeUKvot: function (event) {
        this.setState({u_kvot: +event.target.value});
    },

    render: function () {
        var bestAmortering = ((this.state.bankSettings.maxTime - this.state.bankSettings.minTime) /
            this.state.bankSettings.optimal_u_kvot) * this.state.bankSettings.u_kvot + this.state.bankSettings.minTime;
        bestAmortering = (this.state.bankSettings.maxTime < bestAmortering) ? this.state.bankSettings.maxTime : bestAmortering;

        return <div>
        <div className="marginbottom">
            <p className="floatL u-kvot">Aktuell U-Kvot: </p>
            <input type="number" min="0" max="1" step={0.01}
                   defaultValue={this.state.bankSettings.u_kvot}
                   onChange={this.changeUKvot}/>
            <span className="u-kvot2">
              <i>Sätts förslagsvis av styrelsen kvartalsvis utifrån faktisk U-kvot</i>
            </span>
        </div>
            <LoanSettings values={this.state.loanSettings} bankSettings={this.state.bankSettings}
                          stateChange={function(loanSettings){
                                    this.setState({loanSettings: loanSettings});
                                }.bind(this)}
                          bestAmortering={bestAmortering}/>
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