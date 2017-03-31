/**
 * 未加入卡槽的卡牌
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var BaseObjectGroup = require( './../../Public/BaseObjectGroup' );
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        eveLister : {            
            default:null,
            type:EveViewLister,
            displayName:'数据传递 EveViewLister'
        },
        collisionCheckCtr : {            
            default:null,
            type:CollisionCheckCtr,
            displayName:'碰撞检查 CollisionCheckCtr'
        }, 
        objectGroup : {            
            default:null,
            type:BaseObjectGroup,
            displayName:'界面数据集合 BaseObjectGroup'
        },     
    },  
    onLoad:function(){
 
        this.singleCardSize = {width:20,height:20};

        this.eveLister.addLister(EnumTouchAction.PUT_DOWN,this.putDown,this);

        this.eveLister.addLister(EnumTouchAction.PICK_UP,this.pickUpCard,this); 
  
    },
    /**选择一张牌拾起时 */
    pickUpCard:function( cardId,self ){
        self.removeByCardId(cardId);
    },

    /**将拿起一张牌放下 */
    putDown:function( cardId , self ){
        self.addCard(cardId);
    },  

    /***牌总数量*/
    getCardCnt : function(){
       return this.objectGroup.getSize();
    },

    /***删除卡牌 */
    removeByCardId : function( cardId ){
        this.objectGroup.remove( cardId );
    },

    //==============================================================================================================================
    //  以下子类实现
    //==============================================================================================================================


    /***添加一张牌 */
    addCard: function(cardId){},

    /***第一个位置 */
    getFristPosition : function(){},

    /***单张牌的尺寸 */
    getSingleCardSize: function(){},

    /***获得一个新的坐标 */
    getPosition : function(){},

    
});
