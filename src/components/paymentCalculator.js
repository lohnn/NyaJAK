/**
 * Created by lohnn
 */

var PaymentMixin = {
    payState: {
        monthlyPay: {start: 0, end: 20},
        loanCost: {start: 20, end: 0},
        postSavings: {start: 0, end: 20}
    },

    calculateStraightPayment: function (loanSettings, bankSettings, amortering, eftersparkrav) {
        var loanCost = {start: bankSettings.fee * (loanSettings.amount)};
        var tempAmount = loanSettings.amount - amortering * (loanSettings.time * 12 - 1);
        loanCost.end = bankSettings.fee * (tempAmount);

        var ackumuleradePoang = 0, sumPostSavings = 0;
        for (var i = 0; i < loanSettings.time * 12; i += 1) {
            tempAmount = loanSettings.amount - amortering * i;
            sumPostSavings += (amortering / 2) + (loanCost.start - bankSettings.fee * (tempAmount));
            ackumuleradePoang += sumPostSavings;
        }

        var postSavingsStart = (amortering / 2) + (loanCost.start - loanCost.start) + ((2 * (eftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12));
        var postSavingsEnd = (amortering / 2) + (loanCost.start - loanCost.end) + ((2 * (eftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12));

        if (postSavingsStart < 0) {
            postSavingsStart = 0;

            tempAmount = postSavingsStart;
            for (i = 0; i < loanSettings.time * 12 - 1; i += 1) {
                tempAmount = loanCost.start / (loanSettings.time * 12) + tempAmount;
            }
            postSavingsEnd = tempAmount;
        }

        var postSavings = {
            start: postSavingsStart,
            end: postSavingsEnd
        };

        return {
            monthlyPay: {
                start: postSavings.start + amortering + loanCost.start,
                end: postSavings.end + amortering + loanCost.end
            },
            loanCost: loanCost,
            postSavings: postSavings
        };
    }
};

module.exports = PaymentMixin;