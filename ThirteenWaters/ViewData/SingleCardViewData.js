/**
 *  可见对象数据
 * author:tony
 * time : 2017/03/24
 */
var BaseObject = require( './../../Public/BaseObject' );
module.exports =  cc.Class({ 
    
    extends: BaseObject,

    getCardId : function(){
        return this.cardId;
    },
    setCardId : function(v){
        this.cardId = v;
    },
}); 