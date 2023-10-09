var assert = require('assert');
var path = require('path');
var fs = require('fs');
var utils79 = require(__dirname+'/../index.js');

describe('文字列に変換する', function() {

	it('文字列に変換する', function(done) {
		this.timeout(10000);

		assert.strictEqual(utils79.toStr('a'), 'a');
		assert.strictEqual(utils79.toStr(undefined), '');
		assert.strictEqual(utils79.toStr(null), '');
		assert.strictEqual(utils79.toStr(0), '0');
		assert.strictEqual(utils79.toStr(100), '100');
		assert.strictEqual(utils79.toStr(100.001), '100.001');
		assert.strictEqual(utils79.toStr(['a','b','c']), 'abc');
		assert.strictEqual(utils79.toStr({'a':'a','b':'b','c':'c'}), 'abc');

		done();

	});

});


describe('文字列をn文字ずつ分割する', function() {

	it('divide', function(done) {
		this.timeout(10*1000);

		// 文字列を整数等分して配列を返す。
		assert.deepEqual(utils79.divide( "abcdefghi", 1 ), ['a','b','c','d','e','f','g','h','i'] );
		assert.deepEqual(utils79.divide( "abcdefghi", 2 ), ['ab','cd','ef','gh','i'] ); // あまりがある場合は、最後の配列要素の文字数が端数になる。
		assert.deepEqual(utils79.divide( "abcdefghi", 3 ), ['abc','def','ghi'] );
		assert.deepEqual(utils79.divide( "", 3 ), [] );

		// 文字列以外の値は 文字列にキャストして扱われる
		assert.deepEqual(utils79.divide( undefined, 2.0 ), [] );
		assert.deepEqual(utils79.divide( null, 2.0 ), [] );
		assert.deepEqual(utils79.divide( 0, 2 ), ['0'] );
		assert.deepEqual(utils79.divide( 1234567890, 2 ), ['12','34','56','78','90'] );
		assert.deepEqual(utils79.divide( 1234567890.001, 2.0 ), ['12','34','56','78','90','.0','01'] );


		assert.deepEqual(utils79.divide( "abcdefghi", 0 ), false ); // ゼロを受け付けない
		assert.deepEqual(utils79.divide( "abcdefghi", -10 ), false ); // 負の値を受け付けない
		assert.deepEqual(utils79.divide( "abcdefghi", 2.5 ), false ); // 整数以外を受け付けない
		done();

	});

});

describe('HTML特殊文字をエスケープする', function() {

	it('h', function(done) {
		this.timeout(10*1000);

		assert.deepEqual(utils79.h( '<span class="test abc">test</span>' ), '&lt;span class=&quot;test abc&quot;&gt;test&lt;/span&gt;' );
		assert.deepEqual(utils79.h( '<span class="test abc">test</span>'+"\n"+'<span class="test abc">test</span>' ), '&lt;span class=&quot;test abc&quot;&gt;test&lt;/span&gt;'+"\n"+'&lt;span class=&quot;test abc&quot;&gt;test&lt;/span&gt;' );
		done();

	});

	it('h(Non-Strings)', function(done) {
		this.timeout(10*1000);

		assert.deepEqual(utils79.h( undefined ), '' );
		assert.deepEqual(utils79.h( null ), '' );
		assert.deepEqual(utils79.h( 123 ), '123' );
		assert.deepEqual(utils79.h( 123.12 ), '123.12' );
		assert.deepEqual(utils79.h( ['array','array'] ), 'arrayarray' );
		done();

	});

});

