/**
 * Created by lohnn
 */

var PaymentMixin = {
    getInitialState: function () {
        return {
            payState: {
                monthlyPay : {start: 0, end: 20},
                loanCost : {start: 20, end: 0},
                postSavings: {start: 0, end: 20}
            }
        };
    },

    calculateStraightPayment: function (values, amortering) {
        var loanCost = {start: 0.00245*(values.amount)};
        var tempAmount = values.amount;
        for(var i = 1; i < values.time*12; i++){
            tempAmount -= amortering;
        }
        loanCost.end = 0.00245*(tempAmount);

        this.setState({
            payState: {
                monthlyPay : {start: 0, end: 20},
                loanCost : loanCost,
                postSavings: {start: 0, end: 20}
            }
        });
    },
};