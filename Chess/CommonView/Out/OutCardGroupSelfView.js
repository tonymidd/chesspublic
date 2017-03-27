/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var OutCardGroupView = require('./OutCardGroupView');
var CardViewCtr = require('./../CardViewCtr');
var _ = require('underscore');
cc.Class({

    extends: OutCardGroupView,

    properties: {
        
    },  
    onLoad : function(){
        this._super();
        var self = this;
        this.actionLister.addLister( ConstsClient.ACTION_TYPE_LISTER.SELF_OUT_ADD_CARD,self.acceptListerAddCard,self);
    },
 
    //回调函数不能重写
    acceptListerAddCard : function( card,self ){     
        console.log('回调函数不能重写'+JSON.stringify(card) );
        self.addCard(card,null);
    },

    getSingleCardPrefabName : function(){
        this._super();
        return 'prefabs/mahjong/outCardMjSelf';
    },

    /**新增一个牌
     * card：{pos:1,cardId:1}
     * 创建对象由子类自己实现
     */
    addCard:function( card , cb ){ 
        this._super( card ,cb ); 
    },

    /**移除一个牌 */
    removeCard:function( card ){
        this._super(card);
    },

    /**
     * 座位方向
    */
    getSeatDirection : function(){
        this._super();
        return ConstsClient.SEAT_DIRECTION.SELF;
    },
});
