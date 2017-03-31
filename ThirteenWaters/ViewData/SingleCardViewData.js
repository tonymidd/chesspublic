/**
 * 卡槽管理
 * author:tony
 * time : 2017/03/24
 */
var BaseObject = require( './../../Public/BaseObject' );
var util = require('util');
var SingleCardViewData = function(){ 
    
} 

util.inherits(SingleCardViewData,BaseObject);

var pro = SingleCardViewData.prototype;

pro.getCardId = function(){
    return this.data;
};

module.exports = SingleCardViewData;