var MsgBase = cc.Class({
    extends: cc.Component,    
    properties: {
        
    }, 
    //关闭弹框方法
    close:function(){  
       if( this.node &&  this.node.destroy){
          this.node.destroy();   
       } 
    },
    getClassName:function(){
        //子类实现
    },
    onDestroy:function(){  
        MgMsg.Inst().remove( this.getClassName() );
    },
    onLoad: function () { 
        MgMsg.Inst().add( this.getClassName() );
        this.node.setScale(0.8,0.8);

        var size = cc.director.getWinSize();
        this.node.setPosition( size.width*0.5 , size.height*0.5)
    }      
});
window.MsgBase = MsgBase;
