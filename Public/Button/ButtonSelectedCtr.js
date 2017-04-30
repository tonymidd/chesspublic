/* *
 * 按钮表现选中高亮
 * 作者：tony
 * 时间：2017-04-30
 * */
var BaseButtonCtr = require('./BaseButtonCtr');
module.exports = cc.Class({
    extends: BaseButtonCtr,

    properties: {
        selectedSprite:{
            default:null,
            type:cc.Node,
            displayName:"选中框"
        }
    },

    /***设置选中状态 */
    setSelected:function( isSelected ){
        if( this.isSelected == isSelected ){
            return;
        }                
        this.isSelected = isSelected;
        this.selectedSprite.active = this.isSelected;
    },
    
    /**获取选中状态
     * return true 表示选中  return false表示未选中
     */
    getIsSelected:function(){
        return this.isSelected;
    }
    
});
