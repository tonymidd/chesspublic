/**
 * 手牌显示区
 * 描述：服务器首次发牌时需要处理添加牌动作
 *      拖动此组件管理的卡牌时由卡牌本身处理
 * author:tony
 * time : 2017/03/24
 */ 
var EnumTouchAction = require('./../EnumTouchAction');
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
var EnumCardAreaType = require('./EnumCardAreaType');
var BaseCardGroupViewThirteenWaters = require('./BaseCardGroupViewThirteenWaters');
module.exports =  cc.Class({
    extends: BaseCardGroupViewThirteenWaters,
    onLoad:function(){ 
        
        this._super(); 

        this.eveLister.addLister(EnumTouchAction.HAND_ADD_CARD,this.listerAddCard,this); 

        this.eveLister.addLister(EnumTouchAction.HAND_RM_CARD,this.rmoveLister,this); 
 
        this.addCards([ 1,2,3,  
                        4,5,6,7,8,  
                        9,10,11,12,13]);
    },

    rmoveLister:function( cardId,self){
        self.removeByCardId(cardId);
        self.resetPositionAll();
    },    

     /***监听删除一张牌
     * data:{line:1,lattice:2,cardId:1}
     */
    listerAddCard : function( data , self ){
        self.addCard( data.cardId );
    },

    /***添加一张牌 */
    addCard: function(cardId){  
         this._super();
         var self = this;
         UtilGameObject.createAddparent( 'prefabs/thirteenWaters/CardDragView' , this.node ,function(tmpObj){ 
             var cardDragView = tmpObj.getComponent('CardDragView');
             cardDragView.refresh( cardId );
                self.singleCardSize = tmpObj.getContentSize();     
                cardDragView.setPosition( self.getPosition() )
                cardDragView.setCollisionCheckCtr(self.collisionCheckCtr)
                cardDragView.setCardAreaType(self.getCardAreaType())
                cardDragView.setEveLister(self.eveLister)
                cardDragView.setCardId(cardId)
                cardDragView.setSoltObjectGroup(self.objectGroup)       
                var tmp = tmpObj.getComponent(self.getSingeDataComponentName());
                tmp.setCardId(cardId);
                tmp.setCtr(cardDragView);
                self.objectGroup.add(tmp );
         })   
    },

    /***添加多个牌 */
    addCards : function(cards){
        var self = this;
        _.each( cards , function(cardId){
            self.addCard( cardId );
        }) 
    },

    /***第一个位置 */
    getFristPositions : function(cardSize,spacex){ 
        return {x:(-480+cardSize.width*0.5+spacex),y:cardSize.height*0.5};
    },

    /***单张牌的尺寸 */
    getSingleCardSize: function(){
        this._super();
        return this.singleCardSize;
    },

    /***获得一个新的坐标 */
    getPosition : function(){
        this._super();
        var idx =  this.getCardCnt();
        var tmpPos = this.objectGroup.getPositionByIdx(idx)
        if(  null != tmpPos ){
            return tmpPos;
        }
        var spaceX = this.getSpaceX(this.singleCardSize);
        var fristPosition = this.getFristPositions(this.singleCardSize,spaceX); 
        return {x:fristPosition.x + idx*(this.singleCardSize.width+spaceX),y:fristPosition.y};
    },

    /***获取牌所在区域 */
    getCardAreaType:function(){
        this._super();
        return EnumCardAreaType.HAND;
    },

    /***获取单个牌挂载的数据管理组件 */
    getSingeDataComponentName:function(){
        this._super();
        return 'SingleCardViewData';
    },

    getSpaceX:function( cardSize ){
        if( null == this.spaceX ){
            this.spaceX = (960 - (13*cardSize.width) ) / 14
        }    
        return  this.spaceX;    
    },

    /***重新排版 */
    resetPositionAll:function(){
        this.objectGroup.resetPositionAll();
    }
});
