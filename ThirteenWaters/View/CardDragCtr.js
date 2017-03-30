/**
 * 拖动
 * author:tony
 * time : 2017/03/24
 */

module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        /**碰撞组 1*/
        group1:[cc.Node],
        /**碰撞组 2*/
        group2:[cc.Node],
        /**碰撞组 3*/
        group3:[cc.Node]
    },  

    /***检查碰撞 */
    checkTouchPos : function(position){
        return 1;
    }
});
