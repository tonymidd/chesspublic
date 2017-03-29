/**
 * 卡槽里面的数据
 * author:tony
 * time : 2017/03/24
 */

var _ = require('underscore');

var CardSlotDataMG = function(){
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
    if( this.getCardNumByLine(line) == this.getMaxNumByLine(line) ){
        this.line += 1;
    }
}

pro.removeCardByCardId = function( cardId , line ){

}

pro.remveByLine = function( line ){

}

pro.getCardGroupByLine = function( line ){
    return  this.list[line];
}   

pro.getMaxLine = function(){
    return 3;
}

pro.getCurrCanAddLine = function(){
    return this.line;
}

pro.getMaxNumByLine = function( line ){
    var tmp = [3,5,5];
    return tmp[line];
}

pro.getCardNumByLine = function(line){
    return _.size(this.list[line]);
}
module.exports = CardSlotDataMG;