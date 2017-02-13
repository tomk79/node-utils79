/**
 * 文字列をn文字ずつ分割する
 */
module.exports = function(str, n){
	if(typeof(str) !== typeof('')){
		str = this.toStr(str);
	}
	if(typeof(n) !== typeof(0)){return false;}
	if(n <= 0){return false;}
	if(n !== Math.floor(n)){return false;}
	var rtn = [];
	for(var i = 0; i < str.length; i = i+n ){
		var sbstr = str.substring(i,i+n); // i文字目からn文字ずつとりだす
		rtn.push(sbstr);
	}
	return rtn;
}
