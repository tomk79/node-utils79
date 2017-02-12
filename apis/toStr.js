/**
 * 文字列型に置き換える
 */
module.exports = function(val){
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
