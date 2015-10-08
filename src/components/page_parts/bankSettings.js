var React = require("react");

var BankSettings = React.createClass({
    componentWillMount: function () {
        this.bankSettings = this.props.values;
        //console.log(this.bankSettings);
    },

    getInitialState: function () {
        return {
            advancedSettings: false
        }
    },

    changeUKvot: function (event) {
        this.bankSettings.u_kvot = +event.target.value;
        this.props.stateChange(this.bankSettings);
    },

    changeSeeAdvanced: function (event) {
        this.setState({advancedSettings: event.target.checked});
    },

    renderInput: function (value, functionToRun) {
        return <input type="number" max="10000000000" min="0" value={value} onChange={function(event){
            functionToRun(event);
            this.props.stateChange(this.bankSettings);
        }.bind(this)}/>
    },

    renderAdvancedSettings: function () {
        return this.state.advancedSettings ?
            <div>
                <p>Belopp</p>

                <div>
                    <label>Med säkerhet</label>
                    <label>Min</label>
                    {this.renderInput(this.bankSettings.med_säkerhet.amount.min, function (event) {
                        this.bankSettings.med_säkerhet.amount.min = +event.target.value
                    }.bind(this))}
                    <label>Max</label>
                    {this.renderInput(this.bankSettings.med_säkerhet.amount.max, function (event) {
                        this.bankSettings.med_säkerhet.amount.max = +event.target.value
                    }.bind(this))}
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <label>Min</label>
                    {this.renderInput(this.bankSettings.utan_säkerhet.amount.min, function (event) {
                        this.bankSettings.utan_säkerhet.amount.min = +event.target.value
                    }.bind(this))}
                    <label>Max</label>
                    {this.renderInput(this.bankSettings.utan_säkerhet.amount.max, function (event) {
                        this.bankSettings.utan_säkerhet.amount.max = +event.target.value
                    }.bind(this))}
                </div>

                <p>Tid (år)</p>

                <div>
                    <label>Med säkerhet</label>
                    <label>Min</label>
                    {this.renderInput(this.bankSettings.med_säkerhet.time.min, function (event) {
                        this.bankSettings.med_säkerhet.time.min = +event.target.value
                    }.bind(this))}
                    <label>Max</label>
                    {this.renderInput(this.bankSettings.med_säkerhet.time.max, function (event) {
                        this.bankSettings.med_säkerhet.time.max = +event.target.value
                    }.bind(this))}
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <label>Min</label>
                    {this.renderInput(this.bankSettings.utan_säkerhet.time.min, function (event) {
                        this.bankSettings.utan_säkerhet.time.min = +event.target.value
                    }.bind(this))}
                    <label>Max</label>
                    {this.renderInput(this.bankSettings.utan_säkerhet.time.max, function (event) {
                        this.bankSettings.utan_säkerhet.time.max = +event.target.value
                    }.bind(this))}
                </div>

                <p>Lånekostnad (%)</p>

                <div>
                    <label>Med säkerhet</label>
                    <input type="number" max="200" min="0" value={this.bankSettings.med_säkerhet.lånekostnad*100}
                        onChange={function(event){
                            this.bankSettings.med_säkerhet.lånekostnad = +event.target.value / 100;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <input type="number" max="200" min="0" value={this.bankSettings.utan_säkerhet.lånekostnad*100}
                           onChange={function(event){
                            this.bankSettings.utan_säkerhet.lånekostnad = +event.target.value / 100;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                </div>

                <p>Låneinsats (%)</p>

                <div>
                    <label>Med säkerhet</label>
                    <input type="number" max="200" min="0" value={this.bankSettings.med_säkerhet.låneinsats*100}
                           onChange={function(event){
                            this.bankSettings.med_säkerhet.låneinsats = +event.target.value / 100;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)} />
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <input type="number" max="200" min="0" value={this.bankSettings.utan_säkerhet.låneinsats*100}
                           onChange={function(event){
                            this.bankSettings.utan_säkerhet.låneinsats = +event.target.value / 100;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                </div>

                <span>Optimal U-kvot (0-1)</span>
                <input type="number" max="1" min="0" step="0.1" value={this.bankSettings.optimal_u_kvot}
                       onChange={function(event){
                            this.bankSettings.optimal_u_kvot = +event.target.value;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>

                <p>Sparfaktor 1,0</p>
            </div> : "";
    },

    render: function () {
        var temp = this.renderAdvancedSettings();
        return <div className="marginbottom">
            <label className="u-kvot">Aktuell U-Kvot: </label>
            <input type="number" min="0" max="1" step={0.01}
                   value={this.props.values.u_kvot}
                   onChange={this.changeUKvot}/>
            <span className="u-kvot2">
              <i>Sätts förslagsvis av styrelsen kvartalsvis utifrån faktisk U-kvot</i>
            </span>

            <div>
                <label className="u-kvot">Avancerade inställningar: </label>
                <input type="checkbox" checked={this.state.advancedSettings} onChange={this.changeSeeAdvanced}/>
                {temp}
            </div>
        </div>;
    }
});

module.exports = BankSettings;