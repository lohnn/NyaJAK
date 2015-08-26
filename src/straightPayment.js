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
        var loanCost = {start: 0.0025 * (values.amount)};
        var tempAmount = values.amount - amortering * (values.time * 12 - 1);
        loanCost.end = 0.0025 * (tempAmount);


        var ackumuleradePoang = 0, sumPostSavings = 0;
        for (var i = 0; i < values.time * 12; i++) {
            tempAmount = values.amount - amortering * i;
            sumPostSavings += (amortering / 2) + (loanCost.start - 0.0025 * (tempAmount));
            ackumuleradePoang += sumPostSavings;
        }

        var poangforbrukning = (((values.amount / (values.time * 12)) / 2 * ((values.time * 12) + 1)) * (values.time * 12)) - values.förspar;
        console.log(poangforbrukning);
        var postSavingsStart = (amortering / 2) + (loanCost.start - loanCost.start) + ((2 * (poangforbrukning - ackumuleradePoang)) / ((values.time * 12 + 1) * values.time * 12));
        var postSavingsEnd = (amortering / 2) + (loanCost.start - loanCost.end) + ((2 * (poangforbrukning - ackumuleradePoang)) / ((values.time * 12 + 1) * values.time * 12));

        //TODO: Eftersparande och INTE ammortering?
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
    },
};