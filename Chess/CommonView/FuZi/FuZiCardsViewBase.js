/**
 * 附子牌基类
 * author:tony
 * time : 2017/03/24
 */
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
         cardSprite1:{
             type:cc.Sprite,
             default:null,
         },
         cardSprite2:{
             type:cc.Sprite,
             default:null,
         },
         cardSprite3:{
             type:cc.Sprite,
             default:null,
         },
         cardAtlas:{
            default:null,
            type:cc.SpriteAtlas
         }
    },

    // use this for initialization
    onLoad: function () {
        this.fuziCardData = null;
    },

    /***重置数据
     * data:为一个数据结构体
     */
    resetData:function(data){

    },

    setPosition : function(position){

    }
});
