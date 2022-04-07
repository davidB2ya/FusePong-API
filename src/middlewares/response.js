exports.success = function (req, res, msg, status) {
    res.status(status || 200).send({
        message: msg,
    });
};

exports.error = function (req, res, msg, status, details) {
    console.error('[response error]' + details);

    res.status(status || 500).send({
        error: msg,
        message: details,
    });
};