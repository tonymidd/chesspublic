/**
 * 卡槽显示区
 * 描述：
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
var BaseCardGroupView = require('./BaseCardGroupView');
module.exports =  cc.Class({
    extends: BaseCardGroupView,

    properties: {
        eveLister : {            
            default:null,
            type:EveViewLister
        },
        collisionCheckCtr : {            
            default:null,
            type:CollisionCheckCtr
        },      
    },   
    onLoad:function(){ 
        
        this._super(); 

        this.eveLister.addLister(EnumTouchAction.SOLT_PUT_DOWN,this.putDown,this);

        this.eveLister.addLister(EnumTouchAction.SOLT_PICK_UP,this.pickUpCard,this); 
    },  

    /***添加一张牌 */
    addCard: function(cardId){  
         this._super();
         var self = this;
         UtilGameObject.createAddparent( 'prefabs/thirteenWaters/cardTouch' , this.node ,function(obj){ 
             var cardDragView = obj.getComponent('CardDragView');
             cardDragView.refresh( cardId )
                         .setPosition( self.getPosition() )
                         .setCollisionCheckCtr(self.collisionCheckCtr)
                         .setCardAreaType(self.getCardAreaType())
                         .setEveLister(self.eveLister)
                         .setCardId(cardId)
                         .setSoltObjectGroup(self.objectGroup)

             self.singleCardSize = obj.getContentSize();             
             var tmp = obj.getComponent(self.getSingeDataComponentName());
             tmp.setCardId(cardId);
             tmp.setCtr(cardDragView);
             self.objectGroup.add(tmp );
         })   
    },

    /***添加卡牌
     * cardId：卡牌id
     * line：行号
     * lattice：所在格子号
     */
    addCard: function( cardId , line , lattice ){  
        
    },

    /***第一个位置 */
    getFristPosition : function(){
        this._super();
        return {x:-320,y:150};
    },

    /***单张牌的尺寸 */
    getSingleCardSize: function(){
        this._super();
        return this.singleCardSize;
    },

    /***获得一个新的坐标 */
    getPosition : function(){
        this._super();
        var fristPosition = this.getFristPosition(); 
        return {x:fristPosition.x + this.getCardCnt()*(this.singleCardSize.width+10),y:fristPosition.y};
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
