/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var BaseCardGroupView = require('./../BaseCardGroupView');
cc.Class({
    extends: BaseCardGroupView, 

    addCardGroup:function( data ){
        
        UtilGameObject.createAddparent( this.getPrefabNameByType(data.type) , this.node ,function(obj){      
                             
        });  
       
    },

    onLoad: function () {                     
        this._super();
        this.actionLister.addLister( ConstsClient.ACTION_TYPE_LISTER.FUZI_ADD_PENG ,function(data,self){
            self.addCardGroup(data);
        },this);
    }, 
    getPrefabNameByType:function(type){
        //基类自己实现
    }
});
