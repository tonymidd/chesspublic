/**
 * 可见卡槽对象数据组
 * author:tony
 * time : 2017/03/24
 */
var SingleCardViewDataGroup = require( './SingleCardViewDataGroup' );
module.exports =  cc.Class({ 
    extends: SingleCardViewDataGroup, 

    /***新增一张 */
    add:function( baseObject ){
        this._super(baseObject);
    },
     /***是否可以添加或者更换牌 
     * data : {cardId:1,checkInfo:{line:1,Lattice:1}}
    */
    isCanAddOrSwitch : function(data){
        return false;
    }    
});