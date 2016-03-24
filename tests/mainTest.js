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


describe('Base64に変換する', function() {

	it('Base64変換', function(done) {
		this.timeout(10*1000);

		assert.strictEqual(utils79.base64_decode( utils79.base64_encode('abcde;あいうえお') ), 'abcde;あいうえお');
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

describe('バリデーション', function() {

	it('validate()', function(done) {
		this.timeout(10*1000);

		utils79.validate(
			{
				"val1": "test@example.com@",
				"val2": "ff990x",
				"val3": ""
			},
			{
				"val1": [
					['isEmail', '!isEmail です']
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
				assert.strictEqual(err.val2[0], '!isHexColor です');

			}
		);

		done();

	});

});
