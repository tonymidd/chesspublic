/**
 * <已打出的牌><左边>牌组牌<坐标排序>
 * author:tony
 * time : 2017/03/24
 */
var OutPosSort = require('./OutPosSort');
cc.Class({
    extends: OutPosSort,

    properties: {
        
    },  

    onLoad: function () {        
        this._super();
    },

    
    /***重新计算坐标 */
    reRefresh:function(){
        this._super();
    },

    /***在最末尾新增一个坐标 */
    getPosByIdx:function(idx){
        return this._super(idx);
    },

    /***获取当前最末尾牌坐标 */
    getCurLastPos:function(){
        return this._super();
    },

    /***获取节点与节点间的间距 */
    getSpaceSize : function(){
        this._super();
        return { width : 53 , height : 0 };
    },

    /***获取首个节点位置 */
    getFristPos:function(){
        this._super();
        return { x : -480 , y : 90 };
    }     
});
