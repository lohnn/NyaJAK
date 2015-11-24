/**
 * Created by lohnn on 2015-10-10.
 */

var BankSettings = function () {
    if (!(this instanceof BankSettings)) {
        return new BankSettings();
    }

    this.amount = {min: 20000, max: 6000000};
    this.time = {min: 2, max: 40};
    this.lånekostnad = 3;
    this.låneinsats = 6;
};

var BankSettingsFactory = function () {
    if (!(this instanceof BankSettingsFactory)) {
        return new BankSettingsFactory();
    }

    var säkerhet = true;
    this.setSäkerhet = function (value) {
        säkerhet = value;
    };

    var bankSettings = {
        med_säkerhet: new BankSettings(),
        utan_säkerhet: new BankSettings(),
        u_kvot: 0.58,
        optimal_u_kvot: 0.9
    };

    //Set standard settings for utan säkerhet
    bankSettings.utan_säkerhet.amount.max = 200000;
    bankSettings.utan_säkerhet.time.max = 10;
    bankSettings.utan_säkerhet.lånekostnad = 4.5;

    var getCurrent = function () {
        return säkerhet ? bankSettings.med_säkerhet : bankSettings.utan_säkerhet;
    };

    this.getMedSäkerhet = function () {
        return bankSettings.med_säkerhet;
    };

    this.getUtanSäkerhet = function () {
        return bankSettings.utan_säkerhet;
    };

    this.getUKvot = function () {
        return bankSettings.u_kvot;
    };
    this.setUKvot = function (value) {
        bankSettings.u_kvot = value;
    };

    this.getOptimalUKvot = function () {
        return bankSettings.optimal_u_kvot;
    };
    this.setOptimalUKvot = function (value) {
        bankSettings.optimal_u_kvot = value;
    };

    this.getAmountMax = function () {
        return getCurrent().amount.max;
    };

    this.getAmountMin = function () {
        return getCurrent().amount.min;
    };

    this.getTimeMax = function () {
        return getCurrent().time.max;
    };

    this.getTimeMin = function () {
        return getCurrent().time.min;
    };

    this.getLånekostnad = function () {
        return getCurrent().lånekostnad / 100 / 12;
    };

    this.getLåneinsats = function () {
        return getCurrent().låneinsats / 100;
    };
};

module.exports = BankSettingsFactory;