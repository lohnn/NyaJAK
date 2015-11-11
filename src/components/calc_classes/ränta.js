/**
 * Created by lohnn on 2015-10-30.
 */

var Ränta = {
    calculate: function (rate, npery) {
        var conv_number = function (expr, decplaces) {
            // This function is from David Goodman's Javascript Bible.
            var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));

            while (str.length <= decplaces) {

                str = "0" + str;

            }
        };

        if (( npery == 0 ) || ( rate == 0 )) {
            return (0);
        }
        rate = eval((rate) / (100));
        effect_value = ((Math.pow(1 + (rate / npery), npery)) - 1) * 100;
        effect_value = conv_number(effect_value, 2);
        return (effect_value);
    }
};

module.exports = Ränta;