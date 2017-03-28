/**
 * 单张手牌对象显示
 * author:tony
 * time : 2017/03/24
 */
//var EnumHandCardState = require('./../../Enum/EnumHandCardState');
var PlanMjConfig =  require('./../../../MgData/PlanData/PlanMjConfig');
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
         iconSprite:{
             type:cc.Sprite,
             default:null,
         },
         cardAtlas:{
            default:null,
            type:cc.SpriteAtlas
        },
         handCardState:{
             type:EnumHandCardState,
             default:EnumHandCardState.NONE
         },
    },   
     
    /**
     * 设置图片
     * spritePath:资源路径
     */
    setIconByFrameName:function( spriteFrameName ){
        var self = this;        
        self.iconSprite.spriteFrame = this.cardAtlas.getSpriteFrame(spriteFrameName); 
        return self;
    },

    ListerTouch : function( touchReport ){      
        this.touchReport = touchReport;
    },

    eveTouch:function(){ 
        
    },

    setCard:function( card ){
        this.card = card;
        
        //临时
        var planMjConfig =new PlanMjConfig();
        //临时
        var frameName = planMjConfig.getFramename(this.card.pos);
        
        this.setIconByFrameName( frameName );
    }, 

    /***设置牌的位置 
     * handCardState:手牌状态枚举 (EnumHandCardState)
    */
    setCardPosState : function( handCardState ){
        //子类实现
    },

    /***出牌表现 */
    outCardToPos : function(pos){
        //子类实现
    },

    setPosition:function( position ){
        //子类实现
    }

});
