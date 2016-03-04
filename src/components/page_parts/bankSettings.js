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
        this.bankSettings.setUKvot(+event.target.value);
        this.props.stateChange(this.bankSettings);
    },

    changeTurbo: function (event) {
        this.bankSettings.setTurbo(+event.target.value);
        this.props.stateChange(this.bankSettings);
    },

    changeSeeAdvanced: function (event) {
        this.setState({advancedSettings: event.target.checked});
    },

    renderInput: function (value, functionToRun) {
        return <input type="number" max="10000000000" min="0" className="marginLeft" value={value} onChange={function(event){
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
                    <label className="normalMargins">Min
                        {this.renderInput(this.bankSettings.getMedSäkerhet().amount.min, function (event) {
                            this.bankSettings.getMedSäkerhet().amount.min = +event.target.value
                        }.bind(this))}
                    </label>
                    <label className="normalMargins">Max
                        {this.renderInput(this.bankSettings.getMedSäkerhet().amount.max, function (event) {
                            this.bankSettings.getMedSäkerhet().amount.max = +event.target.value
                        }.bind(this))}
                    </label>
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <label className="normalMargins">Min
                        {this.renderInput(this.bankSettings.getUtanSäkerhet().amount.min, function (event) {
                            this.bankSettings.getUtanSäkerhet().amount.min = +event.target.value
                        }.bind(this))}
                    </label>
                    <label className="normalMargins">Max
                        {this.renderInput(this.bankSettings.getUtanSäkerhet().amount.max, function (event) {
                            this.bankSettings.getUtanSäkerhet().amount.max = +event.target.value
                        }.bind(this))}
                    </label>
                </div>

                <p>Tid (år)</p>

                <div>
                    <label>Med säkerhet</label>
                    <label className="normalMargins">Min
                        {this.renderInput(this.bankSettings.getMedSäkerhet().time.min, function (event) {
                            this.bankSettings.getMedSäkerhet().time.min = +event.target.value
                        }.bind(this))}
                    </label>
                    <label className="normalMargins">Max
                        {this.renderInput(this.bankSettings.getMedSäkerhet().time.max, function (event) {
                            this.bankSettings.getMedSäkerhet().time.max = +event.target.value
                        }.bind(this))}
                    </label>
                </div>
                <div>
                    <label>Utan säkerhet</label>
                    <label className="normalMargins">Min
                        {this.renderInput(this.bankSettings.getUtanSäkerhet().time.min, function (event) {
                            this.bankSettings.getUtanSäkerhet().time.min = +event.target.value
                        }.bind(this))}
                    </label>
                    <label className="normalMargins">Max
                        {this.renderInput(this.bankSettings.getUtanSäkerhet().time.max, function (event) {
                            this.bankSettings.getUtanSäkerhet().time.max = +event.target.value
                        }.bind(this))}
                    </label>
                </div>

                <p>Lånekostnad (% per år)</p>

                <div>
                    <label>Med säkerhet
                        <input type="number" max="200" min="0" step="0.1" className="normalMargins"
                               value={this.bankSettings.getMedSäkerhet().lånekostnad}
                               onChange={function(event){
                            this.bankSettings.getMedSäkerhet().lånekostnad = +event.target.value;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                    </label>
                </div>
                <div>
                    <label>Utan säkerhet
                        <input type="number" max="200" min="0" step="0.1" className="normalMargins"
                               value={this.bankSettings.getUtanSäkerhet().lånekostnad}
                               onChange={function(event){
                            this.bankSettings.getUtanSäkerhet().lånekostnad = +event.target.value;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                    </label>
                </div>

                <p>Låneinsats (%)</p>

                <div>
                    <label>Med säkerhet
                        <input type="number" max="200" min="0" step="0.1" className="normalMargins"
                               value={this.bankSettings.getMedSäkerhet().låneinsats}
                               onChange={function(event){
                            this.bankSettings.getMedSäkerhet().låneinsats = +event.target.value;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                    </label>
                </div>
                <div>
                    <label>Utan säkerhet
                        <input type="number" max="200" min="0" step="0.1" className="normalMargins"
                               value={this.bankSettings.getUtanSäkerhet().låneinsats}
                               onChange={function(event){
                            this.bankSettings.getUtanSäkerhet().låneinsats = +event.target.value;
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                    </label>
                </div>

                <span>Optimal U-kvot (0-1)
                <input type="number" max="1" min="0" step="0.1" value={this.bankSettings.getOptimalUKvot()}
                       className="normalMargins"
                       onChange={function(event){
                            this.bankSettings.setOptimalUKvot(+event.target.value);
                            this.props.stateChange(this.bankSettings);
                        }.bind(this)}/>
                    </span>

                <p>Sparfaktor 1,0</p>
            </div> : "";
    },

    render: function () {
        var temp = this.renderAdvancedSettings();
        return <div className="marginbottom">
            <h3 className="floatL bigMarginRight">Bankens inställningar:</h3>
            <div className="floatL normalMargins">
                <p>
                    <b>Turbo:</b>
                </p>
                <input id="försparpoäng" type="number"
                       min={-10}
                       max={20}
                       value={this.props.values.getTurbo()}
                       step={0.1}
                       onChange={this.changeTurbo}/>
                <div>
                    <input id="tid"
                           type="range"
                           min={-10}
                           max={20}
                           value={this.props.values.getTurbo()}
                           step={0.1}
                           onChange={this.changeTurbo}/>
                </div>
            </div>
            <div className="clear"/>
            <label className="u-kvot">Aktuell Utlåningskvot:
                <input type="number" min="0" max="1" step={0.01} className="marginLeft"
                       value={this.props.values.getUKvot()}
                       onChange={this.changeUKvot}/>
            </label>
            <div className="u-kvot2">
              <i>Sätts förslagsvis av styrelsen kvartalsvis utifrån faktisk Utlåningskvot</i>
            </div>

            <div>
                <label className="u-kvot">
                    <input type="checkbox" checked={this.state.advancedSettings} onChange={this.changeSeeAdvanced}/>
                    Avancerade inställningar:
                </label>
                {temp}
            </div>
        </div>;
    }
});

module.exports = BankSettings;