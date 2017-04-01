/**
 *  可见卡槽界面对象数据
 * author:tony
 * time : 2017/03/24
 */
var SingleCardViewData = require( './SingleCardViewData' );
module.exports =  cc.Class({  

    extends: SingleCardViewData, 

    /***获取所在行 */
    getLine : function(){
        return this.line;
    },

    /***设置所在行 */
    setLine : function(v){
        this.line = v;
    },

    /***获取所在格子 */
    getLattice : function(){
        return this.lattice;
    },
    
    /***设置所在格子 */
    setLattice : function(v){
        this.lattice = v;
    },
}); 