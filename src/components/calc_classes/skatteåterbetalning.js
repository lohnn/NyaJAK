/**
 * Created by lohnn on 2015-11-01.
 */

var Skatteåterbetalning = {
    calculate: function (loanSettings, lånekostnad, amortering) {
        var skatteavdrag = 0.3;
        var getSumFromTime = function (firstMonth, lastMonth) {
            var tempAmount1 = lånekostnad * (loanSettings.amount - amortering * (firstMonth)) * skatteavdrag;
            var tempAmount2 = lånekostnad * (loanSettings.amount - amortering * (lastMonth)) * skatteavdrag;
            return (tempAmount1 + tempAmount2) * ((firstMonth - lastMonth) / 2);
        };
        //loanSettings.time * 12 - 1

        return {
            first: getSumFromTime(0, 11),
            last: getSumFromTime(loanSettings.time * 12 - 12, loanSettings.time * 12 - 1)
        };
    }
};

module.exports = Skatteåterbetalning;