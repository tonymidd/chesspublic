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

        self.moveBfPosition = {x:0,y:0};

        //点击前的卡牌坐标位置 用于未检查到碰撞复位
        self.bfPositionOffset = {x:0,y:0};

        //点下去事件处理
        self.node.on(cc.Node.EventType.TOUCH_START,function(event){            
            //鼠标的点击的位置 
            var worldPosition = event.getLocation() 
            var bfCardPosition = self.moveBfPosition = self.getPosition();
            self.bfPositionOffset = {x:(worldPosition.x-bfCardPosition.x),y:(worldPosition.y-bfCardPosition.y) };
        })

        //移动事件处理
        self.node.on(cc.Node.EventType.TOUCH_MOVE   ,function(event){            
            var worldPosition =event.getLocation(); 
            var tmpCardPostion = {x:(worldPosition.x-self.bfPositionOffset.x),y:(worldPosition.y-self.bfPositionOffset.y) };
            self.setPosition(tmpCardPostion);
        }) 

        //松开事件处理
        self.node.on(cc.Node.EventType.MOUSE_UP  ,function(event){            
          
            var worldPosition =  self.node.parent.convertToWorldSpaceAR( self.getPosition());  
            var checkInfo = self.collisionCtr.doCheck( worldPosition );
            
           
            if( self.calcEffectiveAction( checkInfo ) ){ 
                         
            }
            //没有碰撞
            else{
                 //卡槽区的牌松开时没有碰撞
                if( EnumCardAreaType.SOLT == self.cardAreaType ){  
                    var data = {
                        cardId : self.getCardId(),
                        line : self.singleObject.getLine(),
                        lattice : self.singleObject.getLattice()
                    }
                    self.eveLister.doDataToLister(EnumTouchAction.SOLT_RM_CARD,data)
                    self.eveLister.doDataToLister(EnumTouchAction.HAND_ADD_CARD,self.getCardId());
                    return;
                }
                //复位处理
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

    /***设置数据管理对象 */
    setObjectGroup:function( v ){
        this.objectGroup = v;
    },  

    /***设置数据管理对象 
    * 
    */
    setOtherView:function( v ){
        this.otherView = v;
    },

    /***设置数据管理对象 */
    setSingleObject:function( v ){
        this.singleObject = v;
    },

    /***计算有效动作 */
    calcEffectiveAction:function(checkInfo){
        if( null == checkInfo ){ 
            return false;
        }

        //有效碰撞处理
        cc.log('checkInfo = %s ', JSON.stringify( checkInfo ));
        var self = this;

        //表示手牌碰撞卡槽区
        if( EnumCardAreaType.HAND == self.cardAreaType ){
            var data = {cardId:self.getCardId() ,line:checkInfo.line,lattice:checkInfo.lattice }
            if( true == self.otherView.isCanAddOrSwitch(data) ){
                self.eveLister.doDataToLister(EnumTouchAction.SOLT_ADD_CARD,data)
                self.eveLister.doDataToLister(EnumTouchAction.HAND_RM_CARD,self.getCardId());
                return true;
            }else{
                
            }
        }else{
            
        }   
    }
});
