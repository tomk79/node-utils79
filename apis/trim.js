/**
 * 文字列の前後から空白文字列を削除する
 */
module.exports = function(str){
	str = this.toStr(str);
	str = str.replace(/[\s]*$/, '');
	str = str.replace(/^[\s]*/, '');
	return str;
}
