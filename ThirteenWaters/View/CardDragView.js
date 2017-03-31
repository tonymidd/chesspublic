/**
 * 可拖拽牌
 * author:tony
 * time : 2017/03/24
 */

var BasePKView = require('./BasePKView');
var CollisionCheckCtr = require('./CollisionCheckCtr'); //做碰撞检查

module.exports =  cc.Class({
    extends: BasePKView,

    /***将有效的拖到报告给管理层
     * cb(cardId,line)
     *    cardId:卡牌id
     *    line  :所在行  
     */
    setTouchCallFn:function( cb ){
        this.touchCb = cb;
    },

    /***设置拖拽对象 */
    setCollisionCheckCtr:function(ctr){
        this.collisionCtr = ctr;
    },
   
    onLoad:function(){ 
        var self = this; 

        //点击前的卡牌坐标位置 用于未检查到碰撞复位
        this.bfPositionOffset = {x:0,y:0};

        //点下去事件处理
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            //console.log('TOUCH_START');
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation());
            var bfCardPosition = self.getPosition();
            self.bfPositionOffset = {x:(tempPlayer.x-bfCardPosition.x),y:(tempPlayer.y-bfCardPosition.y) };
        })

        //移动事件处理
        this.node.on(cc.Node.EventType.TOUCH_MOVE   ,function(event){
            //console.log('TOUCH_MOVE   ',JSON.stringify(event.getLocation()));
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation());
            var tmpCardPostion = {x:(tempPlayer.x-self.bfPositionOffset.x),y:(tempPlayer.y-self.bfPositionOffset.y) };
            self.setPosition(tmpCardPostion);
        }) 

        //松开事件处理
        this.node.on(cc.Node.EventType.MOUSE_UP  ,function(event){
            //console.log('MOUSE_UP');
            var worldPosition = self.node.parent.convertToNodeSpaceAR(event.getLocation());            
            var checkValue = self.collisionCtr.doCheck( worldPosition );
            
            //复位
            if( -1 == checkValue ){ 
                self.setPosition(self.bfPositionOffset);
            }else{
                self.touchCb( self.cardId , checkValue );
            } 
        })         
    } 

});
