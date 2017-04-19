cc.Class({
    extends: cc.Component,

    properties: {
        btnTxt:{
            type:cc.Label,
            default:null,
            displayName:"登录按钮上的文字"
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    /***登录按钮的点击响应 */
    eveLogin:function(){
        cc.log('点击到登录按钮');
    },

    /**设置按钮上的文字
     * str:文字
     */
    setBtnTxt:function( str ){
        this.btnTxt.string = str;
    }
});
