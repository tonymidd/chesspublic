/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var FuZiCardGroupView= require('./FuZiCardGroupView');
cc.Class({
    extends: FuZiCardGroupView,
    
    // addCardGroup:function( data ){
    //     this._super( data );

    //     console.log('addCardGroup data %s ',JSON.stringify(data));
    // },

    getPrefabNameByType:function(type){
        this._super(type);
        return 'prefabs/mahjong/fuZiGroupSelf';
    }
});
