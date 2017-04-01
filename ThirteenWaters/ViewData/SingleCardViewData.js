/**
 *  可见对象数据
 * author:tony
 * time : 2017/03/24
 */
var BaseObjectData = require( './../../Public/BaseObjectData' );
module.exports =  cc.Class({ 
    
    extends: BaseObjectData,

    getCardId : function(){
        return this.cardId;
    },
    setCardId : function(v){
        this.cardId = v;
    },
}); 