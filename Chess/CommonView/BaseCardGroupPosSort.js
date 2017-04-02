/**
 * 牌组牌坐标排序管理
 * author:tony
 * time : 2017/03/24
 */ 
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        
    },  

    onLoad: function () {        
        this.posList = [];        
    },

    /***当前坐标总数 */
    getCurrPosCnt : function(){
        return this.posList.length;
    },

    

    /***重新计算坐标 
     * needCnt:重新排位的数目*/ 
    reRefresh:function( needCnt ){
        //子类实现
    },

    /***在最末尾新增一个坐标 
     * idx：从0开始
    */
    getPosByIdx:function( idx ){
        if( _.size(this.posList) > idx ){
            return this.posList[idx];
        }
        var spaceSize = this.getSpaceSize();
        var curPosCnt = this.getCurrPosCnt();
        var fristPos =  this.getFristPos();
        var pos = {x:(1+curPosCnt)*spaceSize.width + fristPos.x,y:(1+curPosCnt)*spaceSize.height+fristPos.y};
        this.posList.push( pos );
        return pos;
    }, 

    /***获取当前最末尾牌坐标 */
    getCurLastPos:function(){
        //子类实现
    },

    /***获取节点与节点间的间距 */
    getSpaceSize : function(){
        //子类实现
    },
    /***获取首个节点位置 */
    getFristPos:function(){
        //子类实现
    }   
});
 