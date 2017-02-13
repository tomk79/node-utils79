/**
 * sha1ハッシュを求める
 */
module.exports = function( str ){
	str = this.toStr(str);
	var crypto = require('crypto');
	var sha1 = crypto.createHash('sha1');
	sha1.update(str, 'utf8');
	return sha1.digest('hex');
}
