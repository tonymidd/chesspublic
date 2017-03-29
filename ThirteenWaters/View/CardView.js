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
    refresh:function( cardData ){
        this.cardData = cardData;
    },    
});
