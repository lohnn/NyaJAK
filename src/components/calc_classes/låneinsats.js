/**
 * Created by lohnn on 2015-10-30.
 */

var Låneinsats = {
    calculate: function (lånebelopp, insatsProcent) {
        return lånebelopp * insatsProcent;
    }
};

module.exports = Låneinsats;