/**
 * 拖动碰撞检查(卡槽区)
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
        for( i ; i < groupLength; ++i ){
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
                 width:size.width
             }; 
             posList.push(pList);


        }
    },

    /***检查碰撞(不参与逻辑只管碰撞没碰撞)
     * 松开时会调用
     * return: {line:1,lattice:1};表示碰撞位置为第一行第一格
     *         null:表示没有碰撞
     */
    doCheck : function( position ){ 
        var line = self.doCheckLine( position );
        if( -1 == line ){
            return null;
        }
        var lattice = doCheckLattice(line,position);
        return {line:line,lattice:lattice};
    },

    /***检查碰撞的格子号
     * return 1到5
     */
    doCheckLattice : function( line , position ){
        var posInfo = posList[line];
        
        var tmpWidth = position.x - posInfo.left_x;
        
        return 1;
    },

    /***检查所碰撞的行 */
    doCheckLine : function( position ){ 
        var x = position.x;
        var y = position.y; 
        var i = 1;        
        for(i;i<groupLength+1;++i){
            var posInfo = posList[i];
            if( x > posInfo.left_x  && 
                x < posInfo.right_x && 
                y < posInfo.up_y && 
                y > posInfo.down_y ){
                    return i;
                }
        }
        return -1;
    },
});
