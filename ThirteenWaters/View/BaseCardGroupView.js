/**
 * 未加入卡槽的卡牌
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var BaseObjectDataGroup = require( './../../Public/BaseObjectDataGroup' ); 

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
            type:BaseObjectDataGroup,
            displayName:'界面数据集合 BaseObjectDataGroup'
        }
    },  
    onLoad:function(){
        /**单张牌的尺寸 */
        this.singleCardSize = {width:20,height:20};
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

    /***获取牌所在区域 */
    getCardAreaType:function(){},

    /***获取单个牌挂载的数据管理组件 */
    getSingeDataComponentName:function(){},
});