describe('文字列の前後から空白文字列を削除する', function() {

	it('trim', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.trim( "\n\n\n\n\n"+'abc'+"\n\n\r\n" ), 'abc');
		assert.strictEqual(utils79.trim( '     			abc   	' ), 'abc');
		assert.strictEqual(utils79.trim( '     	'+"\n\n"+'		abc   	' ), 'abc');
		assert.strictEqual(utils79.trim( 'abc' ), 'abc');
		done();

	});

	it('trim(Non-Strings)', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.trim( undefined ), '');
		assert.strictEqual(utils79.trim( null ), '');
		assert.strictEqual(utils79.trim( 123 ), '123');
		assert.strictEqual(utils79.trim( 123.12 ), '123.12');
		done();

	});

});

describe('配列(または連想配列)のキーの配列を取得する', function() {

	it('array_keys', function(done) {
		this.timeout(10*1000);

		var keys = utils79.array_keys({
			'a': 100,
			'b': 200,
			'c': 300
		});

		assert.strictEqual(keys[0], 'a');
		assert.strictEqual(keys[1], 'b');
		assert.strictEqual(keys[2], 'c');
		done();

	});

});

describe('配列(または連想配列)の要素数を数える', function() {

	it('count', function(done) {
		this.timeout(10*1000);

		var count = utils79.count({
			'a': 100,
			'b': 200,
			'c': 300
		});

		assert.strictEqual(count, 3);
		done();

	});

});

describe('Base64に変換する', function() {

	it('Base64変換', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.base64_decode( utils79.base64_encode('abcde;あいうえお') ), 'abcde;あいうえお');
		done();

	});

	it('Base64変換(Non-Strings)', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.base64_decode( utils79.base64_encode(undefined) ), '');
		assert.strictEqual(utils79.base64_decode( utils79.base64_encode(null) ), '');
		assert.strictEqual(utils79.base64_decode( utils79.base64_encode(123) ), '123');
		assert.strictEqual(utils79.base64_decode( utils79.base64_encode(123.12) ), '123.12');
		done();

	});

});

describe('Hash', function() {

	it('md5', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.md5( 'TEST' ), '033bd94b1168d7e4f0d644c3c95e35bf');
		done();

	});

	it('md5(Non-Strings)', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.md5( undefined ), utils79.md5( '' ));
		assert.strictEqual(utils79.md5( null ), utils79.md5( '' ));
		assert.strictEqual(utils79.md5( 123 ), utils79.md5( '123' ));
		assert.strictEqual(utils79.md5( 123.12 ), utils79.md5( '123.12' ));
		done();

	});

	it('sha1', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.sha1( 'TEST' ), '984816fd329622876e14907634264e6f332e9fb3');
		done();

	});

	it('sha1(Non-Strings)', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.sha1( undefined ), utils79.sha1( '' ));
		assert.strictEqual(utils79.sha1( null ), utils79.sha1( '' ));
		assert.strictEqual(utils79.sha1( 123 ), utils79.sha1( '123' ));
		assert.strictEqual(utils79.sha1( 123.12 ), utils79.sha1( '123.12' ));
		done();

	});

});

describe('str_pad()', function() {
	it('str_pad()', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.str_pad( '123', 5, '0', 'left'), '00123');
		assert.strictEqual(utils79.str_pad( 123, 5, '0', 'left'), '00123');
		assert.strictEqual(utils79.str_pad( 'あいう', 5, '0', 'left'), '00あいう');
		assert.strictEqual(utils79.str_pad( '123', 5, '0', 'both'), '01230');
		assert.strictEqual(utils79.str_pad( '123', 5, '0', 'right'), '12300');
		assert.strictEqual(utils79.str_pad( undefined ), null);
		assert.strictEqual(utils79.str_pad( null ), null);
		done();

	});
});

describe('preg_quote()', function() {
	it('preg_quote()', function(done) {
		this.timeout(10*1000);
		assert.strictEqual(utils79.preg_quote('123'), '123');
		assert.strictEqual(utils79.preg_quote('https://aaa.bbb/index.html'), 'https://aaa\\.bbb/index\\.html');
		assert.strictEqual(utils79.preg_quote( undefined ), null);
		assert.strictEqual(utils79.preg_quote( null ), null);
		done();

	});
});

