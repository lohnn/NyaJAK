/**
 * Created by lohnn
 */

var NewJAK = require("./newJAK");
//var OldJAK = require("./oldJAK");
var React = require("react");
var LoanSettings = require("./page_parts/loanSettings");
var BankSettings = require("./page_parts/bankSettings");
var BankSettingsFactory = require("./settings_objects/bankSettingsFactory");

var Wrapper = React.createClass({
    newJAK: <NewJAK values={this.state}/>,

    getInitialState: function () {
        return {
            loanSettings: {
                amount: 1000000,
                time: 20,
                förspar: 500000000,
                säkerhet: true,
                rak_månadsbetalning: true,
                skattejämkning: true
            },
            bankSettings: new BankSettingsFactory()
        };
    },

    render: function () {
        return <div>
            <LoanSettings values={this.state.loanSettings} bankSettings={this.state.bankSettings}
                stateChange={function (loanSettings) {
                    this.setState({loanSettings: loanSettings});
                }.bind(this)} />

            <div>
                <hr />
                <NewJAK loanSettings={this.state.loanSettings} bankSettings={this.state.bankSettings} />
                <br />
            </div>
            <BankSettings values={this.state.bankSettings}
                stateChange={function (bankSettings) {
                    this.setState({bankSettings: bankSettings});
                }.bind(this)}/>
        </div>;
    }
    //                <OldJAK loanSettings={this.state.loanSettings} bankSettings={this.state.bankSettings} />
});

module.exports = Wrapper;