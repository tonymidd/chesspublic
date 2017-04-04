/**
 * 一个可见对象的相关数据
 * author:tony
 * time : 2017/03/24
 */ 
module.exports =  cc.Class({
    
    extends: cc.Component,

    setData : function( data ){
        this.data = data;
        return this;
    },
    
    setCtr : function( ctr ){
        this.ctr = ctr;
        return this;
    },
    
    removeFromParent : function(){
        this.node.removeFromParent(); 
    }, 
    
    getPosition : function(){
        return this.ctr.getPosition();
    },

    setPosition : function(v){
        this.ctr.setPosition(v);
    }
}); 