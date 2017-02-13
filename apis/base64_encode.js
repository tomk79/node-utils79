/**
 * base64エンコードする
 */
module.exports = function( bin ){
	bin = this.toStr(bin);
	var base64 = new Buffer(bin).toString('base64');
	return base64;
}
