/**
 * 扑克牌显示基类
 * author:tony
 * time : 2017/03/24
 */
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        icon:{
            type:cc.Sprite,
            default:null
        },
        numIcon:{
            type:cc.Sprite,
            default:null
        },
        type:{
            type:cc.Sprite,
            default:null
        },
    },  
    onLoad:function(){
        //子类实现
    },
    /***刷新界面 */
    refresh:function( cardId ){
        this.cardId = cardId;
        return this;
    }, 

    setPosition:function( position ){
        this.node.setPosition(position);
        return this;
    },

    getPosition:function(){
       return this.node.getPosition();
    },  

    /**
     * 设置卡牌id
     */ 
    setCardId:function(v){
        this.cardId = v;
    },

    /***获取id */
    getCardId:function(){
        return this.cardId;
    }
});
