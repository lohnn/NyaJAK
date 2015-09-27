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

    calculateStraightPayment: function (values, amortering, eftersparkrav) {
        var loanCost = {start: values.state.fee * (values.amount)};
        var tempAmount = values.amount - amortering * (values.time * 12 - 1);
        loanCost.end = values.state.fee * (tempAmount);

        var ackumuleradePoang = 0, sumPostSavings = 0;
        for (var i = 0; i < values.time * 12; i += 1) {
            tempAmount = values.amount - amortering * i;
            sumPostSavings += (amortering / 2) + (loanCost.start - values.state.fee * (tempAmount));
            ackumuleradePoang += sumPostSavings;
        }

        var postSavingsStart = (amortering / 2) + (loanCost.start - loanCost.start) + ((2 * (eftersparkrav - ackumuleradePoang)) / ((values.time * 12 + 1) * values.time * 12));
        var postSavingsEnd = (amortering / 2) + (loanCost.start - loanCost.end) + ((2 * (eftersparkrav - ackumuleradePoang)) / ((values.time * 12 + 1) * values.time * 12));

        if (postSavingsStart < 0) {
            postSavingsStart = 0;

            tempAmount = postSavingsStart;
            for (i = 0; i < values.time * 12 - 1; i += 1) {
                tempAmount = loanCost.start / (values.time * 12) + tempAmount;
            }
            postSavingsEnd = tempAmount;
        }

        var postSavings = {
            start: postSavingsStart,
            end: postSavingsEnd
        };

        this.setState({
            payState: {
                monthlyPay: {
                    start: postSavings.start + amortering + loanCost.start,
                    end: postSavings.end + amortering + loanCost.end
                },
                loanCost: loanCost,
                postSavings: postSavings
            }
        });
    }
};

module.exports = PaymentMixin;