/**
 * node-iterate79
 */
(function(exports){

	/**
	 * 文字列型に置き換える
	 */
	exports.toStr = require('./apis/toStr.js');

	/**
	 * 文字列の前後から空白文字列を削除する
	 */
	exports.trim = require('./apis/trim.js');

	/**
	 * 配列(または連想配列)のキーの配列を取得する
	 */
	exports.array_keys = require('./apis/array_keys.js');

	/**
	 * 配列(または連想配列)の要素数を数える
	 */
	exports.count = require('./apis/count.js');

	/**
	 * base64エンコードする
	 */
	exports.base64_encode = require('./apis/base64_encode.js');

	/**
	 * base64デコードする
	 */
	exports.base64_decode = require('./apis/base64_decode.js');

	/**
	 * md5ハッシュを求める
	 */
	exports.md5 = require('./apis/md5.js');

	/**
	 * sha1ハッシュを求める
	 */
	exports.sha1 = require('./apis/sha1.js');

	/**
	 * 文字列を指定された桁数になるように埋める
	 */
	exports.str_pad = require('./apis/str_pad.js');

	/**
	 * ファイルが存在するか調べる
	 */
	exports.is_file = require('./apis/is_file.js');

	/**
	 * ディレクトリが存在するか調べる
	 */
	exports.is_dir = require('./apis/is_dir.js');

	/**
	 * パス文字列から、ファイル名を取り出す
	 */
	exports.basename = require('./apis/basename.js');

	/**
	 * ディレクトリ名を得る
	 */
	exports.dirname = require('./apis/dirname.js');

	/**
	 * パスを正規化する
	 */
	exports.normalize_path = require('./apis/normalize_path.js');

	/**
	 * 正規表現で使えるようにエスケープ処理を施す
	 */
	exports.regexp_quote = require('./apis/regexp_quote.js');

	/**
	 * 入力値のセットを確認する
	 */
	exports.validate = require('./apis/validate.js');

	/**
	 * 文字列をn文字ずつ分割する
	 */
	exports.divide = require('./apis/divide.js');

	/**
	 * HTML特殊文字をエスケープする
	 */
	exports.h = require('./apis/h.js');

	/**
	 * 正規表現のメタ文字をエスケープする
	 */
	exports.preg_quote = require('./apis/preg_quote.js');

})(exports);
