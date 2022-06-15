function fourDigitCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += oneDigitRandomNumber(0, 9).toString();
    }
    return code;
}

function oneDigitRandomNumber(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

module.exports = { fourDigitCode: fourDigitCode, oneDigitRandomNumber : oneDigitRandomNumber };
// if key = value enough just key