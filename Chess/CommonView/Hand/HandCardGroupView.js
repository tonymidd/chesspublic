/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var BaseCardGroupView = require('./../BaseCardGroupView');
var _ = require('underscore');
var CardViewCtr = require('./../CardViewCtr');
window.HandCardGroupView=cc.Class({
    extends: BaseCardGroupView,

     /***出牌处理 */
    outCard : function( card ){
        this._super(card);
    },

    /**新增一个牌
     * card：{pos:1,cardId:1}
     * 创建对象由子类自己实现
     */
    addCard:function( card , cb ){ 
        this._super(card , cb);
        // var self = this;
        // this.cards.push( { pos:card.pos , card:card } ); 
        // if( ConstsClient.SEAT_DIRECTION.SELF == this.getSeatDirection() ) {
        //     UtilGameObject.createAddparent( 'prefabs/mahjong/handCardMjSelf' , this.node ,function(obj){      
                 
        //         var singleCardView = obj.getComponent('BaseSingleCardView');

        //         if(!!cb){
        //             singleCardView.ListerTouch( cb );
        //         } 

        //         singleCardView.setCard( card );  

        //         var position = self.posSortCtr.getPosByIdx(_.size(self.cardViewCtrList));

        //         singleCardView.setPosition( position );

        //         self.cardViewCtrList[card.pos] = new CardViewCtr(obj,singleCardView,card);
                               
        //     });  
        // }
    },
});
