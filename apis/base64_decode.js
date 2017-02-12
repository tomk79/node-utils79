/**
 * base64デコードする
 */
module.exports = function( base64 ){
    var bin = new Buffer(base64, 'base64').toString();
    return bin;
}
