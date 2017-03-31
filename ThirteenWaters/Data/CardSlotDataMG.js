/**
 * 卡槽里面的数据
 * author:tony
 * time : 2017/03/24
 */

var _ = require('underscore');

var CardSlotDataMG = function(){
    
    //用于通过cardId查找当前所在行
    this.lineByCardIdList = {};

    this.list = {};

    this.line = 0;
}

var pro = CardSlotDataMG.prototype;

pro.addCard = function(cardId,line){
    if( null == line ){
        line = this.line;
    }

    this.list[line] = this.list[line] || [];
    this.list[line].push( cardId );
    this.lineByCardIdList[cardId] = line;

    if( this.getCardNumByLine(line) == this.getMaxNumByLine(line) ){
        this.line += 1;
    }
};
 
/**
 * 通过卡牌id删除卡牌
 * 
 */
pro.removeCardByCardId = function( cardId ){

};

/**
 * 通过行删除卡牌
 * 
 */
pro.remveByLine = function( line ){

};

/**
 * 通过行获得牌组数据
 * line：行号
 * return [1,4,2,5] 
 */
pro.getCardGroupByLine = function( line ){
    return  this.list[line];
};

/**
 * 最大行数
 */
pro.getMaxLine = function(){
    return 3;
};

/**
 * 获得当前可添加行
 */
pro.getCurrCanAddLine = function(){
    return this.line;
};

/**
 * 通过行获得当前行牌的最大容量
 */
pro.getMaxNumByLine = function( line ){
    var tmp = [3,5,5];
    return tmp[line];
};

/**
 * 通过行获得当前行已有牌的数量
 */
pro.getCardNumByLine = function(line){
    return _.size(this.list[line]);
};

/**
 * 获取已牌好的数据
 * return [[1,2,3],[1,2,3,4,5],[1,2,3,4,5]]
 */
pro.getList = function(){
    return [[1,2,3],[1,2,3,4,5],[1,2,3,4,5]]
};

module.exports = CardSlotDataMG;