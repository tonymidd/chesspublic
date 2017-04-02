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
        this.posList = [];
        this.posList.push({});
        var i = 0;        
        for( i ; i < this.groupLength; ++i ){
             var tmpNode = this.group[i]; 
             var position =tmpNode.parent.convertToWorldSpaceAR( tmpNode.getPosition() ); 
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
             this.posList.push(pList); 
        }
    },

    /***检查碰撞(不参与逻辑只管碰撞没碰撞)
     * 松开时会调用
     * return: {line:1,lattice:1};表示碰撞位置为第一行第一格
     *         null:表示没有碰撞
     */
    doCheck : function( touchPosition ){ 
        var self = this;
        var line = self.doCheckLine( touchPosition );
        if( -1 == line ){
            return null;
        }
        var lattice = self.doCheckLattice(line,touchPosition);
        return {line:line,lattice:lattice};
    },

    /***检查碰撞的格子号
     * return 1到5
     */
    doCheckLattice : function( line , touchPosition ){
        var posInfo = this.posList[line];
        //平均宽
        var singleWight = posInfo.width * this.getLatticePerByLine(line);
        //计算碰撞所在宽度
        var tmpWidth = touchPosition.x - posInfo.left_x;
        
        var tmp =  Math.ceil( tmpWidth/singleWight )

        return tmp;
    },

    /***检查所碰撞的行 */
    doCheckLine : function( touchPosition ){ 
        var x = touchPosition.x;
        var y = touchPosition.y; 
        var i = 1;        
        for(i;i<this.groupLength+1;++i){
            var posInfo = this.posList[i];
            if( x > posInfo.left_x  && 
                x < posInfo.right_x && 
                y < posInfo.up_y && 
                y > posInfo.down_y ){
                    return i;
                }
        }
        cc.log('未检测到碰撞行');
        return -1;
    },

    getLatticePerByLine:function(line){
        var tmp = [0,1/3.0,0.2,0.2];
        return tmp[line];
    }
});
