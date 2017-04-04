/**
 * 卡槽显示区
 * 描述：
 * author:tony
 * time : 2017/03/24
 */  
var EnumTouchAction = require('./../EnumTouchAction'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
var EnumCardAreaType = require('./EnumCardAreaType');
var BaseCardGroupViewThirteenWaters = require('./BaseCardGroupViewThirteenWaters');
var CardSoltItemCtr =  require('./CardSoltItemCtr');
module.exports =  cc.Class({
    extends: BaseCardGroupViewThirteenWaters,

    properties: {
        soltFatherGroup : [CardSoltItemCtr]
    },  
     
    onLoad:function(){ 
        
        this._super(); 

        this.eveLister.addLister(EnumTouchAction.SOLT_ADD_CARD,this.listerAddCard,this); 

        this.eveLister.addLister(EnumTouchAction.SOLT_RM_CARD,this.listerRmCard,this);
    }, 
       
    /***监听新增一张牌
     * data:{line:1,lattice:2,cardId:1}
     */
    listerAddCard : function( data , self ){
        self.addCardBy( data.cardId ,data.line,data.lattice);
    },

    /***监听删除一张牌
     * data:{line:1,lattice:2,cardId:1}
     */
    listerRmCard : function( cardId , self ){ 
        self.removeByCardId( cardId );
    },

    /***添加卡牌
     * cardId：卡牌id
     * line：行号
     * lattice：所在格子号
     */
    addCardBy: function( cardId , line , lattice ){  
         var self = this;
         self.soltFatherGroup[line].addCard(cardId);
         UtilGameObject.createAddparent( 'prefabs/thirteenWaters/CardSoltDrag' , self.soltFatherGroup[line].node ,function(obj){ 
             var cardDragView = obj.getComponent('CardDragView');
             self.singleCardSize = obj.getContentSize();             
             cardDragView.refresh( cardId )
             cardDragView.setPosition( self.soltFatherGroup[line].getSortPosition() )
             cardDragView.setCollisionCheckCtr(self.collisionCheckCtr)
             cardDragView.setCardAreaType(self.getCardAreaType())
             cardDragView.setEveLister(self.eveLister)
             cardDragView.setCardId(cardId)
             cardDragView.setSoltObjectGroup(self.objectGroup)
             var tmp = obj.getComponent(self.getSingeDataComponentName());
             tmp.setCardId(cardId);
             tmp.setCtr(cardDragView);
             self.objectGroup.add( tmp );
         })  
    },

    /***获取牌所在区域 */
    getCardAreaType:function(){
        this._super();
        return EnumCardAreaType.SOLT;
    },

    /***获取单个牌挂载的数据管理组件 */
    getSingeDataComponentName:function(){
        this._super();
        return 'SingleCardSoltViewData';
    },
});
