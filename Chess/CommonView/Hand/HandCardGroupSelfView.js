/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
//var EnumHandCardState = require('./../../../Enum/EnumHandCardState');
cc.Class({
    extends: HandCardGroupView,

    properties: {
       
    },  
    onLoad: function () {        
         this._super(); 
         console.log('HandCardGroupSelfView.onLoad');
         this.init([
             {pos:1,cardId:1},
             {pos:2,cardId:1},
             {pos:3,cardId:1},
             {pos:4,cardId:1},
             {pos:5,cardId:1},
             {pos:6,cardId:1},
             {pos:7,cardId:1},
             {pos:8,cardId:1},
             {pos:9,cardId:1},
             {pos:10,cardId:1},
             {pos:11,cardId:1},
             {pos:12,cardId:1},
             {pos:13,cardId:1}
             ]);
    },
    
    /**新增一个牌
     * card：{pos:1,cardId:1}
     */
    addCard:function( card  , cb ){       
         this._super( card , cb); 
    },
 
    /**初始化界面 
    * cardIds:[{pos:1,cardId:1},{pos:2,cardId:1}]
    */
    init:function( cards ){        
        var self = this; 
        this._super( cards );  
        _.each(cards,function(card){  
            self.addCard(card ,  //监听出牌逻辑
                                function(actionInfo){  
                                    if( EnumHandCardState.OUT == actionInfo.handCardState ){ 
                                        self.outCard( actionInfo.card );
                                    }else{
                                        console.log('actionInfo = %s',JSON.stringify(actionInfo) );         
                                        if( self.currChoicPos > 0 && self.currChoicPos!= actionInfo.card.pos ){
                                            self.getCardViewByPos(self.currChoicPos).ctr.setCardPosState(EnumHandCardState.NONE);
                                        } 
                                        self.currChoicPos = actionInfo.card.pos;
                                    } 
                                } 
            );
        });
    }, 

    /**
     * 座位方向
    */
    getSeatDirection : function(){
        this._super();
        return ConstsClient.SEAT_DIRECTION.SELF;
    },

    /***监听点击主panel事件 */
    listerMainPanel: function(){
        this._super();
        this.resetPositionCardAll();
    },

    /***复位所有牌 */
    resetPositionCardAll:function(){
        if( null != this.currChoicPos && this.currChoicPos > 0){
            if(null==this.getCardViewByPos(this.currChoicPos)){
                console.error('this.getCardViewByPos[%s] is null',this.currChoicPos);
            }
            console.error(' [%s] ',this.currChoicPos);
            this.getCardViewByPos(this.currChoicPos).ctr.setCardPosState(EnumHandCardState.NONE);
        }
            
    },

    /***出牌处理 */
    outCard : function( card ){
        this.getCardViewByPos(card.pos).ctr.outCardToPos({x:0,y:60});  
        this.actionLister.doDataToLister( ConstsClient.ACTION_TYPE_LISTER.SELF_OUT_ADD_CARD,card );
        this.removeCard( card );
        this.currChoicPos = -1;
        this.resetPostionAll();

        //test
        var cards = [];
        cards.push(card);
        cards.push(card);
        cards.push(card);
        var data = {
            type:ConstsClient.ACTION_TYPE_LISTER.FUZI_ADD_PENG,
            cards:cards
        };

        this.actionLister.doDataToLister( ConstsClient.ACTION_TYPE_LISTER.FUZI_ADD_PENG,data );
        
    },

    /***重新排位 */
    resetPostionAll:function(){
        this._super();
        var self = this;
        _.each(this.cardViewCtrList,function( viewData , idx ){
            viewData.ctr.setPosition( self.posSortCtr.getPosByIdx(idx) );
        });
    },

    getSingleCardPrefabName : function(){
        this._super();
        return 'prefabs/mahjong/handCardMjSelf';
    },
});
