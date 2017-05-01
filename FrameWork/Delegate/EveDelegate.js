var EveDelegate =  module.exports;

window.EveDelegateType = cc.Enum({
    CHOICE_CARD_OK:1,         //选牌成功
    REFRESH_SEAT_LIST:2,      //刷新房间座位信息列表
    GET_HAND_CARDS : 3 ,      //获得手牌
    START_COMPARE_CARD : 4 ,  //开始比牌
    COMPARE_CARD_RESULT : 5 , //比牌结束
    SINGLE_SEAT_READY:  6 ,   //单个玩家准备好的通知
});

var g_cbList = {};

//新增监听
EveDelegate.addLister = function( _type,cb  ){  
    g_cbList[_type] = {};
    g_cbList[_type].cb  = cb;
},

/***通过监听类型移除监听 */
EveDelegate.removeLister = function( _type ){
    if( null == g_cbList ){
        return;
    }
    g_cbList[_type]  = null;
}, 

/***清空监听 */
EveDelegate.removeAllLister = function(  ){
    if( null == g_cbList ){
        return;
    }
    g_cbList = null;
}, 

//数据传输
EveDelegate.doDataToLister = function( _type , data ){ 
    if( null == g_cbList ){
        cc.warn('g_cbList is null ');
        return;
    }
    if( null == g_cbList[_type] ){
        cc.warn('g_cbList[_type] is null '+_type);
        return;
    } 
    g_cbList[_type].cb(data);
}

window.EveDelegate = EveDelegate;

