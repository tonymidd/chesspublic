/**
 * json数据管理类
 * 作者 : tony
 * 时间 ：2016-12-8 */

var util = require('util'),
    EventEmitter = require('events').EventEmitter

    
var BaseCard = function ( card ) {    
     EventEmitter.call(this);
     this.card = card; 
}; 

var pro = BaseCard.prototype;

/***获取图片名字 */
pro.getSpriteName = function(){
    return 'pk_'+this.card.cardType+'_'+this.card.value;
};

module.exports = BaseCard;
