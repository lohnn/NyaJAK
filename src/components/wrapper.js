/**
 * Created by lohnn
 */

var NewJAK = require("./newJAK");
var OldJAK = require("./oldJAK");
var React = require("react");
var LoanSettings = require("./page_parts/loanSettings");
var BankSettings = require("./page_parts/bankSettings");

var Wrapper = React.createClass({
    newJAK: <NewJAK values={this.state}/>,

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

                med_säkerhet: {
                    amount: {min: 2000, max: 6000000},
                    time: {min: 2, max: 40},
                    lånekostnad: 0.0025,
                    låneinsats: 0.6
                },
                utan_säkerhet: {
                    amount: {min: 2000, max: 6000000},
                    time: {min: 2, max: 40},
                    lånekostnad: 0.0025,
                    låneinsats: 0.6
                },

                optimal_u_kvot: 0.9
            }
        };
    },

    render: function () {
        var bestAmortering = ((this.state.bankSettings.maxTime - this.state.bankSettings.minTime) /
            this.state.bankSettings.optimal_u_kvot) * this.state.bankSettings.u_kvot + this.state.bankSettings.minTime;
        bestAmortering = (this.state.bankSettings.maxTime < bestAmortering) ? this.state.bankSettings.maxTime : bestAmortering;

        return <div>
            <LoanSettings values={this.state.loanSettings} bankSettings={this.state.bankSettings}
                          stateChange={function(loanSettings){
                              this.setState({loanSettings: loanSettings});
                          }.bind(this)}
                          bestAmortering={bestAmortering}/>

            <div>
                <hr />
                <NewJAK values={this.state}/>
                <OldJAK values={this.state}/>
                <br />
            </div>
            <BankSettings values={this.state.bankSettings}
                          stateChange={function(bankSettings){
                              this.setState({bankSettings: bankSettings});
                          }.bind(this)}/>
        </div>;
    }
});

module.exports = Wrapper;