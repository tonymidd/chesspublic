/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */

var BaseCardGroupView = require('./../BaseCardGroupView');
var FuZiSingCardGroupViewCtr = require('./FuZiSingCardGroupViewCtr');
var _ = require('underscore');
cc.Class({
    extends: BaseCardGroupView, 

    /***新增一组 附子 */
    addCardGroup:function( data ){
        var self = this;
        UtilGameObject.createAddparent( this.getPrefabNameByType(data.type) , this.node ,function(obj){      
               var cardsView = obj.getComponent('FuZiCardsViewBase'); 
               cardsView.resetData( data );
               
               var idx = self.getGroupCnt();
               var position = self.posSortCtr.getPosByIdx(idx);
               cardsView.setPosition(position);
               console.log('fuzi position = %s',JSON.stringify(position) );
               self.cardGroupViewCtrList[idx] = new FuZiSingCardGroupViewCtr( obj , cardsView , data );
        });  
       
    },

    /*** 附子类型转化（碰完后再杠）
     * 
     */
    switchCardGroup:function(){

    },

    onLoad: function () {                     
        
        //组FuZiSingCardGroupViewCtr
        this.cardGroupViewCtrList = new Map();

        this._super();
        this.actionLister.addLister( ConstsClient.ACTION_TYPE_LISTER.FUZI_ADD_PENG ,function(data,self){
            self.addCardGroup(data);
        },this);
    },

    /**
     * 通过附子方向获取附子牌组预设体名字
     */ 
    getPrefabNameByType:function( type ){
       //子类实现 
    },

    /**
     * 获取当前组的数量
     */
    getGroupCnt:function(){
        console.log( '-------- -获取当前组的数量--  '+_.size(this.cardGroupViewCtrList));
        return _.size(this.cardGroupViewCtrList);
    }
});
