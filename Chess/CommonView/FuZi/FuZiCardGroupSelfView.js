/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var FuZiCardGroupView= require('./FuZiCardGroupView');
cc.Class({
    extends: FuZiCardGroupView,
    
    getPrefabNameByType:function(type){
        this._super(type);
        return 'prefabs/mahjong/fuZiGroupSelf';
    },

    /**
     * 座位方向
    */
    getSeatDirection : function(){
        this._super();
        return ConstsClient.SEAT_DIRECTION.SELF;
    },
});
