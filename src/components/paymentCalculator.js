/**
 * Created by lohnn
 */

var PaymentMixin = {
    payState: function () {
        this.monthlyPay = {start: 0, end: 20};
        this.loanCost = {start: 20, end: 0, total: 0};
        this.postSavings = {start: 0, end: 20};
        this.ackumuleradePoäng = 0;
    },

    calculatePayment: function (loanSettings, bankSettings, amortering, eftersparkrav, nyttEftersparkrav, rak_månadsbetalning) {
        var payState = new this.payState();

        var loanCost = {start: bankSettings.getLånekostnad() * (loanSettings.amount)};
        var tempAmount = loanSettings.amount - amortering * (loanSettings.time * 12 - 1);
        loanCost.end = bankSettings.getLånekostnad() * (tempAmount);
        loanCost.total = (loanCost.start + loanCost.end) / 2 * (loanSettings.time * 12);

        var skatteavdrag = (loanSettings.skattejämkning) ? 0.7 : 1;
        var jämkadLånekostnad = {start: loanCost.start * skatteavdrag, end: loanCost.end * skatteavdrag};
        var eftersparPerMånad = ((nyttEftersparkrav / (loanSettings.time * 12)) / ((loanSettings.time * 12) + 1)) * 2;

        var postSavings, ackumuleradePoang = 0;

        if (rak_månadsbetalning) {
            //I
            var sumPostSavings = 0;
            for (var i = 0; i < loanSettings.time * 12; i += 1) {
                tempAmount = loanSettings.amount - amortering * i;
                var tempLånekostnad = (skatteavdrag * bankSettings.getLånekostnad() * tempAmount);
                var tempPostSavings = (eftersparPerMånad / 2) + (jämkadLånekostnad.start - tempLånekostnad);
                sumPostSavings += tempPostSavings;
                ackumuleradePoang += sumPostSavings;
            }

            postSavings = {
                start: ((eftersparPerMånad / 2) +
                ((2 * (nyttEftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12))),
                end: ((eftersparPerMånad / 2) + (jämkadLånekostnad.start - jämkadLånekostnad.end) +
                ((2 * (nyttEftersparkrav - ackumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12)))
            };

            //Använd G
            if (postSavings.start < 0) {
                if (nyttEftersparkrav > 0) {
                    eftersparPerMånad = 0;
                }

                postSavings.start = (eftersparPerMånad / 2);
                postSavings.end = (eftersparPerMånad / 2) + (jämkadLånekostnad.start - jämkadLånekostnad.end);
            } else { //Använd I
                var oldAckumuleradePoang = ackumuleradePoang;
                sumPostSavings = ackumuleradePoang = 0;
                for (i = 0; i < loanSettings.time * 12; i += 1) {
                    tempAmount = loanSettings.amount - amortering * i;
                    var tempLånekostnad = (skatteavdrag * bankSettings.getLånekostnad() * tempAmount);
                    var tempPostSavings = (eftersparPerMånad / 2) + (jämkadLånekostnad.start - tempLånekostnad) +
                        ((2 * (nyttEftersparkrav - oldAckumuleradePoang)) / ((loanSettings.time * 12 + 1) * loanSettings.time * 12));
                    sumPostSavings += tempPostSavings;
                    ackumuleradePoang += sumPostSavings;
                }
            }
            console.log(ackumuleradePoang);
        } else {
            postSavings = {start: eftersparPerMånad, end: eftersparPerMånad};
        }

        payState.loanCost.start = loanCost.start;
        payState.loanCost.end = loanCost.end;
        payState.loanCost.total = loanCost.total;
        payState.postSavings.start = postSavings.start;
        payState.postSavings.end = postSavings.end;
        payState.monthlyPay.start = payState.postSavings.start + amortering + jämkadLånekostnad.start;
        payState.monthlyPay.end = payState.postSavings.end + amortering + jämkadLånekostnad.end;
        payState.ackumuleradePoäng = ackumuleradePoang;
        payState.eftersparPerMånad = eftersparPerMånad;

        return payState;
    }
};

module.exports = PaymentMixin;