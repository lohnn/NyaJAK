/**
 * Created by lohnn on 2015-10-31.
 */

var Skatteredution = {
    calculate: function (loanCost) {
        return {first: (-0.3 * loanCost.start), last: (-0.3 * loanCost.end)};
    }
};

module.exports = Skatteredution;