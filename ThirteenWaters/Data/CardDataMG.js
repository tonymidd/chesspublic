/**
 * 卡槽管理（服务器数据）
 * author:tony
 * time : 2017/03/24
 */
var CardDataMG = function(){
    this.list =[];
}

var pro = CardDataMG.prototype;

pro.addCard = function(cardId){
    this.list.push( cardId );
}
 
pro.getCards = function(){
    return this.list;
}

module.exports = CardDataMG;