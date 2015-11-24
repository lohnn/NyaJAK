/**
 * Created by lohnn
 */

var NewJAK = require("./newJAK");
var OldJAK = require("./oldJAK");
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
                förspar: 5000000,
                säkerhet: true,
                rak_månadsbetalning: true,
                skattejämkning: true,
                bestAmortering: 0
            },
            bankSettings: new BankSettingsFactory(),
            showGamlaJAK: false
        };
    },

    showGamlaJAKbanken: function (event) {
        this.setState({showGamlaJAK: event.target.checked});
    },

    render: function () {
        var gamlaJAK = this.state.showGamlaJAK ?
            <OldJAK loanSettings={this.state.loanSettings} bankSettings={this.state.bankSettings}/> : "";
        return <div>
            <LoanSettings values={this.state.loanSettings} bankSettings={this.state.bankSettings}
                          stateChange={function (loanSettings) {
                    this.setState({loanSettings: loanSettings});
                }.bind(this)}/>

            <div>
                <hr />
                <label className="startFiftypc">
                    <input type="checkbox" checked={this.state.showGamlaJAK} onChange={this.showGamlaJAKbanken}/>
                    Jämförelse med gamla JAK-banken
                </label>

                <div className="clear"/>
                <NewJAK loanSettings={this.state.loanSettings} bankSettings={this.state.bankSettings}/>
                {gamlaJAK}
                <div className="clear"/>
            </div>
            <BankSettings values={this.state.bankSettings}
                          stateChange={function (bankSettings) {
                    this.setState({bankSettings: bankSettings});
                }.bind(this)}/>
        </div>;
    }
});

module.exports = Wrapper;