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


        var skatteavdrag = (loanSettings.skattejämkning) ? 0.7 : 1;
        var jämkadLånekostnad = {start: loanCost.start * skatteavdrag, end: loanCost.end * skatteavdrag};
        var eftersparPerMånad = ((eftersparkrav / (loanSettings.time * 12)) / ((loanSettings.time * 12) + 1)) * 2;

        var ackumuleradePoang = 0, sumPostSavings = 0;
        for (var i = 0; i < loanSettings.time * 12; i += 1) {
            tempAmount = loanSettings.amount - amortering * i;
            sumPostSavings += (eftersparPerMånad / 2) + (jämkadLånekostnad.start - bankSettings.getLånekostnad() * (tempAmount) * skatteavdrag);
            ackumuleradePoang += sumPostSavings;
        }

        var efterspar = {
            start: ((eftersparPerMånad / 2) + (jämkadLånekostnad.start - jämkadLånekostnad.start) +
            ((2 * (eftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12))),
            end: ((eftersparPerMånad / 2) + (jämkadLånekostnad.start - jämkadLånekostnad.end) +
            ((2 * (eftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12)))
        };

        if (efterspar.start < 0) {
            efterspar.start = 0;

            tempAmount = efterspar.start;
            for (i = 0; i < loanSettings.time * 12 - 1; i += 1) {
                tempAmount = jämkadLånekostnad.start / (loanSettings.time * 12) + tempAmount;
            }
            efterspar.end = tempAmount;
        }

        payState.loanCost.start = loanCost.start;
        payState.loanCost.end = loanCost.end;
        payState.loanCost.total = loanCost.total;
        payState.postSavings.start = efterspar.start;
        payState.postSavings.end = efterspar.end;
        payState.monthlyPay.start = payState.postSavings.start + amortering + jämkadLånekostnad.start;
        payState.monthlyPay.end = payState.postSavings.end + amortering + jämkadLånekostnad.end;

        return payState;
    }
};

module.exports = PaymentMixin;