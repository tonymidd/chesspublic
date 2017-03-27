/**
 * 单张手牌对象控制
 * author:tony
 * time : 2017/03/24
 * 描述 : 处理单牌表现逻辑
 */
var BaseSingleCardView = require('./BaseSingleCardView');
var EnumHandCardState = require('./../../../Enum/EnumHandCardState');
cc.Class({

    extends: BaseSingleCardView,

    properties: {        
        // handAction:{
        //     default: null,
        //     type:HandCardAct, 
        // }
    },
     
     //点击事件处理
     eveTouch:function(){
        this._super();
        if( EnumHandCardState.NONE == this.handCardState ){
            this.setCardPosState( EnumHandCardState.WAIT_OUT ) ;
            this.touchReport({card:this.card,handCardState:this.handCardState});
            return;
        }

        if( EnumHandCardState.WAIT_OUT == this.handCardState ){
            console.log('向后端请求出牌');
            //对接服务器时需要删除
            this.setCardPosState( EnumHandCardState.OUT ) ;
            this.touchReport({card:this.card,handCardState:this.handCardState});
        }
     },

     //成功出牌 数据通过了才会调研
     outSuccess:function( cb ){
        // this.handAction.doOut( cb );
     },

     ListerTouch : function(touchReport){
        this._super(touchReport);
     },

    /***设置牌的位置 
     * handCardState:手牌状态枚举 (EnumHandCardState)
    */
    setCardPosState : function( handCardState ){
        this._super(handCardState);
        if( EnumHandCardState.NONE == handCardState ){
            this.node.setPositionY(-50);
        }else if( EnumHandCardState.WAIT_OUT == handCardState ){ 
            this.node.setPositionY(-35);  
        }
        this.handCardState = handCardState; 
    },

    /***出牌表现 */
    outCardToPos : function(pos){
        this._super(pos); 
        this.node.setPosition(pos); 
        this.handCardState = EnumHandCardState.OUT;
    },

    setPosition:function( position ){
        this._super(position); 
        this.node.setPosition( position ); 
    }
});
