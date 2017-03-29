/**
 * 牌组牌坐标排序管理
 * author:tony
 * time : 2017/03/24
 */ 
var BaseCardGroupPosSort = require('./../BaseCardGroupPosSort');
cc.Class({
    extends: BaseCardGroupPosSort, 
 
    properties: {
        
    },  

    onLoad: function () {        
        this.posList = [];
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
        this._super();
    },

    /***获取节点与节点间的间距 */
    getSpaceSize : function(){
        this._super();
        return { width : 53 , height : 0 };
    },

    /***获取首个节点位置 */
    getFristPos:function(){
        this._super();
        return { x : -280 , y : -50 };
    }  
});
