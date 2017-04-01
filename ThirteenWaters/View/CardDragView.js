/**
 * 可拖拽牌且可碰撞
 * author:tony
 * time : 2017/03/24
 */

var BasePKView = require('./BasePKView');
var CollisionCheckCtr = require('./CollisionCheckCtr'); //做碰撞检查
var EnumCardAreaType = require('./EnumCardAreaType');
var EnumTouchAction = require('./../EnumTouchAction');
module.exports =  cc.Class({
    extends: BasePKView,

    properties: {
        cardAreaType:{
            type:EnumCardAreaType,
            default:EnumCardAreaType.HAND
        }
    },  
 
    onLoad:function(){ 
        var self = this; 

        //点击前的卡牌坐标位置 用于未检查到碰撞复位
        this.bfPositionOffset = {x:0,y:0};

        //点下去事件处理
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){            
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation());
            var bfCardPosition = self.getPosition();
            self.bfPositionOffset = {x:(tempPlayer.x-bfCardPosition.x),y:(tempPlayer.y-bfCardPosition.y) };
        })

        //移动事件处理
        this.node.on(cc.Node.EventType.TOUCH_MOVE   ,function(event){            
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation());
            var tmpCardPostion = {x:(tempPlayer.x-self.bfPositionOffset.x),y:(tempPlayer.y-self.bfPositionOffset.y) };
            self.setPosition(tmpCardPostion);
        }) 

        //松开事件处理
        this.node.on(cc.Node.EventType.MOUSE_UP  ,function(event){            
            var worldPosition = self.node.parent.convertToNodeSpaceAR(event.getLocation());            
            
            //{line:1,lattice:1};
            var checkInfo = self.collisionCtr.doCheck( worldPosition );
            
            //复位
            if( false == self.calcEffectiveAction( checkInfo ) ){ 
                self.setPosition(self.bfPositionOffset);
            }
        })         
    },
    

    /***设置拖拽对象 */
    setCollisionCheckCtr:function(ctr){
        this.collisionCtr = ctr;
        return this;
    },

    /**
     * 设置卡牌所在牌区域
     */ 
    setCardAreaType:function(v){
        this.cardAreaType = v;
        return this;
    },

    /***设置报告消息接口 （向此脚本的动作报告给其管理者） */
    setEveLister:function(eveLister){
        this.eveLister = eveLister;
    },

    /***设置卡槽数据管理对象 */
    setCardSlotDataMG:function( v ){
        this.cardSlotDataMG = v;
    },
    /***计算有效动作 */
    calcEffectiveAction:function(checkInfo){
        if(null == checkInfo){
            return false;
        }
        if( EnumCardAreaType.HAND == this.cardAreaType ){
            if( false == this.cardSlotDataMG.isCanAddOrSwitch() ){
                self.eveLister.doDataToLister(EnumTouchAction.HAND_PICK_UP,{cardId:self.getCardId(),checkInfo:checkInfo})
            }else{
                return false;
            }
        }else{
            self.eveLister.doDataToLister(EnumTouchAction.SOLT_PICK_UP,{cardId:self.getCardId(),checkInfo:checkInfo})
        }   
    }
});
