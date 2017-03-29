/**
 * 十三水
 * author:tony
 * time : 2017/03/24
 */
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        icon:{
            type:cc.Sprite,
            default:null
        },
        numIcon:{
            type:cc.Sprite,
            default:null
        },
        type:{
            type:cc.Sprite,
            default:null
        },
    },  

    /***刷新界面 */
    refresh:function( cardId ){
        this.cardId = cardId;
    }, 

    setPosition:function( position ){
        this.node.setPosition(position);
    },

    getPosition:function(  ){
       return this.node.getPosition();
    },

    setTouchCallFn:function( cb ){
        this.touchCb = cb;
    },

    eveTouch:function(){
        this.touchCb(this.cardId);
    },

    onLoad:function(){

        var self = this;

        this.bfPositionOffset = {x:0,y:0};

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            console.log('TOUCH_START');
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation());
            var bfCardPosition = self.getPosition();
            self.bfPositionOffset = {x:(tempPlayer.x-bfCardPosition.x),y:(tempPlayer.y-bfCardPosition.y) }
            //self.node.setZOrder(200);
        })
        this.node.on(cc.Node.EventType.MOUSE_UP  ,function(event){
            console.log('MOUSE_UP  ');
        })

        
        this.node.on(cc.Node.EventType.TOUCH_MOVE   ,function(event){
            console.log('TOUCH_MOVE   ',JSON.stringify(event.getLocation()));
            var tempPlayer = self.node.parent.convertToNodeSpaceAR(event.getLocation())
            self.setPosition({x:(tempPlayer.x-self.bfPositionOffset.x),y:(tempPlayer.y-self.bfPositionOffset.y) });
        }) 
    } 

});
