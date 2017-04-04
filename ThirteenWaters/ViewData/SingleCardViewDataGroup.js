/**
 * 可见对象数据组
 * author:tony
 * time : 2017/03/24
 */
var BaseObjectDataGroup = require( './../../Public/BaseObjectDataGroup' );
module.exports =  cc.Class({
    
    extends: BaseObjectDataGroup,  
    /**
     * 通过key移除一个数据
     * key : 一个钥匙 （注意此key不是唯一的 数组中有可能存在多个同样的key）
     */
    remove : function( key ){
        this._super( key );
        var _object = _.find( this.list , function(tmpObject){
            return key == tmpObject.getCardId();
        })

        _object.removeFromParent(); 
        
        this.list = _.reject(  this.list , function(tmpObject){
            return key == tmpObject.getCardId();
        });
    },

     /***是否可以添加或者更换牌 
     * data : {cardId:1,checkInfo:{line:1,Lattice:1}}
    */
    isCanAddOrSwitch : function(data){
        return true;
    },  
});