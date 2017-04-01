/**
 * 可见对象数据组
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore'); 
module.exports =  cc.Class({
    
    extends: cc.Component,
    
    onLoad:function(){
        this.list = [];
    },

    /**
     * 添加一个对象
     * baseObject : 一个BaseObjectData或其子类对象
     */
    add : function( baseObject ){
        this.list.push( baseObject )
    },
 
    /***获取长度 */
    getSize : function(){
        return _.size(this.list);
    }, 
    
    //==================================================================================================
    //                                  子类需要实现的部分
    //==================================================================================================
    /**
     * 通过key移除一个数据
     * key : 一个钥匙 （注意此key不是唯一的 数组中有可能存在多个同样的key）
     */
    remove : function( key ){
        //必须子类自己实现
    },
});