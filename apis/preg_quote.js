/**
 * 正規表現のメタ文字をエスケープする
 *
 * @param {*} str エスケープ対象の文字列
 * @returns エスケープされた文字列
 */
module.exports = function(str){
    if (str === undefined) {
        return null;
    }
    if (str === null) {
        return null;
    }
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
