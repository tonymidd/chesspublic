/**
 * 未加入卡槽的卡牌
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
var SingleCardViewDataGroup = require('./../ViewData/SingleCardViewDataGroup'); 
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

    /**选择一张牌拾起时 */
    pickUpCard:function( data,self ){

    },

    /**将拿起一张牌放下 */
    putDown:function( data , self ){
        self.addCard(cardId);
    },

    onLoad:function(){

        this.cardViewDataGroup = new SingleCardViewDataGroup();

        this.singleCardSize = {width:20,height:20};

        this.eveLister.addLister(EnumTouchAction.PUT_DOWN,this.putDown,this);

        this.eveLister.addLister(EnumTouchAction.PICK_UP,this.pickUpCard,this); 

        this.addCards([1,2,3,4,5,6,7]);
    },

    addCards : function(cards){
        var self = this;
        _.each( cards , function(cardId){
            self.addCard( cardId );
        }) 
    },

    /***添加一张牌 */
    addCard: function(cardId){
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
             
             var tmp = new SingleCardViewData();
             tmp.setData(cardId);
             tmp.setCtr(cardDragView);
             tmp.setObj(obj); 
             self.cardViewDataGroup.add(tmp );
         })   
    },

    removeByCardId : function( cardId ){
        this.cardViewDataGroup.remove( cardId );
    },

    getFristPosition : function(){
        return {x:-320,y:150};
    },

    getSingleCardSize: function(){
        return this.singleCardSize;
    },

    getPosition : function(){
        var fristPosition = this.getFristPosition(); 
        return {x:fristPosition.x + this.getCardCnt()*(this.singleCardSize.width+10),y:fristPosition.y};
    },

    getCardCnt : function(){
       return this.cardViewDataGroup.getSize();
    }
});
