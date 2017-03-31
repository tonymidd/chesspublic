/**
 * 拖动碰撞检查
 * author:tony
 * time : 2017/03/24
 */

module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        /**碰撞组*/
        group:[cc.Node], 
    },  

    onLoad:function(){ 
        this.groupLength = this.group.length;
        var posList = [];
        posList.push({});
        var i = 0;        
        for(i;i<groupLength;++i){
             var tmpNode = this.group[i];
             var position = tmpNode.getPosition();
             var size = tmpNode.getContentSize();
             var w = size.width*0.5;
             var h = size.height*0.5;
             var pList = {
                 left_x : (position.x - w),
                 right_x :(position.x + w),
                 up_y : (position.y+h), 
                 down_y :(position.y-h),
             }; 
             posList.push(pList);
        }
    },

    /***检查碰撞
     * 松开时会调用
     * return:
     *          -1：没有找到碰撞区域
     *          1到groupLength 检查到碰撞
     */
    doCheck : function( position ){ 
        var x = position.x;
        var y = position.y; 
        var i = 1;        
        for(i;i<groupLength+1;++i){
            if( x > left_x  && 
                x < right_x && 
                y < up_y && 
                y > down_y ){
                    return i;
                }
        }
        return -1;
    }
});