describe('ファイルとディレクトリの存在確認', function() {

	it('is_file, is_dir', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.is_file(__filename), true);
		assert.strictEqual(utils79.is_dir(__dirname), true);
		assert.strictEqual(utils79.is_file(__dirname), false);
		assert.strictEqual(utils79.is_dir(__filename), false);
		done();

	});

});

describe('ファイル名とディレクトリ名の取得', function() {

	it('basename', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.basename('./a/b/cde.fg'), 'cde.fg');
		assert.strictEqual(utils79.basename('.\\a\\b\\cde.fg'), 'cde.fg');
		done();

	});

	it('dirname', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.dirname('./a/b/cde.fg'), './a/b');
		assert.strictEqual(utils79.dirname('.\\a\\b\\cde.fg'), '.\\a\\b');
		done();

	});

});

describe('パスの正規化', function() {

	it('normalize_path', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.normalize_path('//aaa//bbb//ccc'), '//aaa/bbb/ccc');
		assert.strictEqual(utils79.normalize_path('http://www.com/a/b/cde.fg?a=b'), 'http://www.com/a/b/cde.fg?a=b');
		assert.strictEqual(utils79.normalize_path('http:\\\\www.com\\a\\b\\cde.fg?a=b'), 'http://www.com/a/b/cde.fg?a=b');
		assert.strictEqual(utils79.normalize_path('c:\\a\\b\\cde.fg#hoge'), '/a/b/cde.fg#hoge');
		assert.strictEqual(utils79.normalize_path('c:\\a\\b\\cde.fg'), '/a/b/cde.fg');
		assert.strictEqual(utils79.normalize_path('c:\\\\www.com\\a\\b\\cde.fg?a=b'), '//www.com/a/b/cde.fg?a=b');
		done();

	});

	it('normalize_path(Non-Strings)', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.normalize_path(undefined), '');
		assert.strictEqual(utils79.normalize_path(null), '');
		assert.strictEqual(utils79.normalize_path(123), '123');
		assert.strictEqual(utils79.normalize_path(123.12), '123.12');
		done();

	});

});

describe('正規表現のエスケープ', function() {

	it('regexp_quote', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.regexp_quote('http://www.com/a/b/cde.fg?a=b'), 'http\\:\\/\\/www\\.com\\/a\\/b\\/cde\\.fg\\?a\\=b');
		assert.strictEqual(utils79.regexp_quote('(){}!'), '\\(\\)\\{\\}\\!');
		done();

	});

	it('regexp_quote(Non-Strings)', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.regexp_quote(undefined), undefined);
		assert.strictEqual(utils79.regexp_quote(null), null);
		assert.strictEqual(utils79.regexp_quote(123), 123);
		assert.strictEqual(utils79.regexp_quote(123.12), 123.12);
		done();

	});

});

describe('バリデーション', function() {

	it('validate()', function(done) {
		this.timeout(10*1000);

		utils79.validate(
			{
				"val1": "test@example.com@",
				"val2": "ff990x",
				"val3": "",
				"random": "適当な文字列を書きました。abcdefghijklmnopqrstuvwxyz!@1234567890",
			},
			{
				"val1": [
					['isEmail', '!isEmail です'],
					['isLength', {min:5, max: 40}, '5文字以上40文字以下で指定してください。'],
					['isLength', {min:1000, max: 2000}, '1000文字以上2000文字以下で指定してください。']
				],
				"val2": [
					['isHexColor', '!isHexColor です'],
					['isNull', '!isNull です']
				],
				"val3": [
					['!isNull', 'isNull です']
				]
			},
			function(err){
				// console.log(err);
				assert.strictEqual(err.val1[0], '!isEmail です');
				assert.strictEqual(err.val1[1], '1000文字以上2000文字以下で指定してください。');
				assert.strictEqual(err.val2[0], '!isHexColor です');

			}
		);

		done();

	});

});
