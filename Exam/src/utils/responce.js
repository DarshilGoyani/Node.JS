module.exports.successResponce = (status, error=false, msg, responce) => {
    return {status, error, msg, responce};
}
module.exports.errorResponce = (status, error=true, msg) => {
    return {status, error, msg};
}