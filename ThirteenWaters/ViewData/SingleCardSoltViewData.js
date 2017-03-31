/**
 *  可见卡槽界面对象数据
 * author:tony
 * time : 2017/03/24
 */
var SingleCardViewData = require( './SingleCardViewData' );
module.exports =  cc.Class({  
    extends: SingleCardViewData, 
    getLine : function(){
        return this.line;
    },
    setLine : function(v){
        this.line = v;
    },
}); 