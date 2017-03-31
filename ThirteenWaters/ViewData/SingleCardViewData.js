/**
 * 卡槽管理
 * author:tony
 * time : 2017/03/24
 */
var SingleCardViewData = function(){ 
    
}

var pro = SingleCardViewData.prototype;

pro.setData = function( data ){
    this.data = data;
    return this;
}
 
pro.setCtr = function( ctr ){
    this.ctr = ctr;
    return this;
}

pro.setObj = function( obj ){
    this.obj = obj;
    return this;
}

module.exports = SingleCardViewData;