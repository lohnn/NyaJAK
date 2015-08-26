/**
 * Created by lohnn
 */

var PaymentMixin = {
    getInitialState: function () {
        return {
            payState: {
                monthlyPay: {start: 0, end: 20},
                loanCost: {start: 20, end: 0},
                postSavings: {start: 0, end: 20}
            }
        };
    },

    calculateStraightPayment: function (values, amortering) {
        var loanCost = {start: 0.00245 * (values.amount)};
        var tempAmount = values.amount - amortering * (values.time * 12 - 1);
        loanCost.end = 0.00245 * (tempAmount);
        console.log(loanCost);

        //TODO: Eftersmarande och INTE ammortering?
        var postSavings = {
            start: (amortering / 2) + (loanCost.start - loanCost.start),
            end: (amortering / 2) + (loanCost.start - loanCost.end)
        };
        console.log(postSavings);

        this.setState({
            payState: {
                monthlyPay: {start: 0, end: 20},
                loanCost: loanCost,
                postSavings: postSavings
            }
        });
    },
};