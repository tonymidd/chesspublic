/**
 * 可拖拽牌且可碰撞
 * author:tony
 * time : 2017/03/24
 */

var BasePKView = require('./BasePKView');
var CollisionCheckCtr = require('./../CollisionCheckCtr'); //做碰撞检查
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
        self.canvas = cc.director.getScene().getChildByName('Canvas');
        this.moveBfPosition = {x:0,y:0};
        //点击前的卡牌坐标位置 用于未检查到碰撞复位
        this.bfPositionOffset = {x:0,y:0};

        //点下去事件处理
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){            
            //鼠标的点击的位置 
            var worldPosition = event.getLocation() 
            var bfCardPosition = self.moveBfPosition = self.getPosition();
            self.bfPositionOffset = {x:(worldPosition.x-bfCardPosition.x),y:(worldPosition.y-bfCardPosition.y) };
        })

        //移动事件处理
        this.node.on(cc.Node.EventType.TOUCH_MOVE   ,function(event){            
            var worldPosition =event.getLocation(); 
            var tmpCardPostion = {x:(worldPosition.x-self.bfPositionOffset.x),y:(worldPosition.y-self.bfPositionOffset.y) };
            self.setPosition(tmpCardPostion);
        }) 

        //松开事件处理
        this.node.on(cc.Node.EventType.MOUSE_UP  ,function(event){            
          
            var worldPosition =  self.node.parent.convertToWorldSpaceAR( self.getPosition());  
            var checkInfo = self.collisionCtr.doCheck( worldPosition );
            
            //复位
            if( false == self.calcEffectiveAction( checkInfo ) ){ 
                self.setPosition(self.moveBfPosition);
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
    setSoltObjectGroup:function( v ){
        this.objectGroup = v;
    },
    
    /***计算有效动作 */
    calcEffectiveAction:function(checkInfo){
        if(null == checkInfo){
            return false;
        }
        cc.log('checkInfo = %s ', JSON.stringify( checkInfo ));
        var self = this;
        //表示手牌碰撞卡槽区
        if( EnumCardAreaType.HAND == self.cardAreaType ){
            if( false == self.objectGroup.isCanAddOrSwitch({}) ){
                self.eveLister.doDataToLister(EnumTouchAction.HAND_PICK_UP,{cardId:self.getCardId(),checkInfo:checkInfo})
            }else{
                return false;
            }
        }else{
            self.eveLister.doDataToLister(EnumTouchAction.SOLT_PICK_UP,{cardId:self.getCardId(),checkInfo:checkInfo})
        }   
    }
});
