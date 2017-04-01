/**
 * 可见卡槽对象数据组
 * author:tony
 * time : 2017/03/24
 */
var SingleCardViewDataGroup = require( './SingleCardViewDataGroup' );
module.exports =  cc.Class({ 
    extends: SingleCardViewDataGroup, 

    onLoad:function(){
        this._super();
        //用于通过cardId查找当前所在行
        this.lineByCardIdList = {},

        this.list = [[],[],[],[]],

        /***当前可加行 */
        this.currLine = 0;
    },
    
    /***新增一张 */
    add:function( baseObject ){
        this._super(baseObject);
        var line = baseObject.getLine();
        var cardId = baseObject.getCardId();
        if( null == line ){
            line = this.currLine;
        }

        this.list[line] = this.list[line] || [];
        this.list[line].push( cardId );
        this.lineByCardIdList[cardId] = line;

        if( this.getCardNumByLine(line) == this.getMaxNumByLine(line) ){
            this.currLine += 1;
        }
    },

     /***是否可以添加或者更换牌 
     * data : {cardId:1,checkInfo:{line:1,Lattice:1}}
    */
    isCanAddOrSwitch : function(data){
        return true;
    },  

    /**
     * 通过行删除卡牌
     * 
     */
    remveByLine : function( line ){

    },  

     /**
     * 最大行数
     */
    getMaxLine : function(){
        return 3;
    },

    /**
     * 获得当前可添加行
     */
    getCurrCanAddLine : function(){
        return this.currLine;
    },

    /**
     * 通过行获得当前行牌的最大容量
     */
    getMaxNumByLine : function( currLine ){
        var tmp = [3,5,5];
        return tmp[currLine];
    },

    /**
     * 通过行获得当前行已有牌的数量
     */
    getCardNumByLine : function(currLine){
        return _.size(this.list[currLine]);
    },

    
    /**
     * 获取已牌好的数据
     * return [[1,2,3],[1,2,3,4,5],[1,2,3,4,5]]
     */
    getList : function(){
        return [[1,2,3],[1,2,3,4,5],[1,2,3,4,5]]
    }, 

     /**
     * 通过卡牌id删除卡牌
     * 
     */
    removeCardByCardId : function( cardId ){

    }, 
    
    /**
     * 通过行获得牌组数据
     * currLine：行号
     * return [1,4,2,5] 
     */
    getCardGroupByLine : function( currLine ){
        return  this.list[currLine];
    },
 
});