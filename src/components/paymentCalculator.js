/**
 * Created by lohnn
 */

var PaymentMixin = {
    payState: function () {
        this.monthlyPay = {start: 0, end: 20};
        this.loanCost = {start: 20, end: 0, total: 0};
        this.postSavings = {start: 0, end: 20};
    },

    calculateStraightPayment: function (loanSettings, bankSettings, amortering, eftersparkrav) {
        var payState = new this.payState();

        var loanCost = {start: bankSettings.getLånekostnad() * (loanSettings.amount)};
        var tempAmount = loanSettings.amount - amortering * (loanSettings.time * 12 - 1);
        loanCost.end = bankSettings.getLånekostnad() * (tempAmount);
        loanCost.total = (loanCost.start + loanCost.end) / 2 * (loanSettings.time * 12);

        var ackumuleradePoang = 0, sumPostSavings = 0;
        for (var i = 0; i < loanSettings.time * 12; i += 1) {
            tempAmount = loanSettings.amount - amortering * i;
            sumPostSavings += (amortering / 2) + (loanCost.start - bankSettings.getLånekostnad() * (tempAmount));
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

        payState.loanCost.start = loanCost.start;
        payState.loanCost.end = loanCost.end;
        payState.loanCost.total = loanCost.total;
        payState.postSavings.start = postSavingsStart;
        payState.postSavings.end = postSavingsEnd;
        payState.monthlyPay.start = payState.postSavings.start + amortering + loanCost.start;
        payState.monthlyPay.end = payState.postSavings.end + amortering + loanCost.end;

        return payState;
    }
};

module.exports = PaymentMixin;