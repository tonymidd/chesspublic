var MsgMask = require('./MsgMask');
/**
 * 功能：等待界面
 * 作者：tony
 * 时间：2016-12-14
 */
window.MsgNetWait = cc.Class({
    extends: MsgMask,
    properties: { 
             
    },

    getClassName:function(){
        return 'MsgNetWait';
    },

    update : function(){
        if( this.isWaitTimeOut() && false==this.isEnd ){
            this.isEnd = true; 
            this.doActionClose();
        }
    },

    close : function(){ 
         this._super();      
    },

    doActionClose : function(){   
        var self = this;
        var finish = cc.callFunc(function(){
             self.close()  
        },self);
        var seq = cc.sequence( cc.fadeTo(0.2, 0),finish ); 
        this.node.runAction( seq ); 
    },

    onLoad : function(){
        this._super();
        this.startTime = new Date();  
        this.waitTime = 12;//PlanApi.PlanGameConfig.getValue('waitTime');
        this.isEnd = false;
    },

    //是否连接超时
    isWaitTimeOut : function(){
        var currData = new Date();  
        var tmpData =  currData.getTime() - this.startTime.getTime();      
        return ( tmpData > this.waitTime );
    }
});

//创建弹框
MsgNetWait.create = function( text )
{ 
    if( window.g_msgNetWait == true ){
        return;
    }
    window.g_msgNetWait = true;
    MgMsg.Inst().createComponent('MsgNetWait',function(cmp){
         window.g_msgNetWaitCtr = cmp;
    }); 
};

MsgNetWait.close = function(){
    if(!window.g_msgNetWait ){
       return;
    }

    if( window.g_msgNetWaitCtr ){
        window.g_msgNetWaitCtr.close();
    }    
    window.g_msgNetWait = false;
}
 