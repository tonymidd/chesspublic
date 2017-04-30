/**
 * 功能：游戏等待界面
 * 作者：tony
 * 时间：2016-12-14
 */
var MsgWait = cc.Class({
    extends: MsgBase,
    
    getClassName:function(){
        return 'MsgWait';
    },
	
	onLoad:function(){

        var self = this;

        var actions = [];

        actions.push(cc.delay( this.getAutoCloseTime() ));

        actions.push(cc.CALLFNC( function(){
            self.close();
        } ));

        this.node.runAction( actions );
	},

    /***设置自动关闭时间 */
    setAutoCloseTime:function( _autoCloseTime ){
        this.autoCloseTime = _autoCloseTime;
    },

    getAutoCloseTime : function(){
        return  this.autoCloseTime || 15 ; 
    }
});

/***等待弹框
 * _waitTime:等待的时间
*/
MsgWait.create = function( _autoCloseTime )
{  
     MgMsg.Inst().createComponent('MsgWait',function(compt){
          compt.setAutoCloseTime( _autoCloseTime ); 
     }); 
};
 
window.MsgWait = MsgWait;