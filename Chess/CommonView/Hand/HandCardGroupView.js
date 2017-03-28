/**
 * 牌组
 * author:tony
 * time : 2017/03/24
 */
var BaseCardGroupView = require('./../BaseCardGroupView');
var _ = require('underscore'); 
window.HandCardGroupView=cc.Class({
    
    extends: BaseCardGroupView,

    onLoad: function () {                     
        this._super();
        //当前选中的单牌pos
        this.currChoicPos = -1; 
    }, 

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
    },
});
