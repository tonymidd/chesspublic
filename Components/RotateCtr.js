cc.Class({
    extends: cc.Component,

    properties: {
        rotateTime:20, 
    },

    // use this for initialization
    onLoad: function () { 
        var repeat = cc.repeatForever(cc.rotateBy(this.rotateTime, 360));
        this.node.runAction( repeat )
    }, 
    
});
