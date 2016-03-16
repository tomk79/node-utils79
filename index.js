/**
 * node-iterate79
 */
(function(exports){

	/**
	 * 文字列にキャストして得る
	 */
	exports.toStr = function(val){
		if( typeof(val) == typeof('') ){
			return val+'';
		}else if( val === undefined ){
			return '';
		}else if( val === null ){
			return '';
		}else if( typeof(val) == typeof(1.01) ){
			return val+'';
		}else if( typeof(val) == typeof(1) ){
			return val+'';
		}else if( typeof(val) == typeof([]) ){
			var rtn = '';
			for( var i in val ){
				rtn += this.toStr(val[i]);
			}
			return rtn;
		}
		return ''+val;
	}

	/**
	 * base64エンコードする
	 */
	exports.base64_encode = function( bin ){
		var base64 = new Buffer(bin).toString('base64');
		return base64;
	}

	/**
	 * base64デコードする
	 */
	exports.base64_decode = function( base64 ){
		var bin = new Buffer(base64, 'base64').toString();
		return bin;
	}

	/**
	 * ファイルが存在するか調べる
	 */
	exports.is_file = function( path ){
		var fs = require('fs');
		if( !fs.existsSync(path) || !fs.statSync(path).isFile() ){
			return false;
		}
		return true;
	}

	/**
	 * ディレクトリが存在するか調べる
	 */
	exports.is_dir = function( path ){
		var fs = require('fs');
		if( !fs.existsSync(path) || !fs.statSync(path).isDirectory() ){
			return false;
		}
		return true;
	}


})(exports);
