/**
 * 工具类
 * 主要实现一些共用的常用的方法
 */
var exp = module.exports = {};

exp.IsNull = function( _value ){
    return null == _value;
};

exp.IsNotNull = function( _value ){
    return null != _value;
};

exp.getString = function( value ){
    if(!Number(value)){
        return value.toString();
    }else{
       return value;
    }
};

/***回调函数 */
exp.callBack = function( cb , data ){
    if(null != cb ){
        if( null != data ){
            cb(data);
        }else{
            cb();
        } 
    }
};

/***自定义断言
 * d 为假 进入断言
 */
exp.assert = function( d , strNote ){
    if( false == _.isBoolean(d) ){
        if( this.IsNull(strNote) ){
            cc.error('数据为空');
        }else{
            cc.error( strNote );
        } 
    }
};

/***断言未绑定预设体 */
exp.assertPrefab = function( d , strNote ){
    strNote = strNote || 'error 预设体未绑定请绑定 '
    this.assert(d!=null,strNote);
};
 
exp.codeIsOk = function( code ){
    return code == 200;
};

exp.getTypeStr = function( type ){   
    var tipTextList = ["散牌","散牌","一对","两对","三条","顺子","同花","葫芦","铁支","同花顺"];
    return tipTextList[type];
};

window.Utils = exp;