var CounDown = cc.Class({
    extends: cc.Component,

    properties: {
        Label: {
           default: null,  
           type:cc.Label,     
           displayName: '倒计时文本', 
        }, 
    },

    // use this for initialization
    onLoad: function () {
        this.isOpen = false; 
    },

    /****开始倒计时
     * time:倒计时时间单位秒
     * endCb：时间到了以后的回调
     */
    startCountDown:function( time , strTmp, endCb ){
        this.beginTime = Date.now();
        this.endTime = this.beginTime + time*1000;
        this.endCb = endCb;
        this.strTmp = strTmp;
        this.isOpen = true; 
    },
 
    update : function(dt){
        if( this.isOpen ){
            var currTime = Date.now();
            this.isOpen = this.endTime >=  currTime;
            var tmpTime = Math.floor((this.endTime-currTime) * 0.001) ;
            this.Label.string = this.strTmp + tmpTime.toString(); 
            if(false==this.isOpen){
                this.endCb();
            }
        }
    }
});
