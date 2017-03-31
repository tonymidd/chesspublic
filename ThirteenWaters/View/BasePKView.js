/**
 * 十三水
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

    /***刷新界面 */
    refresh:function( cardId ){
        this.cardId = cardId;
    }, 

    setPosition:function( position ){
        this.node.setPosition(position);
    },

    getPosition:function(  ){
       return this.node.getPosition();
    },  
    onLoad:function(){
        //子类实现
    }  
});
