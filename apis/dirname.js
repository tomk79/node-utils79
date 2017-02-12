/**
 * ディレクトリ名を得る
 */
module.exports = function(path){
    return path.replace(/(?:\/|\\)[^\/\\]*(?:\/|\\)?$/, '');
}
