/**
 * node-iterate79
 */
(function(exports){

	/**
	 * 文字列型に置き換える
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
	 * 文字列の前後から空白文字列を削除する
	 */
	exports.trim = function(str){
		str = str.replace(/[\s]*$/, '');
		str = str.replace(/^[\s]*/, '');
		return str;
	}

	/**
	 * 配列(または連想配列)のキーの配列を取得する
	 */
	exports.array_keys = function(ary){
		var rtn = [];
		for(var key in ary){
			rtn.push(key);
		}
		return rtn;
	}

	/**
	 * 配列(または連想配列)の要素数を数える
	 */
	exports.count = function(ary){
		return this.array_keys(ary).length;
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
	 * パス文字列から、ファイル名を取り出す
	 */
	exports.basename = function( path ){
		var rtn = '';
		rtn = path.replace( new RegExp('^.*[\\/\\\\]'), '' );
		return rtn;
	}

	/**
	 * ディレクトリ名を得る
	 */
	exports.dirname = function(path){
		return path.replace(/(?:\/|\\)[^\/\\]*(?:\/|\\)?$/, '');
	}

	/**
	 * パスを正規化する。
	 *
	 * 受け取ったパスを、スラッシュ区切りの表現に正規化します。
	 * Windowsのボリュームラベルが付いている場合は削除します。
	 * URIスキーム(http, https, ftp など) で始まる場合、2つのスラッシュで始まる場合(`//www.example.com/abc/` など)、これを残して正規化します。
	 *
	 *  - 例： `\a\b\c.html` → `/a/b/c.html` バックスラッシュはスラッシュに置き換えられます。
	 *  - 例： `/a/b////c.html` → `/a/b/c.html` 余計なスラッシュはまとめられます。
	 *  - 例： `C:\a\b\c.html` → `/a/b/c.html` ボリュームラベルは削除されます。
	 *  - 例： `http://a/b/c.html` → `http://a/b/c.html` URIスキームは残されます。
	 *  - 例： `//a/b/c.html` → `//a/b/c.html` ドメイン名は残されます。
	 *
	 * @param string $path 正規化するパス
	 * @return string 正規化されたパス
	 */
	exports.normalize_path = function($path){
		$path = this.trim($path);
		// $path = $this->convert_encoding( $path );//文字コードを揃える
		$path = $path.replace( /\/|\\/g, '/' );//バックスラッシュをスラッシュに置き換える。
		$path = $path.replace( /^[A-Za-z]\:\//g, '/' );//Windowsのボリュームラベルを削除
		var $prefix = '';
		if( $path.match( /^((?:[a-zA-Z0-9]+\:)?\/)(\/[\s\S]*)$/, $path ) ){
			$prefix = RegExp.$1;
			$path = RegExp.$2;
		}
		$path = $path.replace( /\/+/g, '/' );//重複するスラッシュを1つにまとめる
		return $prefix+$path;
	}

	/**
	 * 正規表現で使えるようにエスケープ処理を施す
	 */
	exports.regexp_quote = function(str) {
		if( typeof(str) !== typeof('') ){return str;}
		return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
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

	/**
	 * 文字列をn文字ずつ分割する
	 */
	exports.divide = function(str, n){
		if(typeof(str) !== typeof('')){
			str = str.toString();
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

})(exports);
