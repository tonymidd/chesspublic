/**
 * 可见对象数据组
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var BaseObjectGroup = function(){ 
    this.list = [];
}

var pro = BaseObjectGroup.prototype;

/**
 * 添加一个对象
 * baseObject : 一个BaseObject或其子类对象
 */
pro.add = function( baseObject ){
    this.list.push( baseObject )
};

/**
 * 通过key移除一个数据
 * key : 一个钥匙 （注意此key不是唯一的 数组中有可能存在多个同样的key）
 */
pro.remove = function( key ){
    //必须子类自己实现
};

/***获取长度 */
pro.getSize = function(){
    return _.size(this.list);
};

module.exports = BaseObjectGroup;