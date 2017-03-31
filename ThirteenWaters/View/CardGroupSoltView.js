/**
 * 卡槽显示区
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
module.exports =  cc.Class({
    extends: cc.Component,

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
        this.singleCardSize = {width:20,height:20};

        this.eveLister.addLister(EnumTouchAction.PUT_DOWN,this.putDown,this);

        this.eveLister.addLister(EnumTouchAction.PICK_UP,this.pickUpCard,this); 
    },    

    /***添加一张牌 */
    addCard: function(cardId){
         this._super(cardId);
         var self = this;
         UtilGameObject.createAddparent( 'prefabs/thirteenWaters/cardTouch' , this.node ,function(obj){ 
             var cardDragView = obj.getComponent('CardDragView');
             cardDragView.refresh( cardId ); 
             cardDragView.setPosition( self.getPosition() );  
             cardDragView.setCollisionCheckCtr(self.collisionCheckCtr);
             cardDragView.setTouchCallFn( function(cbCardId){
                console.log('cbCardId:'+cbCardId);
             });

             self.singleCardSize = obj.getContentSize();             
             var tmp = obj.getComponent('SingleCardViewData');
             tmp.setCardId(cardId);
             tmp.setCtr(cardDragView);
             self.objectGroup.add(tmp );
         })   
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

    
});
