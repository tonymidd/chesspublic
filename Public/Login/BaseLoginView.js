/**
 * 登录界面
 * author:tony
 * time : 2017/03/24
 */ 
var EnumLoginBtn = cc.Enum({
    Tourist:1,  //游客
    WeiXin:2,    //微信
    ZhiFuBao:3,    //支付宝

});

var BaseLoginView = cc.Class({
    extends: cc.Component,

    properties: {
        loginBtnFatherNode:{
            type:cc.Node,
            default:null,
            displayName:'登录按钮节点的父节点'
        },

        loginBtnPrefabs:{
            type:cc.Prefab,
            default:null,
            displayName:'登录按钮预设体'
        }
    },

    onLoad: function () {  
        this.loginBtnList =[];
        var self = this;
        var btnTagList = this.getBtnTagList();

        _.each( btnTagList , function( enumLoginBtn ){
             cc.log( ' onLoad enumLoginBtn  ： '+enumLoginBtn);
             self.createLoginBtn(enumLoginBtn);
        } ); 

    },

    /**
     * 按钮tag集合
     * 子类需要哪些按钮自行重写
     */
    getBtnTagList:function(){
        return [EnumLoginBtn.Tourist,  EnumLoginBtn.WeiXin]
    },

    /**
     * 获取当前按钮的数量
     */
    getLoginCnt : function(){
       return _.size( this.loginBtnList );
    },

    /**创建一个登录按钮模板 
     * 子类如有需要修改请重写
     * fatherNode:创建对象的父节点
     * cb：回调 里面会传按钮控制脚本
     */
    createLoginBtn:function( enumLoginBtn ){
        var self = this; 

        cc.assert(this.loginBtnPrefabs,'请在BaseloginView脚本中绑定登录按钮的预设体');

        var obj = UtilGameObject.createAddparentByPrefabs(this.loginBtnPrefabs,this.loginBtnFatherNode);


        var baseLoginBtnCtr =  obj.getComponent('BaseLoginBtnCtr');
        cc.assert(baseLoginBtnCtr,'请在登录按钮预设体上绑定脚本BaseLoginBtnCtr');

        self.loginBtnList.push(obj); 
        obj.setPositionX( (-1.5+self.getLoginCnt())*obj.getContentSize().width ); 
      
        if( EnumLoginBtn.Tourist == enumLoginBtn ){
            baseLoginBtnCtr.setBtnTxt( '游客登录' );
        }else if( EnumLoginBtn.WeiXin == enumLoginBtn ){ 
            baseLoginBtnCtr.setBtnTxt( '微信登录' ); 
        }else if( EnumLoginBtn.ZhiFuBao == enumLoginBtn ){ 
            baseLoginBtnCtr.setBtnTxt( '支付宝登录' ); 
        }
    },
});
module.exports = BaseLoginView;

