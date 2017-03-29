/**
 * 未加入卡槽的卡牌
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        eveLister : {            
            default:null,
            type:EveViewLister
        }    
    },  

    onLoad:function(){
        this.cardList = [];
        this.singleCardSize = {width:20,height:20};

        this.eveLister.addLister(EnumTouchAction.PUT_DOWN,function(cardId,self){
            self.addCard(cardId);
        },this);
    },

    addCards : function(cards){
        var self = this;
        _.each( cards , function(cardId){
            self.addCard( cardId );
        }) 
    },

    /*** */
    addCard: function(cardId){
         var self = this;
         UtilGameObject.createAddparent( '' , this.node ,function(obj){ 
             var cardView = obj.getComponent('CardView');
             cardView.refresh( cardId ); 
             cardView.setPosition( self.getPosition() );  
             self.singleCardSize = obj.getContentSize();
             self.cardList.push( {cardId:cardId,cardView:cardView,obj:obj});
         })   
    },

    removeByCardId : function( cardId ){
        var dataJson = _.find( this.cardList , function(data){
            return cardId == data.cardId;
        })

        dataJson.destory();

        this.cardList = _.reject(  this.cardList , function(data){
            return cardId == data.cardId;
        }); 
    },

    getFristPosition : function(){
        return {x:1,y:1};
    },

    getSingleCardSize: function(){
        return this.singleCardSize;
    },

    getPosition : function(){
        var fristPosition = this.getFristPosition(); 
        return {x:fristPosition.x + this.getCardCnt()*this.singleCardSize.width,y:fristPosition.y};
    },

    getCardCnt : function(){
       return _.size(this.cardList);
    }
});
