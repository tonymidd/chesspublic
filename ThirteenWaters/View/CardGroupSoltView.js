/**
 * 卡槽显示区
 * 描述：
 * author:tony
 * time : 2017/03/24
 */
var _ = require('underscore');
var EveViewLister = require('./EveViewLister');
var EnumTouchAction = require('./../EnumTouchAction');
var CollisionCheckCtr = require('./CollisionCheckCtr'); 
var SingleCardViewData = require('./../ViewData/SingleCardViewData'); 
module.exports =  cc.Class({
    extends: cc.Component,

    properties: {
        eveLister : {            
            default:null,
            type:EveViewLister
        },
        collisionCheckCtr : {            
            default:null,
            type:CollisionCheckCtr
        },      
    },   
    onLoad:function(){ 
        
        this._super();

        this.singleCardSize = {width:20,height:20};

        this.eveLister.addLister(EnumTouchAction.SOLT_PUT_DOWN,this.putDown,this);

        this.eveLister.addLister(EnumTouchAction.SOLT_PICK_UP,this.pickUpCard,this); 
    },  

    /***第一个位置 */
    getFristPosition : function(){
        this._super();
        return {x:-320,y:150};
    },

    /***单张牌的尺寸 */
    getSingleCardSize: function(){
        this._super();
        return this.singleCardSize;
    },

    /***获得一个新的坐标 */
    getPosition : function(){
        this._super();
        var fristPosition = this.getFristPosition(); 
        return {x:fristPosition.x + this.getCardCnt()*(this.singleCardSize.width+10),y:fristPosition.y};
    },

    /***获取牌所在区域 */
    getCardAreaType:function(){
        this._super();
        return EnumCardAreaType.SOLT;
    },

     /***获取单个牌挂载的数据管理组件 */
    getSingeDataComponentName:function(){
        this._super();
        return 'SingleCardSoltViewData';
    },
});
