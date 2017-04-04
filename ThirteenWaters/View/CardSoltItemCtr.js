var BaseObjectDataGroup = require('./../../Public/BaseObjectDataGroup');
module.exports = cc.Class({
    extends: BaseObjectDataGroup,

    properties: {
        childCntMax:1
    },

    onLoad:function(){
        this._super()
        /**单张牌的尺寸 */
        this.singleCardSize = {width:60,height:90};
        this.meSelfSize = this.node.getContentSize();
    }, 

    
    /***移除一张牌 */
    remove:function(key){
        this._super( key );
        var _object = _.find( this.list , function(tmpObject){
            return key == tmpObject.getCardId();
        })

        _object.removeFromParent(); 
        
        this.list = _.reject(  this.list , function(tmpObject){
            return key == tmpObject.getCardId();
        });
    },

    /***第一个位置 */
    getFristPosition : function(){  
        return {x:-this.meSelfSize.width*0.5 + this.singleCardSize.width*0.5,y:0};
    },

    /***单张牌的尺寸 */
    getSingleCardSize: function(){ 
        return this.singleCardSize;
    },

    /***获得一个新的坐标 */
    getSortPosition : function(){ 
        var fristPosition = this.getFristPosition();  
        return {x:fristPosition.x + ( (this.getSize() )* this.singleCardSize.width ) ,y:fristPosition.y};
    },

    /***是否还可以添加 */
    isCanAddOrSwitch:function(){
        return this.childCntMax > this.getSize();
    },
});
