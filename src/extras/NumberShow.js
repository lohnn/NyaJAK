var NumberShow = {
    setSeparator: function (nStr) {
        return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};

module.exports = NumberShow;