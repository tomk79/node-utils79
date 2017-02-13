/**
 * md5ハッシュを求める
 */
module.exports = function( str ){
	str = this.toStr(str);
	var crypto = require('crypto');
	var md5 = crypto.createHash('md5');
	md5.update(str, 'utf8');
	return md5.digest('hex');
}
