/**
 * 功能：跳转场景的提示
 *      主要是现在还没有引擎还没实现
 * 作者：tony
 * 时间：2016-12-14
 */
var MsgGotoScene = cc.Class({
    extends: MsgBase,
    
    getClassName:function(){
        return 'MsgGotoScene';
    }	
});

MsgGotoScene.create = function(  )
{  
     MgMsg.Inst().createComponent('MsgGotoScene',function(compt){
       
     }); 
};
 
window.MsgGotoScene = MsgGotoScene;