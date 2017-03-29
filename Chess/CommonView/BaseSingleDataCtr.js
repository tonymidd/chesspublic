/**
 * 单个对象体的数据管理
 * author:tony
 * time : 2017/03/24
 */

/**
 *  obj:实例化后的对象
 *  ctr：obj对象的管理组件
 *  data:数据
 */
var BaseSingleDataCtr  = function(){
    
};

var pro = BaseSingleDataCtr.prototype;

/**
 * 设置对象
 * obj:对象
 */
pro.setObj = function(obj){
    this.obj = obj;
    return this;
};

/**
 * 设置控制脚本组件
 * obj:控制脚本组件
 */
pro.setCtr = function(ctr){
    this.ctr = ctr;
    return this;
};

/**
 * 设置数据
 * obj:数据
 */
pro.setData = function(data){
    this.data = data;
    return this;
};
module.exports = BaseSingleDataCtr;
 