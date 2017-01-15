# utils79

## Install

```
$ npm install --save utils79
```

## API

### var str = utils79.toStr(val);

文字列型に置き換える。 `null` や `undefined` は空白文字に変換される。

### var str = utils79.trim(str);

文字列の前後から空白文字列を削除する。

### var keys = utils79.array_keys(ary);

配列(または連想配列)のキーの配列を取得する。

### var count = utils79.count(ary);

配列(または連想配列)の要素数を数える。

### var base64 = utils79.base64_encode(bin);

base64エンコードする。

### var bin = utils79.base64_decode(base64);

base64デコードする。

### var is = utils79.is_file(path);

ファイルが存在するか調べる。

### var is = utils79.is_dir(path);

ディレクトリが存在するか調べる。

### var basename = utils79.basename(path);

パス文字列から、ファイル名を取り出す。

### var dirname = utils79.dirname(path);

ディレクトリ名を得る。

### var path = utils79.normalize_path(path);

パスを正規化する。

受け取ったパスを、スラッシュ区切りの表現に正規化します。Windowsのボリュームラベルが付いている場合は削除します。

URIスキーム(http, https, ftp など) で始まる場合、2つのスラッシュで始まる場合(`//www.example.com/abc/` など)、これを残して正規化します。

 - 例： `\a\b\c.html` → `/a/b/c.html` バックスラッシュはスラッシュに置き換えられます。
 - 例： `/a/b////c.html` → `/a/b/c.html` 余計なスラッシュはまとめられます。
 - 例： `C:\a\b\c.html` → `/a/b/c.html` ボリュームラベルは削除されます。
 - 例： `http://a/b/c.html` → `http://a/b/c.html` URIスキームは残されます。
 - 例： `//a/b/c.html` → `//a/b/c.html` ドメイン名は残されます。

### var str = utils79.regexp_quote(str);

正規表現で使えるようにエスケープ処理を施す。

### utils79.validate(values, rules, callback);

入力値のセットを確認する。

内部で `validator` を使用します。
`validator` のAPI一覧 https://www.npmjs.com/package/validator を参照してください。

### var ary = utils79.divide(str, n);

文字列をn文字ずつ分割する。


## 更新履歴 - Change log

### utils79@0.0.3 (2017-01-15)

- Add new API: array_keys()
- Add new API: count()

### utils79@0.0.2 (2016-12-29)

- Add new API: devide()

### utils79@0.0.1 (2016-09-05)

- initial release.


## ライセンス - License

MIT License https://opensource.org/licenses/mit-license.php


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>
