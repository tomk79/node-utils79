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

	/**
	 * 入力値のセットを確認する
	 * 内部で validator を使用します。
	 * validator のAPI一覧 https://www.npmjs.com/package/validator を参照してください。
	 */
	exports.validate = function(values, rules, callback){
		callback = callback || function(){};
		var err = null;
		var validator = require('validator');

		for( var key in rules ){
			var rule = rules[key];
			// console.log(values[key]);
			for( var idx in rule ){
				// console.log(idx);
				// console.log(rule[idx]);
				var currentRule = rule[idx];
				var errorMessage = 'ERROR on '+key;
				var isValid = null;

				errorMessage = currentRule[currentRule.length-1];
				delete(currentRule[currentRule.length-1]);

				var isNot = false;
				var method = currentRule.shift();
				if( method.match(new RegExp('^(\\!)?([\\s\\S]*)$')) ){
					isNot = (RegExp.$1 == '!' ? true : false );
					method = RegExp.$2;
				}
				currentRule.unshift(values[key]);
				isValid = validator[method].apply( undefined, currentRule );

				if( !isNot && !isValid || isNot && isValid ){
					// NGパターン
					if(err === null){
						err = {};
					}
					err[key] = err[key] || [];
					err[key].push(errorMessage)
				}
			}
		}

		callback(err);
	}


})(exports);
