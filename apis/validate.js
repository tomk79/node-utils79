/**
 * 入力値のセットを確認する
 * 内部で validator を使用します。
 * validator のAPI一覧 https://www.npmjs.com/package/validator を参照してください。
 */
module.exports = function(values, rules, callback){
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
