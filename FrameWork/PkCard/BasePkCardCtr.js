cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite:{
            default:null,
            type:cc.Sprite,
            displayName:'扑克牌插画'
        }
    },

    /**
     * 设置牌插画
     * id 扑克牌表的id
     * 特殊情况处理id为0时表示牌不可见
     */
    setSprite:function( id ){
        this.setId(id);
        this.iconSprite.Sprite = null;
    },

    /***设置扑克id */
    setId:function(id){
        this.id = id;
    }
    
});
