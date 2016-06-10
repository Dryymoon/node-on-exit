process.stdin.resume(); // so the program will not close instantly

const fnArray = [];
const addFn = function (fn) { fnArray.push(fn); };

function exitHandler(options, err) {
    options.cleanup && fnArray.forEach(function (fn) { if (typeof(fn) === 'function') fn(); });
    err && console.log(err.stack);
    options.exit && process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

module.exports = addFn;
