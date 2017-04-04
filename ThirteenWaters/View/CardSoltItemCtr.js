module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        childCntMax:1
    },

    onLoad:function(){
        /**单张牌的尺寸 */
        this.singleCardSize = {width:60,height:90};
        this.cardList = [];
        this.meSelfSize = this.node.getContentSize();
    }, 

    addCard:function( cardId ){
        this.cardList.push(cardId);
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
        return {x:fristPosition.x + ( (this.getCardCnt() -1)* this.singleCardSize.width ) ,y:fristPosition.y};
    },

    /***牌总数量*/
    getCardCnt : function(){
       return _.size(this.cardList);
    },

    /***初始化数据 */
    init:function(){

    }
});
