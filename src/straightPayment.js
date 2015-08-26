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

    calculateStraightPayment: function (params) {
        this.setState({
            payState: {
                monthlyPay : {start: 0, end: 20},
                loanCost : {start: 20, end: 0},
                postSavings: {start: 0, end: 20}
            }
        });
    },
};