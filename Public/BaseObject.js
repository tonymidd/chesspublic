/**
 * 一个可见对象的相关数据
 * author:tony
 * time : 2017/03/24
 */
var BaseObject = function(){ 
    
}

var pro = BaseObject.prototype;

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

module.exports = BaseObject;