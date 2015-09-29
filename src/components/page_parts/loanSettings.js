var React = require("react");

var LoanSettings = React.createClass({
    optimal_u_kvot: 0.9,

    changeTime: function (event) {
        this.props.pass.setState({time: +event.target.value});
    },
    changeAmount: function (event) {
        this.props.pass.setState({amount: +event.target.value});
    },
    changeFörspar: function (event) {
        this.props.pass.setState({förspar: +event.target.value});
    },

    render: function(){
    return <div className="header">
        <h1 className="clear">JAK-lån</h1>

        <p>Låneberäkning med säkerhet</p>

        <div className="floatL">
            <p><b>Belopp jag vill låna (kr):</b></p>
            <p></p>
            <input id="belopp"
                   type="range"
                   value={this.props.pass.state.amount}
                   min={this.props.pass.state.minAmount}
                   max={this.props.pass.state.maxAmount}
                   step={1000}
                   onChange={this.changeAmount}/>

            <input type="number"
                   min={this.props.pass.state.minAmount}
                   max={this.props.pass.state.maxAmount}
                   value={this.props.pass.state.amount}
                   onChange={this.changeAmount}/>
        </div>

        <div className="floatL">
            <p><b>På hur lång tid (år):</b></p>
            <input id="tid"
                   type="range"
                   value={this.props.pass.state.time}
                   min={this.props.pass.state.minTime}
                   max={this.props.pass.state.maxTime}
                   onChange={this.changeTime}/>
            <input type="number"
                   min={this.props.pass.state.minTime}
                   max={this.props.pass.state.maxTime}
                   value={this.props.pass.state.time}
                   onChange={this.changeTime}/>

            <p className="noMargins"><i>Idag mest fördelaktiga amorteringstid i nya JAK-banken: Upp till {this.props.bestAmortering.toFixed(1)} år</i></p>
        </div>

        <div className="hundredpc clear">
            <p className="noMargins"><b>Tillför sparpoäng</b></p>
            <input id="försparpoäng" type="number"
                   min={0}
                   defaultValue={this.props.pass.state.förspar}
                   onChange={this.changeFörspar}/>
        </div>
    </div>;
    }
}); //onChange={this.changeAmount}

module.exports = LoanSettings;