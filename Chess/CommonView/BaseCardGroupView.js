/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var BaseCardGroupPosSort = require('./BaseCardGroupPosSort');
var AgencyActionLister= require('./AgencyActionLister');
var CardViewCtr = require('./CardViewCtr');
var _ = require('underscore');
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        posSortCtr:{
            default:null,
            type:BaseCardGroupPosSort
        },
        actionLister:{
            default:null,
            type:AgencyActionLister
        }
    },  

    onLoad: function () {                     
        //卡牌数据集合
        this.cards = [];  
        //当前选中的单牌pos
        this.currChoicPos = -1;
        //监听点击到mainPanel事件
        this.touchMainPanelEve = null; 
        
        this.cardViewCtrList = new Map(); 
    }, 

    getSingleCardPrefabName : function(){
        //子类实现
    },

    /**新增一个牌
     * card：{pos:1,cardId:1}
     * 创建对象由子类自己实现
     */
    addCard:function( card , cb ){  
        var self = this;
        this.cards.push( { pos:card.pos , card:card } ); 
        if( ConstsClient.SEAT_DIRECTION.SELF == this.getSeatDirection() ) {
            UtilGameObject.createAddparent( this.getSingleCardPrefabName() , this.node ,function(obj){      
                 
                var singleCardView = obj.getComponent('BaseSingleCardView');

                if(!!cb){
                    singleCardView.ListerTouch( cb );
                } 

                singleCardView.setCard( card );  

                var position = self.posSortCtr.getPosByIdx(_.size(self.cardViewCtrList));

                singleCardView.setPosition( position );

                self.cardViewCtrList[card.pos] = new CardViewCtr(obj,singleCardView,card);
                               
            });  
        }
    },

    /**移除一个牌 */
    removeCard:function( card ){
        console.log('移除一个牌:%s', JSON.stringify( card) );
        if(!!this.cardViewCtrList && !!this.getCardViewByPos(card.pos) ){
           this.removeCardViewByPos(card.pos);       
        }
    },

    /**初始化界面 
     * cardIds:[{pos:1,cardId:1},{pos:2,cardId:1}]
    */
    init:function( cards ){
        //子类实现
    },

    /**
     * 座位方向
    */
    getSeatDirection : function(){
        //必须子类实现
    },

    /***监听点击主panel事件 */
    listerMainPanel: function(){
        //子类实现
    },

    /***重新排位 */
    resetPostionAll:function(){
        //子类实现
    },

    getCardViewByPos : function( pos ){
        return _.find(this.cardViewCtrList,function( viewData ){
            return viewData.card.pos == pos;
        });
    },

    removeCardViewByPos : function(pos){ 
        var tmp = this.getCardViewByPos(pos);
        tmp.obj.destroy();   
        tmp  = null;
        this.cardViewCtrList = _.reject(this.cardViewCtrList,function(viewData){
            return viewData.card.pos == pos;
        });  
    }
});
